class Scene_Boot extends Phaser.Scene {
    constructor(){
        super({ key: "scene_boot" });
    }

    preload(){
        // Carga de imágenes
        ///Escena de Inicio de Sesión///
        this.load.image("simple-bg", "./Assets/Images/BackGrounds/simple_bg.png");
        this.load.image("stars", "./Assets/Images/BackGrounds/stars.png");

        ///Escena de Main Menú///
        this.load.image("main_menu-bg", "./Assets/Images/Tests/test_bg/MainMenu-BG.jpg");

        ///Escena de Ranking///
        this.load.image("ranking-bg", "./Assets/Images/Tests/test_bg/Ranking-BG.jpg");

        ///Escena de Créditos///
        this.load.image("credits-bg", "./Assets/Images/Tests/test_bg/Credits-BG.jpg");
        
        ///Escena de Selección de Personaje///
        this.load.image("select_character-bg", "./Assets/Images/Tests/test_bg/SelectCharacter-BG.jpg");

        ///Nivel 1///
        // Fondo
        this.load.image("level_1_bg", "./Assets/Images/BackGrounds/level_1_bg.png");
        // Plataformas
        this.load.image("floor", "./Assets/Images/Tests/test_plats/floor.png");
        this.load.image("base_big_plat_2", "./Assets/Images/Tests/test_plats/base_big_plat_2.png");
        this.load.image("base_t_plat", "./Assets/Images/Tests/test_plats/base_t_plat.png");
        this.load.image("big_plat_1", "./Assets/Images/Tests/test_plats/big_plat_1.png");
        this.load.image("big_plat_2", "./Assets/Images/Tests/test_plats/big_plat_2.png");
        this.load.image("plat_1", "./Assets/Images/Tests/test_plats/plat_1.png");
        this.load.image("plat_2", "./Assets/Images/Tests/test_plats/plat_2.png");
        this.load.image("plat_3", "./Assets/Images/Tests/test_plats/plat_3.png");
        this.load.image("t_plat", "./Assets/Images/Tests/test_plats/t_plat.png");
        this.load.image("bard", "./Assets/Images/Characters/bard.png");
        this.load.image("dummy", "./Assets/Images/Characters/Dummy.png");
        this.load.image("projectile", "./Assets/Images/Tests/projectile.png")
        // Animaciones Bardo
        this.load.spritesheet("bard_idle", "./Assets/Images/Characters/Animations/IdleAnimation_Bardo.png", { frameWidth: 170, frameHeight: 170 });
        this.load.spritesheet("bard_walk", "./Assets/Images/Characters/Animations/WalkAnimation_Bardo.png", { frameWidth: 170, frameHeight: 170 });
    }

    create(){
        this.scene.start("scene_test");
    }

    update(){

    }
}