class Scene_Score extends Phaser.Scene {
    constructor(){
        super({ key: "scene_score" });
    }// Fin constructor

    preload(){
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width/2, game.config.height/2, "main_menu_nebula")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width/2, game.config.height/2, "main_menu_stars")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        // Interfaz
        this.add.image(RelativeScale(960.0,"x"), RelativeScale(658.50,"y"), "score_interface")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        this.playAgain = this.add.image(0, 0, "play_again_screen").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.playAgain.setActive(false);
        this.yesBtn = this.add.image(RelativeScale(587.0,"x"), RelativeScale(616.0,"y"), "yes_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.yesBtn.setFrame(1);
        this.yesBtn.setActive(false);
        this.noBtn = this.add.image(RelativeScale(1325.50,"x"), RelativeScale(616.0,"y"), "no_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.noBtn.setActive(false);

        // Controles
        this.optionSelected;
    }// Fin preload

    create(){
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_score";

        var tween = this.tweens.add({
            targets: that.nebula,
            angle: 360,
            duration: 500000,
            repeat: -1
        });
        var tween = this.tweens.add({
            targets: that.stars,
            angle: 360,
            duration: 500000,
            repeat: -1
        });

        this.optionSelected = 0;
    }// Fin create

    update(){

    }// Fin update

    PlayAgainScreen(){
        var that = this;
        this.playAgain.setActive(true);
        this.yesBtn.setActive(true);
        this.noBtn.setActive(true);
        if (game.global.DEVICE === "mobile" || game.global.DEBUG_PHONE){

            this.input.on('pointerup', function () {
                that.optionSelected = -1;
                that.yesBtn.setFrame(0);
                that.noBtn.setFrame(0);
            });

            this.yesBtn.setInteractive().on('pointerdown', function(pointer,localX,localY,event){
                that.optionSelected == 0;
                that.yesBtn.setFrame(1);
                that.noBtn.setFrame(0);
                if (game.global.DEBUG_MODE){ 
                    console.log("yes pulsado");
                }
            });
            this.yesBtn.setInteractive().on('pointerup', function(pointer,localX,localY,event){
                if (that.optionSelected == 0){ // Play Again

                }
                if (game.global.DEBUG_MODE){ 
                    console.log("yes soltado");
                }
            });

            this.noBtn.setInteractive().on('pointerdown', function(pointer,localX,localY,event){
                that.optionSelected == 1;
                that.yesBtn.setFrame(0);
                that.noBtn.setFrame(1);
                if (game.global.DEBUG_MODE){ 
                    console.log("no pulsado");
                }
            });
            this.noBtn.setInteractive().on('pointerup', function(pointer,localX,localY,event){
                if (that.optionSelected == 1){ // Main Menu

                }
                if (game.global.DEBUG_MODE){ 
                    console.log("no soltado");
                }
            });

        }else if (game.global.DEVICE === "desktop"){
            this.input.keyboard.on("keydown-"+"D", function(event){
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE){
                    console.log(that.optionSelected);
                }
            });
            this.input.keyboard.on("keydown-"+"A", function(event){
                if (that.optionSelected == 1){
                    that.optionSelected -= 1;
                }else{
                    that.optionSelected = 1;
                }
                that.CheckOption();
                if (game.global.DEBUG_MODE){
                    console.log(that.optionSelected);
                }
            });

            this.input.keyboard.on("keydown-"+"ENTER", function(event){
                if (that.optionSelected == 0){ // Play Again
                    
                    if (game.global.DEBUG_MODE){
                        console.log("Play again");
                    }
                }else{ // Main Menu
                    
                    if (game.global.DEBUG_MODE){
                        console.log("Main menu");
                    }
                }
            });
        }
    }// Fin PlayAgainScore

    CheckOption(){
        if (this.optionSelected == 0){
            this.yesBtn.setFrame(1);
            this.noBtn.setFrame(0);
        }else if (this.optionSelected == 1){
            this.yesBtn.setFrame(0);
            this.noBtn.setFrame(1);
        }
    }

}// Fin Scene_Score