class Scene_Select_Character extends Phaser.Scene{

    constructor(){
        super({ key: "scene_select_character" });
    }

    preload(){
        // Carga de Imágenes
        this.load.image("select_character-bg", "./Assets/Images/SelectCharacter-BG.jpg");

        // Dispositivo móvil
        var os = this.sys.game.device.os;
        if (os.android || os.iOS || os.iPad || os.iPhone)
            options.device = "mobile";
        else
            options.device = "desktop"

        var url;
        url = './Assets/Plugins/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);

        // Teclas
        this.cursors;
        // Selectores
        this.optionSelectedRow;
        this.optionSelectedCol;
        // Ajustes del jugador
        this.player;
    }

    create(){
        var that = this;
        //Fondo
        this.background = this.add.image(0, 0, "select_character-bg").setOrigin(0,0)
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
        }// Fin if mobile

        // Opciones de selección
        this.cursors = this.input.keyboard.addKeys({
            'left': cursors1Keys.left,
            'right': cursors1Keys.right,
            'up': cursors1Keys.jump,
            'down': cursors1Keys.fall,
            'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
        });
        // Selectores
        this.optionSelectedRow = 0;
        this.optionSelectedCol = 0;
        // Ajustes del jugador
        this.player = {
            character: -1,
            skill: -1,
            map: -1
        }

        this.cursors.enter.on('down', function(event){
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_test");
            
        });

    }

    upload(){
        
    }

}