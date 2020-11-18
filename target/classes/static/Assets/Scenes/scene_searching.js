class Scene_Searching extends Phaser.Scene {

    constructor() {
        super({ key: "scene_searching" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0, 0);
        this.nebula = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_nebula");
        this.stars = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_stars");

        this.add.image(game.config.width / 2, game.config.height / 2, "searching_back_triangle");

        this.rotatingIcon = this.add.image(1778, 236, "searching_rotating_icon");

        // Personaje
        var characterImage = this.add.image(480, 540, "splashart_" + game.mPlayer.characterSel.type);

        switch (game.mPlayer.characterSel.type) {
            case "bard":
                characterImage.setScale(1.4, 1.4);
                characterImage.y = 500;
                break;
            case "wizard":
                characterImage.x = 500;
                characterImage.y = 600;
                characterImage.setScale(1.25, 1.25);
                characterImage.setFlip(true);
                break;
            case "rogue":
                characterImage.setScale(1.5, 1.5);
                characterImage.setFlip(true);
                characterImage.y = 740;
                break;
            case "berserker":
                characterImage.setScale(1.4, 1.4);
                break;
        }

        this.add.image(game.config.width / 2, game.config.height / 2, "searching_front_triangle");
        this.tipImage = this.add.image(1600.91, 881.41, "searching_tips_text");

        this.connectedUsersText;

        // Tip random
        var randomTip = Math.floor(Math.random() * 9);
        this.tipImage.setFrame(randomTip);

        // Back button
        this.add.image(114.50, 112.0, "back_button_interface")
            .setDepth(30);
        this.backBtn = this.add.image(66.0, 78.5, "back_button")
            .setDepth(31);

        // Error message
        this.error_bg = this.add.image(0, 0, "error_bg").setOrigin(0, 0).setDepth(41);
        this.no_matches_text = this.add.image(960, 404.5, "no_matches_text").setDepth(42);
        this.go_back_button = this.add.image(960, 763, "go_back_button").setDepth(43);

        this.error_bg.setVisible(false);
        this.no_matches_text.setVisible(false);
        this.go_back_button.setFrame(1);
        this.go_back_button.setVisible(false);

        this.pressOptionSound = this.sound.add("press_button");
        if (game.options.currentSong != undefined){
            game.options.currentSong.stop();
        }
        game.options.currentSong = this.sound.add("wind_effect");

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_searching";
        game.options.currentSong.play({ volume: game.options.musicVol, loop: true });

        // Idle timer
        that.time.addEvent({
            delay: 10000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

        // Search game
        game.global.socket.send(JSON.stringify({ event: "SEARCHING_GAME", playerType: game.mPlayer.characterSel.type, skill: game.mPlayer.skillSel, level: game.mPlayer.difficultySel }));

        this.input.on('pointerup', function () {
            that.backBtn.setFrame(0);
        });

        // Botón de volver
        this.backBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.backBtn.setFrame(1);
            if (game.global.DEBUG_MODE) {
                console.log("Back pulsado");
            }
        });
        this.backBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            game.options.currentSong.stop();
            that.backBtn.setFrame(0);
            that.input.keyboard.removeAllKeys(true);
            game.global.socket.send(JSON.stringify({ event: "CANCEL_QUEUE", level: game.mPlayer.difficultySel }));
            if (game.global.DEBUG_MODE) {
                console.log("Back soltado");
            }
        });
        // Desktop
        if (game.global.DEVICE === "desktop") {
            this.add.image(62, 28.86, "escape_text")
                .setDepth(32);
            this.backBtn.setFrame(1);
            this.input.keyboard.on("keydown-" + "ESC", function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                game.options.currentSong.stop();
                that.input.keyboard.removeAllKeys(true);
                game.global.socket.send(JSON.stringify({ event: "CANCEL_QUEUE", level: game.mPlayer.difficultySel }));
            });
        }

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

        var tween = this.tweens.add({
            targets: that.rotatingIcon,
            angle: 360,
            duration: 5000,
            repeat: -1
        });
    } // Fin create

    update() {
        this.stars.tilePositionX += 0.2;
        this.stars.tilePositionY += 0.4;
    } // Fin update

    FullError() {
        this.input.keyboard.removeAllKeys(true);
        this.error_bg.setVisible(true);
        this.no_matches_text.setVisible(true);
        this.go_back_button.setVisible(true);
        this.errorMessage = true;
    }

    SetConnectedUsersText(value)
    {
        this.connectedUsersText = this.add.text(1430, 1030, "Users connected: " + value, { fontFamily: 'font_Write' })
        .setOrigin(0, 0.5).setDepth(7).setFontSize(36);
    }
}