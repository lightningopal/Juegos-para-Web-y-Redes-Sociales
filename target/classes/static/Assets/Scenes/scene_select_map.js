class Scene_Select_Map extends Phaser.Scene {

    constructor() {
        super({ key: "scene_select_map" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_nebula")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_stars")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        this.add.image(RelativeScale(114.50, "x"), RelativeScale(112.0, "y"), "back_button_interface")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(5);
        this.backBtn = this.add.image(RelativeScale(66.0, "x"), RelativeScale(63.5, "y"), "back_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(5);

        this.add.image(RelativeScale(957.50, "x"), RelativeScale(153.16, "y"), "select_map_text").setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.mapButton0 = this.add.image(RelativeScale(467.5, "x"), RelativeScale(530.5, "y"), "map_button0").setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.mapButton0.setFrame(1);
        this.mapButton1 = this.add.image(RelativeScale(1415, "x"), RelativeScale(523, "y"), "map_button1").setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.mapButton1.setFrame(0);

        this.enterBtn = this.add.image(RelativeScale(1810.0, "x"), RelativeScale(1000.0, "y"), "enter_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(2);
        this.enterText;

        // Opciones de selección
        game.mPlayer.difficultySel = -1;
        this.return = false;
        this.optionSelected = 0; // 0 -> Mapa 0 / 1 -> Mapa 1
        this.alreadySelected = false;

        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");
        this.errorOptionSound = this.sound.add("error_button");

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_select_map";

        // Idle timer
        that.time.addEvent({
            delay: 10000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

        this.input.on('pointerup', function () {
            that.return = false;
            that.backBtn.setFrame(0);
        });
        // Botón atrás
        this.backBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            // that.backBtn.setFrame(1);
            that.return = true;
            that.CheckOption();
            if (game.global.DEBUG_MODE) {
                console.log("Back pulsado");
            }
        });
        this.backBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.backBtn.setFrame(0);
            that.scene.start("scene_select_character");
            if (game.global.DEBUG_MODE) {
                console.log("Back soltado");
            }
        });
        // Primer mapa
        this.mapButton0.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.mapButton0.setFrame(1);
            that.mapButton1.setFrame(0);
            game.mPlayer.difficultySel = 0;
            if (game.global.DEBUG_MODE) {
                console.log("Mapa 1 pulsado");
            }
        });
        this.mapButton0.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            // that.mapButton0.setFrame(0);
            // that.scene.start("scene_searching");
            if (game.global.DEBUG_MODE) {
                console.log("Mapa 1 soltado");
            }
        });
        // Segundo mapa
        this.mapButton1.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.mapButton0.setFrame(0);
            that.mapButton1.setFrame(1);
            game.mPlayer.difficultySel = 1;
            if (game.global.DEBUG_MODE) {
                console.log("Mapa 2 pulsado");
            }
        });
        this.mapButton1.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            // that.mapButton1.setFrame(0);
            // that.scene.start("scene_searching");
            if (game.global.DEBUG_MODE) {
                console.log("Mapa 2 soltado");
            }
        });
        this.enterBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            if (game.mPlayer.difficultySel == 0 || game.mPlayer.difficultySel == 1){
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.scene.start("scene_searching");
            }
        });

        // Mobile
        if (game.global.DEVICE === "mobile" || game.global.DEBUG_PHONE) {
            this.enterText = this.add.image(RelativeScale(1650.0, "x"), RelativeScale(910.0, "y"), "continue_text_mobile")
                .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(1);
            that.mapButton0.setFrame(0);

            // Desktop
        } else {
            this.enterText = this.add.image(RelativeScale(1350.0, "x"), RelativeScale(1000.0, "y"), "continue_text_desktop")
                .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(1);
            this.backBtn.setFrame(0);
            game.mPlayer.difficultySel = 0;

            // Opciones de selección
            this.input.keyboard.on('keydown-' + 'A', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                if (!that.return && !that.alreadySelected) {
                    that.optionSelected = (that.optionSelected + 1) % 2;
                    that.CheckOption();
                    if (game.global.DEBUG_MODE) {
                        console.log(that.optionSelected);
                    }
                }
            });
            this.input.keyboard.on('keydown-' + 'D', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                if (!that.return && !that.alreadySelected) {
                    that.optionSelected = (that.optionSelected + 1) % 2;
                    that.CheckOption();
                    if (game.global.DEBUG_MODE) {
                        console.log(that.optionSelected);
                    }
                }
            });
            this.input.keyboard.on('keydown-'+'W', function(event){
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.return = !that.return;
                that.CheckOption();
            });
            this.input.keyboard.on('keydown-'+'S', function(event){
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.return = false;
                that.CheckOption();
            });

            this.input.keyboard.on('keydown-' + 'ESC', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                if (!that.alreadySelected){
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_select_character");
                }else{
                    that.alreadySelected = false;
                }
                
            });

            this.input.keyboard.on('keydown-' + 'ENTER', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                if (!that.return){
                    if (!that.alreadySelected) {
                        that.enterText.setVisible(true);
                        that.alreadySelected = true;
                    }else {
                        that.input.keyboard.removeAllKeys(true);
                        game.mPlayer.difficultySel = that.optionSelected;
                        that.scene.start("scene_searching");
                    }
                }else{
                    if (!that.alreadySelected){
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_select_character");
                    }else{
                        that.enterText.setVisible(false);
                        that.alreadySelected = false;
                    }
                }
            });
        }

        var tween = this.tweens.add({
            targets: that.nebula,
            angle: 360,
            duration: 250000,
            repeat: -1
        });
        var tween = this.tweens.add({
            targets: that.stars,
            angle: 360,
            duration: 500000,
            repeat: -1
        });
    } // Fin create

    update() {

    } // Fin update

    CheckOption() {
        if (this.return){
            this.backBtn.setFrame(1);
        }else{
            this.backBtn.setFrame(0);
            if (this.optionSelected == 0) {
                this.mapButton0.setFrame(1);
                this.mapButton1.setFrame(0);
            } else {
                this.mapButton0.setFrame(0);
                this.mapButton1.setFrame(1);
            }
        }
    }

}// Fin Scene_Ranking