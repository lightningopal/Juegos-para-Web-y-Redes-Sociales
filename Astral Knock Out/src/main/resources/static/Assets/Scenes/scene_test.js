// this.sys.game.device.os --> Muestra un array de bools que indica el dispositivo en el que se abre la página
// Debug
var x = 0;
var y = 0;
//var rScaleX = scaleX;
//var rScaleY = 1;

class Scene_Test extends Phaser.Scene {
    constructor() {
        super({ key: "scene_test" });
    } // Fin constructor

    preload() {
        // Fondo
        this.load.image("level_1_bg", "./Assets/Images/BackGrounds/level_1_bg.png");
        this.load.image("level_1_bg_details", "./Assets/Images/BackGrounds/level_1_bg_details.png");
        this.load.image("level_1_bg_move", "./Assets/Images/BackGrounds/level_1_bg_move.png");
        this.load.image("level_1_trans", "./Assets/Images/BackGrounds/level_1_trans.png");
        this.load.image("level_1_fg_details", "./Assets/Images/BackGrounds/level_1_fg_details.png");
        this.load.image("level_1_fg_move", "./Assets/Images/BackGrounds/level_1_fg_move.png");
        // Plataformas
        this.load.image("floor", "./Assets/Images/Platforms/floor.png");
        this.load.image("base_big_plat_2", "./Assets/Images/Platforms/base_big_plat_2.png");
        this.load.image("base_t_plat", "./Assets/Images/Platforms/base_t_plat.png");
        this.load.image("big_plat_1", "./Assets/Images/Platforms/big_plat_1.png");
        this.load.image("big_plat_2", "./Assets/Images/Platforms/big_plat_2.png");
        this.load.image("plat_1", "./Assets/Images/Platforms/plat_1.png");
        this.load.image("plat_2", "./Assets/Images/Platforms/plat_2.png");
        this.load.image("plat_3", "./Assets/Images/Platforms/plat_3.png");
        this.load.image("t_plat", "./Assets/Images/Platforms/t_plat.png");
        this.load.image("bard", "./Assets/Images/Characters/Bard.png");
        this.load.image("dummy", "./Assets/Images/Characters/Dummy.png");
        this.load.image("projectile", "./Assets/Images/Tests/projectile.png")
        // Animaciones Bardo
        this.load.spritesheet("bard_idle", "./Assets/Images/Characters/Animations/IdleAnimation_Bardo.png", { frameWidth: 170, frameHeight: 170 });
        this.load.spritesheet("bard_walk", "./Assets/Images/Characters/Animations/WalkAnimation_Bardo.png", { frameWidth: 170, frameHeight: 170 });
        

        // Mover a escena inicial
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

        if (options.device == "mobile") {
            var url;
            url = './Assets/Plugins/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
        }
        
    } // Fin preload

    create() {
        var that = this;
        // Creamos las animaciones
        this.anims.create({
            key: 'bard_idle',
            frames: this.anims.generateFrameNumbers('bard_idle', { start: 1, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'bard_walk',
            frames: this.anims.generateFrameNumbers('bard_walk', { start: 0, end: 10 }),
            frameRate: 48,
            repeat: -1
        });

        this.add.image(0, 0, "level_1_bg").setOrigin(0,0).setScale(RelativeScale(1,"x"),RelativeScale(1,"y")).setDepth(-5);
        this.add.image(0, 0, "level_1_bg_details").setOrigin(0,0).setScale(RelativeScale(1,"x"),RelativeScale(1,"y")).setDepth(-3);
        this.bgMove = this.add.image(0, 0, "level_1_bg_move").setOrigin(0,0).setScale(RelativeScale(1,"x"),RelativeScale(1,"y")).setDepth(-2);
        this.tweens.add({
            targets: that.bgMove,
            y: (that.bgMove.y+3),
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        this.add.image(0, 0, "level_1_fg_details").setOrigin(0,0).setScale(RelativeScale(1,"x"),RelativeScale(1,"y")).setDepth(3);
        this.fgMove = this.add.image(0, 0, "level_1_fg_move").setOrigin(0,0).setScale(RelativeScale(1,"x"),RelativeScale(1,"y")).setDepth(4);
        this.tweens.add({
            targets: that.fgMove,
            y: (that.fgMove.y-4),
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
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
        this.transimage = this.physics.add.image(RelativePosition(522.50, "x"), RelativePosition(889.0, "y"), "level_1_trans").setScale(RelativeScale(1,"x"),RelativeScale(1,"y")).setDepth(2);
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(RelativePosition(960.0,"x"), RelativePosition(1038.0,"y"), "floor")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(1920,"x"),RelativeScale(67,"y")).setOffset(0,RelativePosition(17,"y"));

        this.platforms.create(RelativePosition(1526.0,"x"), RelativePosition(708.0,"y"), "base_big_plat_2")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(378,"x"),RelativeScale(74,"y")).setOffset(0,RelativePosition(12,"y"));

        this.platforms.create(RelativePosition(949.50,"x"), RelativePosition(495.50,"y"), "base_t_plat")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(279,"x"),RelativeScale(34,"y")).setOffset(0,RelativePosition(12,"y"));

        this.platforms.create(RelativePosition(502.5,"x"), RelativePosition(707.50,"y"), "big_plat_1") // 502.5 x 707
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(325,"x"),RelativeScale(158,"y")).setOffset(0,RelativePosition(12,"y"));

        this.platforms.create(RelativePosition(1764.0,"x"), RelativePosition(362.5,"y"), "big_plat_2") // 1764 x 362
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(341,"x"),RelativeScale(165,"y")).setOffset(0,RelativePosition(12,"y"));

        this.platforms.create(RelativePosition(90.50,"x"), RelativePosition(437.50,"y"), "plat_1")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(181,"x"),RelativeScale(40,"y")).setOffset(0,RelativePosition(10,"y"));

        this.platforms.create(RelativePosition(517.0,"x"), RelativePosition(194.50,"y"), "plat_2")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(218,"x"),RelativeScale(40,"y")).setOffset(0,RelativePosition(10,"y"));

