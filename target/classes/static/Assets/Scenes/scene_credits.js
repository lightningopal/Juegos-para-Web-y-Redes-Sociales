class Scene_Credits extends Phaser.Scene {

    constructor() {
        super({ key: "scene_credits" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple_bg").setOrigin(0, 0);
        this.stars = this.add.tileSprite(0, 0, 1920, 1080, "stars")
            .setOrigin(0, 0);
        this.add.image(0, 0, "credits_dust").setOrigin(0, 0);
        this.images = [
            this.add.image(0, 0, "credits_image_1").setOrigin(0, 0).setAlpha(0),
            this.add.image(0, 0, "credits_image_2").setOrigin(0, 0).setAlpha(0),
            this.add.image(0, 0, "credits_image_3").setOrigin(0, 0).setAlpha(0)
        ]

        this.add.image(114.50, 112.0, "back_button_interface");
        this.backBtn = this.add.image(66.0, 78.5, "back_button");
        this.backBtn.setFrame(1);

        this.currentFrame = 0;
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
            delay: 2000,
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
            this.add.image(62, 28.86, "escape_text").setDepth(2);
            this.input.keyboard.on("keydown-" + "ESC", function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_main_menu");
            });
        }

        this.ShowImages();
    } // Fin create

    update() {
        this.stars.tilePositionX += 0.2;
        this.stars.tilePositionY += 0.4;
    } // Fin update

    FinalImage() {
        var that = this;
        var tween = this.tweens.add({
            targets: that.images[that.currentImage],
            alpha: 1,
            duration: 2000,
            repeat: 0,
            ease: 'Sine.easeInOut',
        });
    }

    ShowImages(){
        var that = this;
        var tween = this.tweens.add({
            targets: that.images[that.currentImage],
            alpha: 1,
            duration: 2000,
            repeat: 0,
            ease: 'Sine.easeInOut',
            yoyo: true,
            hold: 1500,
            onComplete: function () {
                that.currentFrame++;
                if (that.currentImage == 2 && that.currentFrame == 1) {
                    that.images[that.currentImage].setFrame(that.currentFrame);
                    that.FinalImage();
                } else if (that.currentFrame == 1){
                    that.images[that.currentImage].setFrame(that.currentFrame);
                    that.ShowImages();
                } else {
                    that.currentFrame = 0;
                    that.ChangeImage();
                }
            }
        });
    }

    ChangeImage(){
        this.currentImage++;
        if (this.currentImage <= 2){
            this.ShowImages();
        }else{
            this.FinalImage();
        }
    }

}// Fin Scene_Credits