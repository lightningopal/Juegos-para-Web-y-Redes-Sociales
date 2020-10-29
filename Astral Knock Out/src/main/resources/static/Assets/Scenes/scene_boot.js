// Detecta si aun se estan cargando assets
var isLoading = true;

class Scene_Boot extends Phaser.Scene {
    constructor(){
        super({
            key: "scene_boot",
            pack: {
                files: [
                    {
                        type: 'image',
                        key: 'simple_bg',
                        url: './Assets/Images/BackGrounds/simple_bg.png'
                    },
                    {
                        type: 'image',
                        key: 'stars',
                        url: './Assets/Images/BackGrounds/stars.png'
                    }
                ]
            }
        });
    }

    preload(){
        // Background
        this.add.image(0, 0, "simple_bg").setOrigin(0,0).setScale(RelativeScale(1,"x"),RelativeScale(1,"y"));
        this.tilesprite = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars").setOrigin(0,0);

        // Barra de carga
        let loadingBar = this.add.graphics({
            lineStyle: {
                width: 5,
                color: 0x996600
            },
            fillStyle: {
                color: 0xffff00
            }
        });

        let loadingText = this.make.text({
            x: this.game.renderer.width / 2,
            y: this.game.renderer.height / 2 - 30,
            text: 'Please wait...',
            style: {
                font: '24px font_Ftb',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: this.game.renderer.width / 2,
            y: this.game.renderer.height / 2 + 20,
            text: '0%',
            style: {
                font: '20px font_Ftb',
                fill: '#000000'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: this.game.renderer.width / 2,
            y: this.game.renderer.height / 2 + 70,
            text: '',
            style: {
                font: '24px font_Ftb',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', (percent) => {
            loadingBar.clear();
            percentText.setText(parseInt(percent * 100) + '%');

            loadingBar.fillRect(this.game.renderer.width / 2 - this.game.renderer.width / 8,
                this.game.renderer.height / 2,
                this.game.renderer.width * percent / 4,
                40);
            loadingBar.strokeRect(this.game.renderer.width / 2 - this.game.renderer.width / 8,
                this.game.renderer.height / 2,
                this.game.renderer.width / 4,
                40);
        })

        this.load.on('fileprogress', (file) => {
            assetText.setText('Loading: ' + file.key);
        })
        this.load.on('complete', () => {
            isLoading = false;
            switch(game.global.DEVICE){
                case "desktop":
                    loadingText.setText('Press enter to start');
                    break;
                case "mobile":
                    loadingText.setText('Tap anywhere to start');
                    break;
                default:
                    loadingText.setText('Sorry, your device isn`t available');
                    break;
            }
            assetText.setText('Load complete.');
        })

        // Carga de imágenes
        ///Escena de Inicio de Empresa, Boot///

        ///Escena de Inicio de Sesión///
        this.load.image("simple_bg", "./Assets/Images/BackGrounds/simple_bg.png");
        this.load.image("stars", "./Assets/Images/BackGrounds/stars.png");

        ///Escena de Main Menú///
        this.load.image("main_menu_bg", "./Assets/Images/BackGrounds/main_menu_bg.png");
        this.load.image("main_menu_nebula", "./Assets/Images/BackGrounds/main_menu_nebula.png");
        this.load.image("main_menu_stars", "./Assets/Images/BackGrounds/main_menu_stars.png");
        this.load.image("main_menu_interface", "./Assets/Images/UI/main_menu_interface.png");

        this.load.spritesheet("tournament_button", "./Assets/Images/UI/tournament_button.png", { frameWidth: 972.5, frameHeight: 125 });
        this.load.spritesheet("gym_button", "./Assets/Images/UI/gym_button.png", { frameWidth: 976, frameHeight: 135 });
        this.load.spritesheet("ranking_button", "./Assets/Images/UI/ranking_button.png", { frameWidth: 814, frameHeight: 122 });
        this.load.spritesheet("credits_button", "./Assets/Images/UI/credits_button.png", { frameWidth: 173, frameHeight: 155 });
        this.load.spritesheet("options_button", "./Assets/Images/UI/options_button.png", { frameWidth: 169, frameHeight: 167 });

        ///Escena de Ranking///
        this.load.image("ranking_bg", "./Assets/Images/Tests/test_bg/Ranking-BG.jpg");

        ///Escena de Opciones///
        this.load.image("options_interface", "./Assets/Images/UI/options_interface.png");
        this.load.spritesheet("volume_button", "./Assets/Images/UI/volume_button.png", { frameWidth: 76, frameHeight: 143 });

        ///Escena de Créditos///
        this.load.image("credits_bg", "./Assets/Images/Tests/test_bg/Credits-BG.jpg");
        
        ///Escena de Selección de Personaje, Habilidad y Escenario///
        this.load.image("select_character_bg", "./Assets/Images/Tests/test_bg/SelectCharacter-BG.jpg");

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
        this.load.spritesheet("wizard_attack", "./Assets/Images/Characters/Animations/AttackAnimation_Wizard.png", { frameWidth: 140, frameHeight: 150 });

        ///Escena de Fin de Partida///

        
        
    }// Fin preload

    create(){
        // Creamos las animaciones
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
            frameRate: 12,
            repeat: -1
        });
        
        this.anims.create({
            key: 'wizard_attack',
            frames: this.anims.generateFrameNumbers('wizard_attack', { start: 0, end: 10 }),
            frameRate: 1,
            repeat: -1
        });

        switch (game.global.DEVICE){
            case "desktop":
                this.input.keyboard.on('keydown-'+"ENTER", function () {
                    if (!isLoading) {
                        this.scene.input.keyboard.removeAllKeys(true);
                        this.scene.scene.start("scene_main_menu");
                    }
                });
                break;
            case "mobile":
                this.input.on('pointerdown', function () {
                    if (!isLoading) {
                        this.scene.scene.start("scene_main_menu");
                    }
                });
                break;
            default:

                break;
        }
        
    } // Fin create

    update(){
        this.tilesprite.tilePositionX += 0.2;
        this.tilesprite.tilePositionY += 0.4;
    }
}
