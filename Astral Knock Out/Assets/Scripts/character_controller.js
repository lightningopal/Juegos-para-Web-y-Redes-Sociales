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
        this.isOnAir = false;

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

        // Añadimos el sprite del personaje
        //this.sprite = this.scene.add.sprite(x, y, 'character_' + id); COMENTAR;
        this.body.drag.x = 3500;
        console.log(this.body);
        this.cursors.jump.on('down', function (event) {
            that.jump();
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
            this.mobileKeys.jumpButton.on('pointerdown',that.jump,this);
    }// Fin constructor

    die() {
        console.log("ME MUEROOOOOO");
    }

    update(time, delta) {
        // Físicas de personaje
        if (this.body.onFloor()) {
            this.numJumps = 1;
            this.body.drag.x = 3500;

            // Anadido para corregir velocidad suelo tras aire
            if (this.isOnAir) {
                this.isOnAir = false;
                if (this.body.velocity.x < -(0.1)) {
                    this.body.velocity.x = -(this.moveSpeed);
                    this.body.acceleration.x = -(1);
                }
                else if (this.body.velocity.x > 0.1) {
                    this.body.velocity.x = (this.moveSpeed);
                    this.body.acceleration.x = (1);
                }
                else {
                    this.body.velocity.x = 0;
                    this.body.acceleration.x = 0;
                }
            }
        }

        // Movimiento movil
        if (options.device == "mobile" && this.mobileKeys.joyStick != null)
        {
            // Izquierda
            if ((this.mobileKeys.joyStick.angle < -(90) || this.mobileKeys.joyStick.angle > 135) && this.mobileKeys.joyStick.force > 16)
            {
                this.body.velocity.x = -(this.moveSpeed);
                this.body.acceleration.x = -(1);
            }
            // Derecha
            else if ((this.mobileKeys.joyStick.angle > -(90) && this.mobileKeys.joyStick.angle < 45) && this.mobileKeys.joyStick.force > 16)
            {
                this.body.velocity.x = (this.moveSpeed);
                this.body.acceleration.x = (1);
            }
            else
            {
                this.body.velocity.x = (0);
                this.body.acceleration.x = (0);
            }
        }

    }// Fin update

    jump() {
        //console.log(this.id+": Salto");
        if (this.body.onFloor() || this.numJumps == 1) {
            this.isOnAir = true;
            this.body.velocity.y = -this.jumpForce;
            this.numJumps--;

            if (this.body.velocity.x < -(0.1))
                this.body.velocity.x = -(this.moveSpeed / 2);
            else if (this.body.velocity.x > 0.1)
                this.body.velocity.x = (this.moveSpeed / 2);
            else
                this.body.velocity.x = 0;
        }
    }

    moveLeft() {
        if (this.body.onFloor()) {
            this.body.velocity.x = -(this.moveSpeed);
        } else {
            this.body.velocity.x = -(this.moveSpeed / 2);
        }
        this.body.acceleration.x = -(1);
    }
    stopLeft() {
        if (this.body.velocity.x <= 0) {
            this.body.acceleration.x = 0;
            if (!this.body.onFloor()) {
                this.body.drag.x = 500;
            }
        }
    }
    moveRight() {
        if (this.body.onFloor()) {
            this.body.velocity.x = (this.moveSpeed);

        } else {
            this.body.velocity.x = (this.moveSpeed / 2);
        }
        this.body.acceleration.x = (1);
    }
    stopRight() {
        if (this.body.velocity.x >= 0) {
            this.body.acceleration.x = 0;
            if (!this.body.onFloor()) {
                this.body.drag.x = 500;
            }
        }
    }
}