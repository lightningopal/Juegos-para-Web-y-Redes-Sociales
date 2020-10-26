class Character_Controller extends Phaser.GameObjects.Sprite {
    constructor(scene, id, x, y, type, scale, cursors, mobileKeys, moveSpeed, jumpForce, maxHP, bW, sW) {
        super(scene, x, y, type);

        var that = this;
        // Atributos
        this.scene = scene;
        this.id = id;
        this.moveSpeed = moveSpeed;
        this.jumpForce = jumpForce;
        this.numJumps = 2;
        this.maxHP = maxHP;
        this.actualHP = maxHP;
        this.userInterface = new UserInterface(scene, this, maxHP, 40);
        this.cursors = cursors;
        this.mobileKeys = mobileKeys;
        this.type = type;
        // Ataques
        this.basicWeapon = bW;
        if (bW != undefined){
            this.basicWeapon.character = this;
        }
        this.specialWeapon = sW;
        if (sW != undefined){
            this.specialWeapon.character = this;
        }
        // Se añade a la escena
        scene.add.existing(this).setScale(1);
        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.maxVelocity.x = moveSpeed*1.5;
        this.body.drag.x = 3000;
        this.body.setSize(this.width/3,115).setOffset(this.width/3,this.height/3 - 10);
        //this.body.setCollideWorldBounds(true);
        // Variables de control
        this.movingLeft = false;
        this.movingRight = false;
        this.falling = false;
        // Restringir la acción si attacking == true
        this.attacking = false;
        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);
        // Eventos de movimiento y ataque
        if (this.cursors != undefined){
            this.cursors.jump.on('down', function (event) {
                that.Jump();
            });
            this.cursors.fall.on('down', function (event) {
                that.Fall();
            });
            this.cursors.left.on('down', function (event) {
                that.flipX = true;
                that.MoveLeft();
            });
            this.cursors.left.on('up', function (event) {
                that.StopLeft();
            });
            this.cursors.right.on('down', function (event) {
                that.flipX = false;
                that.MoveRight();
            });
            this.cursors.right.on('up', function (event) {
                that.StopRight();
            });
    
            this.cursors.basicAttack.on('down', function(event){
                if (!that.attacking && that.basicWeapon.canAttack){
                    that.attacking = true;
                    that.body.allowGravity = false;
                    //that.body.velocity.x = 0;
                    //that.body.velocity.y = 0;
                    // Animación
                    // Este código va en la función onAnimComplete (cuando termine de lanzar el ataque se spawnea)
                    console.log("Básico: ");
                    that.basicWeapon.Attack();
                    that.attacking = false;
                    that.body.allowGravity = true;
                }
            });
            this.cursors.specialAttack.on('down', function(event){
                if (!that.attacking && that.specialWeapon.canAttack){
                    that.attacking = true;
                    that.body.allowGravity = false;
                    // Animación
                    // Este código va en la función onAnimComplete (cuando termine de lanzar el ataque se spawnea)
                    console.log("Especial: ");
                    that.specialWeapon.Attack();
                    that.attacking = false;
                    that.body.allowGravity = true;
                }
            });
        }
        // Mobile
        if (options.device == "mobile" && this.mobileKeys != undefined)
        {
            this.mobileKeys.jumpButton.on('pointerdown',that.Jump,this);
            this.mobileKeys.jumpButton.on('pointerup',that.SetButtonNormalColor,this);
        }
    }// Fin constructor

    update(time, delta) {
        // Físicas de personaje
        if (this.body.onFloor()) {
            this.numJumps = 1;
            this.body.drag.x = 3000;
            this.falling = false;
        }

        // Movimiento movil
        if (options.device == "mobile" && this.mobileKeys.joyStick != null)
        {
            // Izquierda
            if ((this.mobileKeys.joyStick.angle < -(90) || this.mobileKeys.joyStick.angle > 135) && this.mobileKeys.joyStick.force > 16)
            {
                this.movingLeft = true;
                this.movingRight = false;
                if (this.body.onFloor()) {
                    //this.body.velocity.x = -(this.moveSpeed);
                    this.body.acceleration.x = -(this.moveSpeed*8);
                } else {
                    this.body.acceleration.x = -(this.moveSpeed*6);
                }
            }
            // Derecha
            else if ((this.mobileKeys.joyStick.angle > -(90) && this.mobileKeys.joyStick.angle < 45) && this.mobileKeys.joyStick.force > 16)
            {
                this.movingRight = true;
                this.movingLeft = false;
                if (this.body.onFloor()) {
                    //this.body.velocity.x = (this.moveSpeed);
                    this.body.acceleration.x = (this.moveSpeed*8);
        
                } else {
                    this.body.acceleration.x = (this.moveSpeed*6);
                }
            }else if ((this.mobileKeys.joyStick.angle > 45 && this.mobileKeys.joyStick.angle < 135) && this.mobileKeys.joyStick.force > 16){
                this.Fall();
            }else
            {
                this.movingRight = false;
                this.movingLeft = false;
                //this.body.velocity.x = (0); La velocidad se resta sola con el rozamiento
                this.body.acceleration.x = 0;
                if (!this.body.onFloor()) {
                    this.body.drag.x = 500;
                }
            }
        }
        // Gravedad mayor al caer
        if (this.body.velocity.y > -50 && !this.falling){
            this.body.gravity.y = RelativeScale(800, "y");
        } else if (this.falling){
            this.body.gravity.y = RelativeScale(3000, "y");
        }else {
            this.body.gravity.y = 0;
        }

        this.PlayAnimation();

    }// Fin update

    Die() {
        console.log("ME MUEROOOOOO");
    }

    Jump() {
        this.falling = false;
        if (this.body.onFloor()) {
            this.body.velocity.y = -this.jumpForce;
        }else if (this.numJumps >= 1){
            this.body.velocity.y = -this.jumpForce;
            this.numJumps--;
        }

        if (options.device == "mobile")
            this.mobileKeys.jumpButton.setFillStyle(0x888888);
    }

    Fall(){
        if (this.body.velocity.y < 0){
            this.body.velocity.y = 0;
        }
        this.falling = true;
    }

    MoveLeft() {
        this.movingLeft = true;
        this.movingRight = false;
        if (this.body.onFloor()) {
            //this.body.velocity.x = -(this.moveSpeed);
            this.body.acceleration.x = -(this.moveSpeed*8);
        } else {
            this.body.acceleration.x = -(this.moveSpeed*6);
        }
        
    }
    StopLeft() {
        this.movingLeft = false;
        if (!this.movingRight) {
            this.body.acceleration.x = 0;
            if (!this.body.onFloor()) {
                this.body.drag.x = 500;
            }
        }
    }
    MoveRight() {
        this.movingRight = true;
        this.movingLeft = false;
        if (this.body.onFloor()) {
            //this.body.velocity.x = (this.moveSpeed);
            this.body.acceleration.x = (this.moveSpeed*8);

        } else {
            this.body.acceleration.x = (this.moveSpeed*6);
        }
        
    }
    StopRight() {
        this.movingRight = false;
        if (!this.movingLeft) {
            this.body.acceleration.x = 0;
            if (!this.body.onFloor()) {
                this.body.drag.x = 500;
            }
        }
    }

    PlayAnimation()
    {
        //console.log(Math.abs(this.body.velocity.x));
        switch (this.type)
        {
            case "bard":
                if (Math.abs(this.body.velocity.x) <= 10)
                {
                    this.anims.play('bard_idle', true);
                }
                else
                {
                    this.anims.play('bard_walk', true);
                }
            break;
        }
    }

    // Mobile
    SetButtonNormalColor()
    {
        this.mobileKeys.jumpButton.setFillStyle(0xdddddd);
    }
}