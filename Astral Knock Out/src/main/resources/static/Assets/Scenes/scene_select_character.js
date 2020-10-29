class Scene_Select_Character extends Phaser.Scene{

    constructor(){
        super({ key: "scene_select_character" });
    }// Fin constructor

    preload(){
        //Creación de imágenes
        this.background = this.add.image(0, 0, "select_character_bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Teclas
        this.cursors;
        // Selectores
        this.optionSelectedRow;
        this.optionSelectedCol;
        // Ajustes del jugador
        this.player;
    }// Fin preload

    create(){
        var that = this;

        // Opciones de selección
        this.cursors = this.input.keyboard.addKeys({
            'left': game.cursors1Keys.left,
            'right': game.cursors1Keys.right,
            'up': game.cursors1Keys.jump,
            'down': game.cursors1Keys.fall,
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

    }// Fin create

    upload(){
        
    }// Fin upload

}// Fin Scene_Select_Character