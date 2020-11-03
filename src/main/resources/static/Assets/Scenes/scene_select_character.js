class Scene_Select_Character extends Phaser.Scene {

    constructor() {
        super({ key: "scene_select_character" });
    }// Fin constructor

    preload() {
        // Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_nebula")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width / 2, game.config.height / 2, "main_menu_stars")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Personajes
        this.availableChars = [[{ char: "berserker", purchased: false, available: true }, { char: "wizard", purchased: false, available: true },
        { char: "bard", purchased: false, available: true }],
        [{ char: "rogue", purchased: false, available: true }, { char: "character", purchased: false, available: false }]];
        if (game.mPlayer.availableChar[0] == "berserker") { // Si tiene disponible el berserker
            // this.berserkerBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "berserker_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
            this.availableChars[0][0].purchased = true;
        } else { // Si no
            // this.berserkerBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "purchase_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        }
        // this.berserkerBtn.setFrame(1);

        if (game.mPlayer.availableChar[1] == "wizard") { // Si tiene disponible el mago
            // this.wizardBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "wizard_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
            this.availableChars[0][1].purchased = true;
        } else { // Si no
            // this.wizardBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "purchase_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        }

        if (game.mPlayer.availableChar[2] == "bard") { // Si tiene disponible el bardo
            // this.bardBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "bard_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
            this.availableChars[0][2].purchased = true;
        } else { // Si no
            // this.bardBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "purchase_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        }

        if (game.mPlayer.availableChar[3] == "rogue") { // Si tiene disponible el bardo
            // this.rogueBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "rogue_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
            this.availableChars[1][0].purchased = true;
        } else { // Si no
            // this.rogueBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "purchase_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        }

        if (game.mPlayer.availableChar[4] == "character") { // Si tiene disponible el personaje extra
            // this.blockedBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "blocked_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        } else { // Si no
            // this.blockedBtn = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "blocked_button")
            //     .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        }

        // Skins


        this.backBtn = this.add.image(RelativeScale(66.0, "x"), RelativeScale(63.5, "y"), "back_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        // Teclas
        this.cursors;
        // Selectores
        this.characterSelectedRow;
        this.characterSelectedCol;
        this.skinSelectedRow;
        this.skinSelectedCol;

        this.selectingCharacter;
        this.selectingSkin;
        this.selectingSkill;
        this.selectingMap;
    }// Fin preload

    create() {
        var that = this;
        // Movimiento del fondo
        var tween = this.tweens.add({
            targets: that.nebula,
            angle: 360,
            duration: 500000,
            repeat: -1
        });
        var tween = this.tweens.add({
            targets: that.stars,
            angle: 360,
            duration: 500000,
            repeat: -1
        });


        // Selectores
        this.selectingCharacter = true;
        this.selectingSkin = false;
        this.selectingSkill = false;
        this.selectingMap = false;

        this.characterSelectedRow = 0;
        this.characterSelectedCol = 0;
        this.skinSelectedRow = 0;
        this.skinSelectedCol = 0;

        if (game.global.DEVICE === "mobile" || game.global.DEBUG_PHONE) {

            this.input.on('pointerup', function () {
                that.backBtn.setFrame(0);
            });

            // Botón de volver
            this.backBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                that.backBtn.setFrame(1);
                if (game.global.DEBUG_MODE) {
                    console.log("Back pulsado");
                }
            });
            this.backBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
                that.backBtn.setFrame(0);
                that.scene.start("scene_main_menu");
                if (game.global.DEBUG_MODE) {
                    console.log("Back soltado");
                }
            });
        } else if (game.global.DEVICE === "desktop") {
            // Opciones de selección
            this.cursors = this.input.keyboard.addKeys({
                'left': game.cursors1Keys.left,
                'right': game.cursors1Keys.right,
                'up': game.cursors1Keys.jump,
                'down': game.cursors1Keys.fall,
                'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
                'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
            });

            this.cursors.escape.on("down", function (event) {
                if (that.selectingCharacter) { // Seleccionando personaje
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_main_menu");
                } else if (that.selectingSkin) { // Seleccionando skin
                    that.selectingSkin = false;
                    game.mPlayer.skinSel = -1;
                    that.skinSelectedRow = 0;
                    that.skinSelectedCol = 0;
                    game.mPlayer.characterSel.type = undefined;
                    game.mPlayer.characterSel.id = -1;
                    that.selectingCharacter = true;
                }
            });

            this.cursors.down.on("down", function (event) {
                if (that.selectingCharacter) { // Seleccionando personaje
                    that.characterSelectedRow = (that.characterSelectedRow + 1) % 2;
                    that.CheckCharacter();
                    if (game.global.DEBUG_MODE) {
                        console.log("fila: " + that.characterSelectedRow);
                    }
                } else if (that.selectingSkin) { // Seleccionando skin
                    if (that.skinSelectedRow == -1) {
                        that.skinSelectedRow = 0;
                        that.CheckSkin();
                        if (game.global.DEBUG_MODE) {
                            console.log("fila: " + that.skinSelectedRow);
                        }
                    }
                }
            });
            this.cursors.up.on("down", function (event) {
                if (that.selectingCharacter) { // Seleccionando personaje
                    if (that.characterSelectedRow == -1) {
                        that.characterSelectedRow = 1;
                    } else {
                        that.characterSelectedRow = (that.characterSelectedRow - 1) % 2
                    }
                    that.CheckCharacter();
                    if (game.global.DEBUG_MODE) {
                        console.log("fila: " + that.characterSelectedRow);
                    }
                } else if (that.selectingSkin) { // Seleccionando skin
                    if (that.skinSelectedRow == -1) {
                        that.skinSelectedRow = 0;
                    } else {
                        that.skinSelectedRow -= 1;
                    }
                    that.CheckSkin();
                    if (game.global.DEBUG_MODE) {
                        console.log("fila: " + that.skinSelectedRow);
                    }
                }
            });

            this.cursors.right.on("down", function (event) {
                if (that.selectingCharacter) { // Seleccionando personaje
                    if (that.characterSelectedRow != -1) {
                        that.characterSelectedCol = (that.characterSelectedCol + 1) % 3;
                        that.CheckCharacter();
                        if (game.global.DEBUG_MODE) {
                            console.log("columna: " + that.characterSelectedCol);
                        }
                    }
                } else if (that.selectingSkin) { // Seleccionando skin
                    if (that.skinSelectedRow == 0) {
                        that.skinSelectedCol = (that.skinSelectedCol + 1) % game.mPlayer.availableSkins[game.mPlayer.characterSel.id].length;
                        that.CheckSkin();
                        if (game.global.DEBUG_MODE) {
                            console.log("columna: " + that.skinSelectedCol);
                        }
                    }
                }
            });
            this.cursors.left.on("down", function (event) {
                if (that.selectingCharacter) { // Seleccionando personaje
                    if (that.characterSelectedRow != -1) {
                        if (that.characterSelectedCol === 0) {
                            that.characterSelectedCol = 2;
                        } else {
                            that.characterSelectedCol = (that.characterSelectedCol - 1) % 3
                        }
                        that.CheckCharacter();
                        if (game.global.DEBUG_MODE) {
                            console.log("columna: " + that.characterSelectedCol);
                        }
                    }
                } else if (that.selectingSkin) { // Seleccionando skin
                    if (that.skinSelectedRow == 0) {
                        if (that.skinSelectedCol == 0) {
                            that.skinSelectedCol = game.mPlayer.availableSkins[game.mPlayer.characterSel.id].length - 1;
                        } else {
                            that.skinSelectedCol = (that.skinSelectedCol - 1) % game.mPlayer.availableSkins[game.mPlayer.characterSel.id].length;
                        }
                        that.CheckSkin();
                        if (game.global.DEBUG_MODE) {
                            console.log("columna: " + that.skinSelectedCol);
                        }
                    }
                }
            });

            this.cursors.enter.on("down", function (event) {
                if (that.selectingCharacter) { // Seleccionando personaje
                    that.SelectCharacter();
                } else if (that.selectingSkin) { // Seleccionando skin
                    that.SelectSkin();
                }
            });
        }// Fin mobile/desktop

    }// Fin create

    upload() {

    }// Fin upload

    // Mostrar los sprites adecuados de los personajes
    CheckCharacter() {
        switch (this.characterSelectedRow) {
            case -1:
                this.backBtn.setFrame(1);
                // this.berserkerBtn.setFrame(0);
                // this.wizardBtn.setFrame(0);
                // this.bardBtn.setFrame(0);
                // this.rogueBtn.setFrame(0);
                // this.blockedBtn.setFrame(0);
                break;
            case 0:
                switch (this.characterSelectedCol) {
                    case 0:
                        // Berserker
                        this.backBtn.setFrame(0);
                        // this.berserkerBtn.setFrame(1);
                        // this.wizardBtn.setFrame(0);
                        // this.bardBtn.setFrame(0);
                        // this.rogueBtn.setFrame(0);
                        // this.blockedBtn.setFrame(0);
                        break;
                    case 1:
                        // Wizard
                        this.backBtn.setFrame(0);
                        // this.berserkerBtn.setFrame(0);
                        // this.wizardBtn.setFrame(1);
                        // this.bardBtn.setFrame(0);
                        // this.rogueBtn.setFrame(0);
                        // this.blockedBtn.setFrame(0);
                        break;
                    case 2:
                        // Bard
                        this.backBtn.setFrame(0);
                        // this.berserkerBtn.setFrame(0);
                        // this.wizardBtn.setFrame(0);
                        // this.bardBtn.setFrame(1);
                        // this.rogueBtn.setFrame(0);
                        // this.blockedBtn.setFrame(0);
                        break;
                }// Fin switch(col)
                break;
            case 1:
                switch (this.characterSelectedCol) {
                    case 0:
                        // Rogue
                        this.backBtn.setFrame(0);
                        // this.berserkerBtn.setFrame(0);
                        // this.wizardBtn.setFrame(0);
                        // this.bardBtn.setFrame(0);
                        // this.rogueBtn.setFrame(1);
                        // this.blockedBtn.setFrame(0);
                        break;
                    case 1:
                        // Blocked
                        this.backBtn.setFrame(0);
                        // this.berserkerBtn.setFrame(0);
                        // this.wizardBtn.setFrame(0);
                        // this.bardBtn.setFrame(0);
                        // this.rogueBtn.setFrame(0);
                        // this.blockedBtn.setFrame(1);
                        break;
                    case 2:
                        // Blocked
                        this.backBtn.setFrame(0);
                        // this.berserkerBtn.setFrame(0);
                        // this.wizardBtn.setFrame(0);
                        // this.bardBtn.setFrame(0);
                        // this.rogueBtn.setFrame(0);
                        // this.blockedBtn.setFrame(1);
                        this.characterSelectedCol = 1;
                        break;
                }// Fin switch(col)
                break;
        }// Fin switch(row)
    }// Fin CheckCharacter

    // Selecciona el personaje si está disponible
    SelectCharacter() {
        if (this.characterSelectedRow == -1) {
            this.input.keyboard.removeAllKeys(true);
            this.scene.start("scene_main_menu");
        } else if (this.availableChars[this.characterSelectedRow][this.characterSelectedCol].available) { // Si está disponible
            if (this.availableChars[this.characterSelectedRow][this.characterSelectedCol].purchased) { // Si lo tiene comprado
                game.mPlayer.characterSel.type = this.availableChars[this.characterSelectedRow][this.characterSelectedCol].char;
                game.mPlayer.characterSel.id = this.characterSelectedCol + (this.characterSelectedRow * 3);
                this.selectingCharacter = false;
                this.selectingSkin = true;
                if (game.global.DEBUG_MODE) {
                    console.log("Personaje seleccionado: " + game.mPlayer.characterSel.type);
                }
            } else {
                if (game.global.DEBUG_MODE) {
                    console.log("Debes comprar el personaje");
                }
            }
        } else {
            if (game.global.DEBUG_MODE) {
                console.log("Personaje no disponible");
            }
        }
    }// Fin SelectCharacter

    CheckSkin() {
        if (this.skinSelectedRow == -1) {
            this.backBtn.setFrame(1);
        } else {
            this.backBtn.setFrame(0);
        }
    }// Fin CheckSkin

    SelectSkin() {
        if (this.skinSelectedRow == -1) {
            this.selectingSkin = false;
            game.mPlayer.skinSel = -1;
            this.skinSelectedRow = 0;
            this.skinSelectedCol = 0;
            game.mPlayer.characterSel.type = undefined;
            game.mPlayer.characterSel.id = -1;
            this.selectingCharacter = true;
        }else{
            if (game.mPlayer.availableSkins[game.mPlayer.characterSel.id][this.skinSelectedCol]){
                // Se puede seleccionar
                game.mPlayer.skinSel = this.skinSelectedCol;
                if (game.global.DEBUG_MODE) {
                    console.log("Skin seleccionada: " + game.mPlayer.skinSel);
                }
            }else{
                // Hay que comprar la skin
                if (game.global.DEBUG_MODE) {
                    console.log("Debes comprar la skin");
                }
            }
        }
    }// Fin SelectSkin

}// Fin Scene_Select_Character