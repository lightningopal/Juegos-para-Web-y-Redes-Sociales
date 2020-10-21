class Shot extends Phaser.GameObjects.Rectangle /*Sprite*/ {
    constructor(scene, id, x, y, w, h, color, moveSpeed, direction, damage){
        super(scene, x, y, w, h, color);

        this.scene = scene;
        this.id = id;
        this.moveSpeed = moveSpeed;
        this.direction = direction;
        this.damage = damage;

        // Se añade a la escena
        scene.add.existing(this);

        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.body.allowGravity = false;

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

        // Añadimos el sprite de la bala
        this.sprite = this.scene.add.sprite(x, y, 'shot_' + id);

    }// Fin constructor

    update(time, delta){
        this.x += moveSpeed * this.direction * delta;
    }// Fin update
}