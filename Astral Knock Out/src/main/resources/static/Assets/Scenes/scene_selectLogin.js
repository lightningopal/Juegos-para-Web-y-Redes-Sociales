class Scene_SelectLogin extends Phaser.Scene {

    constructor() {
        super({ key: "scene_selectLogin"});
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple-bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars")
            .setOrigin(0, 0);

        // Teclas
        this.cursors;

        // Opciones de selección
        this.optionSelected;
    } // Fin preload

    create() {
        var that = this;

        // Opciones de selección
        this.cursors = this.input.keyboard.addKeys({
            'left': game.cursors1Keys.left,
            'right': game.cursors1Keys.right,
            'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
        });

        this.optionSelected = -1;
        this.cursors.right.on('down', function (event) {
            that.optionSelected = (that.optionSelected + 1) % 2;
            console.log(that.optionSelected);

        });
        this.cursors.left.on('down', function (event) {
            that.optionSelected = (that.optionSelected + 1) % 2;
            console.log(that.optionSelected);
        });

        this.cursors.enter.on('down', function (event) {
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_account");
        });

    } // Fin create

    update() {
        this.stars.tilePositionX += RelativeScale(0.2, "x");
        this.stars.tilePositionY += RelativeScale(0.4, "y");

        //console.log(this);
    } // Fin update

}