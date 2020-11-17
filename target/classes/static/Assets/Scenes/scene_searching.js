class Scene_Searching extends Phaser.Scene {

    constructor() {
        super({ key: "scene_searching" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_nebula")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_stars")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        this.add.image(game.config.width / 2, game.config.height / 2, "searching_back_triangle")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Personaje
        var characterImage = this.add.image(RelativeScale(480, "x"), RelativeScale(540, "y"), "splashart_" + game.mPlayer.characterSel.type)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        switch (game.mPlayer.characterSel.type) {
            case "bard":
                characterImage.setScale(RelativeScale(1.4, "x"), RelativeScale(1.4, "y"));
                characterImage.y = RelativeScale(500, "y");
                break;
            case "wizard":
                characterImage.x = RelativeScale(500, "x");
                characterImage.y = RelativeScale(600, "y");
                characterImage.setScale(RelativeScale(1.25, "x"), RelativeScale(1.25, "y"));
                characterImage.setFlip(true);
                break;
            case "rogue":
                characterImage.setScale(RelativeScale(1.5, "x"), RelativeScale(1.5, "y"));
                characterImage.setFlip(true);
                characterImage.y = RelativeScale(740, "y");
                break;
            case "berserker":
                characterImage.setScale(RelativeScale(1.4, "x"), RelativeScale(1.4, "y"));
                break;
        }

        this.add.image(game.config.width / 2, game.config.height / 2, "searching_front_triangle")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.tipImage = this.add.image(RelativeScale(1600.91, "x"), RelativeScale(881.41, "y"), "searching_tips_text")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Tip random
        var randomTip = Math.floor(Math.random() * 10);
        this.tipImage.setFrame(randomTip);

        // Back button
        this.add.image(RelativeScale(114.50, "x"), RelativeScale(112.0, "y"), "back_button_interface")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(30);
        this.backBtn = this.add.image(RelativeScale(66.0, "x"), RelativeScale(78.5, "y"), "back_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(31);

        // Error message
        this.error_bg = this.add.image(0, 0, "error_bg").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(41);
        this.no_matches_text = this.add.image(RelativeScale(960, "x"), RelativeScale(404.5, "Y"), "no_matches_text").setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(42);
        this.go_back_button = this.add.image(RelativeScale(960, "x"), RelativeScale(763, "Y"), "go_back_button").setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(43);

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
            this.add.image(RelativeScale(62,"x"), RelativeScale(28.86,"y"), "escape_text")
                .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(32);
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
    } // Fin create

    update() {
        this.stars.tilePositionX += RelativeScale(0.2, "x");
        this.stars.tilePositionY += RelativeScale(0.4, "y");
    } // Fin update

    FullError() {
        that.input.keyboard.removeAllKeys(true);
        this.error_bg.setVisible(true);
        this.no_matches_text.setVisible(true);
        this.go_back_button.setVisible(true);
        this.errorMessage = true;
    }
}