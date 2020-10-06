class Character_Controller extends Phaser.GameObjects.Rectangle /*Sprite*/ {
    constructor(scene, id, x, y, w, h, color, cursors, moveSpeed, jumpForce, maxHP){
        super(scene, x, y, w, h, color);

        this.scene = scene;
        this.id = id;
        this.moveSpeed = moveSpeed;
        this.jumpForce = jumpForce;
        this.maxHP = maxHP;
        this.cursors = cursors;

        // Se añade a la escena
        scene.add.existing(this);
        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        console.log("Teclas: " + this.cursors);
    }// Fin constructor

    update(){
        
    }// Fin update
}