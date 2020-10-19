class Scene_Account extends Phaser.Scene {

    constructor() {
        super({ key: "scene_account" });
    } // Fin constructor

    preload() {
        // Carga de Imágenes
        this.load.image("account-bg", "./Assets/Images/Account-BG.jpg");

        // Teclas
        this.cursors;

        // Opciones de selección
        this.optionSelected;
    } // Fin preload

    create() {
        var that = this;
        //Fondo
        this.background = this.add.image(0, 0, "account-bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Opciones de selección
        this.cursors = this.input.keyboard.addKeys({
            'left': cursors1Keys.left,
            'right': cursors1Keys.right,
            'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
        });

        this.optionSelected = -1;
        this.cursors.right.on('down', function(event){
            that.optionSelected = (that.optionSelected + 1) % 2;
            console.log(that.optionSelected);
            
        });
        this.cursors.left.on('down', function(event){
            that.optionSelected = (that.optionSelected + 1) % 2;
            console.log(that.optionSelected);
        });

        this.cursors.enter.on('down', function(event){
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_main_menu");
        });
    } // Fin create

    update() {
    } // Fin update

}