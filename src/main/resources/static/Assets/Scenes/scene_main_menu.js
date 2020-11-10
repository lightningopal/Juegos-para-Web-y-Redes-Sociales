class Scene_Main_Menu extends Phaser.Scene {

    constructor() {
        super({ key: "scene_main_menu" });
    } // Fin constructor

    preload() {
        var that = this;
        // Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width/2, game.config.height/2, "main_menu_nebula")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width/2, game.config.height/2, "main_menu_stars")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.add.image(RelativeScale(960.0,"x"), RelativeScale(658.50,"y"), "main_menu_interface")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.add.image(RelativeScale(943.50,"x"), RelativeScale(332.0,"y"), "main_menu_logo")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        
        this.tournamentBtn = this.add.image(RelativeScale(959.5,"x"), RelativeScale(634.50,"y"), "tournament_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.tournamentBtn.setFrame(1);
        this.gymBtn = this.add.image(RelativeScale(960.0,"x"), RelativeScale(796.50,"y"), "gym_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.rankingBtn = this.add.image(RelativeScale(960.0,"x"), RelativeScale(982.70,"y"), "ranking_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.creditsBtn = this.add.image(RelativeScale(1801.0,"x"), RelativeScale(887.70,"y"), "credits_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.optionsBtn = this.add.image(RelativeScale(138.50,"x"), RelativeScale(889.0,"y"), "options_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        // Teclas
        this.cursors;
        // Opciones de selección
        this.optionSelectedRow;
        this.optionSelectedCol;
    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_main_menu";

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

        this.optionSelectedRow = 0;
        this.optionSelectedCol = 1;
        if (game.global.DEVICE === "mobile" || game.global.DEBUG_PHONE){

            this.input.on('pointerup', function () {
                that.optionSelectedRow = -1;
                that.optionSelectedCol = -1;
                that.tournamentBtn.setFrame(0);
                that.gymBtn.setFrame(0);
                that.rankingBtn.setFrame(0);
                that.optionsBtn.setFrame(0);
                that.creditsBtn.setFrame(0);
            });

            this.tournamentBtn.setInteractive().on('pointerdown', function(pointer,localX,localY,event){
                that.optionSelectedRow = 0;
                that.optionSelectedCol = 1;
                that.tournamentBtn.setFrame(1);
                that.gymBtn.setFrame(0);
                that.rankingBtn.setFrame(0);
                that.optionsBtn.setFrame(0);
                that.creditsBtn.setFrame(0);
                if (game.global.DEBUG_MODE){ 
                    console.log("tournament pulsado");
                }
            });
            this.tournamentBtn.setInteractive().on('pointerup', function(pointer,localX,localY,event){
                if (that.optionSelectedRow == 0 && that.optionSelectedCol == 1){
                    that.tournamentBtn.setFrame(0);
                    that.scene.start("scene_select_character");
                }
                if (game.global.DEBUG_MODE){ 
                    console.log("tournament soltado");
                }
            });

            this.gymBtn.setInteractive().on('pointerdown', function(pointer,localX,localY,event){
                that.optionSelectedRow = 1;
                that.optionSelectedCol = 1;
                that.tournamentBtn.setFrame(0);
                that.gymBtn.setFrame(1);
                that.rankingBtn.setFrame(0);
                that.optionsBtn.setFrame(0);
                that.creditsBtn.setFrame(0);
                if (game.global.DEBUG_MODE){ 
                    console.log("gym pulsado");
                }
            });
            this.gymBtn.setInteractive().on('pointerup', function(pointer,localX,localY,event){
                if (that.optionSelectedRow == 1 && that.optionSelectedCol == 1){
                    that.gymBtn.setFrame(0);
                    that.scene.start("scene_select_character");
                }
                if (game.global.DEBUG_MODE){ 
                    console.log("gym soltado");
                }
            });

            this.rankingBtn.setInteractive().on('pointerdown', function(pointer,localX,localY,event){
                that.optionSelectedRow = 2;
                that.optionSelectedCol = 1;
                that.tournamentBtn.setFrame(0);
                that.gymBtn.setFrame(0);
                that.rankingBtn.setFrame(1);
                that.optionsBtn.setFrame(0);
                that.creditsBtn.setFrame(0);
                if (game.global.DEBUG_MODE){ 
                    console.log("ranking pulsado");
                }
            });
            this.rankingBtn.setInteractive().on('pointerup', function(pointer,localX,localY,event){
                if (that.optionSelectedRow == 2 && that.optionSelectedCol == 1){
                    that.rankingBtn.setFrame(0);
                    that.scene.start("scene_ranking");
                }
                if (game.global.DEBUG_MODE){ 
                    console.log("ranking soltado");
                }
            });

            this.optionsBtn.setInteractive().on('pointerdown', function(pointer,localX,localY,event){
                that.optionSelectedRow = -1;
                that.optionSelectedCol = 0;
                that.tournamentBtn.setFrame(0);
                that.gymBtn.setFrame(0);
                that.rankingBtn.setFrame(0);
                that.optionsBtn.setFrame(1);
                that.creditsBtn.setFrame(0);
                if (game.global.DEBUG_MODE){ 
                    console.log("options pulsado");
                }
            });
            this.optionsBtn.setInteractive().on('pointerup', function(pointer,localX,localY,event){
                if (that.optionSelectedRow == -1 && that.optionSelectedCol == 0){
                    that.optionsBtn.setFrame(0);
                    that.scene.start("scene_options");
                }
                if (game.global.DEBUG_MODE){ 
                    console.log("options soltado");
                }
            });

            this.creditsBtn.setInteractive().on('pointerdown', function(pointer,localX,localY,event){
                that.optionSelectedRow = -1;
                that.optionSelectedCol = 2;
                that.tournamentBtn.setFrame(0);
                that.gymBtn.setFrame(0);
                that.rankingBtn.setFrame(0);
                that.optionsBtn.setFrame(0);
                that.creditsBtn.setFrame(1);
                if (game.global.DEBUG_MODE){ 
                    console.log("credits pulsado");
                }
            });
            this.creditsBtn.setInteractive().on('pointerup', function(pointer,localX,localY,event){
                if (that.optionSelectedRow == -1 && that.optionSelectedCol == 2){
                    that.creditsBtn.setFrame(0);
                that.scene.start("scene_credits");
                }
                if (game.global.DEBUG_MODE){ 
                    console.log("credits soltado");
                }
            });
        }else{// Ordenador
            this.cursors = this.input.keyboard.addKeys({
                'up': game.cursors1Keys.jump,
                'down': game.cursors1Keys.fall,
                'left': game.cursors1Keys.left,
                'right': game.cursors1Keys.right,
                'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
                'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
            });
            // Opciones de selección
    
            this.cursors.right.on('down', function(event){
                that.optionSelectedCol = (that.optionSelectedCol + 1) % 3;
                if (game.global.DEBUG_MODE){ 
                    console.log("COL: "+that.optionSelectedCol);
                }
                that.CheckOption();
            });
            this.cursors.left.on('down', function(event){
                if (that.optionSelectedCol >= 1){
                    that.optionSelectedCol = (that.optionSelectedCol - 1) % 3;
                }else{
                    that.optionSelectedCol = 2
                }
                if (game.global.DEBUG_MODE){ 
                    console.log("COL: "+that.optionSelectedCol);
                }
                that.CheckOption();
            });
    
            this.cursors.up.on('down', function(event){
                if (that.optionSelectedCol == 1){
                    if (that.optionSelectedRow >= 1){
                        that.optionSelectedRow = (that.optionSelectedRow - 1);
                    }else{
                        that.optionSelectedRow = 2;
                    }
                    if (game.global.DEBUG_MODE){ 
                        console.log("ROW: "+that.optionSelectedRow);
                    }
                    that.CheckOption();
                }
            });
            this.cursors.down.on('down', function(event){
                if (that.optionSelectedCol == 1){
                    that.optionSelectedRow = (that.optionSelectedRow + 1) % 3;
                    if (game.global.DEBUG_MODE){ 
                        console.log("ROW: "+that.optionSelectedRow);
                    }
                    that.CheckOption();
                }
            });
            
            this.cursors.enter.on('down', function(event){
                switch(that.optionSelectedCol){
                    case 0:
                        // Options
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_options");
                        break;
                    case 1:
                        if (that.optionSelectedRow == 0){
                            // Tournament
                            game.mPlayer.isVersus = true;
                            that.input.keyboard.removeAllKeys(true);
                            that.scene.start("scene_select_character");
                        }else if (that.optionSelectedRow == 1){
                            // Space Gym
                            game.mPlayer.isVersus = false;
                            that.input.keyboard.removeAllKeys(true);
                            that.scene.start("scene_select_character");
                        }else {
                            // Ranking
                            that.input.keyboard.removeAllKeys(true);
                            game.global.socket.send(JSON.stringify({ event: "REQUEST_RANKING" }));
                        }
                        break;
                    case 2:
                        // Credits
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_credits");
                        break;
                    default:
                        break;
                }
            });
            /**
            this.cursors.escape.on('down', function(event){
                that.input.keyboard.removeAllKeys(true);
                that.scene.start("scene_account");
            });
            /**/
        }
    } // Fin create

    update() {
    } // Fin update

    CheckOption(){
        switch(this.optionSelectedCol){
            case 0:
                // Options
                this.tournamentBtn.setFrame(0);
                this.gymBtn.setFrame(0);
                this.rankingBtn.setFrame(0);
                this.optionsBtn.setFrame(1);
                this.creditsBtn.setFrame(0);
                break;
            case 1:
                if (this.optionSelectedRow == 0){
                    // Tournament
                    this.tournamentBtn.setFrame(1);
                    this.gymBtn.setFrame(0);
                    this.rankingBtn.setFrame(0);
                    this.optionsBtn.setFrame(0);
                    this.creditsBtn.setFrame(0);
                }else if (this.optionSelectedRow == 1){
                    // Space Gym
                    this.tournamentBtn.setFrame(0);
                    this.gymBtn.setFrame(1);
                    this.rankingBtn.setFrame(0);
                    this.optionsBtn.setFrame(0);
                    this.creditsBtn.setFrame(0);
                }else {
                    // Ranking
                    this.tournamentBtn.setFrame(0);
                    this.gymBtn.setFrame(0);
                    this.rankingBtn.setFrame(1);
                    this.optionsBtn.setFrame(0);
                    this.creditsBtn.setFrame(0);
                }
                break;
            case 2:
                // Credits
                this.tournamentBtn.setFrame(0);
                    this.gymBtn.setFrame(0);
                    this.rankingBtn.setFrame(0);
                    this.optionsBtn.setFrame(0);
                    this.creditsBtn.setFrame(1);
                break;
            default:
                break;
        }
    }// Fin CheckOption

}// Fin Scene_Main_Menu