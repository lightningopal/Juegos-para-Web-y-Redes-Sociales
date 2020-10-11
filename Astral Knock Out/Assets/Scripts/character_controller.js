class Character_Controller extends Phaser.GameObjects.Rectangle /*Sprite*/ {
    constructor(scene, id, x, y, w, h, color, cursors, mobileKeys, moveSpeed, jumpForce, actualHP, maxHP) {
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
        this.mobileKeys = mobileKeys;

        // Se añade a la escena
        scene.add.existing(this);

        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.maxVelocity.x = moveSpeed;
        this.body.setCollideWorldBounds(true);

        this.movingLeft = false;
        this.movingRight = false;

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

        // Añadimos el sprite del personaje
        //this.sprite = this.scene.add.sprite(x, y, 'character_' + id); COMENTAR;
        this.body.drag.x = 3000;

        this.cursors.jump.on('down', function (event) {
            that.jump();
        });
        this.cursors.fall.on('down', function (event) {
            that.fall();
        });
        this.cursors.left.on('down', function (event) {
            that.moveLeft();
        });
        this.cursors.left.on('up', function (event) {
            that.stopLeft();
        });
        this.cursors.right.on('down', function (event) {
            that.moveRight();
        });
        this.cursors.right.on('up', function (event) {
            that.stopRight();
        });

        // Mobile
        if (options.device == "mobile")
        {
            this.mobileKeys.jumpButton.on('pointerdown',that.jump,this);
            this.mobileKeys.jumpButton.on('pointerup',that.setButtonNormalColor,this);
        }
    }// Fin constructor

    die() {
        console.log("ME MUEROOOOOO");
    }

    update(time, delta) {
        console.log(this.body.velocity.y);
        // Físicas de personaje
        if (this.body.onFloor()) {
            this.numJumps = 1;
            this.body.drag.x = 3000;
            /*
            if (this.movingLeft){
                this.body.velocity.x = -(this.moveSpeed);
            }
            else if (this.movingRight){
                this.body.velocity.x = (this.moveSpeed);
            }
            */
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
                this.fall();
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

    }// Fin update

    jump() {
        if (this.body.onFloor() || this.numJumps == 1) {
            this.body.velocity.y = -this.jumpForce;
            this.numJumps--;
        }

        if (options.device == "mobile")
            this.mobileKeys.jumpButton.setFillStyle(0x888888);
    }

    fall(){
        this.body.velocity.y = 900;
    }

    moveLeft() {
        this.movingLeft = true;
        this.movingRight = false;
        if (this.body.onFloor()) {
            //this.body.velocity.x = -(this.moveSpeed);
            this.body.acceleration.x = -(this.moveSpeed*8);
        } else {
            this.body.acceleration.x = -(this.moveSpeed*6);
        }
        
    }
    stopLeft() {
        this.movingLeft = false;
        if (!this.movingRight) {
            this.body.acceleration.x = 0;
            if (!this.body.onFloor()) {
                this.body.drag.x = 500;
            }
        }
    }
    moveRight() {
        this.movingRight = true;
        this.movingLeft = false;
        if (this.body.onFloor()) {
            //this.body.velocity.x = (this.moveSpeed);
            this.body.acceleration.x = (this.moveSpeed*8);

        } else {
            this.body.acceleration.x = (this.moveSpeed*6);
        }
        
    }
    stopRight() {
        this.movingRight = false;
        if (!this.movingLeft) {
            this.body.acceleration.x = 0;
            if (!this.body.onFloor()) {
                this.body.drag.x = 500;
            }
        }
    }

    // Mobile
    setButtonNormalColor()
    {
        this.mobileKeys.jumpButton.setFillStyle(0xdddddd);
    }
}