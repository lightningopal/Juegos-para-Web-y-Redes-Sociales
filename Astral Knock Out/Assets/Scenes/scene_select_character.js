class Scene_Select_Character extends Phaser.Scene{

    constructor(){
        super({ key: "scene_select_character" });
    }

    preload(){
        // Carga de Imágenes
        this.load.image("select_character-bg", "./Assets/Images/Tests/test_bg/SelectCharacter-BG.jpg");

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