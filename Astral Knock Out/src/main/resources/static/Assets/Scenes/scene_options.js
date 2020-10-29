class Scene_Options extends Phaser.Scene {
    constructor() {
        super({ key: "scene_options" });
    } // Fin constructor

    preload(){
        var that = this;
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width/2, game.config.height/2, "main_menu_nebula")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width/2, game.config.height/2, "main_menu_stars")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
    }// Fin preload

    create(){
        var that = this;
        var tween = this.tweens.add({
            targets: that.nebula,
            angle: 360,
            duration: 1000000,
            repeat: -1
        });
        var tween = this.tweens.add({
            targets: that.stars,
            angle: 360,
            duration: 1500000,
            repeat: -1
        });
    }// Fin create

    update(){

    }// Fin update
}