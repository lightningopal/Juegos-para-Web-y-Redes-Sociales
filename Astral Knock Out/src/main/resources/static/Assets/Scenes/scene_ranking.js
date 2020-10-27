class Scene_Ranking extends Phaser.Scene {

    constructor() {
        super({ key: "scene_ranking" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "ranking-bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Teclas
        this.cursors;
    } // Fin preload

    create() {
        var that = this;

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

}// Fin Scene_Ranking