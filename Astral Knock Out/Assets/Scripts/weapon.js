class Weapon {
    constructor(scene, attackRatio, shot){
        this.scene = scene;
        this.attackRatio = attackRatio;
        this.shot = shot;
        this.nextShot = 0.0;
        this.canShoot = true;
        this.time = 0.0;
        this.character;

        // Establecemos el evento update
        this.scene.events.on("update", this.update, this);

    }// Fin constructor

    update(time, delta){
        this.time = time;
        if (this.time > this.nextShot)
        {
            // Añadimos la bala al array de balas
            //this.scene.bullets[this.scene.bullets.length] = new Shot(this, 0, this.x, this.y, 10, 10, this.color, 10, 1, 20);
            //this.scene.bullets[this.scene.bullets.length].bulletIndex = this.scene.bullets.length;
            this.canShoot = true;
            //this.nextShot = time + this.attackRatio;
        }else{
            this.canShoot = false;
        }
    }// Fin update

    shoot(){
        console.log("Pium pium");
        // Instanciar ataque
        
        this.nextShot = this.time + this.attackRatio;
    }
}