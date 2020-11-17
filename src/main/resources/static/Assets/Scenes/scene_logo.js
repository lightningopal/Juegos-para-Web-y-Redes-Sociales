class Scene_Logo extends Phaser.Scene {

    constructor() {
        super({ key: "scene_logo" });
    } // Fin constructor

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_logo";

        this.game.events.on('hidden',function(){
            video.setPaused(true);
        },this);
       
        this.game.events.on('visible',function(){
            video.setPaused(false);
        },this);

        var video = this.add.video(0, 0, "logo_video").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        video.play();

        video.on('complete', function(video){
            that.scene.start("scene_select_login");
            that.game.events.off('hidden');
            that.game.events.off('visible');
        });
    } // Fin create
}