class Scene_Credits extends Phaser.Scene {

    constructor() {
        super({ key: "scene_credits" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple_bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars")
            .setOrigin(0, 0);
        this.add.image(0, 0, "credits_dust").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.images = this.add.image(0, 0, "credits_images").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.images.setAlpha(0);
        this.add.image(RelativeScale(114.50, "x"), RelativeScale(112.0, "y"), "back_button_interface")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.backBtn = this.add.image(RelativeScale(66.0, "x"), RelativeScale(78.5, "y"), "back_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.backBtn.setFrame(1);

        this.currentImage = 0;

        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");

        if (game.options.currentSong != undefined){
            if (game.options.currentSong.key != "winning_and_credits_music"){
                game.options.currentSong.stop();
                game.options.currentSong = this.sound.add("winning_and_credits_music");
                game.options.currentSong.play({ volume: game.options.musicVol, loop: true});
            }
        }else {
            game.options.currentSong = this.sound.add("winning_and_credits_music");
            game.options.currentSong.play({ volume: game.options.musicVol, loop: true});
        }
    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_credits";

        // Idle timer
        that.time.addEvent({
            delay: 10000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

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
            that.backBtn.setFrame(0);
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_main_menu");
            if (game.global.DEBUG_MODE) {
                console.log("Back soltado");
            }
        });
        if (game.global.DEVICE === "desktop") {
            this.add.image(RelativeScale(62,"x"), RelativeScale(28.86,"y"), "escape_text")
                .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(2);
            this.input.keyboard.on("keydown-" + "ESC", function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_main_menu");
            });
        }

        this.ShowImage();
    } // Fin create

    update() {
        this.stars.tilePositionX += RelativeScale(0.2, "x");
        this.stars.tilePositionY += RelativeScale(0.4, "y");
    } // Fin update

    FinalImage() {
        var that = this;
        var tween = this.tweens.add({
            targets: that.images,
            alpha: 1,
            duration: 2000,
            repeat: 0,
            ease: 'Sine.easeInOut',
        });
    }

    ShowImage() {
        var that = this;
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
                } else {
                    that.FinalImage();
                }
            }
        });
    }

}// Fin Scene_Credits