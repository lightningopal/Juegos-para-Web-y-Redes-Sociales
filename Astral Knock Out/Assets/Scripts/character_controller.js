class Character_Controller extends Phaser.GameObjects.Rectangle /*Sprite*/ {
    constructor(scene, id, x, y, w, h, color, cursors, moveSpeed, jumpForce, actualHP, maxHP){
        super(scene, x, y, w, h, color);

        var that = this;

        this.scene = scene;
        this.id = id;
        this.moveSpeed = moveSpeed;
        this.jumpForce = jumpForce;
        this.numJumps = 1;
        this.actualHP = actualHP;
        this.maxHP = maxHP;
        this.cursors = cursors;

        // Se añade a la escena
        scene.add.existing(this);

        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.maxVelocity.x = moveSpeed;
        this.body.setCollideWorldBounds(true);

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

        // Añadimos el sprite del personaje
        //this.sprite = this.scene.add.sprite(x, y, 'character_' + id); COMENTAR;
        this.body.drag.x = 3500;
        console.log(this.body);
        this.cursors.jump.on('down', function(event){
            that.jump();
        });
        this.cursors.left.on('down', function(event){
            that.moveLeft();
        });
        this.cursors.left.on('up', function(event){
            that.stopLeft();
        });
        this.cursors.right.on('down', function(event){
            that.moveRight();
        });
        this.cursors.right.on('up', function(event){
            that.stopRight();
        });
    }// Fin constructor

    die()
    {
        console.log("ME MUEROOOOOO");
    }

    update(time, delta){
        // Físicas de personaje
        if(this.body.onFloor()){
            this.numJumps = 1;
            this.body.drag.x = 3500;
        }
    }// Fin update

    jump(){
        //console.log(this.id+": Salto");
        if (this.body.onFloor() || this.numJumps == 1){
            this.body.velocity.y = -this.jumpForce;
            this.numJumps--;
        }
    }

    moveLeft(){
        if (this.body.onFloor()){
            this.body.velocity.x = -(this.moveSpeed);
            this.body.acceleration.x = -(1);
        }else {
            this.body.velocity.x = -(this.moveSpeed / 2);
            this.body.acceleration.x = -(1);
        }
    }
    stopLeft(){
        if (this.body.velocity.x <= 0){
            this.body.acceleration.x = 0;
            if (!this.body.onFloor()){
                this.body.drag.x = 500;
            }
        }
    }
    moveRight(){
        if (this.body.onFloor()){
            this.body.velocity.x = (this.moveSpeed);
            this.body.acceleration.x = (1);
        }else {
            this.body.velocity.x = (this.moveSpeed / 2);
            this.body.acceleration.x = (1);
        }
    }
    stopRight(){
        if (this.body.velocity.x >= 0){
            this.body.acceleration.x = 0;
            if (!this.body.onFloor()){
                this.body.drag.x = 500;
            }
        }
    }
}