class Scene_Score extends Phaser.Scene {
    constructor(){
        super({ key: "scene_score" });
    }// Fin constructor

    preload(){
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0, 0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width/2, game.config.height/2, "main_menu_nebula")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width/2, game.config.height/2, "main_menu_stars")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Interfaz
        this.add.image(0, 0, "score_interface").setOrigin(0, 0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(5);

        // Ganador y perdedor
        this.loserCharacter;
        this.winnerCharacter;
        this.loserUserName;
        this.winnerUserName;
        this.pointsDiff;
        
        // Si la diferencia de puntos es positiva, el ganador es este jugador
        if (game.mPlayer.pointsDifference > 0)
        {
            this.loserCharacter = this.add.image(RelativeScale(300,"x"), RelativeScale(700,"y"), "splashart_" + game.mEnemy.characterSel.type)
            .setScale(RelativeScale(0.8, "x"), RelativeScale(0.8, "y")).setDepth(4);
            this.loserUserName = this.add.text(RelativeScale(60, "x"), RelativeScale(920, "y"), game.mEnemy.userName)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0, 0.5).setDepth(6).setAngle(22).setFontSize(52);
            
            this.winnerCharacter = this.add.image(RelativeScale(1320,"x"), RelativeScale(580,"y"), "splashart_" + game.mPlayer.characterSel.type)
            .setScale(RelativeScale(1.1, "x"), RelativeScale(1.1, "y")).setDepth(4);
            this.winnerUserName = this.add.text(RelativeScale(1850, "x"), RelativeScale(820, "y"), game.mPlayer.userName)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(1, 0.5).setDepth(6).setAngle(-22).setFontSize(52);
            
            this.pointsDiff = this.add.text(RelativeScale(790, "x"), RelativeScale(120, "y"), "+" + game.mPlayer.pointsDifference + " pt")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0, 0.5).setDepth(7).setFontSize(52);
        }
        // Si es negativa, es el rival
        else
        {
            this.loserCharacter = this.add.image(RelativeScale(300,"x"), RelativeScale(700,"y"), "splashart_" + game.mPlayer.characterSel.type)
            .setScale(RelativeScale(0.8, "x"), RelativeScale(0.8, "y")).setDepth(4);
            this.loserUserName = this.add.text(RelativeScale(60, "x"), RelativeScale(920, "y"), game.mPlayer.userName)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0, 0.5).setDepth(6).setAngle(22).setFontSize(52);
            
            this.winnerCharacter = this.add.image(RelativeScale(1320,"x"), RelativeScale(580,"y"), "splashart_" + game.mEnemy.characterSel.type)
            .setScale(RelativeScale(1.1, "x"), RelativeScale(1.1, "y")).setDepth(4);
            this.winnerUserName = this.add.text(RelativeScale(1850, "x"), RelativeScale(820, "y"), game.mEnemy.userName)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(1, 0.5).setDepth(6).setAngle(-22).setFontSize(52);
            
            this.pointsDiff = this.add.text(RelativeScale(790, "x"), RelativeScale(120, "y"), game.mPlayer.pointsDifference + " pt")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0, 0.5).setDepth(7).setFontSize(52);
        }

        this.newCoins = this.add.text(RelativeScale(790, "x"), RelativeScale(200, "y"), "+" + game.mPlayer.newCoins)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0, 0.5).setDepth(7).setFontSize(52);

        var userNameText = this.add.text(RelativeScale(160, "x"), RelativeScale(165, "y"), game.mPlayer.userName)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0, 0.5).setFontSize(48).setDepth(8); // Alineado a la izquierda
        var userCurrencyText = this.add.text(RelativeScale(620, "x"), RelativeScale(165, "y"), game.mPlayer.currency)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(1, 0.5).setFontSize(48).setDepth(8); // Alineado a la derecha

        this.playAgain = this.add.image(0, 0, "play_again_screen").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(20);
        this.playAgain.setVisible(false);
        this.yesBtn = this.add.image(RelativeScale(587.0,"x"), RelativeScale(616.0,"y"), "yes!!_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(21);
        this.yesBtn.setFrame(1);
        this.yesBtn.setVisible(false);
        this.noBtn = this.add.image(RelativeScale(1325.50,"x"), RelativeScale(616.0,"y"), "no..._button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(21);
        this.noBtn.setVisible(false);

        // Controles
        this.optionSelected;
    }// Fin preload

    create(){
        // Set the scene
        var that = this;
        game.mPlayer.room = -1;
        game.global.actualScene = "scene_score";

        // Timer que muestra la pantalla de volver a jugar
        /*this.time.addEvent({
            delay: 2000,
            callback: () => (that.PlayAgainScreen())
        });
        var tween = this.tweens.add({
            targets: that.images,
            alpha: 1,
            duration: 2000,
            repeat: 0,
            ease: 'Sine.easeInOut',
            yoyo: true,
            hold: 1500,
            onComplete: function () {
                that.currentImage++;
                that.images.setFrame(that.currentImage);
                if (that.currentImage <= 4) {
                    that.ShowImage();
                }else{
                    that.FinalImage();
                }
            }
        });
        */
        var tween = this.tweens.add({
            targets: that.pointsDiff,
            alpha: 0,
            delay: 2000,
            duration: 2000,
            repeat: 0,
            ease: 'Sine.easeInOut',
            yoyo: true,
            onYoyo: function () {
                that.pointsDiff.setText(game.mPlayer.points);
            },
            onComplete: function () {
                that.time.addEvent({
                    delay: 2000,
                    callback: () => (that.PlayAgainScreen())
                });
            }
        });

        var tween = this.tweens.add({
            targets: that.nebula,
            angle: 360,
            duration: 250000,
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
        this.playAgain.setVisible(true);
        this.yesBtn.setVisible(true);
        this.noBtn.setVisible(true);
        
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
                    that.scene.start("scene_searching");
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
                    that.scene.start("scene_main_menu");
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
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE){
                    console.log(that.optionSelected);
                }
            });

            this.input.keyboard.on("keydown-"+"ENTER", function(event){
                // Play again
                if (that.optionSelected == 0){
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_searching");
                // Go to the main menu 
                }else{
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_main_menu");
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