class UserInterface{
    constructor(scene, character, maxHP, offset, color){
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.setDepth(5);
        this.scene = scene;
        this.character = character;
        this.maxHP = maxHP;
        this.currentHP = this.maxHP;
        this.offset = offset;
        this.color = color;

        this.x = character.x - RelativeScale(55, "x");
        this.y = character.y - RelativeScale(offset, "y");

        this.Draw();
        this.scene.events.on("update", this.update, this);
        scene.add.existing(this.bar);
    }

    update(time, delta){
        this.x = this.character.x - RelativeScale(55, "x");
        this.y = this.character.y - RelativeScale(this.offset, "y");
        this.Draw();
    }

    Draw(){
        this.bar.clear();

        //  BG
        // this.bar.fillStyle(0xaaffaa);
        this.bar.fillStyle(0xff55ff);
        this.bar.fillRect(this.x, this.y, RelativeScale(110, "x"), RelativeScale(10,"y"));

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + RelativeScale(5,"x"), this.y + RelativeScale(2,"y"), RelativeScale(100,"x"), RelativeScale(6,"y"));

        this.bar.fillStyle(this.color);
        var d = Math.floor(this.currentHP / this.maxHP * 100);

        this.bar.fillRect(this.x + RelativeScale(5,"x"), this.y + RelativeScale(2,"y"), RelativeScale(d, "x"), RelativeScale(6,"y"));
    }

    Damage(value){
        this.currentHP -= value;
        if (this.currentHP <= 0){
            if (this.character.texture.key == "dummy"){
                this.currentHP = this.maxHP;
            }
        }
    }
}