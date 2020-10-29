class BardSkill extends Phaser.GameObjects.Sprite {
    constructor(scene, id, x, y, type, target, damage, speed, duration){
        super(scene, x, y, type);

        this.scene = scene;
        this.id = id;
        this.target = target;
        this.damage = damage;
        this.speed = speed;
        this.duration = duration;
        this.startTime;

        this.isActive = false;
        // Se añade a la escena
        scene.add.existing(this);

        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.body.allowGravity = false;

        this.scene.physics.add.overlap(this.target, this, this.Damage, null, this);
        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);
    }// Fin constructor

    update(time, delta){
        if (this.isActive){
            // Si el ataque está activo, se moverá al objetivo desde el inicio hasta la duración
            // del hechizo, reduciendo su velocidad de forma gradual, e ignorando las paredes
            var timeRemaining = this.duration - (time - this.startTime);
            if (timeRemaining > 0){
                var directionX =  Unscale(this.target.x - this.x, "x");
                var directionY =  Unscale(this.target.y - this.y, "y");
                var direction = new Phaser.Math.Vector2(directionX, directionY).normalize();
                this.body.velocity.x = RelativeScale(direction.x * this.speed * (timeRemaining / this.duration), "x");
                this.body.velocity.y = RelativeScale(direction.y * this.speed * (timeRemaining / this.duration),"y");
            }else{
                this.isActive = false;
                // Animación de fin
                this.x = RelativeScale(3000, "x");
            }
        }else{
            this.startTime = time;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        this.flipX = (this.body.velocity.x < 0);
    }// Fin update

    DoSomething(character){
        console.log("Ataque de Bardo");
        // Animación de inicio
        // Se centra el ataque en el personaje
        this.x = character.x;
        this.y = character.y;
        this.isActive = true;
    }

    Damage(target, skill){
        this.isActive = false;
        // Animación de golpe
        this.x = RelativeScale(3000, "x");
        target.userInterface.Damage(skill.damage);
    }
}