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
    scene: [ Character_Control ]
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

var game = new Phaser.Game(config1080);