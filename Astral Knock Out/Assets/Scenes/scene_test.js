// this.sys.game.device.os --> Muestra un array de bools que indica el dispositivo en el que se abre la página
class Scene_Test extends Phaser.Scene {
    constructor() {
        super({ key: "scene_test" });
    } // Fin constructor

    // Responsive Functions
    // Position
    RelativePosition(value, axis)
    {
        var pos = 0;
        if (axis == "x")
            pos = (game.canvas.clientWidth / this.referenceWidth) * value;
        else
            pos = (game.canvas.clientHeight / this.referenceHeight)  * value;
        return pos;
    }

    // Scale
    RelativeScale()
    {
        return this.scale;
    }

    RelativeScale(value)
    {
        return this.scale * value;
    }

    preload() {

        this.load.image("slope", "./Assets/Images/Slope.png");

        var os = this.sys.game.device.os;
        if (os.android || os.iOS || os.iPad || os.iPhone)
            options.device = "mobile";
        else
            options.device = "desktop"

        // Referencias de pantalla
        this.referenceWidth = 1280;
        this.referenceHeight = 720;

        // Escala
        this.scale = (game.canvas.clientWidth / this.referenceWidth);

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

        // Create mobileKeys
        this.mobileKeys = {
            joyStick : null,
            jumpButton : null
        };

        // Si el dispositivo es movil, añadir un joystick y un boton
        if (options.device == "mobile") {
            this.mobileKeys.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: this.RelativePosition(100, "x"),
                y: this.RelativePosition(630, "y"),
                radius: 15,
                base: this.add.circle(0, 0, this.RelativePosition(60, "x"), 0x888888).setAlpha(0.7).setScale(this.RelativeScale()).setDepth(1000),
                thumb: this.add.circle(0, 0, this.RelativePosition(45, "x"), 0xcccccc).setAlpha(0.7).setScale(this.RelativeScale()).setDepth(1001),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            }).on('update', this.dumpJoyStickState, this);

            this.text = this.add.text(0, 0);
            this.dumpJoyStickState();

            this.mobileKeys.jumpButton = this.add.circle(this.RelativePosition(1160, "x"), this.RelativePosition(630, "y"), 20, 0xdddddd).setAlpha(0.7).setScale(this.RelativeScale()).setDepth(1000).setInteractive();
            
            this.input.addPointer(2);
        }

        // Crear el personaje
        var basicWeapon = new Weapon(this, 500);
        var myPlayer = new Character_Controller(this, 0, this.RelativePosition(100, "x"), 
        this.RelativePosition(100, "y"), 50, 50, this.RelativeScale(), 0xaaffaa, this.cursors1, 
        this.mobileKeys, 500, 500, 100, basicWeapon, basicWeapon);

        //Plataformas
        this.hidePlatforms = [this.physics.add.image(600, 700, "slope")];
        this.hidePlatforms.forEach(platform => {
            platform.body.setCollideWorldBounds(true);
            platform.body.allowGravity = false;
        });

        //Colisiones
        var characters = [myPlayer/**, enemyPlayer/**/];
        var bullets = [];

        //this.physics.add.overlap(this.characters, this.bullets, this.bulletHit, player, bullet);
        this.physics.add.overlap(characters, this.hidePlatforms);
    } // Fin create

    update() {
        // Mostrar u ocultar las plataformas al pasar por encima
        this.hidePlatforms.forEach(platform => {
            if (platform.body.embedded) platform.body.touching.none = false;
            if (!platform.body.touching.none && platform.body.wasTouching.none){
                this.hidePlatform(platform);
            }else if (platform.body.touching.none && !platform.body.wasTouching.none){
                this.showPlatform(platform);
            }
        });
    } // Fin update

    bulletHit(player, bullet) {
        this.damagePlayer(player, bullet);
        this.removeBullet(bullet);
    }

    removeBullet(bullet) {
        var index = bullet.bulletIndex;
        this.bullets[index].destroy();

        for (var i = index; i < (this.bullets.length - 1); i++) {
            this.bullets[i] = this.bullets[i + 1]
        }

        this.bullets[this.bullets.length].destroy();
    }

    damagePlayer(player, bullet) {
        player.actualHP -= bullet.damage;

        if (player.actualHP <= 0)
            player.die();
    }

    // Joystick movil
    dumpJoyStickState() {
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

    hidePlatform(platform){
        var tween = this.tweens.add({
            targets: platform,
            alpha: 0.6,
            ease: 'Sine.easeInOut',
            duration: 200,
        });
    }

    showPlatform(platform){
        var tween = this.tweens.add({
            targets: platform,
            alpha: 1.0,
            ease: 'Sine.easeInOut',
            duration: 200,
        });
    }

}