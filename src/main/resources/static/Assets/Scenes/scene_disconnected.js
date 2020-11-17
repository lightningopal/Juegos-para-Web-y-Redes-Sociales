class Scene_Disconnected extends Phaser.Scene {

    constructor() {
        super({ key: "scene_disconnected" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple_bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars")
            .setOrigin(0, 0);
        this.add.image(RelativeScale(966, "x"), RelativeScale(480.3, "y"), "disconnected_text")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        this.retryButton = this.add.image(RelativeScale(960.5, "x"), RelativeScale(709.5, "y"), "retry_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.retryButton.setFrame(1);

        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_disconnected";

        // Idle timer
        that.time.addEvent({
            delay: 10000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

        this.retryButton.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.retryButton.setFrame(1);
            if (game.global.DEBUG_MODE) {
                console.log("Retry pulsado");
            }
        });
        this.retryButton.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.scene.start("scene_boot");

            if (game.global.DEBUG_MODE) {
                console.log("Vuelve a intentarlo");
            }
        });

        if (game.global.DEVICE === "desktop") { // Ordenador
            this.input.keyboard.on('keydown-' + 'ENTER', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_boot");
            });
        }// Fin if Mobile
    } // Fin create

    update() {
        this.stars.tilePositionX += RelativeScale(0.2, "x");
        this.stars.tilePositionY += RelativeScale(0.4, "y");
    } // Fin update
}