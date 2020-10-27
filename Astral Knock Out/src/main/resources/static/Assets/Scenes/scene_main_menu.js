class Scene_Main_Menu extends Phaser.Scene {

    constructor() {
        super({ key: "scene_main_menu" });
    } // Fin constructor

    preload() {
        var that = this;
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu-bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        
        // Teclas
        this.cursors;
        // Opciones de selección
        this.optionSelectedRow;
        this.optionSelectedCol;
    } // Fin preload

    create() {
        var that = this;

        this.cursors = this.input.keyboard.addKeys({
            'up': game.cursors1Keys.jump,
            'down': game.cursors1Keys.fall,
            'left': game.cursors1Keys.left,
            'right': game.cursors1Keys.right,
            'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
        });
        // Opciones de selección
        this.optionSelectedRow = 1;
        this.optionSelectedCol = 0;

        this.cursors.right.on('down', function(event){
            if (that.optionSelectedRow == 3){
                that.optionSelectedCol = (that.optionSelectedCol + 1) % 2;
                console.log("COL: "+that.optionSelectedCol);
            }
            
        });
        this.cursors.left.on('down', function(event){
            if (that.optionSelectedRow == 3){
                that.optionSelectedCol = (that.optionSelectedCol + 1) % 2;
                console.log("COL: "+that.optionSelectedCol);
            }
        });

        this.cursors.up.on('down', function(event){
            if (that.optionSelectedRow >= 1){
                that.optionSelectedRow = (that.optionSelectedRow - 1);
            }else{
                that.optionSelectedRow = 3;
            }
            console.log("ROW: "+that.optionSelectedRow);
        });
        this.cursors.down.on('down', function(event){
            that.optionSelectedRow = (that.optionSelectedRow + 1) % 4;
            console.log("ROW: "+that.optionSelectedRow);
        });
        
        this.cursors.enter.on('down', function(event){
            switch(that.optionSelectedRow){
                case 0:
                    // Options
                    break;
                case 1:
                    // Tournament
                    break;
                case 2:
                    // Space Gym
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_select_character");
                    break;
                case 3:
                    if (that.optionSelectedCol == 0){
                        // Ranking
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_ranking");
                    }else{
                        // Credits
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_credits");
                    }
                    break;
                default:
                    break;
            }
            
        });
        this.cursors.escape.on('down', function(event){
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_account");
        });
    } // Fin create

    update() {
    } // Fin update

}// Fin Scene_Main_Menu