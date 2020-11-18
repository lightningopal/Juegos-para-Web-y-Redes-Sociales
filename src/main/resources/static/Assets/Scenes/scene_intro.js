var thisScene;
class Scene_Intro extends Phaser.Scene {

    constructor() {
        super({ key: "scene_intro" });
    } // Fin constructor

    preload() {
        var that = this;
        thisScene = this;

        // Background
        this.simple_bg = this.add.image(0, 0, "simple_bg").setOrigin(0, 0);
        this.stars = this.add.image(0, 0, "stars").setOrigin(0, 0);
        this.add.image(0, 0, "credits_dust").setOrigin(0, 0);

        // Intro images
        this.intro_image1 = this.add.image(0, 0, "intro1").setOrigin(0, 0).setDepth(1);

        this.intro_image2 = this.add.image(0, 0, "intro2").setOrigin(0, 0).setAlpha(0).setDepth(1);

        this.intro_image3 = this.add.image(0, 0, "intro3").setOrigin(0, 0).setAlpha(0).setDepth(1);

        // Skip intro
        this.enterText;
        this.enterBtn = this.add.image(1810.0, 80.0, "enter_button").setDepth(2);

        // Audio
        this.pressOptionSound = this.sound.add("press_button");
        game.options.currentSong = this.sound.add("lait_motiv");
        game.options.currentSong.play({volume: game.options.musicVol, loop: true});

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        thisScene = this;
        game.global.actualScene = "scene_intro";

        // Fade in
        this.cam = this.cameras.main;
        this.cam.fadeIn(300);

        // Idle timer
        that.time.addEvent({
            delay: 2000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

        // Timer for intro 1-2
        that.time.addEvent({
            delay: 10000,
            callback: that.ChangeIntroImage2,
        });

        // Timer for intro 2-3
        that.time.addEvent({
            delay: 20600, //(10000 + 10000 + 600)
            callback: that.ChangeIntroImage3,
        });

        // Timer for go main menu
        that.time.addEvent({
            delay: 29200, //(20600 + 8000 + 600)
            callback: that.EndIntro,
        });

        // Móvil
        if (game.global.DEVICE === "mobile" || game.global.DEBUG_PHONE) {
            this.enterText = this.add.image(1350.0, 80.0, "tap_continue_text_mobile").setDepth(1);
        }

        // Ratón y táctil
        this.enterBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_main_menu");
        });

        // Escritorio
        if (game.global.DEVICE === "desktop") {
            this.enterText = this.add.image(1350.0, 80.0, "continue_text_desktop")
                .setDepth(1);

            this.input.keyboard.on('keydown-'+'ENTER', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_main_menu");
            });
            this.input.keyboard.on('keydown-'+'O', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_main_menu");
            });
        }

    } // Fin create

    ChangeIntroImage2()
    {
        var that = thisScene;

        var tween = that.tweens.add({
            targets: that.intro_image1,
            alpha: 0,
            duration: 300,
            repeat: 0,
        });

        var tween = that.tweens.add({
            targets: that.intro_image2,
            alpha: 1,
            delay: 300,
            duration: 300,
            repeat: 0,
        });
    }

    ChangeIntroImage3()
    {
        var that = thisScene;

        var tween = that.tweens.add({
            targets: that.intro_image2,
            alpha: 0,
            duration: 300,
            repeat: 0,
        });

        var tween = that.tweens.add({
            targets: that.intro_image3,
            alpha: 1,
            delay: 300,
            duration: 300,
            repeat: 0,
        });
    }

    EndIntro()
    {
        var that = thisScene;
        that.input.keyboard.removeAllKeys(true);
        // Cambia de escena a la nueva
        that.scene.get("scene_boot").FadeTransition("scene_main_menu");
    }

    ChangeToScene(newScene)
    {
        this.scene.get(game.global.actualScene).scene.start(newScene);
    }
}