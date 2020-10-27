class Scene_Boot extends Phaser.Scene {
    constructor(){
        super({ key: "scene_boot" });
    }// Fin constructor

    preload(){
        // Carga de imágenes
        ///Escena de Inicio de Empresa, Boot///

        ///Escena de Inicio de Sesión///
        this.load.image("simple-bg", "./Assets/Images/BackGrounds/simple_bg.png");
        this.load.image("stars", "./Assets/Images/BackGrounds/stars.png");

        ///Escena de Main Menú///
        this.load.image("main_menu-bg", "./Assets/Images/Tests/test_bg/MainMenu-BG.jpg");

        ///Escena de Ranking///
        this.load.image("ranking-bg", "./Assets/Images/Tests/test_bg/Ranking-BG.jpg");

        ///Escena de Opciones///

        ///Escena de Créditos///
        this.load.image("credits-bg", "./Assets/Images/Tests/test_bg/Credits-BG.jpg");
        
        ///Escena de Selección de Personaje, Habilidad y Escenario///
        this.load.image("select_character-bg", "./Assets/Images/Tests/test_bg/SelectCharacter-BG.jpg");

        ///Nivel 1///
        // Fondo
        this.load.image("level_1_bg", "./Assets/Images/BackGrounds/level_1_bg.png");
        this.load.image("level_1_bg_details", "./Assets/Images/BackGrounds/level_1_bg_details.png");
        this.load.image("level_1_bg_move", "./Assets/Images/BackGrounds/level_1_bg_move.png");
        this.load.image("level_1_fg_details", "./Assets/Images/BackGrounds/level_1_fg_details.png");
        this.load.image("level_1_fg_move", "./Assets/Images/BackGrounds/level_1_fg_move.png");
        this.load.image("level_1_plats_floor", "./Assets/Images/BackGrounds/level_1_plats_floor.png");
        // Plataformas
        this.load.image("floor", "./Assets/Images/Platforms/floor.png");
        this.load.image("base_big_plat_2", "./Assets/Images/Platforms/base_big_plat_2.png");
        this.load.image("base_t_plat", "./Assets/Images/Platforms/base_t_plat.png");
        this.load.image("big_plat_1", "./Assets/Images/Platforms/big_plat_1.png");
        this.load.image("level_1_trans", "./Assets/Images/Platforms/level_1_trans.png");
        this.load.image("big_plat_2", "./Assets/Images/Platforms/big_plat_2.png");
        this.load.image("plat_1", "./Assets/Images/Platforms/plat_1.png");
        this.load.image("plat_2", "./Assets/Images/Platforms/plat_2.png");
        this.load.image("plat_3", "./Assets/Images/Platforms/plat_3.png");
        this.load.image("t_plat", "./Assets/Images/Platforms/t_plat.png");
        this.load.image("bard", "./Assets/Images/Characters/Bard.png");
        this.load.image("dummy", "./Assets/Images/Characters/Dummy.png");
        this.load.image("projectile", "./Assets/Images/Tests/projectile.png")
        // Animaciones Bardo
        this.load.spritesheet("bard_idle", "./Assets/Images/Characters/Animations/IdleAnimation_Bard.png", { frameWidth: 170, frameHeight: 170 });
        this.load.spritesheet("bard_walk", "./Assets/Images/Characters/Animations/WalkAnimation_Bard.png", { frameWidth: 170, frameHeight: 170 });
        this.load.spritesheet("bard_attack", "./Assets/Images/Characters/Animations/AttackAnimation_Bard.png", { frameWidth: 170, frameHeight: 170 });
        // Animaciones Mago
        this.load.spritesheet("wizard_idle", "./Assets/Images/Characters/Animations/IdleAnimation_Wizard.png", { frameWidth: 140, frameHeight: 150 });
        this.load.spritesheet("wizard_walk", "./Assets/Images/Characters/Animations/WalkAnimation_Wizard.png", { frameWidth: 140, frameHeight: 150 });
        // this.load.spritesheet("wizard_attack", "./Assets/Images/Characters/Animations/AttackAnimation_Wizard.png", { frameWidth: 170, frameHeight: 170 });

        ///Escena de Fin de Partida///
        
    }// Fin preload

    create(){
        // Creamos las animaciones del bardo
        this.anims.create({
            key: 'bard_idle',
            frames: this.anims.generateFrameNumbers('bard_idle', { start: 1, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'bard_walk',
            frames: this.anims.generateFrameNumbers('bard_walk', { start: 0, end: 10 }),
            frameRate: 48,
            repeat: -1
        });
        this.anims.create({
            key: 'bard_attack',
            frames: this.anims.generateFrameNumbers('bard_attack', { start: 0, end: 10 }),
            frameRate: 1,
            repeat: -1
        });
        
        // Creamos las animaciones del mago
        this.anims.create({
            key: 'wizard_idle',
            frames: this.anims.generateFrameNumbers('wizard_idle', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'wizard_walk',
            frames: this.anims.generateFrameNumbers('wizard_walk', { start: 0, end: 9 }),
            frameRate: 48,
            repeat: -1
        });
        // this.anims.create({
        //     key: 'wizard_attack',
        //     frames: this.anims.generateFrameNumbers('wizard_attack', { start: 0, end: 0 }),
        //     frameRate: 1,
        //     repeat: -1
        // });
        
    }// Fin create

    update(){
        this.scene.start("scene_main_menu");
    }// Fin upload
}// Fin SceneBoot