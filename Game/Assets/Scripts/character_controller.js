class Character_Controller extends Phaser.GameObjects.Rectangle /*Sprite*/ {
    constructor(scene, id, x, y, w, h, color){
        super(scene, x, y, w, h, color);

        this.scene = scene;
        this.id = id;

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
    }// Fin constructor

    preload (){

    }

    create(){

    }

    update(){

    }
}