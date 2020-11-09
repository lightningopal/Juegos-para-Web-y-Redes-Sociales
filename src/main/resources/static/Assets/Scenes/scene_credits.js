class Scene_Credits extends Phaser.Scene {

    constructor() {
        super({ key: "scene_credits" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "credits_bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Teclas
        this.cursors;
    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_credits";

        // Opciones de selección
        this.cursors = this.input.keyboard.addKeys({
            'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
        });

        this.cursors.escape.on('down', function(event){
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_main_menu");
        });
    } // Fin create

    update() {
    } // Fin update

}// Fin Scene_Credits