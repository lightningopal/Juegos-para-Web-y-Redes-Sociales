class Scene_Ranking extends Phaser.Scene {

    constructor() {
        super({ key: "scene_ranking" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple_bg").setOrigin(0, 0);
        this.stars = this.add.tileSprite(0, 0, 1920, 1080, "stars")
            .setOrigin(0, 0).setDepth(5);

        this.add.image(0, 0, "ranking_interface").setOrigin(0, 0);

        this.backBtn = this.add.image(66.0, 78.5, "back_button").setDepth(1);

        // Textos
        // Propio Ranking
        var rankingNameTexts = [];
        var rankingWinsLosesTexts = [];
        var rankingPointsTexts = [];

        for (var i = 0; i < game.global.ranking.length - 1; i++) {
            if (game.global.ranking[i].userName != "") {
                var winsLosesString = game.global.ranking[i].winsCount + " / " + game.global.ranking[i].losesCount;

                rankingNameTexts[i] = this.add.text(220, 398 + (66 * i), game.global.ranking[i].userName, { fontFamily: 'font_Write' }).setFontSize(40);
                rankingWinsLosesTexts[i] = this.add.text(660, 398 + (66 * i), winsLosesString, { fontFamily: 'font_Write' }).setOrigin(0.5, 0).setFontSize(34);
                rankingPointsTexts[i] = this.add.text(940, 398 + (66 * i), game.global.ranking[i].points, { fontFamily: 'font_Write' }).setOrigin(0.5, 0).setFontSize(40);
            }
            else {
                break;
            }
        }

        // Usuario
        var winsLosesStringUser = game.global.ranking[10].winsCount + " / " + game.global.ranking[10].losesCount;

        rankingNameTexts[10] = this.add.text(1540, 680, game.global.ranking[10].userName, { fontFamily: 'font_Write' }).setFontSize(40);
        rankingWinsLosesTexts[10] = this.add.text(1540, 795, winsLosesStringUser, { fontFamily: 'font_Write' }).setFontSize(40);
        rankingPointsTexts[10] = this.add.text(1540, 900, game.global.ranking[10].points, { fontFamily: 'font_Write' }).setFontSize(40);

        this.pressOptionSound = this.sound.add("press_button");
    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_ranking";

        // Idle timer
        that.time.addEvent({
            delay: 2000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

        this.input.on('pointerup', function () {
            that.backBtn.setFrame(0);
        });
        this.backBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.backBtn.setFrame(1);
            if (game.global.DEBUG_MODE) {
                console.log("Back pulsado");
            }
        });
        this.backBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.backBtn.setFrame(0);
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_main_menu");
            if (game.global.DEBUG_MODE) {
                console.log("Back soltado");
            }
        });
        if (game.global.DEVICE === "desktop") {
            this.add.image(62, 28.86, "escape_text") .setDepth(2);
            this.backBtn.setFrame(1);

            // Opciones de selección
            this.input.keyboard.on('keydown-' + 'ESC', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_main_menu");
            });
        }
    } // Fin create

    update() {
        this.stars.tilePositionX += 0.2;
        this.stars.tilePositionY += 0.4;
    } // Fin update

}// Fin Scene_Ranking