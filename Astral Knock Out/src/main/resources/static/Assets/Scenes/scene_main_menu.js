class Scene_Main_Menu extends Phaser.Scene {

    constructor() {
        super({ key: "scene_main_menu" });
    } // Fin constructor

    preload() {
        var that = this;
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width/2, game.config.height/2, "main_menu_nebula")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width/2, game.config.height/2, "main_menu_stars")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.add.image(RelativeScale(960.0,"x"), RelativeScale(658.50,"y"), "main_menu_interface")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        
        this.gym_btn = this.add.image(RelativeScale(960.0,"x"), RelativeScale(796.50,"y"), "gym_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        // Teclas
        this.cursors;
        // Opciones de selección
        this.optionSelectedRow;
        this.optionSelectedCol;
    } // Fin preload

    create() {
        var that = this;
        var tween = this.tweens.add({
            targets: that.nebula,
            angle: 360,
            duration: 1000000,
            repeat: -1
        });
        var tween = this.tweens.add({
            targets: that.stars,
            angle: 360,
            duration: 1500000,
            repeat: -1
        });

        this.cursors = this.input.keyboard.addKeys({
            'up': game.cursors1Keys.jump,
            'down': game.cursors1Keys.fall,
            'left': game.cursors1Keys.left,
            'right': game.cursors1Keys.right,
            'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
        });
        // Opciones de selección
        this.optionSelectedRow = 0;
        this.optionSelectedCol = 1;

        this.cursors.right.on('down', function(event){
            that.optionSelectedCol = (that.optionSelectedCol + 1) % 3;
            console.log("COL: "+that.optionSelectedCol);
            // that.gym_btn.setFrame(1);
            
        });
        this.cursors.left.on('down', function(event){
            if (that.optionSelectedCol >= 1){
                that.optionSelectedCol = (that.optionSelectedCol - 1) % 3;
            }else{
                that.optionSelectedCol = 2
            }
            console.log("COL: "+that.optionSelectedCol);
        });

        this.cursors.up.on('down', function(event){
            if (that.optionSelectedCol == 1){
                if (that.optionSelectedRow >= 1){
                    that.optionSelectedRow = (that.optionSelectedRow - 1);
                }else{
                    that.optionSelectedRow = 2;
                }
                console.log("ROW: "+that.optionSelectedRow);
            }
        });
        this.cursors.down.on('down', function(event){
            if (that.optionSelectedCol == 1){
                that.optionSelectedRow = (that.optionSelectedRow + 1) % 3;
                console.log("ROW: "+that.optionSelectedRow);
            }
        });
        
        this.cursors.enter.on('down', function(event){
            switch(that.optionSelectedCol){
                case 0:
                    // Options
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_options");
                    break;
                case 1:
                    if (that.optionSelectedRow == 0){
                        // Tournament
                        //that.input.keyboard.removeAllKeys(true);
                        //that.scene.start("scene_tournament");
                    }else if (that.optionSelectedRow == 1){
                        // Space Gym
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_select_character");
                    }else {
                        // Ranking
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_ranking");
                    }
                    break;
                case 2:
                    // Credits
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_credits");
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