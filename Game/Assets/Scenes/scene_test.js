//this.sys.game.device.os --> Muestra un array de bools que indica el dispositivo en el que se abre la página
class Scene_Test extends Phaser.Scene {
    constructor(){
        super({key: "scene_test"});
    }// Fin constructor

    preload(){
        options.device = this.sys.game.device.os;
        this.cursors1 = this.input.keyboard.addKeys({
            'jump': cursors1Keys.jump,
            'left': cursors1Keys.left,
            'right': cursors1Keys.right,
            'basicAttack': cursors1Keys.basicAttack,
            'specialAttack': cursors1Keys.specialAttack,
        });
    }// Fin preload

    create(){
        var Personaje = new Character_Controller(this, 0, 100, 100, 50, 50, 0xaaffaa, this.cursors1);
        console.log(Personaje.body);
    }// Fin create

    update(){

    }// Fin update

}