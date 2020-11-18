class Scene_Main_Menu extends Phaser.Scene {

    constructor() {
        super({ key: "scene_main_menu" });
    } // Fin constructor

    preload() {
        var that = this;
        // Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0,0)
        ;
        this.nebula = this.add.image(game.config.width/2, game.config.height/2, "main_menu_nebula")
        ;
        this.stars = this.add.image(game.config.width/2, game.config.height/2, "main_menu_stars")
        ;
        this.add.image(960.0, 658.50, "main_menu_interface")
        ;
        this.add.image(943.50, 332.0, "main_menu_logo")
        ;
        
        this.tournamentBtn = this.add.image(959.5, 634.50, "tournament_button")
        ;
        this.tournamentBtn.setFrame(1);
        this.gymBtn = this.add.image(960.0, 796.50, "gym_button")
        ;
        this.rankingBtn = this.add.image(960.0, 982.70, "ranking_button")
        ;
        this.creditsBtn = this.add.image(1801.0, 887.70, "credits_button")
        ;
        this.optionsBtn = this.add.image(138.50, 889.0, "options_button")
        ;
        // Opciones de selección
        this.optionSelectedRow;
        this.optionSelectedCol;

        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");
        this.errorOptionSound = this.sound.add("error_button");

        if (game.options.currentSong != undefined){
            if (game.options.currentSong.key != "lait_motiv"){
                game.options.currentSong.stop();
                game.options.currentSong = this.sound.add("lait_motiv");
                game.options.currentSong.play({ volume: game.options.musicVol, loop: true });
            }
        }else{
            game.options.currentSong = this.sound.add("lait_motiv");
            game.options.currentSong.play({ volume: game.options.musicVol, loop: true });
        }
    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_main_menu";

        // Fade in
        this.cam = this.cameras.main;
        this.cam.fadeIn(300);

        // Idle timer
        that.time.addEvent({
            delay: 2000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

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

        this.optionSelectedRow = 0;
        this.optionSelectedCol = 1;
            this.input.on('pointerup', function () {
                that.optionSelectedRow = 0;
                that.optionSelectedCol = 1;
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
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    game.mPlayer.isVersus = true;
                    that.tournamentBtn.setFrame(0);
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.get("scene_boot").FadeTransition("scene_select_character");
                    //that.scene.start("scene_select_character");
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
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    game.mPlayer.isVersus = false;
                    that.gymBtn.setFrame(0);
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.get("scene_boot").FadeTransition("scene_select_character");
                    //that.scene.start("scene_select_character");
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
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    that.rankingBtn.setFrame(0);
                    that.input.keyboard.removeAllKeys(true);
                    game.global.socket.send(JSON.stringify({ event: "REQUEST_RANKING" }));
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
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    that.optionsBtn.setFrame(0);
                    that.input.keyboard.removeAllKeys(true);
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
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    that.creditsBtn.setFrame(0);
                    that.input.keyboard.removeAllKeys(true);
                    that.scene.start("scene_credits");
                }
                if (game.global.DEBUG_MODE){ 
                    console.log("credits soltado");
                }
            });
        if (game.global.DEVICE === "desktop"){// Ordenador
            // Opciones de selección
            this.input.keyboard.on('keydown-'+'D', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelectedCol = (that.optionSelectedCol + 1) % 3;
                if (game.global.DEBUG_MODE){ 
                    console.log("COL: "+that.optionSelectedCol);
                }
                that.CheckOption();
            });
            this.input.keyboard.on('keydown-'+'RIGHT', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                that.optionSelectedCol = (that.optionSelectedCol + 1) % 3;
                if (game.global.DEBUG_MODE){ 
                    console.log("COL: "+that.optionSelectedCol);
                }
                that.CheckOption();
            });

            this.input.keyboard.on('keydown-'+'A', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
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
            this.input.keyboard.on('keydown-'+'LEFT', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
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
    
            this.input.keyboard.on('keydown-'+'W', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
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
            this.input.keyboard.on('keydown-'+'UP', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
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

            this.input.keyboard.on('keydown-'+'S', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                if (that.optionSelectedCol == 1){
                    that.optionSelectedRow = (that.optionSelectedRow + 1) % 3;
                    if (game.global.DEBUG_MODE){ 
                        console.log("ROW: "+that.optionSelectedRow);
                    }
                    that.CheckOption();
                }
            });
            this.input.keyboard.on('keydown-'+'DOWN', function (event) {
                that.changeOptionSound.play({ volume: game.options.SFXVol });
                if (that.optionSelectedCol == 1){
                    that.optionSelectedRow = (that.optionSelectedRow + 1) % 3;
                    if (game.global.DEBUG_MODE){ 
                        console.log("ROW: "+that.optionSelectedRow);
                    }
                    that.CheckOption();
                }
            });
            
            this.input.keyboard.on('keydown-'+'ENTER', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
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
                            that.scene.get("scene_boot").FadeTransition("scene_select_character");
                            //that.scene.start("scene_select_character");
                        }else if (that.optionSelectedRow == 1){
                            // Space Gym
                            game.mPlayer.isVersus = false;
                            that.input.keyboard.removeAllKeys(true);
                            that.scene.get("scene_boot").FadeTransition("scene_select_character");
                            //that.scene.start("scene_select_character");
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
            this.input.keyboard.on('keydown-'+'O', function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
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
                            that.scene.get("scene_boot").FadeTransition("scene_select_character");
                            //that.scene.start("scene_select_character");
                        }else if (that.optionSelectedRow == 1){
                            // Space Gym
                            game.mPlayer.isVersus = false;
                            that.input.keyboard.removeAllKeys(true);
                            that.scene.get("scene_boot").FadeTransition("scene_select_character");
                            //that.scene.start("scene_select_character");
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
            this.input.keyboard.on("keydown-"+"ESC", function(event){
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