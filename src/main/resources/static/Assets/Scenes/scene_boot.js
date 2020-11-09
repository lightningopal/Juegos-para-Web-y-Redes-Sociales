// Detecta si aun se estan cargando assets
var isLoading = true;

class Scene_Boot extends Phaser.Scene {
    constructor() {
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

    preload() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_boot";

        // Background
        this.add.image(0, 0, "simple_bg").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.tilesprite = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars").setOrigin(0, 0);

        if (!game.global.hasLoadData)
        {
            /// Barra de carga ///
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
                loadingText.setText('Connecting to server...');

                // WEBSOCKETS
                try
                {
                    game.global.socket = new WebSocket("ws://" + "localhost:8080" + "/ako");
                    //game.global.socket = new WebSocket("wss://" + "astral-knock-out.herokuapp.com" + "/ako");
                }
                catch(error)
                {
                    if (game.global.DEBUG_MODE) {
                        console.log('Cant connect to WS');
                    }
                }

                game.global.socket.onopen = () => {
                    that.SetSocketMessages();
                    that.load.off('progress');
                    that.load.off('fileprogress');
                    that.load.off('complete');
                    if (game.global.DEBUG_MODE) {
                        console.log('[DEBUG] WebSocket connection opened.');
                    }
                    try {
                        switch (game.global.DEVICE) {
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
                    }
                    finally {
                        game.global.WS_CONNECTION = true;
                    }
                }

                game.global.socket.onclose = () => {
                    if (game.global.DEBUG_MODE) {
                        console.log('[DEBUG] WebSocket connection closed.');
                    }
                    try {
                        if (this.scene.isActive("scene_boot"))
                        {
                            loadingText.setText('Connection failed, try again later');
                        }
                        else
                        {
                            this.scene.get(game.global.actualScene).input.keyboard.removeAllKeys(true);
                            this.scene.get(game.global.actualScene).scene.start("scene_disconnected");
                        }
                    } catch (error) {
                        if (game.global.DEBUG_MODE) {
                            console.log(error);
                        }
                    } finally {
                        game.global.WS_CONNECTION = false;
                    }
                }
                assetText.setText('Load complete.');
            });
        

            // Carga de imágenes
            ///Escena de Inicio de Empresa, Boot///


            ///Escena de Inicio de Sesión///
            this.load.image("simple_bg", "./Assets/Images/BackGrounds/simple_bg.png");
            this.load.image("stars", "./Assets/Images/BackGrounds/stars.png");
            this.load.spritesheet("log_in_button", "./Assets/Images/UI/log_in_button.png", { frameWidth: 709, frameHeight: 129 });
            this.load.spritesheet("sign_up_button", "./Assets/Images/UI/sign_up_button.png", { frameWidth: 700, frameHeight: 129 });

            ///Escena de Main Menú///
            this.load.image("main_menu_bg", "./Assets/Images/BackGrounds/main_menu_bg.png");
            this.load.image("main_menu_nebula", "./Assets/Images/BackGrounds/main_menu_nebula.png");
            this.load.image("main_menu_stars", "./Assets/Images/BackGrounds/main_menu_stars.png");
            this.load.image("main_menu_interface", "./Assets/Images/UI/main_menu_interface.png");
            this.load.image("main_menu_logo", "./Assets/Images/UI/main_menu_logo.png");

            this.load.spritesheet("tournament_button", "./Assets/Images/UI/tournament_button.png", { frameWidth: 972.5, frameHeight: 125 });
            this.load.spritesheet("gym_button", "./Assets/Images/UI/gym_button.png", { frameWidth: 976, frameHeight: 135 });
            this.load.spritesheet("ranking_button", "./Assets/Images/UI/ranking_button.png", { frameWidth: 814, frameHeight: 122 });
            this.load.spritesheet("credits_button", "./Assets/Images/UI/credits_button.png", { frameWidth: 173, frameHeight: 155 });
            this.load.spritesheet("options_button", "./Assets/Images/UI/options_button.png", { frameWidth: 169, frameHeight: 167 });

            ///Escena de Ranking///
            this.load.image("ranking_bg", "./Assets/Images/Tests/test_bg/Ranking-BG.jpg");
            this.load.image("ranking_interface", "./Assets/Images/UI/ranking_interface.png");

            ///Escena de Opciones///
            this.load.image("options_interface", "./Assets/Images/UI/options_interface.png");
            this.load.spritesheet("volume_button", "./Assets/Images/UI/volume_button.png", { frameWidth: 76, frameHeight: 143 });
            this.load.spritesheet("back_button", "./Assets/Images/UI/back_button.png", { frameWidth: 144, frameHeight: 121 })
            this.load.image("back_button_interface", "./Assets/Images/UI/back_button_interface.png");

            ///Escena de Créditos///
            this.load.image("credits_bg", "./Assets/Images/Tests/test_bg/Credits-BG.jpg");

            ///Escena de Selección de Personaje, Habilidad y Escenario///
            this.load.image("select_character_interface", "./Assets/Images/UI/select_character_interface.png");
            this.load.spritesheet("berserker_button", "./Assets/Images/UI/berserker_button.png", { frameWidth: 731, frameHeight: 540 });
            this.load.spritesheet("wizard_button", "./Assets/Images/UI/wizard_button.png", { frameWidth: 731, frameHeight: 540 });
            this.load.spritesheet("bard_button", "./Assets/Images/UI/bard_button.png", { frameWidth: 731, frameHeight: 540 });
            this.load.spritesheet("rogue_button", "./Assets/Images/UI/rogue_button.png", { frameWidth: 731, frameHeight: 540 });
            this.load.spritesheet("blocked_button", "./Assets/Images/UI/blocked_button.png", { frameWidth: 731, frameHeight: 429 });
            this.load.spritesheet("description_text", "./Assets/Images/UI/description_text.png", { frameWidth: 731, frameHeight: 599 });
            this.load.spritesheet("skins_skills", "./Assets/Images/UI/skins_skills.png", { frameWidth: 731, frameHeight: 380 });
            this.load.spritesheet("right_arrow_button", "./Assets/Images/UI/right_arrow_button.png", { frameWidth: 224.50, frameHeight: 187 });
            this.load.spritesheet("left_arrow_button", "./Assets/Images/UI/left_arrow_button.png", { frameWidth: 224.50, frameHeight: 187 });
            this.load.image("enter_button", "./Assets/Images/UI/enter_button.png");
            this.load.image("continue_text_desktop", "./Assets/Images/UI/continue_text_desktop.png");
            this.load.image("continue_text_mobile", "./Assets/Images/UI/continue_text_mobile.png");

            ///Escena de desconexion///
            this.load.image("disconnected_text", "./Assets/Images/UI/connection_failed_text.png");
            this.load.spritesheet("retry_button", "./Assets/Images/UI/retry_button.png", { frameWidth: 604, frameHeight: 147 });
            
			this.load.image("berserker_projectile", "./Assets/Images/Characters/Projectiles/berserker_projectile.png");
			this.load.image("wizard_projectile", "./Assets/Images/Characters/Projectiles/wizard_projectile.png");
			this.load.image("bard_projectile", "./Assets/Images/Characters/Projectiles/bard_projectile.png");
			this.load.image("rogue_projectile", "./Assets/Images/Characters/Projectiles/rogue_projectile.png");

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
            this.load.image("projectile", "./Assets/Images/Tests/projectile.png");

            // Animaciones Bardo
            this.load.spritesheet("bard_idle", "./Assets/Images/Characters/Animations/IdleAnimation_Bard.png", { frameWidth: 170, frameHeight: 170 });
            this.load.spritesheet("bard_walk", "./Assets/Images/Characters/Animations/WalkAnimation_Bard.png", { frameWidth: 170, frameHeight: 170 });
            this.load.spritesheet("bard_attack", "./Assets/Images/Characters/Animations/AttackAnimation_Bard.png", { frameWidth: 170, frameHeight: 170 });
            // Animaciones Mago
            this.load.spritesheet("wizard_idle", "./Assets/Images/Characters/Animations/IdleAnimation_Wizard.png", { frameWidth: 140, frameHeight: 150 });
            this.load.spritesheet("wizard_walk", "./Assets/Images/Characters/Animations/WalkAnimation_Wizard.png", { frameWidth: 140, frameHeight: 150 });
            this.load.spritesheet("wizard_attack", "./Assets/Images/Characters/Animations/AttackAnimation_Wizard.png", { frameWidth: 140, frameHeight: 150 });
            // Animaciones Berserker
            this.load.spritesheet("berserker_idle", "./Assets/Images/Characters/Animations/IdleAnimation_Berserker.png", { frameWidth: 200, frameHeight: 170 });
            this.load.spritesheet("berserker_walk", "./Assets/Images/Characters/Animations/WalkAnimation_Berserker.png", { frameWidth: 200, frameHeight: 170 });
            this.load.spritesheet("berserker_attack", "./Assets/Images/Characters/Animations/AttackAnimation_Berserker.png", { frameWidth: 270, frameHeight: 270 });
            // Animaciones Pícara
            this.load.spritesheet("rogue_idle", "./Assets/Images/Characters/Animations/IdleAnimation_Rogue.png", { frameWidth: 250, frameHeight: 140 });
            this.load.spritesheet("rogue_walk", "./Assets/Images/Characters/Animations/WalkAnimation_Rogue.png", { frameWidth: 250, frameHeight: 140 });
            this.load.spritesheet("rogue_attack", "./Assets/Images/Characters/Animations/AttackAnimation_Rogue.png", { frameWidth: 250, frameHeight: 140 });

            ///Escena de Fin de Partida///
            this.load.image("score_interface", "./Assets/Images/UI/score_interface.png");
            this.load.image("play_again_screen", "./Assets/Images/UI/play_again_screen.png");
            this.load.spritesheet("yes_button", "./Assets/Images/UI/yes_button.png", { frameWidth: 414.0, frameHeight: 128.0 });
            this.load.spritesheet("no_button", "./Assets/Images/UI/no_button.png", { frameWidth: 393.50, frameHeight: 128.0 });

            /// Formulario ///
            this.load.html('nameform', './Assets/Text/loginform.html');

            game.global.hasLoadData = true;
        }
        else
        // If data has already been loaded
        {
            /// Barra de carga ///
            let loadingBar = this.add.graphics({
                lineStyle: {
                    width: 5,
                    color: 0x996600
                },
                fillStyle: {
                    color: 0xffff00
                }
            });

            loadingBar.fillRect(this.game.renderer.width / 2 - this.game.renderer.width / 8,
                this.game.renderer.height / 2,
                this.game.renderer.width  / 4,
                40);
            loadingBar.strokeRect(this.game.renderer.width / 2 - this.game.renderer.width / 8,
                this.game.renderer.height / 2,
                this.game.renderer.width / 4,
                40);

            let loadingText = this.make.text({
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2 - 30,
                text: 'Connecting to server...',
                style: {
                    font: '24px font_Ftb',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);

            let percentText = this.make.text({
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2 + 20,
                text: '100%',
                style: {
                    font: '20px font_Ftb',
                    fill: '#000000'
                }
            });
            percentText.setOrigin(0.5, 0.5);

            let assetText = this.make.text({
                x: this.game.renderer.width / 2,
                y: this.game.renderer.height / 2 + 70,
                text: 'Load complete.',
                style: {
                    font: '24px font_Ftb',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);

            // WEBSOCKETS
            try
            {
                game.global.socket = new WebSocket("ws://" + "localhost:8080" + "/ako");
                //game.global.socket = new WebSocket("wss://" + "astral-knock-out.herokuapp.com" + "/ako");
            }
            catch(error)
            {
                if (game.global.DEBUG_MODE) {
                    console.log('Cant connect to WS');
                }
            }

            game.global.socket.onopen = () => {
                that.SetSocketMessages();
                if (game.global.DEBUG_MODE) {
                    console.log('[DEBUG] WebSocket connection opened.');
                }
                try {
                    switch (game.global.DEVICE) {
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
                }
                finally {
                    game.global.WS_CONNECTION = true;
                }
            }

            game.global.socket.onclose = () => {
                if (game.global.DEBUG_MODE) {
                    console.log('[DEBUG] WebSocket connection closed.');
                }
                try {
                    if (this.scene.isActive("scene_boot")) {
                        loadingText.setText('Connection failed, try again later');
                    }
                    else
                    {
                        this.scene.get(game.global.actualScene).input.keyboard.removeAllKeys(true);
                        this.scene.get(game.global.actualScene).scene.start("scene_disconnected");
                    }
                } catch (error) {
                    if (game.global.DEBUG_MODE) {
                        console.log(error);
                    }
                } finally {
                    game.global.WS_CONNECTION = false;
                }
            }
        }

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_boot";

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
            frameRate: 12
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
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'wizard_attack',
            frames: this.anims.generateFrameNumbers('wizard_attack', { start: 0, end: 10 }),
            frameRate: 12
        });

        // Creamos las animaciones del berserker
        this.anims.create({
            key: 'berserker_idle',
            frames: this.anims.generateFrameNumbers('berserker_idle', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'berserker_walk',
            frames: this.anims.generateFrameNumbers('berserker_walk', { start: 0, end: 10 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'berserker_attack',
            frames: this.anims.generateFrameNumbers('berserker_attack', { start: 0, end: 9 }),
            frameRate: 12
        });

        // Creamos las animaciones de la Pícara
        this.anims.create({
            key: 'rogue_idle',
            frames: this.anims.generateFrameNumbers('rogue_idle', { start: 0, end: 9 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'rogue_walk',
            frames: this.anims.generateFrameNumbers('rogue_walk', { start: 0, end: 9 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'rogue_attack',
            frames: this.anims.generateFrameNumbers('rogue_attack', { start: 0, end: 5 }),
            frameRate: 12
        });

        switch (game.global.DEVICE) {
            case "desktop":
                this.input.keyboard.on('keydown-' + "ENTER", function () {
                    if (!isLoading /**/ && game.global.WS_CONNECTION/**/) {
                        this.scene.input.keyboard.removeAllKeys(true);
                        this.scene.scene.start("scene_select_login");
                    }
                });
                break;
            case "mobile":
                this.input.on('pointerdown', function () {
                    if (!isLoading /**/ && game.global.WS_CONNECTION/**/) {
                        this.scene.scene.start("scene_select_login");
                    }
                });
                break;
            default:
                break;
        }

    } // Fin create

    update() {
        this.tilesprite.tilePositionX += 0.2;
        this.tilesprite.tilePositionY += 0.4;
    }

    SetSocketMessages() {
        game.global.socket.onmessage = (msg) => {
            var data = JSON.parse(msg.data); // Se convierte el mensaje a JSON
            /*if (game.global.DEBUG_MODE) {
                console.log(data);
            }*/
            switch (data.event) {
                case "JOIN":
                    this.scene.get('scene_boot').JoinMsg(data);
                    break;
                case "ERROR":
                    this.scene.get('scene_boot').ErrorMsg(data);
                    break;
                case "AUTHENTICATION_ERROR":
                    this.scene.get('scene_boot').AuthenticationError(data);
                    break;
                case "AUTHENTICATION_SUCCESS":
                    this.scene.get('scene_boot').AuthenticationSuccess(data);
                    break;
                case "RANKING_RESULTS":
                    this.scene.get('scene_boot').GetRanking(data);
                    break;
                case "OPTIONS_RESULTS":
                    this.scene.get('scene_boot').GetOptions(data);
                    break;
                case "CREATED_SPACE_GYM":
                    this.scene.get('scene_boot').JoinSpaceGym(data);
                    break;
                case "UPDATE_SPACE_GYM":
                    this.scene.get('scene_boot').UpdateSpaceGym(data);
                    break;
                case "ACTION":
                    this.scene.get('scene_boot').Action(data);
                    break;
                default:
                    if (game.global.DEBUG_MODE) {
                        console.log("Tipo de mensaje no controlado");
                    }
                    break;
            }
        }
    }

    // PROTOCOLO DE MENSAJES

    JoinMsg(data) {
        //game.mPlayer.id = data.id;
        if (game.global.DEBUG_MODE) {
            console.log(game.mPlayer);
        }
    }

    ErrorMsg(data) {
        if (game.global.DEBUG_MODE) {
            console.log(data.message);
        }
    }

    AuthenticationError(data) {
        game.global.feedbackLogin.setText(data.message);

        if (game.global.DEBUG_MODE) {
            console.log("Error de autenticacion: " + data.message);
        }
    }

    AuthenticationSuccess(data) {
        game.mPlayer.userName = data.user_name;
        game.mPlayer.id = data.id;
        game.global.socket.send(JSON.stringify({ event: "REQUEST_OPTIONS_DATA" }));

        if (game.global.DEBUG_MODE) {
            console.log(game.mPlayer);
            console.log("Bienvenido/a " + game.mPlayer.userName);
        }
    }

    // Método GetOptions, que guarda la información de las opciones del usuario
    GetOptions(data) {
        // Se guardan las opciones del usuario
        game.options.musicVol = data.musicVol;
        game.options.SFXVol = data.sfxVol;
        game.mPlayer.userName = data.name;
        game.mPlayer.currency = data.currency;

        // Cambia de escena a la escena del menú principal
        this.scene.get('scene_account').scene.start("scene_main_menu");

        if (game.global.DEBUG_MODE) {
            console.log("Datos de opciones obtenidos");
        }
    }

    // Método GetRanking, que guarda la información del ranking y pasa a la escena de este
    GetRanking(data) {
        // Se guardan los datos del ranking
        for (var i = 0; i < data.ranking.length; i++) {
            var name = data.ranking[i].name
            var wins = data.ranking[i].wins;
            var loses = data.ranking[i].loses;
            var points = data.ranking[i].points;

            game.global.ranking[i] = new RankingUser(name, wins, loses, points);
        }

        // Cambia de escena a la escena del ranking
        this.scene.get('scene_main_menu').scene.start("scene_ranking");

        if (game.global.DEBUG_MODE) {
            console.log(data);
        }
    }

    JoinSpaceGym(data) {
        this.scene.get('scene_select_character').input.keyboard.removeAllKeys(true);
        this.scene.get('scene_select_character').scene.start("scene_space_gym");
        if (game.global.DEBUG_MODE) {
            console.log("creado el space gym");
        }
    }

    UpdateSpaceGym(data) {
        // Player
        game.mPlayer.image.x = RelativeScale(data.player.posX, "x");
        game.mPlayer.image.y = RelativeScale(data.player.posY, "y");
        game.mPlayer.image.flipX = data.player.flipped;
        if (data.player.onFloor) {
            this.scene.get('scene_space_gym').falling = false;
        }
        this.scene.get('scene_space_gym').canBasicAttack = data.player.canBasicAttack;
        this.scene.get('scene_space_gym').canSpecialAttack = data.player.canSpecialAttack;

        // Dummy
        this.scene.get('scene_space_gym').dummy.x = RelativeScale(data.dummy.posX, "x");
        this.scene.get('scene_space_gym').dummy.y = RelativeScale(data.dummy.posY, "y");

        // Proyectiles
        // console.log(data.projectiles); // array
        // console.log(data.projectiles.length);
        for (var i = 0; i<data.projectiles.length; i++){
            console.log(data.projectiles[i].isActive);
            this.scene.get('scene_space_gym').projectiles[i].setVisible(data.projectiles[i].isActive);
            this.scene.get('scene_space_gym').projectiles[i].x = RelativeScale(data.projectiles[i].posX,"x");
            this.scene.get('scene_space_gym').projectiles[i].y = RelativeScale(data.projectiles[i].posY,"y");
            this.scene.get('scene_space_gym').projectiles[i].setAngle(data.projectiles[i].facingAngle);
            this.scene.get('scene_space_gym').projectiles[i].flipX = data.projectiles[i].flipX;
        }
    }

    Action(data) {
        switch (data.type) {
            case "BASIC_ATTACK":
                if (game.mPlayer.room === -1) { // Space_gym
                    this.scene.get("scene_space_gym").attacking = true;
                    game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_attack", true);
                } else {
                    if (game.mPlayer.difficultySel === 0) { // Primer mapa
                        if (game.mPlayer.userName === data.player_name) { // Mi jugador lanza la habilidad
                            game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_attack", true);
                        } else { // El otro jugador lanza la habilidad

                        }
                    } else { // Segundo mapa
                        if (game.mPlayer.userName === data.player_name) { // Mi jugador lanza la habilidad
                            game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_attack", true);
                        } else { // El otro jugador lanza la habilidad

                        }
                    }
                }

                break;
            case "SPECIAL_ATTACK":
                if (game.mPlayer.room === -1) { // Space_gym
                    game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_attack", true);
                } else {
                    if (game.mPlayer.difficultySel === 0) { // Primer mapa
                        if (game.mPlayer.userName === data.player_name) { // Mi jugador lanza la habilidad
                            game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_attack", true);
                        } else { // El otro jugador lanza la habilidad

                        }
                    } else { // Segundo mapa
                        if (game.mPlayer.userName === data.player_name) { // Mi jugador lanza la habilidad
                            game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_attack", true);
                        } else { // El otro jugador lanza la habilidad

                        }
                    }
                }
                break;
        }
    }
}