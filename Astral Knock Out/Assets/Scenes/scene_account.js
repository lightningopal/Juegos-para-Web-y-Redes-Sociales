class Scene_Account extends Phaser.Scene {

    constructor() {
        super({ key: "scene_account" });
    } // Fin constructor

    preload() {
        // Carga de Imágenes
        this.load.image("account-bg", "./Assets/Images/Account-BG.jpg");

        var os = this.sys.game.device.os;
        if (os.android || os.iOS || os.iPad || os.iPhone)
            options.device = "mobile";
        else
            options.device = "desktop"

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
        //Fondo
        this.background = this.add.image(0, 0, "account-bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

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
    } // Fin create

    update() {
    } // Fin update

}