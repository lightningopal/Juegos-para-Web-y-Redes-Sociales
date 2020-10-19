// this.sys.game.device.os --> Muestra un array de bools que indica el dispositivo en el que se abre la página
class Scene_Test extends Phaser.Scene {
    constructor() {
        super({ key: "scene_test" });
    } // Fin constructor

    preload() {
        // Fondo
        this.load.image("level_1_bg", "./Assets/Images/BackGrounds/level_1_bg.png");
        // Plataformas
        this.load.image("floor", "./Assets/Images/Platforms_Lvl1/test_plats/floor.png");
        this.load.image("base_big_plat_2", "./Assets/Images/Platforms_Lvl1/test_plats/base_big_plat_2.png");
        this.load.image("base_t_plat", "./Assets/Images/Platforms_Lvl1/test_plats/base_t_plat.png");
        this.load.image("big_plat_1", "./Assets/Images/Platforms_Lvl1/test_plats/big_plat_1.png");
        this.load.image("big_plat_2", "./Assets/Images/Platforms_Lvl1/test_plats/big_plat_2.png");
        this.load.image("plat_1", "./Assets/Images/Platforms_Lvl1/test_plats/plat_1.png");
        this.load.image("plat_2", "./Assets/Images/Platforms_Lvl1/test_plats/plat_2.png");
        this.load.image("plat_3", "./Assets/Images/Platforms_Lvl1/test_plats/plat_3.png");
        this.load.image("t_plat", "./Assets/Images/Platforms_Lvl1/test_plats/t_plat.png");
        this.load.image("character_test", "./Assets/Images/Platforms_Lvl1/test_plats/character_test.png");

        var os = this.sys.game.device.os;
        if (os.android || os.iOS || os.iPad || os.iPhone)
            options.device = "mobile";
        else
            options.device = "desktop";

        this.cursors1 = this.input.keyboard.addKeys({
            'jump': cursors1Keys.jump,
            'fall': cursors1Keys.fall,
            'left': cursors1Keys.left,
            'right': cursors1Keys.right,
            'basicAttack': cursors1Keys.basicAttack,
            'specialAttack': cursors1Keys.specialAttack,
        });

        this.cursors2 = this.input.keyboard.addKeys({
            'jump': cursors2Keys.jump,
            'fall': cursors1Keys.fall,
            'left': cursors2Keys.left,
            'right': cursors2Keys.right,
            'basicAttack': cursors2Keys.basicAttack,
            'specialAttack': cursors2Keys.specialAttack,
        });

        var url;

        url = './Assets/Plugins/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
    } // Fin preload

    create() {
        this.add.image(0, 0, "level_1_bg").setOrigin(0,0).setScale(RelativeScale(1,"x"),RelativeScale(1,"y"));

        // Create mobileKeys
        this.mobileKeys = {
            joyStick : null,
            jumpButton : null
        };

        // Si el dispositivo es movil, añadir un joystick y un boton
        if (options.device == "mobile") {
            this.mobileKeys.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: RelativePosition(100, "x"),
                y: RelativePosition(630, "y"),
                radius: 15,
                base: this.add.circle(0, 0, RelativePosition(60, "x"), 0x888888).setAlpha(0.7).setScale(RelativeScale()).setDepth(1000),
                thumb: this.add.circle(0, 0, RelativePosition(45, "x"), 0xcccccc).setAlpha(0.7).setScale(RelativeScale()).setDepth(1001),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            }).on('update', this.dumpJoyStickState, this);

            this.text = this.add.text(0, 0);
            this.dumpJoyStickState();

            this.mobileKeys.jumpButton = this.add.circle(RelativePosition(1160, "x"), RelativePosition(630, "y"), 20, 0xdddddd).setAlpha(0.7).setScale(RelativeScale()).setDepth(1000).setInteractive();
            
