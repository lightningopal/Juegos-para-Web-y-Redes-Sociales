class Scene_Options extends Phaser.Scene {
    constructor() {
        super({ key: "scene_options" });
    } // Fin constructor

    preload(){
        var that = this;
        //Creación de imágenes
        this.background = this.add.image(0, 0, "main_menu_bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.nebula = this.add.image(game.config.width/2, game.config.height/2, "main_menu_nebula")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.image(game.config.width/2, game.config.height/2, "main_menu_stars")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.add.image(0, 0, "options_interface").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));

        this.sfxBtn = this.add.image(RelativeScale(1633.0,"x"), RelativeScale(459.5,"y"), "volume_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.musicBtn = this.add.image(RelativeScale(1633.0,"x"), RelativeScale(338.5,"y"), "volume_button")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.musicBtn.setFrame(1);
        // Teclas
        this.cursors;
        // Opciones de selección
        this.optionSelected;
    }// Fin preload

    create(){
        var that = this;
        var tween = this.tweens.add({
            targets: that.nebula,
            angle: 360,
            duration: 1000000,
            repeat: -1
        });
        var tween = this.tweens.add({
            targets: that.stars,
            angle: 360,
            duration: 1500000,
            repeat: -1
        });
        // Teclas de selección
        this.cursors = this.input.keyboard.addKeys({
            'up': game.cursors1Keys.jump,
            'down': game.cursors1Keys.fall,
            'left': game.cursors1Keys.left,
            'right': game.cursors1Keys.right,
            'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
        });
        this.optionSelected = 0;
        this.cursors.escape.on('down', function(event){
            that.input.keyboard.removeAllKeys(true);
            that.scene.start("scene_main_menu");
        });
        this.cursors.up.on('down', function(event){
            if (that.optionSelected == 1){
                that.optionSelected = 0;
            }else{
                that.optionSelected = 1;
            }
            that.CheckOption();
        });
        this.cursors.down.on('down', function(event){
            that.optionSelected = (that.optionSelected + 1) % 2;
            that.CheckOption();
        });

        this.cursors.right.on('down', function(event){
            if (that.optionSelected == 0){ // Música
                game.options.musicVol = Phaser.Math.Clamp(game.options.musicVol + 0.1, 0, 1);
                that.musicBtn.x = RelativeScale((game.options.musicVol*671) + 962, "x");
                if (game.global.DEBUG_MODE){ 
                    console.log(game.options.musicVol);
                }
            }else{ // SFX
                game.options.SFXVol = Phaser.Math.Clamp(game.options.SFXVol + 0.1, 0, 1);
                that.sfxBtn.x = RelativeScale((game.options.SFXVol*671) + 962, "x");
                if (game.global.DEBUG_MODE){ 
                    console.log(game.options.SFXVol);
                }
            }
        });
        this.cursors.left.on('down', function(event){
            if (that.optionSelected == 0){ // Música
                game.options.musicVol = Phaser.Math.Clamp(game.options.musicVol - 0.1, 0, 1);
                that.musicBtn.x = RelativeScale((game.options.musicVol*671) + 962, "x");
                if (game.global.DEBUG_MODE){ 
                    console.log(game.options.musicVol);
                }
            }else{ // SFX
                game.options.SFXVol = Phaser.Math.Clamp(game.options.SFXVol - 0.1, 0, 1);
                that.sfxBtn.x = RelativeScale((game.options.SFXVol*671) + 962, "x");
                if (game.global.DEBUG_MODE){ 
                    console.log(game.options.SFXVol);
                }
            }
        });
    }// Fin create

    update(){

    }// Fin update

    CheckOption(){
        if (this.optionSelected == 0){ // Música
            this.musicBtn.setFrame(1);
            this.sfxBtn.setFrame(0);
        }else{ // SFX
            this.musicBtn.setFrame(0);
            this.sfxBtn.setFrame(1);
        }
    }
    
    ChangeVolume(option, value){
        if (option == 0){ // Música
            game.options.musicVol = value;
            this.musicBtn.x = RelativeScale((value/671) + 962, "x");
        }else{ // SFX
            game.options.SFXVol = value;
            this.sfxBtn.x = RelativeScale((value/671) + 962, "x");
        }
    }
}

// 1633
// 962