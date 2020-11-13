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

        if (!game.global.hasLoadData) {
            /// Barra de carga ///
            let loadingBar = this.add.graphics({
                lineStyle: {
                    width: 5,
                    // color: 0x996600
                    color: 0xe952c4
                },
                fillStyle: {
                    color: 0x6c1386
                    // color: 0xffff00
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
                    fill: '#e952c4'
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
                percentText.setText(parseInt(percent * 100) + "%");

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
                try {
                    game.global.socket = new WebSocket("ws://" + "localhost:8080" + "/ako");
                    //game.global.socket = new WebSocket("wss://" + "astral-knock-out.herokuapp.com" + "/ako");
                }
                catch (error) {
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
                        if (this.scene.isActive("scene_boot")) {
                            loadingText.setText('Connection failed, try again later');
                        }
                        else {
                            that.scene.get(game.global.actualScene).input.keyboard.removeAllKeys(true);
                            that.scene.get(game.global.actualScene).scene.start("scene_disconnected");
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
            this.load.spritesheet("back_button", "./Assets/Images/UI/back_button.png", { frameWidth: 144, frameHeight: 121 });
            this.load.image("back_button_interface", "./Assets/Images/UI/back_button_interface.png");
            this.load.spritesheet("controls_button", "./Assets/Images/UI/controls_button.png", { frameWidth: 769, frameHeight: 104 });
            this.load.image("controls_image", "./Assets/Images/UI/controls_image.png");

            ///Escena de Créditos///
            this.load.image("credits_dust", "./Assets/Images/UI/credits_dust.png");
            this.load.spritesheet("credits_images", "./Assets/Images/UI/credits_images.png", { frameWidth: 1919.50, frameHeight: 1080 });

            ///Escena de Selección de Personaje y Habilidad///
            this.load.image("select_character_t_interface", "./Assets/Images/UI/select_character_t_interface.png");
            this.load.image("select_character_sg_interface", "./Assets/Images/UI/select_character_sg_interface.png");
            this.load.image("select_character_lines_interface", "./Assets/Images/UI/select_character_lines_interface.png");
            this.load.spritesheet("berserker_button", "./Assets/Images/UI/berserker_button.png", { frameWidth: 731, frameHeight: 540 });
            this.load.spritesheet("wizard_button", "./Assets/Images/UI/wizard_button.png", { frameWidth: 731, frameHeight: 540 });
            this.load.spritesheet("bard_button", "./Assets/Images/UI/bard_button.png", { frameWidth: 731, frameHeight: 540 });
            this.load.spritesheet("rogue_button", "./Assets/Images/UI/rogue_button.png", { frameWidth: 731, frameHeight: 540 });
            this.load.spritesheet("blocked_button", "./Assets/Images/UI/blocked_button.png", { frameWidth: 731, frameHeight: 429 });
            this.load.spritesheet("description_text", "./Assets/Images/UI/description_text.png", { frameWidth: 731, frameHeight: 597 });
            this.load.spritesheet("skins_skills", "./Assets/Images/UI/skins_skills.png", { frameWidth: 731, frameHeight: 380 });
            this.load.spritesheet("right_arrow_button", "./Assets/Images/UI/right_arrow_button.png", { frameWidth: 224.50, frameHeight: 187 });
            this.load.spritesheet("left_arrow_button", "./Assets/Images/UI/left_arrow_button.png", { frameWidth: 224.50, frameHeight: 187 });
            this.load.image("enter_button", "./Assets/Images/UI/enter_button.png");
            this.load.image("continue_text_desktop", "./Assets/Images/UI/continue_text_desktop.png");
            this.load.image("continue_text_mobile", "./Assets/Images/UI/continue_text_mobile.png");

            ///Escena de Seleccion de Escenario
            this.load.image("select_map_text", "./Assets/Images/UI/select_map_text.png");
            this.load.spritesheet("map_button0", "./Assets/Images/UI/map_button_0.png", { frameWidth: 1021, frameHeight: 627 });
            this.load.spritesheet("map_button1", "./Assets/Images/UI/map_button_1.png", { frameWidth: 1021, frameHeight: 627 });

            ///Escena de búsqueda de partida
            this.load.image("searching_back_triangle", "./Assets/Images/UI/searching_back_triangle_connection_interface.png");
            this.load.image("searching_front_triangle", "./Assets/Images/UI/searching_front_triangle_connection_interface.png");
            this.load.spritesheet("searching_tips_text", "./Assets/Images/UI/tips_text.png", { frameWidth: 429, frameHeight: 242 });

            ///Splash-Arts personajes
            this.load.image("splashart_bard", "./Assets/Images/UI/splash_arts/bard_splashart.png");
            this.load.image("splashart_wizard", "./Assets/Images/UI/splash_arts/wizard_splashart.png");
            this.load.image("splashart_rogue", "./Assets/Images/UI/splash_arts/rogue_splashart.png");
            this.load.image("splashart_berserker", "./Assets/Images/UI/splash_arts/berserker_splashart.png");

            ///Escena de desconexion///
            this.load.image("disconnected_text", "./Assets/Images/UI/connection_failed_text.png");
            this.load.spritesheet("retry_button", "./Assets/Images/UI/retry_button.png", { frameWidth: 591, frameHeight: 101 });

            ///Otros mensajes del server
            this.load.image("message_bg", "./Assets/Images/UI/msg_bg.png");
            this.load.image("error_bg", "./Assets/Images/UI/error_bg.png");
            this.load.image("no_matches_text", "./Assets/Images/UI/match_unavailable_text.png");
            this.load.image("opponent_disconnected_text", "./Assets/Images/UI/opponent_disconnected_text.png");
            this.load.spritesheet("go_back_button", "./Assets/Images/UI/go_back_button.png", { frameWidth: 825, frameHeight: 134 });

            ///Versus
            this.load.image("versus_bg", "./Assets/Images/UI/versus_circles_interface.png");
            this.load.image("versus_vs", "./Assets/Images/UI/versus_vs_interface.png");
            this.load.image("versus_fight", "./Assets/Images/UI/fight_text.png");
            this.load.image("versus_knock_out", "./Assets/Images/UI/knock_out_text.png");

            ///Proyectiles
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
            this.load.image("msg_bg", "./Assets/Images/UI/msg_bg.png");
            this.load.image("pause_text", "./Assets/Images/UI/pause_text.png");
            this.load.spritesheet("yes..._button", "./Assets/Images/UI/yes..._button.png", { frameWidth: 533.0, frameHeight: 211.0 });
            this.load.spritesheet("no!!_button", "./Assets/Images/UI/no!!_button.png", { frameWidth: 533.0, frameHeight: 211.0 });

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

            ///Nivel 2///
            // Fondo
            this.load.image("level_2_bg", "./Assets/Images/BackGrounds/level_2_bg.png");
            this.load.image("level_2_bg_details", "./Assets/Images/BackGrounds/level_2_bg_details.png");
            this.load.image("level_2_bg_move", "./Assets/Images/BackGrounds/level_2_bg_move.png");
            this.load.image("level_2_fg_details", "./Assets/Images/BackGrounds/level_2_fg_details.png");
            this.load.image("level_2_fg_move", "./Assets/Images/BackGrounds/level_2_fg_move.png");

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
            this.load.image("play_again_text", "./Assets/Images/UI/play_again_text.png");
            this.load.spritesheet("yes!!_button", "./Assets/Images/UI/yes!!_button.png", { frameWidth: 414.0, frameHeight: 128.0 });
            this.load.spritesheet("no..._button", "./Assets/Images/UI/no..._button.png", { frameWidth: 393.50, frameHeight: 128.0 });

            /// Formulario ///
            this.load.html('nameform', './Assets/Text/loginform.html');

            /// Plugin joystick ///
            this.load.plugin('rexvirtualjoystickplugin', './Assets/Plugins/rexvirtualjoystickplugin.min.js', true);

            game.global.hasLoadData = true;
        }
        else
        // If data has already been loaded
        {
            /// Barra de carga ///
            let loadingBar = this.add.graphics({
                lineStyle: {
                    width: 5,
                    // color: 0x996600
                    color: 0xe952c4
                },
                fillStyle: {
                    color: 0x6c1386
                    // color: 0xffff00
                }
            });

            loadingBar.fillRect(this.game.renderer.width / 2 - this.game.renderer.width / 8,
                this.game.renderer.height / 2,
                this.game.renderer.width / 4,
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
                    fill: '#e952c4'
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
            try {
                game.global.socket = new WebSocket("ws://" + "localhost:8080" + "/ako");
                //game.global.socket = new WebSocket("wss://" + "astral-knock-out.herokuapp.com" + "/ako");
            }
            catch (error) {
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
                    else {
                        that.scene.get(game.global.actualScene).input.keyboard.removeAllKeys(true);
                        that.scene.get(game.global.actualScene).scene.start("scene_disconnected");
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
                case "GAME_FOUND":
                    this.scene.get('scene_boot').GameFound(data);
                    break;
                case "GAME_STARTED":
                    this.scene.get('scene_boot').StartTournamentGame(data);
                    break;
                case "UPDATE_TOURNAMENT":
                    this.scene.get('scene_boot').UpdateTournament(data);
                    break;
                case "DAMAGE":
                    this.scene.get('scene_boot').Damage(data);
                    break;
                case "GAME_RESULTS":
                    this.scene.get('scene_boot').FinishTournamentGame(data);
                    break;
                case "CANCELED_QUEUE":
                    this.scene.get('scene_boot').CanceledQueue();
                    break;
                case "GAMES_FULL":
                    this.scene.get('scene_boot').GamesFull();
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
        game.global.feedbackLogin.innerHTML = "" + data.message;

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
        this.scene.get('scene_space_gym').dummy.userInterface.currentHP = data.dummy.hp;

        // Proyectiles
        for (var i = 0; i < data.projectiles.length; i++) {
            this.scene.get('scene_space_gym').projectiles[i].setVisible(data.projectiles[i].isActive);
            this.scene.get('scene_space_gym').projectiles[i].x = RelativeScale(data.projectiles[i].posX, "x");
            this.scene.get('scene_space_gym').projectiles[i].y = RelativeScale(data.projectiles[i].posY, "y");
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
                            this.scene.get("scene_level0").myAttacking = true;
                            game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_attack", true);
                        } else { // El otro jugador lanza la habilidad
                            this.scene.get("scene_level0").eAttacking = true;
                            game.mEnemy.image.anims.play(game.mEnemy.characterSel.type + "_attack", true);
                        }
                    } else { // Segundo mapa
                        if (game.mPlayer.userName === data.player_name) { // Mi jugador lanza la habilidad
                            this.scene.get("scene_level1").myAttacking = true;
                            game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_attack", true);
                        } else { // El otro jugador lanza la habilidad
                            this.scene.get("scene_level1").eAttacking = true;
                            game.mEnemy.image.anims.play(game.mEnemy.characterSel.type + "_attack", true);
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

    GameFound(data) {
        // Aquí hay que superponer el versus, antes de empezar la escena hay que guardar los datos
        // Si es el jugador A, el enemigo e el B
        console.log(data);
        if (data.players[0].userName == game.mPlayer.userName) {
            game.mEnemy.AorB = "B";
            game.mEnemy.id = data.players[1].playerId;
            game.mEnemy.userName = data.players[1].userName;
            game.mEnemy.characterSel.type = data.players[1].playerType;
            game.mEnemy.skinSel = data.players[1].skin;
            game.mEnemy.skillSel = data.players[1].skill;
        }
        // Si no, es al revés
        else {
            game.mEnemy.AorB = "A";
            game.mEnemy.id = data.players[0].playerId;
            game.mEnemy.userName = data.players[0].userName;
            game.mEnemy.characterSel.type = data.players[0].playerType;
            game.mEnemy.skinSel = data.players[0].skin;
            game.mEnemy.skillSel = data.players[0].skill;
        }

        game.mPlayer.room = data.room;

        // Se cambia la escena
        if (game.mPlayer.difficultySel == 0) {
            this.scene.get('scene_searching').scene.start("scene_level0");
        }
        else if (game.mPlayer.difficultySel == 1) {
            this.scene.get('scene_searching').scene.start("scene_level1");
        }

        if (game.global.DEBUG_MODE) {
            console.log("Partida encontrada");
        }
    }

    StartTournamentGame(data) {
        this.scene.get(game.global.actualScene).StartGame();

        if (game.global.DEBUG_MODE) {
            console.log("Comienza la partida");
        }
    }

    UpdateTournament(data) {
        var level;
        if (data.level == 0) { // Nivel 0
            level = this.scene.get('scene_level0');
            if (game.mEnemy.AorB === 'A') { // Mi jugador es el B
                // Mi jugador
                game.mPlayer.image.x = RelativeScale(data.playerB.posX, "x");
                game.mPlayer.image.y = RelativeScale(data.playerB.posY, "y");
                game.mPlayer.image.flipX = data.playerB.flipped;
                if (data.playerB.onFloor) {
                    level.falling = false;
                }
                level.canBasicAttack = data.playerB.canBasicAttack;
                level.canSpecialAttack = data.playerB.canSpecialAttack;

                // Proyectiles
                for (var i = 0; i < data.projectilesB.length; i++) {
                    level.myProjectiles[i].setVisible(data.projectilesB[i].isActive);
                    level.myProjectiles[i].x = RelativeScale(data.projectilesB[i].posX, "x");
                    level.myProjectiles[i].y = RelativeScale(data.projectilesB[i].posY, "y");
                    level.myProjectiles[i].setAngle(data.projectilesB[i].facingAngle);
                    level.myProjectiles[i].flipX = data.projectilesB[i].flipX;
                }

                // Jugador enemigo
                game.mEnemy.image.x = RelativeScale(data.playerA.posX, "x");
                game.mEnemy.image.y = RelativeScale(data.playerA.posY, "y");
                level.eMovingLeft = data.playerA.movingLeft;
                level.eMovingRight = data.playerA.movingRight;
                game.mEnemy.image.flipX = data.playerA.flipped;

                // Proyectiles
                for (var i = 0; i < data.projectilesA.length; i++) {
                    level.eProjectiles[i].setVisible(data.projectilesA[i].isActive);
                    level.eProjectiles[i].x = RelativeScale(data.projectilesA[i].posX, "x");
                    level.eProjectiles[i].y = RelativeScale(data.projectilesA[i].posY, "y");
                    level.eProjectiles[i].setAngle(data.projectilesA[i].facingAngle);
                    level.eProjectiles[i].flipX = data.projectilesA[i].flipX;
                }
            } else { // Mi jugador es el A
                // Mi jugador
                game.mPlayer.image.x = RelativeScale(data.playerA.posX, "x");
                game.mPlayer.image.y = RelativeScale(data.playerA.posY, "y");
                game.mPlayer.image.flipX = data.playerA.flipped;
                if (data.playerA.onFloor) {
                    level.falling = false;
                }
                level.canBasicAttack = data.playerA.canBasicAttack;
                level.canSpecialAttack = data.playerA.canSpecialAttack;

                // Proyectiles
                for (var i = 0; i < data.projectilesA.length; i++) {
                    level.myProjectiles[i].setVisible(data.projectilesA[i].isActive);
                    level.myProjectiles[i].x = RelativeScale(data.projectilesA[i].posX, "x");
                    level.myProjectiles[i].y = RelativeScale(data.projectilesA[i].posY, "y");
                    level.myProjectiles[i].setAngle(data.projectilesA[i].facingAngle);
                    level.myProjectiles[i].flipX = data.projectilesA[i].flipX;
                }

                // Jugador enemigo
                game.mEnemy.image.x = RelativeScale(data.playerB.posX, "x");
                game.mEnemy.image.y = RelativeScale(data.playerB.posY, "y");
                level.eMovingLeft = data.playerB.movingLeft;
                level.eMovingRight = data.playerB.movingRight;
                game.mEnemy.image.flipX = data.playerB.flipped;

                // Proyectiles
                for (var i = 0; i < data.projectilesB.length; i++) {
                    level.eProjectiles[i].setVisible(data.projectilesB[i].isActive);
                    level.eProjectiles[i].x = RelativeScale(data.projectilesB[i].posX, "x");
                    level.eProjectiles[i].y = RelativeScale(data.projectilesB[i].posY, "y");
                    level.eProjectiles[i].setAngle(data.projectilesB[i].facingAngle);
                    level.eProjectiles[i].flipX = data.projectilesB[i].flipX;
                }
            }
        } else { // Nivel 1
            console.log(data);
            level = this.scene.get('scene_level1');
            level.bg.tilePositionY = data.backgroundPos;
            level.bgDetails.tilePositionY = data.stagePos;
            level.bgMove.tilePositionY = data.stagePos;
            level.fgDetails.tilePositionY = data.stagePos;
            level.fgMove.tilePositionY = data.stagePos;

            if (game.mEnemy.AorB === 'A') { // Mi jugador es el B
                // Mi jugador
                game.mPlayer.image.x = RelativeScale(data.playerB.posX, "x");
                game.mPlayer.image.y = RelativeScale(data.playerB.posY, "y");
                game.mPlayer.image.flipX = data.playerB.flipped;
                if (data.playerB.onFloor) {
                    level.falling = false;
                }
                level.canBasicAttack = data.playerB.canBasicAttack;
                level.canSpecialAttack = data.playerB.canSpecialAttack;

                // Proyectiles
                for (var i = 0; i < data.projectilesB.length; i++) {
                    level.myProjectiles[i].setVisible(data.projectilesB[i].isActive);
                    level.myProjectiles[i].x = RelativeScale(data.projectilesB[i].posX, "x");
                    level.myProjectiles[i].y = RelativeScale(data.projectilesB[i].posY, "y");
                    level.myProjectiles[i].setAngle(data.projectilesB[i].facingAngle);
                    level.myProjectiles[i].flipX = data.projectilesB[i].flipX;
                }

                // Jugador enemigo
                game.mEnemy.image.x = RelativeScale(data.playerA.posX, "x");
                game.mEnemy.image.y = RelativeScale(data.playerA.posY, "y");
                level.eMovingLeft = data.playerA.movingLeft;
                level.eMovingRight = data.playerA.movingRight;
                game.mEnemy.image.flipX = data.playerA.flipped;

                // Proyectiles
                for (var i = 0; i < data.projectilesA.length; i++) {
                    level.eProjectiles[i].setVisible(data.projectilesA[i].isActive);
                    level.eProjectiles[i].x = RelativeScale(data.projectilesA[i].posX, "x");
                    level.eProjectiles[i].y = RelativeScale(data.projectilesA[i].posY, "y");
                    level.eProjectiles[i].setAngle(data.projectilesA[i].facingAngle);
                    level.eProjectiles[i].flipX = data.projectilesA[i].flipX;
                }
            } else { // Mi jugador es el A
                // Mi jugador
                game.mPlayer.image.x = RelativeScale(data.playerA.posX, "x");
                game.mPlayer.image.y = RelativeScale(data.playerA.posY, "y");
                game.mPlayer.image.flipX = data.playerA.flipped;
                if (data.playerA.onFloor) {
                    level.falling = false;
                }
                level.canBasicAttack = data.playerA.canBasicAttack;
                level.canSpecialAttack = data.playerA.canSpecialAttack;

                // Proyectiles
                for (var i = 0; i < data.projectilesA.length; i++) {
                    level.myProjectiles[i].setVisible(data.projectilesA[i].isActive);
                    level.myProjectiles[i].x = RelativeScale(data.projectilesA[i].posX, "x");
                    level.myProjectiles[i].y = RelativeScale(data.projectilesA[i].posY, "y");
                    level.myProjectiles[i].setAngle(data.projectilesA[i].facingAngle);
                    level.myProjectiles[i].flipX = data.projectilesA[i].flipX;
                }

                // Jugador enemigo
                game.mEnemy.image.x = RelativeScale(data.playerB.posX, "x");
                game.mEnemy.image.y = RelativeScale(data.playerB.posY, "y");
                level.eMovingLeft = data.playerB.movingLeft;
                level.eMovingRight = data.playerB.movingRight;
                game.mEnemy.image.flipX = data.playerB.flipped;

                // Proyectiles
                for (var i = 0; i < data.projectilesB.length; i++) {
                    level.eProjectiles[i].setVisible(data.projectilesB[i].isActive);
                    level.eProjectiles[i].x = RelativeScale(data.projectilesB[i].posX, "x");
                    level.eProjectiles[i].y = RelativeScale(data.projectilesB[i].posY, "y");
                    level.eProjectiles[i].setAngle(data.projectilesB[i].facingAngle);
                    level.eProjectiles[i].flipX = data.projectilesB[i].flipX;
                }
            }
        }
    }

    Damage(data){
        if (data.playerName === game.mPlayer.userName){ // Mi jugador ha sido dañado
            this.scene.get(game.global.actualScene).myHP.currentHP = data.hp;
        }else{ // El enemigo ha sido dañado
            this.scene.get(game.global.actualScene).eHP.currentHP = data.hp;
        }
    }

    FinishTournamentGame(data) {
        var that = this;
        // Aquí hay que actualizar los datos (tienen que ser globales)

        // Se guardan los resultados de la partida
        // El jugador es el ganador
        if (data.winner.userName == game.mPlayer.userName)
        {
            console.log("GANADOR!");
            // Diferencia de puntos positiva
            game.mPlayer.pointsDifference = data.pointsDifference;

            // Asignar resto de datos
            // Puntos
            game.mPlayer.points = data.winner.points;
            //game.mEnemy.points = data.loser.points;   Creo que no hace falta

            // Monedas ganadas
            game.mPlayer.newCoins = data.winner.newCoins;

            // Monedas totales
            game.mPlayer.currency = data.winner.currency;
        }
        // El jugador es el perdedor
        else
        {
            console.log("Perdedor...");
            // Diferencia de puntos negativa
            game.mPlayer.pointsDifference = -(data.pointsDifference);

            // Asignar resto de datos
            // Puntos
            game.mPlayer.points = data.loser.points;
            //game.mEnemy.points = data.winner.points;   Creo que no hace falta

            // Monedas ganadas
            game.mPlayer.newCoins = data.loser.newCoins;

            // Monedas totales
            game.mPlayer.currency = data.loser.currency;
        }

        // Se muestra la pantalla de final de partida
        this.scene.get(game.global.actualScene).FinishGame(data.wasDisconnection);

        // Se cambia de escena cuando toque
        this.scene.get(game.global.actualScene).time.addEvent({
            delay: 2000,
            callback: () => (that.ChangeToScore())
        });

        if (game.global.DEBUG_MODE) {
            console.log("Fin de la partida");
        }
    }

    ChangeToScore()
    {
        this.scene.get(game.global.actualScene).scene.start("scene_score");
    }

    CanceledQueue()
    {
        this.scene.get(game.global.actualScene).scene.start("scene_main_menu");
    }

    GamesFull()
    {
        this.scene.get(game.global.actualScene).FullError();
    }
}