            this.input.addPointer(2);
        }

        //Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(RelativePosition(960.0,"x"), RelativePosition(1038.0,"y"), "floor")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(1920,"x"),RelativeScale(67,"y")).setOffset(0,RelativePosition(17,"y"));

        this.platforms.create(RelativePosition(1526.0,"x"), RelativePosition(715.0,"y"), "base_big_plat_2")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(378,"x"),RelativeScale(74,"y")).setOffset(0,RelativePosition(12,"y"));

        this.platforms.create(RelativePosition(947.50,"x"), RelativePosition(491.50,"y"), "base_t_plat")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(279,"x"),RelativeScale(34,"y")).setOffset(0,RelativePosition(12,"y"));

        this.platforms.create(RelativePosition(501.5,"x"), RelativePosition(755.0,"y"), "big_plat_1")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(325,"x"),RelativeScale(158,"y")).setOffset(0,RelativePosition(12,"y"));

        this.platforms.create(RelativePosition(1790.0,"x"), RelativePosition(422.50,"y"), "big_plat_2")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(341,"x"),RelativeScale(165,"y")).setOffset(0,RelativePosition(12,"y"));

        this.platforms.create(RelativePosition(90.50,"x"), RelativePosition(437.50,"y"), "plat_1")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(181,"x"),RelativeScale(40,"y")).setOffset(0,RelativePosition(10,"y"));

        this.platforms.create(RelativePosition(516.0,"x"), RelativePosition(194.50,"y"), "plat_2")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(218,"x"),RelativeScale(40,"y")).setOffset(0,RelativePosition(10,"y"));

        this.platforms.create(RelativePosition(1328.50,"x"), RelativePosition(157.50,"y"), "plat_3")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(207,"x"),RelativeScale(40,"y")).setOffset(0,RelativePosition(10,"y"));

        this.platforms.create(RelativePosition(944.0,"x"), RelativePosition(395.0,"y"), "t_plat")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(56,"x"),RelativeScale(140,"y")).setOffset(0,RelativePosition(10,"y"));
        
        // Crear el personaje
        var basicWeapon = new Weapon(this, 500);
        var myPlayer = new Character_Controller(this, 0, RelativePosition(100, "x"), 
        RelativePosition(100, "y"), "character_test", RelativeScale(), this.cursors1, 
        this.mobileKeys, RelativeScale(500, "x"), RelativeScale(1200, "y"), 100, basicWeapon, basicWeapon)
        .setScale(RelativeScale(0.85, "x"), RelativeScale(0.85, "y"));;
        
        /*
        this.platform = this.physics.add.image(RelativePosition(600,"x"), RelativePosition(1030,"y"), "slope")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        */
        this.hidePlatforms = [];
        this.hidePlatforms.forEach(platform => {
            platform.body.setCollideWorldBounds(true);
            platform.body.allowGravity = false;
        });

        //Colisiones
        var characters = [myPlayer/**, enemyPlayer/**/];
        var bullets = [];

        //this.physics.add.overlap(this.characters, this.bullets, this.BulletHit, player, bullet);
        this.physics.add.collider(characters, this.platforms);
        this.physics.add.overlap(characters, this.hidePlatforms);
    } // Fin create

    update() {
        // Mostrar u ocultar las plataformas al pasar por encima
        this.hidePlatforms.forEach(platform => {
            if (platform.body.embedded) platform.body.touching.none = false;
            if (!platform.body.touching.none && platform.body.wasTouching.none){
                this.HidePlatform(platform);
            }else if (platform.body.touching.none && !platform.body.wasTouching.none){
                this.ShowPlatform(platform);
            }
        });
    } // Fin update

    BulletHit(player, bullet) {
        this.DamagePlayer(player, bullet);
        this.RemoveBullet(bullet);
    }

    RemoveBullet(bullet) {
        var index = bullet.bulletIndex;
        this.bullets[index].destroy();

        for (var i = index; i < (this.bullets.length - 1); i++) {
            this.bullets[i] = this.bullets[i + 1]
        }

        this.bullets[this.bullets.length].destroy();
    }

    DamagePlayer(player, bullet) {
        player.actualHP -= bullet.damage;

        if (player.actualHP <= 0)
            player.die();
    }

    // Joystick movil
    DumpJoyStickState() {
        var cursorKeys = this.mobileKeys.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        s += '\n';
        s += ('Force: ' + Math.floor(this.mobileKeys.joyStick.force * 100) / 100 + '\n');
        s += ('Angle: ' + Math.floor(this.mobileKeys.joyStick.angle * 100) / 100 + '\n');
        this.text.setText(s);
    }

    HidePlatform(platform){
        var tween = this.tweens.add({
            targets: platform,
            alpha: 0.6,
            ease: 'Sine.easeInOut',
            duration: 200,
        });
    }

    ShowPlatform(platform){
        var tween = this.tweens.add({
            targets: platform,
            alpha: 1.0,
            ease: 'Sine.easeInOut',
            duration: 200,
        });
    }

}