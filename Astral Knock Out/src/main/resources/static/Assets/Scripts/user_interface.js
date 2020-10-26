class UserInterface{
    constructor(scene, character, maxHP, offset){
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.scene = scene;
        this.character = character;
        this.maxHP = maxHP;
        this.currentHP = this.maxHP;
        this.offset = offset;

        this.x = character.x  - RelativeScale(character.width/2 - offset, "x");
        this.y = character.y  - RelativeScale(character.height/2 + 20, "y");

        this.Draw();
        this.scene.events.on("update", this.update, this);
        scene.add.existing(this.bar);
    }

    update(time, delta){
        this.x = this.character.x  - RelativeScale(this.character.width/2 - this.offset, "x");
        this.y = this.character.y  - RelativeScale(this.character.height/2 + 20, "y");
        this.Draw();
    }

    Draw(){
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0xaaffaa);
        this.bar.fillRect(this.x, this.y, RelativeScale(110, "x"), RelativeScale(16,"y")).setDepth(5);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + RelativeScale(5,"x"), this.y + RelativeScale(4,"y"), RelativeScale(100,"x"), RelativeScale(8,"y"))
        .setDepth(5);

        if (this.currentHP < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }
        var d = Math.floor(this.currentHP / this.maxHP * 100);

        this.bar.fillRect(this.x + RelativeScale(5,"x"), this.y + RelativeScale(4,"y"), RelativeScale(d, "x"), RelativeScale(8,"y"))
        .setDepth(5);
    }

    Damage(value){
        this.currentHP -= value;
        if (this.currentHP <= 0){
            if (this.character.texture.key == "dummy"){
                this.currentHP = this.maxHP;
            }else{
                this.character.Die();
            }
        }
    }
}