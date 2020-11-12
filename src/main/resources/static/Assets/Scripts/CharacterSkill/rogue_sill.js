class RogueSkill extends Phaser.GameObjects.Sprite {
    constructor(scene, id, x, y, type, target, damage, speed, duration, delay){
        super(scene, x, y, type);

        this.scene = scene;
        this.id = id;
        this.target = target;
        this.damage = damage;
        this.speed = speed;
        this.duration = duration;
        this.delay = delay;
        this.startTime;

        this.isActive = false;
        // Se añade a la escena
        scene.add.existing(this);

        // Se activan las físicas
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.body.allowGravity = true;
        this.body.gravity.y = RelativeScale(-1500, "y");

        this.scene.physics.add.overlap(this.target, this, this.Damage, null, this);
        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

    }// Fin constructor

    update(time, delta){

    }// Fin update

    DoSomething(character){
        console.log("Ataque de Pícaro");
        console.log("Hola " + this.id);
        var that = this;
        setTimeout(function(){
            console.log("Adiós " + that.id);
            // Animación de inicio
            // Se centra el ataque en el personaje
            that.flipX = character.flipX;
            that.x = character.x;
            that.y = character.y;
            that.isActive = true;
            if (that.flipX){
                that.body.velocity.x = -that.speed * scaleX;
            }else {
                that.body.velocity.x = that.speed * scaleX;
            }
            that.body.velocity.y = -10;
        }, this.delay);
    }

    Damage(target, skill){
        this.isActive = false;
        // Animación de golpe
        this.x = RelativeScale(3000, "x");
        target.userInterface.Damage(skill.damage);
    }
}