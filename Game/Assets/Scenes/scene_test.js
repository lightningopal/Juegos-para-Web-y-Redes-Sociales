// this.sys.game.device.os --> Muestra un array de bools que indica el dispositivo en el que se abre la página
class Scene_Test extends Phaser.Scene {
    constructor(){
        super({key: "scene_test"});
    } // Fin constructor

    preload(){
        var os = this.sys.game.device.os;
        if (os.android || os.iOS || os.iPad || os.iPhone)
            options.device = "mobile";
        else
            options.device = "desktop"

        this.cursors1 = this.input.keyboard.addKeys({
            'jump': cursors1Keys.jump,
            'left': cursors1Keys.left,
            'right': cursors1Keys.right,
            'basicAttack': cursors1Keys.basicAttack,
            'specialAttack': cursors1Keys.specialAttack,
        });

        var url;
  
        url = './Assets/Plugins/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
    } // Fin preload

    create(){
        var personaje = new Character_Controller(this, 0, 100, 100, 50, 50, 0xaaffaa, this.cursors1);
        console.log(Personaje.body);
        console.log(options.device);

        // Si el dispositivo es movil, añadir un joystick
        if (options.device == "mobile")
        {
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 60,
                y: 325,
                radius: 15,
                base: this.add.circle(0, 0, 40, 0x888888),
                thumb: this.add.circle(0, 0, 30, 0xcccccc),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            })
            .on('update', this.dumpJoyStickState, this);

            this.text = this.add.text(0, 0);
            this.dumpJoyStickState();
        }


        //Colisiones
        var characters = [personaje];
        var bullets = [];

        this.physics.add.overlap(this.characters, this.bullets, this.bulletHit, player, bullet);

    } // Fin create

    bulletHit(player, bullet)
    {
        this.damagePlayer(player, bullet);
        this.removeBullet(bullet);
    }

    removeBullet(bullet)
    {
        var index = bullet.bulletIndex;
        this.bullets[index].destroy();

        for (var i = index; i < (this.bullets.length - 1); i++)
        {
            this.bullets[i] = this.bullets[i+1]
        }

        this.bullets[this.bullets.length].destroy();
    }

    damagePlayer(player, bullet)
    {
        player.actualHP -= bullet.damage;

        if (player.actualHP <= 0)
            player.die();
    }

    // Joystick movil
    dumpJoyStickState() {
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        s += '\n';
        s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
        s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
        this.text.setText(s);
    }

    update(){

    } // Fin update

}