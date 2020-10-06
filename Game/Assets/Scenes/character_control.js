class Character_Control extends Phaser.Scene {
    constructor(){
        super({key: "character_control"});
    }

    preload(){

    }

    create(){
        console.log("Hello World");
        
        //var char = this.add.rectangle(100,100,50,50, 0xaaffaa);
        var char = new Character_Controller(this, 0, 100, 100, 50, 50, 0xaaffaa);
        //this.physics.world.enable(char);
        //char.body.setCollideWorldBounds(true);
        console.log(char.body);
    }

    update(){

    }

}