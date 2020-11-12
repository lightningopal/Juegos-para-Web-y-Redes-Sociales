class Shot extends Phaser.GameObjects.Sprite {
    constructor(scene, id, x, y, type, damage, moveSpeed, direction){
        super(scene, x, y, type);

        this.scene = scene;
        this.id = id;
        //this.moveSpeed = moveSpeed;
        //this.direction = direction;
        this.damage = damage;

        this.active = false;
        // Se añade a la escena
        scene.add.existing(this);

        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.body.allowGravity = false;

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

        // Añadimos el sprite de la bala
        //this.sprite = this.scene.add.sprite(x, y, 'shot_' + id);

    }// Fin constructor

    update(time, delta){
        if (this.active){
            //this.x += this.moveSpeed * this.direction * delta;
        }
    }// Fin update

    DoSomething(character){
        this.x = character.x;
        this. y = character.y;
        if (character.flipX){
            this.direction = -1;
        }else{
            this.direction = 1;
        }
        this.moveSpeed = 1;
        this.active = true;
    }
}