class BardSkill extends Phaser.GameObjects.Sprite {
    constructor(scene, id, x, y, type, target, damage, duration){
        super(scene, x, y, type);

        this.scene = scene;
        this.id = id;
        this.target = target;
        this.damage = damage;
        this.duration = duration;
        this.startTime;

        this.radius = 1;
        this.radiusX = 1;
        this.radiusY = 1;

        this.isActive = false;
        // Se añade a la escena
        scene.add.existing(this);

        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.body.allowGravity = false;

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

    }// Fin constructor

    update(time, delta){
        /*
        if (this.isActive){
            // Si el tiempo transcurrido desde que empezó es menor que el tiempo de duración
            if (time - this.startTime <= this.duration){
                // Si el radio es menor que un determinado de valor, deja de crecer
                if (this.scaleX < 10){
                    //this.radius += 25;
                    console.log(this);
                    this.scaleX += RelativeScale(1,"x");
                    this.scaleY += 1;
                    //this.setScale(2,2);
                    //this.radiusX += RelativeScale(25, "x");
                    //this.radiusY += RelativeScale(25, "y");
                    this.body.setCircle(this.radius, (-this.radius + 0.5 * this.width), (-this.radius + 0.5 * this.height));
                }else{
                    this.scaleX = 10;
                    this.body.setCircle(this.radius, (-this.radius + 0.5 * this.width), (-this.radius + 0.5 * this.height));
                }
                this.IsInside();
            // Si se supera el tiempo de duración
            }else{
                this.isActive = false;
                this.x = RelativeScale(3000, "x");
            }
        }else{
            this.startTime = time;
        }
        */
    }// Fin update

    DoSomething(character){
        console.log("Ataque de Bardo");
        // Se centra el ataque en el personaje
        this.x = character.x;
        this.y = character.y;
        /**
        this.radius = this.width/2;
        this.scaleX = 1;
        this.scaleY = 1;
        //this.radiusX = 1;
        //this.radiusY = 1;
        this.body.setCircle(this.radius, (-this.radius + 0.5 * this.width), (-this.radius + 0.5 * this.height));
        this.isActive = true;
        /**/
    }

    IsInside(){
        //console.log("holi");
        var mX = Unscale(this.x, "x");
        var mY = Unscale(this.y, "y");
        var tX = Unscale(this.target.x, "x");
        var tY = Unscale(this.target.y, "y");
        var distance = Phaser.Math.Distance.Between(mX, mY, tX, tY);
        console.log(distance < this.radius);
    }
}