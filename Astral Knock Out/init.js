'use strict';
var config1080 = {
    type: Phaser.AUTO,
    backgroundColor: "#2a0678",
    width: 800, //1920
    height: 450, //1080
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [ Scene_Test ]
};

var config720 = {
    type: Phaser.AUTO,
    backgroundColor: "#2a0678",
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: []
};

// Config test mobile
var configMobile = {
    type: Phaser.AUTO,
    backgroundColor: "#2a0678",
    width: 800,
    height: 380,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [ Scene_Test ]
};

var options = {
    device: null,
    musicVol: 1.0,
    SFXVol: 1.0,
    fullScreen: false
};

var cursors1Keys = {
    jump : Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    basicAttack: Phaser.Input.Keyboard.KeyCodes.E,
    specialAttack: Phaser.Input.Keyboard.KeyCodes.Q
};

var cursors2Keys = {
    jump : Phaser.Input.Keyboard.KeyCodes.I,
    left: Phaser.Input.Keyboard.KeyCodes.J,
    right: Phaser.Input.Keyboard.KeyCodes.L,
    basicAttack: Phaser.Input.Keyboard.KeyCodes.U,
    specialAttack: Phaser.Input.Keyboard.KeyCodes.O
};

var game = new Phaser.Game(configMobile);