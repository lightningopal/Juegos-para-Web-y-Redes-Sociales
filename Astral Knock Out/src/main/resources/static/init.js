'use strict';
// Mobile JS detector
var isMobile = false;

var userAgent = navigator.userAgent.toLowerCase();
if (/windows phone/i.test(userAgent) || /android/i.test(userAgent) || (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream))
{
    isMobile = true;
}

// Referencias de pantalla
var referenceWidth = 1920;
var referenceHeight = 1080;

var config1080 = {
    type: Phaser.AUTO,
    backgroundColor: "#2a0678",
    width: window.screen.width/1.3,//800, //1920
    height: window.screen.height/1.3,//450, //1080
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: ((window.screen.height/1.3) / referenceHeight) * 2200 },
            debug: true
        }
    },
    parent: 'game', // Create the game inside the <div id="game">
    scene: [ Scene_Account,
        Scene_Main_Menu,
        Scene_Ranking,
        Scene_Credits,
        Scene_Select_Character, 
        Scene_Test
         ]
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
    scene: [ Scene_Account, Scene_Main_Menu, Scene_Test ]
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
            //debug: true
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
    basicAttack: Phaser.Input.Keyboard.KeyCodes.O,
    specialAttack: Phaser.Input.Keyboard.KeyCodes.P
};

var cursors2Keys = {
    jump : Phaser.Input.Keyboard.KeyCodes.I,
    fall : Phaser.Input.Keyboard.KeyCodes.K,
    left: Phaser.Input.Keyboard.KeyCodes.J,
    right: Phaser.Input.Keyboard.KeyCodes.L,
    basicAttack: Phaser.Input.Keyboard.KeyCodes.Y,
    specialAttack: Phaser.Input.Keyboard.KeyCodes.T
};

var server = {
	serverIP : "192.168.1.35",
	playerID : -1,
	isOnline : false,
	ready : false,
	characterSel : -1,
	playerName : "",
	playerPassword : ""
};

//config1080.height = (1080 * config1080.width) / 1920;

if (isMobile)
    var game = new Phaser.Game(configMobile);
else
    var game = new Phaser.Game(config1080);

//window.focus();

// Responsive Functions
// Escala
var scaleX = (game.config.width / referenceWidth);
var scaleY = (game.config.height / referenceHeight);
console.log(scaleX);
console.log(scaleY);
// Position
function RelativePosition(value, axis)
{
    var pos = 0;
    if (axis == "x")
        pos = (game.config.width / referenceWidth) * value;
    else
        pos = (game.config.height / referenceHeight)  * value;
    return pos;
}

// Scale
function RelativeScale()
{
    return scaleX;
}

function RelativeScale(value)
{
    return scaleX * value;
}

function RelativeScale(v, axis)
{
    var value = 1;
    
    if (axis == "x")
    value = scaleX * v;
    else
    value = scaleY * v;
    return value;
}

function Unscale(v, axis){
    var value = 1;
    
    if (axis == "x")
    value = v / scaleX;
    else
    value = v * scaleY;
    return value;
}