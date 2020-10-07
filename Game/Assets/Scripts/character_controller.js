class Character_Controller extends Phaser.GameObjects.Rectangle /*Sprite*/ {
    constructor(scene, id, x, y, w, h, color, cursors, moveSpeed, jumpForce, actualHP, maxHP){
        super(scene, x, y, w, h, color);

        this.scene = scene;
        this.id = id;
        this.moveSpeed = moveSpeed;
        this.jumpForce = jumpForce;
        this.actualHP = actualHP;
        this.maxHP = maxHP;
        this.cursors = cursors;

        // Se añade a la escena
        scene.add.existing(this);

        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

        // Añadimos el sprite del personaje
        this.sprite = this.scene.add.sprite(x, y, 'character_' + id);

        console.log("Teclas: " + this.cursors);
    }// Fin constructor

    die()
    {
        console.log("ME MUEROOOOOO");
    }
    update(time, delta){
        // Físicas de personaje
    }// Fin update
}