        this.platforms.create(RelativePosition(1229.50,"x"), RelativePosition(107.50,"y"), "plat_3")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(207,"x"),RelativeScale(40,"y")).setOffset(0,RelativePosition(10,"y"));

        this.platforms.create(RelativePosition(946.0,"x"), RelativePosition(392.0,"y"), "t_plat")
        .setScale(RelativeScale(1,"x"), RelativeScale(1,"y")).refreshBody()
        .body.setSize(RelativeScale(56,"x"),RelativeScale(140,"y")).setOffset(0,RelativePosition(10,"y"));
        // Dummy de prácticas
        this.dummy = new Character_Controller(this, 0, RelativePosition(1500, "x"), 
        RelativePosition(500, "y"), "dummy", RelativeScale(), undefined, 
        undefined, RelativeScale(500, "x"), RelativeScale(1020, "y"), 100, undefined, undefined)
        .setScale(RelativeScale(1, "x"), RelativeScale(1.3, "y"));
        this.dummy.body.debugBodyColor = 0xff0000;
        // Pool de habilidades
        /*Bardo*/
        this.bardAttack = new BardSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 800)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.bardAttack2 = new BardSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 800)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        /**/
       /*Mago*
        this.wizardAttack1 = new WizardSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 1500, 350)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.wizardAttack2 = new WizardSkill(this, 1, 0, 0,"projectile", this.dummy, 10, 1500, 350)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.wizardAttack3 = new WizardSkill(this, 2, 0, 0,"projectile", this.dummy, 10, 1500, 350)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.wizardAttack4 = new WizardSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 1500, 350)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.wizardAttack5 = new WizardSkill(this, 1, 0, 0,"projectile", this.dummy, 10, 1500, 350)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.wizardAttack6 = new WizardSkill(this, 2, 0, 0,"projectile", this.dummy, 10, 1500, 350)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        /**/
        /*Pícaro*
        this.rogueAttack1 = new RogueSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 350, 0)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.rogueAttack2 = new RogueSkill(this, 1, 0, 0,"projectile", this.dummy, 10, 2000, 350, 150)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.rogueAttack3 = new RogueSkill(this, 2, 0, 0,"projectile", this.dummy, 10, 2000, 350, 300)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.rogueAttack4 = new RogueSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 350, 0)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.rogueAttack5 = new RogueSkill(this, 1, 0, 0,"projectile", this.dummy, 10, 2000, 350, 150)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        this.rogueAttack6 = new RogueSkill(this, 2, 0, 0,"projectile", this.dummy, 10, 2000, 350, 300)
        .setScale(RelativeScale(2, "x"), RelativeScale(2, "y")).setDepth(1);
        /**/
        // Se añade el pool a un array y se pasa al arma del personaje (que maneja el id del ataque a lanzar)
        var bardBasicAttacks = [this.bardAttack, this.bardAttack2];
        // var wizardBasicAttacks = [this.wizardAttack1,this.wizardAttack2,this.wizardAttack3, 
            // this.wizardAttack4,this.wizardAttack5,this.wizardAttack6];
        // var rogueBasicAttacks = [this.rogueAttack1,this.rogueAttack2,this.rogueAttack3, 
        //     this.rogueAttack4,this.rogueAttack5,this.rogueAttack6];
        var basicWeapon = new Weapon(this, 700, bardBasicAttacks, 1);
        // Crear el personaje
        var myPlayer = new Character_Controller(this, 0, RelativePosition(250, "x"), 
        RelativePosition(900, "y"), "bard", RelativeScale(), this.cursors1, 
        this.mobileKeys, RelativeScale(500, "x"), RelativeScale(1020, "y"), 100, basicWeapon, basicWeapon)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        
        /*
        this.platform = this.physics.add.image(RelativePosition(600,"x"), RelativePosition(1030,"y"), "slope")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        */
        this.hidePlatforms = [this.transimage];
        this.hidePlatforms.forEach(platform => {
            platform.body.setCollideWorldBounds(true);
            platform.body.allowGravity = false;
        });

        //Colisiones
        var characters = [myPlayer, this.dummy/**, enemyPlayer/**/];
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

        if (this.dummy.body.touching.down){
            this.dummy.body.velocity.y = RelativeScale(-800,"y");
        }

        var debugText = document.getElementById("debugText");
        debugText.innerHTML = "Posición del ratón: {x: " + x + ", y: " + y + "} | FPS: " + Math.round(game.loop.actualFps);
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

    DamagePlayer(player, attack) {
        player.actualHP -= attack.damage;

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

function showCoords(event) {
    x = Math.round(event.clientX * (game.config.width / 1920));
    y = Math.round(event.clientY * (game.config.height / 1080));
  }