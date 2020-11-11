class Scene_Searching extends Phaser.Scene {

    constructor() {
        super({ key: "scene_searching" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width/2, game.config.height/2, "main_menu_nebula")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width/2, game.config.height/2, "main_menu_stars")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        this.add.image(game.config.width/2, game.config.height/2, "searching_back_triangle")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Personaje
        var characterImage = this.add.image(RelativeScale(480,"x"), RelativeScale(540,"y"), "splashart_" + game.mPlayer.characterSel.type)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        switch (game.mPlayer.characterSel.type)
        {
            case "bard":
                characterImage.setScale(RelativeScale(1.4, "x"));
                characterImage.y = RelativeScale(500, "y");
                break;
            case "wizard":
                characterImage.x = RelativeScale(500, "x");
                characterImage.y = RelativeScale(600, "y");
                characterImage.setScale(RelativeScale(1.25, "x"));
                characterImage.setFlip(true);
                break;
            case "rogue":
                characterImage.setScale(RelativeScale(1.5, "x"));
                characterImage.setFlip(true);
                characterImage.y = RelativeScale(740, "y");
                break;
            case "berserker":
                characterImage.setScale(RelativeScale(1.4, "x"));
                break;
        }

        this.add.image(game.config.width/2, game.config.height/2, "searching_front_triangle")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.tipImage = this.add.image(RelativeScale(1600.91,"x"), RelativeScale(881.41,"y"), "searching_tips_text")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
            
        // Tip random
        var randomTip = Math.floor(Math.random() * 10);
        this.tipImage.setFrame(randomTip);

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_searching";

        // Search game
        game.global.socket.send(JSON.stringify({ event: "SEARCHING_GAME", playerType: game.mPlayer.characterSel.type, skill: game.mPlayer.skillSel, level: game.mPlayer.difficultySel }));

        var tween = this.tweens.add({
            targets: that.stars,
            angle: 360,
            duration: 500000,
            repeat: -1
        });
    } // Fin create

    update() {
        this.stars.tilePositionX += RelativeScale(0.2, "x");
        this.stars.tilePositionY += RelativeScale(0.4, "y");
    } // Fin update
}