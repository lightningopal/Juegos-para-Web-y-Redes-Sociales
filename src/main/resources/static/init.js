'use strict';
window.onload = function () {
    this.prueba = "prueba";
    // Mobile JS detector
    this.isMobile = false;
    this.userAgent = navigator.userAgent.toLowerCase();
    if (/windows phone/i.test(userAgent) || /android/i.test(userAgent) || (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream)) {
        isMobile = true;
    }

    // Referencias de pantalla
    this.referenceWidth = 1920;
    this.referenceHeight = 1080;

    this.configDesktop = {
        type: Phaser.AUTO,
        backgroundColor: "#2a0678",
        width: window.screen.width / 1.3,//800, //1920
        height: window.screen.height / 1.3,//450, //1080
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: ((window.screen.height / 1.3) / referenceHeight) * 2200 },
                debug: false
            }
        },
        dom: {
            createContainer: true
        },
        parent: 'game', // Create the game inside the <div id="game">
        scene: [Scene_Boot,
            Scene_Space_Gym,
            Scene_Main_Menu,
            Scene_Options,
            Scene_Ranking,
            Scene_Credits,
            Scene_Select_Character,
            Scene_Account,
            Scene_Select_Login,
            Scene_Score
        ]
    };

    // Config test mobile
    this.configMobile = {
        type: Phaser.AUTO,
        backgroundColor: "#2a0678",
        width: window.screen.width,
        height: window.screen.height,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: ((window.screen.height) / referenceHeight) * 2200 },
                debug: true
            }
        },
        dom: {
            createContainer: true
        },
        parent: 'game', // Create the game inside the <div id="game">
        scene: [Scene_Boot,
            Scene_Space_Gym,
            Scene_Main_Menu,
            Scene_Options,
            Scene_Ranking,
            Scene_Credits,
            Scene_Select_Character,
            Scene_Account,
            Scene_Select_Login,
            Scene_Score
        ]
    };

    // Selección de configuración en función del dispositivo
    if (isMobile) {
        this.game = new Phaser.Game(configMobile);
    } else {
        this.game = new Phaser.Game(configDesktop);
    }
    window.focus();

    this.game.global = {
        DEVICE:         null,
        FPS:            60,
        DEBUG_MODE:     true,
        DEBUG_PHONE:    false,
        WS_CONNECTION:  false,
        socket:         null,
        IP:             "192.168.1.35",
        logInOption:    0 // 0->Log In | 1->Sign Up
    }

    this.game.options = {
        musicVol:       1.0,
        SFXVol:         1.0,
        fullScreen:     false
    }

    /*
    this.game.server = {
        serverIP:       "192.168.1.35",
        playerID:       -1,
        isOnline:       false,
        ready:          false,
        characterSel:   -1,
        playerName:     "",
        playerPassword: ""
    };
    */

    this.game.mPlayer = {
        id:             -1,
        userName:       undefined, // String
        password:       undefined, // String
        characterSel:   {id: -1, type: undefined}, // Berserker, Mago, Bardo, Asesina
        skinSel:        -1,
        skillSel:       -1,
        difficultySel:  -1,
        isVersus:       false, // Para comprobar si está en tournament o en space gym
        isSearching:    false,
        room:           -1,
        availableChar:  [0, 1, 2, 3], // Berserker, Mago, Bardo, Asesina, bloqueado
        availableSkins: [[0],[0],[0],[0]],
        ranking: {
            position:   0,
            wins:       0,
            loses:      0,
            score:      0
        },
        currency:       0
    };

    this.game.skins = [1,1,1,1]; // Número de skins que tiene cada personaje

    this.game.cursors1Keys = {
        jump:           Phaser.Input.Keyboard.KeyCodes.W,
        fall:           Phaser.Input.Keyboard.KeyCodes.S,
        left:           Phaser.Input.Keyboard.KeyCodes.A,
        right:          Phaser.Input.Keyboard.KeyCodes.D,
        basicAttack:    Phaser.Input.Keyboard.KeyCodes.O,
        specialAttack:  Phaser.Input.Keyboard.KeyCodes.P
    };

    if (this.isMobile) {
        game.global.DEVICE = "mobile";
    }
    else {
        game.global.DEVICE = "desktop";
    }

    // Responsive Functions
    // Escala
    this.scaleX = (game.config.width / referenceWidth);
    this.scaleY = (game.config.height / referenceHeight);
    // Funciones de escalado
    this.RelativeScale = function (v, axis) {
        var value = 1;

        if (axis == "x")
            value = scaleX * v;
        else
            value = scaleY * v;
        return value;
    }

    this.Unscale = function (v, axis) {
        var value = 1;

        if (axis == "x")
            value = v / scaleX;
        else
            value = v / scaleY;
        return value;
    }
}