var thisScene;
class Scene_Intro extends Phaser.Scene {

    constructor() {
        super({ key: "scene_intro" });
    } // Fin constructor

    preload() {
        var that = this;
        thisScene = this;

        // Background
        this.simple_bg = this.add.image(0, 0, "simple_bg").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(0, 0, "stars").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.add.image(0, 0, "credits_dust").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Intro images
        this.intro_image1 = this.add.image(0, 0, "intro1").setOrigin(0, 0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(1);

        this.intro_image2 = this.add.image(0, 0, "intro2").setOrigin(0, 0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setAlpha(0).setDepth(1);

        this.intro_image3 = this.add.image(0, 0, "intro3").setOrigin(0, 0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setAlpha(0).setDepth(1);

        // Skip intro
        this.enterText;
        this.enterBtn = this.add.image(RelativeScale(1810.0, "x"), RelativeScale(80.0, "y"), "enter_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(2);

        // Audio
        this.pressOptionSound = this.sound.add("press_button");

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        thisScene = this;
        game.global.actualScene = "scene_intro";

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
            this.enterText = this.add.image(RelativeScale(1350.0, "x"), RelativeScale(80.0, "y"), "continue_text_mobile")
                .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(1);
        }

        // Ratón y táctil
        this.enterBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_main_menu");
        });

        // Escritorio
        if (game.global.DEVICE === "desktop") {
            this.enterText = this.add.image(RelativeScale(1350.0, "x"), RelativeScale(80.0, "y"), "continue_text_desktop")
                .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(1);

            this.input.keyboard.on('keydown-'+'ENTER', function (event) {
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
        that.scene.start("scene_main_menu");
    }
}