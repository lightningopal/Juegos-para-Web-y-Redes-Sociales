class Scene_SelectLogin extends Phaser.Scene {

    constructor() {
        super({ key: "scene_selectLogin"});
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple-bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars")
            .setOrigin(0, 0);

        this.add.image(0, 0, "account_bg").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));;

        // Teclas
        this.cursors;

        // Opciones de selección
        this.optionSelected;

        // WEBSOCKETS
        game.global.socket = new WebSocket("ws://" + "localhost:8080" + "/ako")

        game.global.socket.onopen = () => {
	        if (game.global.DEBUG_MODE) {
	            console.log('[DEBUG] WebSocket connection opened.');
	        }

	        game.global.WS_CONNECTION = true;
	        //this.scene.start('MatchmakingScene')

	        // In case JOIN message from server failed, we force it
	        if (typeof game.mPlayer.id == 'undefined') {
	            if (game.global.DEBUG_MODE) {
	                console.log("[DEBUG] Forcing joining server...");
	            }
	            let message = {
	                event: 'JOIN'
	            }
	            game.global.socket.send(JSON.stringify(message));
	        }
	    }

	    game.global.socket.onclose = () => {
	        if (game.global.DEBUG_MODE) {
	            console.log('[DEBUG] WebSocket connection closed.');
	        }

	        game.global.WS_CONNECTION = false;
	    }

    } // Fin preload

    create() {
        var that = this;

        // Opciones de selección
        this.cursors = this.input.keyboard.addKeys({
            'left': game.cursors1Keys.left,
            'right': game.cursors1Keys.right,
            'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'escape': Phaser.Input.Keyboard.KeyCodes.ESC,
        });

        this.optionSelected = -1;
        this.cursors.right.on('down', function (event) {
            that.optionSelected = (that.optionSelected + 1) % 2;
            if (game.global.DEBUG_MODE){ 
                console.log(that.optionSelected);
            }
            

        });
        this.cursors.left.on('down', function (event) {
            that.optionSelected = (that.optionSelected + 1) % 2;
            if (game.global.DEBUG_MODE){ 
                console.log(that.optionSelected);
            }
        });

        this.cursors.enter.on('down', function (event) {
            that.input.keyboard.removeAllKeys(true);
            that.game.global.logInOption = that.optionSelected;
            that.scene.start("scene_account");
        });

    } // Fin create

    update() {
        this.stars.tilePositionX += RelativeScale(0.2, "x");
        this.stars.tilePositionY += RelativeScale(0.4, "y");
    } // Fin update

}