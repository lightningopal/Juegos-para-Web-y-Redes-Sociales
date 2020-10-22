class Scene_Ranking extends Phaser.Scene {

    constructor() {
        super({ key: "scene_ranking" });
    } // Fin constructor

    preload() {
        // Carga de Imágenes
        this.load.image("ranking-bg", "./Assets/Images/Tests/test_bg/Ranking-BG.jpg");

        // Teclas
        this.cursors;
    } // Fin preload

    create() {
        var that = this;
        //Fondo
        this.background = this.add.image(0, 0, "ranking-bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

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

}