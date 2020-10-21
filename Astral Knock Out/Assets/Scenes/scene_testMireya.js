class Scene_TestMireya extends Phaser.Scene {
    constructor() {
        super({ key: "scene_testMireya" });
    } // Fin constructor

    preload() {
        // Fondo
        this.load.image("simple_bg", "./Assets/Images/BackGrounds/simple_bg.png");
        this.load.image("stars", "./Assets/Images/BackGrounds/stars.png");
        // Plataformas
        //this.load.image("floor", "./Assets/Images/Platforms_Lvl1/test_plats/floor.png");


        this.cursors1 = this.input.keyboard.addKeys({
            'jump': cursors1Keys.jump,
            'fall': cursors1Keys.fall,
            'left': cursors1Keys.left,
            'right': cursors1Keys.right,
            'basicAttack': cursors1Keys.basicAttack,
            'specialAttack': cursors1Keys.specialAttack,
        });

        this.cursors2 = this.input.keyboard.addKeys({
            'jump': cursors2Keys.jump,
            'fall': cursors1Keys.fall,
            'left': cursors2Keys.left,
            'right': cursors2Keys.right,
            'basicAttack': cursors2Keys.basicAttack,
            'specialAttack': cursors2Keys.specialAttack,
        });

    } // Fin preload

    create() {
        this.add.image(0, 0, "simple_bg").setOrigin(0,0).setScale(RelativeScale(1,"x"),RelativeScale(1,"y"));

        this.tilesprite = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars").setOrigin(0,0);
        
        // Crear el personaje
        /*var basicWeapon = new Weapon(this, 500);
        var myPlayer = new Character_Controller(this, 0, RelativePosition(100, "x"), 
        RelativePosition(100, "y"), "character_test", RelativeScale(), this.cursors1, 
        this.mobileKeys, RelativeScale(500, "x"), RelativeScale(1020, "y"), 100, basicWeapon, basicWeapon)
        .setScale(RelativeScale(0.75, "x"), RelativeScale(0.75, "y"));*/
        
        /*
        this.platform = this.physics.add.image(RelativePosition(600,"x"), RelativePosition(1030,"y"), "slope")
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        */

        //this.physics.add.overlap(this.characters, this.bullets, this.BulletHit, player, bullet);
        //this.physics.add.collider(characters, this.platforms);
        //this.physics.add.overlap(characters, this.hidePlatforms);
    } // Fin create

    update() {
        // Mostrar u ocultar las plataformas al pasar por encima
        /*this.hidePlatforms.forEach(platform => {
            if (platform.body.embedded) platform.body.touching.none = false;
            if (!platform.body.touching.none && platform.body.wasTouching.none){
                this.HidePlatform(platform);
            }else if (platform.body.touching.none && !platform.body.wasTouching.none){
                this.ShowPlatform(platform);
            }
        });*/

        this.tilesprite.tilePositionX += 0.2;
        this.tilesprite.tilePositionY += 0.4;

        var debugText = document.getElementById("debugText");
        debugText.innerHTML = "Posición del ratón: {x: " + x + ", y: " + y + "} | FPS: " + Math.round(game.loop.actualFps);
    } // Fin update

    /*BulletHit(player, bullet) {
        this.DamagePlayer(player, bullet);
        this.RemoveBullet(bullet);
    }

    RemoveBullet(bullet) {
        var index = bullet.bulletIndex;
        this.bullets[index].destroy();

        for (var i = index; i < (this.bullets.length - 1); i++) {
            this.bullets[i] = this.bullets[i + 1]
        }

        this.bullets[this.bullets.length].destroy();
    }

    DamagePlayer(player, bullet) {
        player.actualHP -= bullet.damage;

        if (player.actualHP <= 0)
            player.die();
    }*/

    // Joystick movil

    /*HidePlatform(platform){
        var tween = this.tweens.add({
            targets: platform,
            alpha: 0.6,
            ease: 'Sine.easeInOut',
            duration: 200,
        });
    }

    ShowPlatform(platform){
        var tween = this.tweens.add({
            targets: platform,
            alpha: 1.0,
            ease: 'Sine.easeInOut',
            duration: 200,
        });
    }*/

}

function showCoords(event) {
    x = Math.round(event.clientX / (game.config.width / 1920));
    y= Math.round(event.clientY / (game.config.height / 1080));
  }