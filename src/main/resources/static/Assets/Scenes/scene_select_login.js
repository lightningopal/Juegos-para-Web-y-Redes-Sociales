class Scene_Select_Login extends Phaser.Scene {

    constructor() {
        super({ key: "scene_select_login" });
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple_bg").setOrigin(0, 0);
        this.stars = this.add.tileSprite(0, 0, 1920, 1080, "stars")
            .setOrigin(0, 0);
        this.add.image(943.50, 332.0, "main_menu_logo");

        this.logInBtn = this.add.image(480.16, 725.0, "log_in_button");
        this.logInBtn.setFrame(1);
        this.signUpBtn = this.add.image(1440.0, 725.0, "sign_up_button");

        this.add.image(960, 920.0, "warning_text");

        // Opciones de selección
        this.optionSelected; // 0 -> LogIn / 1 -> SignUp

        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_select_login";

        // Fade in
        this.cam = this.cameras.main;
        this.cam.fadeIn(300);

        // Idle timer
        that.time.addEvent({
            delay: 2000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

        this.optionSelected = 0;
        this.logInBtn.setFrame(1);
        this.input.on('pointerup', function () {
            that.optionSelected = -1;
            that.logInBtn.setFrame(0);
            that.signUpBtn.setFrame(0);
        });

        this.logInBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.optionSelected = 0;
            that.logInBtn.setFrame(1);
            that.signUpBtn.setFrame(0);
            if (game.global.DEBUG_MODE) {
                console.log("Log In pulsado");
            }
        });
        this.logInBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            if (that.optionSelected == 0) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.game.global.logInOption = that.optionSelected;
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_account");
            }
            if (game.global.DEBUG_MODE) {
                console.log("Log In soltado");
            }
        });

        this.signUpBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.optionSelected = 1;
            that.logInBtn.setFrame(0);
            that.signUpBtn.setFrame(1);
            if (game.global.DEBUG_MODE) {
                console.log("Sign Up pulsado");
            }
        });
        this.signUpBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            if (that.optionSelected == 1) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.game.global.logInOption = that.optionSelected;
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_account");
            }
            if (game.global.DEBUG_MODE) {
                console.log("Sign Up soltado");
            }
        });

        if (game.global.DEVICE === "desktop") { // Ordenador
            // Opciones de selección
            this.input.keyboard.on('keydown-' + 'A', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE) {
                    console.log(that.optionSelected);
                }
            });
            this.input.keyboard.on('keydown-' + 'LEFT', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE) {
                    console.log(that.optionSelected);
                }
            });

            this.input.keyboard.on('keydown-' + 'D', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE) {
                    console.log(that.optionSelected);
                }
            });
            this.input.keyboard.on('keydown-' + 'RIGHT', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelected = (that.optionSelected + 1) % 2;
                that.CheckOption();
                if (game.global.DEBUG_MODE) {
                    console.log(that.optionSelected);
                }
            });

            this.input.keyboard.on('keydown-' + 'ENTER', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.game.global.logInOption = that.optionSelected;
                that.scene.start("scene_account");
            });
            this.input.keyboard.on('keydown-' + 'O', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.game.global.logInOption = that.optionSelected;
                that.scene.start("scene_account");
            });
        }// Fin if Mobile
    } // Fin create

    update() {
        this.stars.tilePositionX += 0.2;
        this.stars.tilePositionY += 0.4;
    } // Fin update

    CheckOption() {
        if (this.optionSelected == 0) {
            this.logInBtn.setFrame(1);
            this.signUpBtn.setFrame(0);
        } else {
            this.logInBtn.setFrame(0);
            this.signUpBtn.setFrame(1);
        }
    }
}