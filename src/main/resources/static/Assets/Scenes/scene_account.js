class Scene_Account extends Phaser.Scene {

    constructor() {
        super({ key: "scene_account" });
    } // Fin constructor

    preload() {
        /*
        this.birds = this.sound.add("birds");
        this.birds.play({
            loop : true,
            delay : 4.87,
            volume: this.vol * 0.1
        });
        this.sound.pauseOnBlur = false;
        */
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple_bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars")
            .setOrigin(0, 0);
        this.add.image(RelativeScale(114.50, "x"), RelativeScale(112.0, "y"), "back_button_interface")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.backBtn = this.add.image(RelativeScale(66.0, "x"), RelativeScale(78.5, "y"), "back_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.backBtn.setFrame(1);

        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");
        this.errorOptionSound = this.sound.add("error_button");

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_account";

        // Idle timer
        that.time.addEvent({
            delay: 10000,
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
            that.backBtn.setFrame(0);
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_select_login");
            if (game.global.DEBUG_MODE) {
                console.log("Back soltado");
            }
        });
        if (game.global.DEVICE === "desktop") {
            this.add.image(RelativeScale(62,"x"), RelativeScale(28.86,"y"), "escape_text")
                .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(2);
            this.input.keyboard.on('keydown-' + 'ESC', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_select_login");
            });
        }// Fin mobile/desktop

        // Formulario
        var element = this.add.dom(RelativeScale((1920 / 2), "x"), RelativeScale((1080 / 2), "y")).createFromCache('nameform');

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'loginButton') {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '') {
                    // Si el número de caracteres del nombre es correcto
                    if (inputUsername.value.length >= 1 && inputUsername.value.length <= 14) {
                        // Si el número de caracteres de la contraseña es correcto
                        if (inputPassword.value.length >= 4 && inputPassword.value.length <= 14) {
                            that.pressOptionSound.play({ volume: game.options.SFXVol });
                            // Turn off the click events
                            this.removeListener('click');

                            // Turn on after 200ms
                            setTimeout(function () {
                                element.addListener('click');
                            }, 200);

                            // Cosas
                            if (game.global.logInOption === 0) { // Mensaje de login
                                game.global.socket.send(JSON.stringify({
                                    event: "LOG_IN", name: inputUsername.value,
                                    password: inputPassword.value
                                }));
                            } else if (game.global.logInOption === 1) { // Mensaje de signup
                                game.global.socket.send(JSON.stringify({
                                    event: "SIGN_UP", name: inputUsername.value,
                                    password: inputPassword.value
                                }));
                            }
                        }
                        // La contraseña tiene más o menos caracteres de los que debe
                        else {
                            that.errorOptionSound.play({ volume: game.options.SFXVol });
                            // Log In
                            if (that.game.global.logInOption == 0) {
                                game.global.feedbackLogin.innerHTML = "Password is incorrect";
                            }
                            // Sign Up
                            else {
                                game.global.feedbackLogin.innerHTML = "Password must have between 4 and 14 characters";
                            }
                        }
                    }
                    // El nombre es demasiado largo
                    else {
                        that.errorOptionSound.play({ volume: game.options.SFXVol });
                        // Log In
                        if (that.game.global.logInOption == 0) {
                            game.global.feedbackLogin.innerHTML = "User doesn't exist";
                        }
                        // Sign Up
                        else {
                            game.global.feedbackLogin.innerHTML = "Username must have less than 14 characters";
                        }
                    }
                }
                else {
                    that.errorOptionSound.play({ volume: game.options.SFXVol });
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: this, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });

        if (that.game.global.logInOption == 1) { // Es un Sign Up
            var buttonSubmit = document.getElementById("submit");
            buttonSubmit.value = "Sign Up";
        }

        // Texto de feedback
        game.global.feedbackLogin = document.getElementById("feedbackText");

        //element.setVisible(false);

    } // Fin create

    update() {
        this.stars.tilePositionX += RelativeScale(0.2, "x");
        this.stars.tilePositionY += RelativeScale(0.4, "y");
    } // Fin update

}