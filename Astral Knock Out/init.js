'use strict';
// Mobile JS detector
var isMobile = false;

var userAgent = navigator.userAgent.toLowerCase();
if (/windows phone/i.test(userAgent) || /android/i.test(userAgent) || (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream))
{
    isMobile = true;
}

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
    scene: [ Scene_Test ]
};

// Config test mobile
var configMobile = {
    type: Phaser.AUTO,
    backgroundColor: "#2a0678",
    width: window.screen.width,
    height: window.screen.height,
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
    fall : Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    basicAttack: Phaser.Input.Keyboard.KeyCodes.E,
    specialAttack: Phaser.Input.Keyboard.KeyCodes.Q
};

var cursors2Keys = {
    jump : Phaser.Input.Keyboard.KeyCodes.I,
    fall : Phaser.Input.Keyboard.KeyCodes.K,
    left: Phaser.Input.Keyboard.KeyCodes.J,
    right: Phaser.Input.Keyboard.KeyCodes.L,
    basicAttack: Phaser.Input.Keyboard.KeyCodes.U,
    specialAttack: Phaser.Input.Keyboard.KeyCodes.O
};

if (isMobile)
    var game = new Phaser.Game(configMobile);
else
    var game = new Phaser.Game(config720);