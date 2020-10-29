class Scene_Account extends Phaser.Scene {

    constructor() {
        super({ key: "scene_account"});
    } // Fin constructor

    preload() {
        //Creación de imágenes
        this.background = this.add.image(0, 0, "simple-bg").setOrigin(0,0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.stars = this.add.tileSprite(0, 0, RelativeScale(1920,"x"),RelativeScale(1080,"y"), "stars")
        .setOrigin(0,0);

        // Teclas
        this.cursors;

    } // Fin preload

    create() {
        var that = this;

        // Formulario
        var element = this.add.dom(RelativeScale((1920/2), "x"), RelativeScale((1080/2), "y")).createFromCache('nameform');

        element.addListener('click');
    
        element.on('click', function (event) {
    
            if (event.target.name === 'loginButton')
            {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');
    
                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');
    
                    //  Cosas
                    that.scene.start("scene_main_menu");
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: this, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }
    
        });

        // Es un Sign Up
        if (that.game.global.logInOption == 1)
        {
            var buttonSubmit = document.getElementById("submit");
            buttonSubmit.value = "Sign Up";
        }

        //element.setVisible(false);

    } // Fin create

    update() {
        this.stars.tilePositionX += RelativeScale(0.2, "x");
        this.stars.tilePositionY += RelativeScale(0.4, "y");

        //console.log(this);
    } // Fin update

}