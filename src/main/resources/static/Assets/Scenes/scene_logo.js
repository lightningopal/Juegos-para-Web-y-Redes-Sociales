class Scene_Logo extends Phaser.Scene {

    constructor() {
        super({ key: "scene_logo" });
    } // Fin constructor

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_logo";

        var video = this.add.video(0, 0, "logo_video").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        video.play();

        video.on('complete', function(video){
            that.scene.start("scene_select_login");
        });

    } // Fin create
}