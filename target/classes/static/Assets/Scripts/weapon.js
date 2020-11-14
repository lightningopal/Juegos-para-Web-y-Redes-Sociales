class Weapon {
    constructor(scene, attackRatio, attacks, groupSize){
        this.scene = scene;
        this.attackRatio = attackRatio;
        //this.shot = shot;
        this.attacks = attacks;
        this.groupSize = groupSize;
        this.currentShot = 0;
        this.nextAttack = 0.0;
        this.canAttack = true;
        this.time = 0.0;
        this.character;

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

    }// Fin constructor

    update(time, delta){
        this.time = time;
        if (this.time > this.nextAttack)
        {
            // Añadimos la bala al array de balas
            //this.scene.bullets[this.scene.bullets.length] = new Shot(this, 0, this.x, this.y, 10, 10, this.color, 10, 1, 20);
            //this.scene.bullets[this.scene.bullets.length].bulletIndex = this.scene.bullets.length;
            this.canShoot = true;
            //this.nextAttack = time + this.attackRatio;
        }else{
            this.canShoot = false;
        }
    }// Fin update

    Attack(){
        // Instanciar ataque
        //this.shot.DoSomething(this.character);
        for (var i = 0; i < this.groupSize; i++){
            this.attacks[this.currentShot + i].DoSomething(this.character);
        }
        this.currentShot = (this.currentShot+this.groupSize) % this.attacks.length;
        this.nextAttack = this.time + this.attackRatio;
    }
}