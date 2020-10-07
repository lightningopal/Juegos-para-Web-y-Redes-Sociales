class Weapon extends Phaser.GameObjects.Rectangle /*Sprite*/ {
    constructor(scene, id, x, y, w, h, color, attackRatio, shot){
        super(scene, x, y, w, h, color);

        this.scene = scene;
        this.id = id;
        this.attackRatio = attackRatio;
        this.shot = shot;
        this.nextShot = 0.0;

        // Se añade a la escena
        //scene.add.existing(this);

        // Se activan las físicas
        //scene.physics.world.enable(this);
        //this.body.setCollideWorldBounds(false);

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

        // Añadimos el sprite de la bala
        //this.sprite = this.scene.add.sprite(x, y, 'shot_' + id);

    }// Fin constructor

    update(time, delta){
        if (time > this.nextShot)
        {
            // Añadimos la bala al array de balas
            this.scene.bullets[this.scene.bullets.length] = new Shot(this, 0, this.x, this.y, 10, 10, this.color, 10, 1, 20);
            this.scene.bullets[this.scene.bullets.length].bulletIndex = this.scene.bullets.length;

            this.nextShot = time + this.attackRatio;
        }
    }// Fin update
}