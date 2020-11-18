class Scene_Score extends Phaser.Scene {
    constructor() {
        super({ key: "scene_score" });
    }// Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0, 0);
        this.nebula = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_nebula");
        this.stars = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_stars");

        // Interfaz
        this.add.image(0, 0, "score_interface").setOrigin(0, 0)
            .setDepth(5);

        // Ganador y perdedor
        this.loserCharacter;
        this.winnerCharacter;
        this.loserUserName;
        this.winnerUserName;
        this.pointsDiff;

        // Si la diferencia de puntos es positiva, el ganador es este jugador
        if (game.mPlayer.pointsDifference > 0) {
            this.loserCharacter = this.add.image(300, 700, "splashart_" + game.mEnemy.characterSel.type)
                .setScale(0.8, 0.8).setDepth(4);
            this.loserUserName = this.add.text(60, 920, game.mEnemy.userName, { fontFamily: 'font_Write' })
                .setOrigin(0, 0.5).setDepth(6).setAngle(22).setFontSize(52);

            this.winnerCharacter = this.add.image(1320, 580, "splashart_" + game.mPlayer.characterSel.type)
                .setScale(1.1, 1.1).setDepth(4);
            this.winnerUserName = this.add.text(1850, 820, game.mPlayer.userName, { fontFamily: 'font_Write' })
                .setOrigin(1, 0.5).setDepth(6).setAngle(-22).setFontSize(52);

            this.pointsDiff = this.add.text(790, 120, "+" + game.mPlayer.pointsDifference + " pt", { fontFamily: 'font_Write' })
                .setOrigin(0, 0.5).setDepth(7).setFontSize(52);

            // Jugador
            switch (game.mPlayer.characterSel.type) {
                case "bard":
                    this.winnerCharacter.setFlip(true);
                    break;
                case "berserker":
                    this.winnerCharacter.x = 1380;
                    this.winnerCharacter.setFlip(true);
                    break;
            }

            switch (game.mEnemy.characterSel.type) {
                case "wizard":
                    this.loserCharacter.setFlip(true);
                    break;
                case "rogue":
                    this.loserCharacter.setFlip(true);
                    break;
                case "bard":
                    this.loserCharacter.y = 660;
                    break;
            }
        }
        // Si es negativa, es el rival
        else {
            this.loserCharacter = this.add.image(300, 700, "splashart_" + game.mPlayer.characterSel.type)
                .setScale(0.8, 0.8).setDepth(4);
            this.loserUserName = this.add.text(60, 920, game.mPlayer.userName, { fontFamily: 'font_Write' })
                .setOrigin(0, 0.5).setDepth(6).setAngle(22).setFontSize(52);

            this.winnerCharacter = this.add.image(1320, 580, "splashart_" + game.mEnemy.characterSel.type)
                .setScale(1.1, 1.1).setDepth(4);
            this.winnerUserName = this.add.text(1850, 820, game.mEnemy.userName, { fontFamily: 'font_Write' })
                .setOrigin(1, 0.5).setDepth(6).setAngle(-22).setFontSize(52);

            this.minusPoints = Math.round(game.mPlayer.pointsDifference * 0.7);
            if (game.mPlayer.points == 0)
            {
                this.minusPoints = -(game.mPlayer.previousPoints);
            }

            this.auxMinusString = "";
            if (this.minusPoints == 0)
            {
                this.auxMinusString = "-";
            }

            console.log(this.minusPoints);

            this.pointsDiff = this.add.text(790, 120, this.auxMinusString + this.minusPoints + " pt", { fontFamily: 'font_Write' })
                .setOrigin(0, 0.5).setDepth(7).setFontSize(52);

            switch (game.mEnemy.characterSel.type) {
                case "bard":
                    this.winnerCharacter.setFlip(true);
                    break;
                case "berserker":
                    this.winnerCharacter.x = 1380;
                    this.winnerCharacter.setFlip(true);
                    break;
            }

            switch (game.mPlayer.characterSel.type) {
                case "wizard":
                    this.loserCharacter.setFlip(true);
                    break;
                case "rogue":
                    this.loserCharacter.setFlip(true);
                    break;
                case "bard":
                    this.loserCharacter.y = 660;
                    break;
            }

        }

        this.newCoins = this.add.text(790, 200, "+" + game.mPlayer.newCoins, { fontFamily: 'font_Write' })
            .setOrigin(0, 0.5).setDepth(7).setFontSize(52);

        var userNameText = this.add.text(160, 166, game.mPlayer.userName, { fontFamily: 'font_Write' })
            .setOrigin(0, 0.5).setFontSize(48).setDepth(8); // Alineado a la izquierda
        var userCurrencyText = this.add.text(620, 166, game.mPlayer.currency, { fontFamily: 'font_Write' })
            .setOrigin(1, 0.5).setFontSize(48).setDepth(8); // Alineado a la derecha

        this.msg_bg = this.add.image(0, 0, "message_bg").setOrigin(0, 0)
            .setDepth(20);
        this.msg_bg.setVisible(false);
        this.play_again_text = this.add.image(960, 310, "play_again_text")
            .setDepth(22);
        this.play_again_text.setVisible(false);
        this.yesBtn = this.add.image(587.0, 616.0, "yes!!_button")
            .setDepth(22);
        this.yesBtn.setFrame(1);
        this.yesBtn.setVisible(false);
        this.noBtn = this.add.image(1325.50, 616.0, "no..._button")
            .setDepth(22);
        this.noBtn.setVisible(false);

        // Controles
        this.optionSelected;

        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");
    }// Fin preload

    create() {
        // Set the scene
        var that = this;
        game.mPlayer.room = -1;
        game.global.actualScene = "scene_score";

        // Idle timer
        that.time.addEvent({
            delay: 2000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

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
                that.pointsDiff.setText(game.mPlayer.points + " pt");
            },
            onComplete: function () {
                that.time.addEvent({
                    delay: 4000,
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

    update() {

    }// Fin update

    PlayAgainScreen() {
        var that = this;
        this.msg_bg.setVisible(true);
        this.play_again_text.setVisible(true);
        this.yesBtn.setVisible(true);
        this.noBtn.setVisible(true);

        this.input.on('pointerup', function () {
            that.yesBtn.setFrame(0);
            that.noBtn.setFrame(0);
        });

        this.yesBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.yesBtn.setFrame(1);
            that.noBtn.setFrame(0);
            if (game.global.DEBUG_MODE) {
                console.log("yes pulsado");
            }
        });
        this.yesBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_searching");
            if (game.global.DEBUG_MODE) {
                console.log("yes soltado");
            }
        });

        this.noBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.yesBtn.setFrame(0);
            that.noBtn.setFrame(1);
            if (game.global.DEBUG_MODE) {
                console.log("no pulsado");
            }
        });
        this.noBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_main_menu");
            if (game.global.DEBUG_MODE) {
                console.log("no soltado");
            }
        });

        if (game.global.DEVICE === "desktop") {
            this.input.keyboard.on("keydown-" + "D", function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE) {
                    console.log(that.optionSelected);
                }
            });
            this.input.keyboard.on("keydown-" + "RIGHT", function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE) {
                    console.log(that.optionSelected);
                }
            });

            this.input.keyboard.on("keydown-" + "A", function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE) {
                    console.log(that.optionSelected);
                }
            });
            this.input.keyboard.on("keydown-" + "LEFT", function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE) {
                    console.log(that.optionSelected);
                }
            });

            this.input.keyboard.on("keydown-" + "ENTER", function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                // Play again
                if (that.optionSelected == 0) {
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_searching");
                    // Go to the main menu 
                } else {
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_main_menu");
                }
            });
            this.input.keyboard.on("keydown-" + 'O', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                // Play again
                if (that.optionSelected == 0) {
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_searching");
                    // Go to the main menu 
                } else {
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_main_menu");
                }
            });
        }
    }// Fin PlayAgainScore

    CheckOption() {
        if (this.optionSelected == 0) {
            this.yesBtn.setFrame(1);
            this.noBtn.setFrame(0);
        } else if (this.optionSelected == 1) {
            this.yesBtn.setFrame(0);
            this.noBtn.setFrame(1);
        }
    }

}// Fin Scene_Score