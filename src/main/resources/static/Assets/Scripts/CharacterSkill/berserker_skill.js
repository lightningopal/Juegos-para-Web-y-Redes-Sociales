class BerserkerSkill extends Phaser.GameObjects.Sprite {
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
            var timeRemaining = this.duration - (time - this.startTime);
            if (timeRemaining > 0){
                if (this.flipX){
                    this.body.velocity.x = RelativeScale(-this.speed * (timeRemaining / this.duration) * (timeRemaining / this.duration));
                }else{
                    this.body.velocity.x = RelativeScale(this.speed * (timeRemaining / this.duration) * (timeRemaining / this.duration));
                }
            }else{
                this.isActive = false;
                this.x = RelativeScale(3000, "x");
            }
        }else{
            this.startTime = time;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }// Fin update

    DoSomething(character){
        console.log("Ataque de Berserker");
        // Animación de inicio
        // Se centra el ataque en el personaje
        this.x = character.x;
        this.y = character.y;
        this.flipX = character.flipX;
        this.isActive = true;
    }

    Damage(target, skill){
        this.isActive = false;
        // Animación de golpe
        this.x = RelativeScale(3000, "x");
        target.userInterface.Damage(skill.damage);
    }
}