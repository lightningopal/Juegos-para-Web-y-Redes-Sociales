class Scene_Space_Gym extends Phaser.Scene {
    constructor() {
        super({ key: "scene_space_gym" });
    } // Fin constructor

    preload() {
        var that = this;

        this.add.image(0, 0, "level_1_bg").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(-5);
        this.add.image(0, 0, "level_1_bg_details").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(-3);
        this.bgMove = this.add.image(0, 0, "level_1_bg_move").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(-2);
        this.tweens.add({
            targets: that.bgMove,
            y: (that.bgMove.y + 3),
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        this.add.image(0, 0, "level_1_plats_floor").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(-1);
        this.add.image(0, 0, "level_1_fg_details").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(3);
        this.fgMove = this.add.image(0, 0, "level_1_fg_move").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(4);
        this.tweens.add({
            targets: that.fgMove,
            y: (that.fgMove.y - 4),
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        this.add.image(RelativeScale(114.50, "x"), RelativeScale(112.0, "y"), "back_button_interface")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(5);
        this.backBtn = this.add.image(RelativeScale(66.0, "x"), RelativeScale(63.5, "y"), "back_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(5);

        this.msgImg = this.add.image(RelativeScale(0.0, "x"), RelativeScale(0.0, "y"), "msg_bg").setOrigin(0, 0)
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(10);
        this.msgImg.setAlpha(0);
        this.pauseText = this.add.image(RelativeScale(960.0, "x"), RelativeScale(270.0, "y"), "pause_text")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(10);
        this.pauseText.setAlpha(0);
        this.noBtn = this.add.image(RelativeScale(1325.50, "x"), RelativeScale(616.0, "y"), "no_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(10);
        this.noBtn.setAlpha(0);
        this.yesBtn = this.add.image(RelativeScale(587.0, "x"), RelativeScale(616.0, "y"), "yes_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(10);
        this.yesBtn.setAlpha(0);
        // this.yesBtn.disableInteractive()

        if (game.global.DEVICE == "mobile") {
            var url;
            url = './Assets/Plugins/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
        }

        this.paused;
        this.returnToMenu;

        // Variables encargadas del control del personaje
        this.movingLeft;
        this.movingRight;
        this.falling;
        this.attacking;
        this.myHP;

        this.projectiles = [];

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_space_gym";

        // Dummy de prácticas
        this.dummy = this.add.image(RelativeScale(1500, "x"), RelativeScale(940, "y"), "dummy")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.dummyBar = new UserInterface(this, this.dummy, 100, 80);
        this.dummy.userInterface = this.dummyBar;
        // Pool de habilidades
        /*Bardo*
        this.bardAttack1 = new BardSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 800)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        this.bardAttack2 = new BardSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 800)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        /**/
        /*Berserker*
        this.berserkerAttack1 = new BerserkerSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 800)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        this.berserkerAttack2 = new Berserker(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 800)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        /**/
        /*Mago*
         this.wizardAttack1 = new WizardSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 1500, 350)
         .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
         this.wizardAttack2 = new WizardSkill(this, 1, 0, 0,"projectile", this.dummy, 10, 1500, 350)
         .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
         this.wizardAttack3 = new WizardSkill(this, 2, 0, 0,"projectile", this.dummy, 10, 1500, 350)
         .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
         this.wizardAttack4 = new WizardSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 1500, 350)
         .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
         this.wizardAttack5 = new WizardSkill(this, 1, 0, 0,"projectile", this.dummy, 10, 1500, 350)
         .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
         this.wizardAttack6 = new WizardSkill(this, 2, 0, 0,"projectile", this.dummy, 10, 1500, 350)
         .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
         /**/
        /*Pícaro*
        this.rogueAttack1 = new RogueSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 350, 0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        this.rogueAttack2 = new RogueSkill(this, 1, 0, 0,"projectile", this.dummy, 10, 2000, 350, 150)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        this.rogueAttack3 = new RogueSkill(this, 2, 0, 0,"projectile", this.dummy, 10, 2000, 350, 300)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        this.rogueAttack4 = new RogueSkill(this, 0, 0, 0,"projectile", this.dummy, 10, 2000, 350, 0)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        this.rogueAttack5 = new RogueSkill(this, 1, 0, 0,"projectile", this.dummy, 10, 2000, 350, 150)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        this.rogueAttack6 = new RogueSkill(this, 2, 0, 0,"projectile", this.dummy, 10, 2000, 350, 300)
        .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6);
        /**/
        /**
        // Se añade el pool a un array y se pasa al arma del personaje (que maneja el id del ataque a lanzar)
        this.bardBasicAttacks = [this.bardAttack1, this.bardAttack2];
        // var berserkerBasicAttacks = [this.berserkerAttack1, this.berserkerAttack2];
        // var wizardBasicAttacks = [this.wizardAttack1,this.wizardAttack2,this.wizardAttack3, 
            // this.wizardAttack4,this.wizardAttack5,this.wizardAttack6];
        // var rogueBasicAttacks = [this.rogueAttack1,this.rogueAttack2,this.rogueAttack3, 
        //     this.rogueAttack4,this.rogueAttack5,this.rogueAttack6];
        this.basicWeapon = new Weapon(this, 700, this.bardBasicAttacks, 1);
        /**/
        // Crear el personaje
        // this.myPlayer = new Character_Controller(this, 0, RelativeScale(250, "x"),
        // RelativeScale(850, "y"), "bard", RelativeScale(), this.cursors1, 
        // this.mobileKeys, RelativeScale(500, "x"), RelativeScale(1020, "y"), 100, this.basicWeapon, this.basicWeapon)
        // .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
        this.paused = false;
        this.returnToMenu = false;
        this.movingLeft = false;
        this.movingRight = false;
        this.falling = false;
        this.attacking = false;
        this.canBasicAttack = true;
        this.canSpecialAttack = true;
        switch (game.mPlayer.characterSel.type) {
            case "berserker":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "berserker")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("berserker_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 100);
                for (var i = 0; i < 3; i++) {
                    this.projectiles.push(this.add.image(0, 0, "berserker_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                break;
            case "wizard":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "wizard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("wizard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 100);
                for (var i = 0; i < 9; i++) {
                    this.projectiles.push(this.add.image(0, 0, "wizard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                break;
            case "bard":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "bard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("bard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 100);
                for (var i = 0; i < 3; i++) {
                    this.projectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                break;
            case "rogue":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "rogue")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("rogue_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 75);
                for (var i = 0; i < 9; i++) {
                    this.projectiles.push(this.add.image(0, 0, "rogue_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                break;
            default:
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "bard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("bard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 50);
                for (var i = 0; i < 3; i++) {
                    this.projectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                break;
        }
        // console.log(this.projectiles[0]);
        game.mPlayer.image.body.setSize(0, 0);
        game.mPlayer.image.body.allowGravity = false;

        /*
        this.input.keyboard.on('keydown-'+'D', function (event) {
                that.optionSelectedCol = (that.optionSelectedCol + 1) % 3;
                if (game.global.DEBUG_MODE){ 
                    console.log("COL: "+that.optionSelectedCol);
                }
                that.CheckOption();
        });
        */
        // Create mobileKeys
        this.mobileKeys = {
            joyStick: null,
            jumpButton: null
        };

        // Si el dispositivo es movil, añadir un joystick y un boton
        if (game.global.DEVICE == "mobile" || game.global.DEBUG_PHONE) {
            this.mobileKeys.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: RelativeScale(100, "x"),
                y: RelativeScale(630, "y"),
                radius: 15,
                base: this.add.circle(0, 0, RelativeScale(60, "x"), 0x888888).setAlpha(0.7).setScale(RelativeScale()).setDepth(1000),
                thumb: this.add.circle(0, 0, RelativeScale(45, "x"), 0xcccccc).setAlpha(0.7).setScale(RelativeScale()).setDepth(1001),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            }).on('update', this.DumpJoyStickState, this);

            this.text = this.add.text(0, 0);
            this.DumpJoyStickState();

            this.mobileKeys.jumpButton = this.add.circle(RelativeScale(1160, "x"), RelativeScale(630, "y"), 20, 0xdddddd).setAlpha(0.7).setScale(RelativeScale()).setDepth(1000).setInteractive();
            console.log(this.mobileKeys.jumpButton);
            this.input.addPointer(2);
        } else if (game.global.DEVICE === "desktop") {
            this.input.keyboard.on("keydown-" + "A", function (event) {
                if (!that.paused) {
                    that.movingRight = false;
                    that.movingLeft = true;
                } else {
                    that.returnToMenu = !that.returnToMenu;
                    if (that.returnToMenu) {
                        that.yesBtn.setFrame(1);
                        that.noBtn.setFrame(0);
                    } else {
                        that.yesBtn.setFrame(0);
                        that.noBtn.setFrame(1);
                    }
                }
            });
            this.input.keyboard.on("keyup-" + "A", function (event) {
                if (!that.paused) {
                    that.movingLeft = false;
                }
            });

            this.input.keyboard.on("keydown-" + "D", function (event) {
                if (!that.paused) {
                    that.movingRight = true;
                    that.movingLeft = false;
                } else {
                    that.returnToMenu = !that.returnToMenu;
                    if (that.returnToMenu) {
                        that.yesBtn.setFrame(1);
                        that.noBtn.setFrame(0);
                    } else {
                        that.yesBtn.setFrame(0);
                        that.noBtn.setFrame(1);
                    }
                }
            });
            this.input.keyboard.on("keyup-" + "D", function (event) {
                if (!that.paused) {
                    that.movingRight = false;
                }
            });

            this.input.keyboard.on("keydown-" + "W", function (event) {
                if (!that.paused) {
                    that.Jump();
                }
            });

            this.input.keyboard.on("keydown-" + "S", function (event) {
                if (!that.paused) {
                    that.Fall();
                }
            });

            this.input.keyboard.on("keydown-" + "O", function (event) {
                if (!that.paused) {
                    if (!that.attacking) {
                        that.BasicAttack();
                    }
                }
            });

            this.input.keyboard.on("keydown-" + "P", function (event) {
                if (!that.paused) {
                    if (!that.attacking) {
                        that.SpecialAttack();
                    }
                }
            });

            this.input.keyboard.on("keydown-" + "ESC", function (event) {
                if (!that.paused) {
                    that.msgImg.setAlpha(1);
                    that.pauseText.setAlpha(1);
                    that.yesBtn.setAlpha(1);
                    that.yesBtn.setFrame(0);
                    that.noBtn.setAlpha(1);
                    that.noBtn.setFrame(1);
                } else {
                    that.msgImg.setAlpha(0);
                    that.pauseText.setAlpha(0);
                    that.yesBtn.setAlpha(0);
                    that.noBtn.setAlpha(0);
                }
                that.paused = !that.paused;
                that.returnToMenu = false;
                that.movingLeft = false;
                that.movingRight = false;
            });

            this.input.keyboard.on("keydown-" + "ENTER", function (event) {
                if (that.paused) {
                    if (that.returnToMenu) {
                        // Volver al menú
                        game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
                        // Reiniciar variables de selección de pj y eso antes de cambiar
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_main_menu");
                    } else {
                        that.paused = false;
                        that.returnToMenu = false;
                        that.msgImg.setAlpha(0);
                        that.pauseText.setAlpha(0);
                        that.yesBtn.setAlpha(0);
                        that.noBtn.setAlpha(0);
                    }
                }
            });
        }// Fin DEVICE == desktop

        game.mPlayer.image.on("animationcomplete", function (anim) {
            if (anim.key === game.mPlayer.characterSel.type + "_attack") {
                console.log("Fin de animación");
                that.attacking = false;
                // Enviar mensaje de ataque
                // game.global.socket.send(JSON.stringify({event: ""}));
            }
        }, this);

        //Plataformas
        this.transimage = this.physics.add.image(RelativeScale(522.50, "x"), RelativeScale(889.0, "y"), "level_1_trans").setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(2);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(RelativeScale(960.0, "x"), RelativeScale(1038.0, "y"), "floor")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody().setDepth(-1)
            .body.setSize(RelativeScale(1920, "x"), RelativeScale(84, "y")).setOffset(0, RelativeScale(20, "y"));

        this.platforms.create(RelativeScale(1527.5, "x"), RelativeScale(747.50, "y"), "base_big_plat_2")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody()
            .body.setSize(RelativeScale(385, "x"), RelativeScale(75, "y")).setOffset(0, RelativeScale(-10, "y"));

        this.platforms.create(RelativeScale(947.0, "x"), RelativeScale(511.0, "y"), "base_t_plat")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody()
        // .body.setSize(RelativeScale(279,"x"),RelativeScale(34,"y")).setOffset(0,RelativeScale(12,"y"));

        this.platforms.create(RelativeScale(503.0, "x"), RelativeScale(717.50, "y"), "big_plat_1") // 502.5 x 707
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody()
            .body.setSize(RelativeScale(328, "x"), RelativeScale(90, "y")).setOffset(0, RelativeScale(-10, "y"));

        this.platforms.create(RelativeScale(1763.0, "x"), RelativeScale(371.5, "y"), "big_plat_2") // 1764 x 362
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody()
        // .body.setSize(RelativeScale(341,"x"),RelativeScale(165,"y")).setOffset(0,RelativeScale(12,"y"));

        this.platforms.create(RelativeScale(90.50, "x"), RelativeScale(441.0, "y"), "plat_1")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody()
        // .body.setSize(RelativeScale(181,"x"),RelativeScale(40,"y")).setOffset(0,RelativeScale(10,"y"));

        this.platforms.create(RelativeScale(517.50, "x"), RelativeScale(213.50, "y"), "plat_2")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody()
        // .body.setSize(RelativeScale(218,"x"),RelativeScale(40,"y")).setOffset(0,RelativeScale(10,"y"));

        this.platforms.create(RelativeScale(1230.50, "x"), RelativeScale(115.0, "y"), "plat_3")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody()
        // .body.setSize(RelativeScale(207,"x"),RelativeScale(40,"y")).setOffset(0,RelativeScale(10,"y"));

        this.platforms.create(RelativeScale(945.50, "x"), RelativeScale(371.50, "y"), "t_plat")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).refreshBody()
        // .body.setSize(RelativeScale(56,"x"),RelativeScale(140,"y")).setOffset(0,RelativeScale(10,"y"));

        this.hidePlatforms = [this.transimage];
        this.hidePlatforms.forEach(platform => {
            platform.body.setCollideWorldBounds(true);
            platform.body.allowGravity = false;
        });

        //Colisiones
        this.characters = [game.mPlayer.image, this.dummy/**, enemyPlayer/**/];
        //this.bullets = [];

        //this.physics.add.overlap(this.characters, this.bullets, this.BulletHit, player, bullet);
        //this.physics.add.collider(this.characters, this.platforms);
        this.physics.add.overlap(this.characters, this.hidePlatforms);
    } // Fin create

    update() {
        if (this.movingLeft || this.movingRight) {
            if (!this.attacking) {
                game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_walk", true);
            }
        } else {
            if (!this.attacking) {
                game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_idle", true);
            }
        }
        this.UpdateGameState();

        // Mostrar u ocultar las plataformas al pasar por encima
        this.hidePlatforms.forEach(platform => {
            if (platform.body.embedded) platform.body.touching.none = false;
            if (!platform.body.touching.none && platform.body.wasTouching.none) {
                this.HidePlatform(platform);
            } else if (platform.body.touching.none && !platform.body.wasTouching.none) {
                this.ShowPlatform(platform);
            }
        });
        /*
        if (this.dummy.body.touching.down){
            // this.dummy.body.velocity.y = RelativeScale(-800,"y");
        }
        */

    } // Fin update

    /** *
    BulletHit(player, bullet) {
        this.DamagePlayer(player, bullet);
        this.RemoveBullet(bullet);
    }

    RemoveBullet(bullet) {
        var index = bullet.bulletIndex;
        this.bullets[index].destroy();

        for (var i = index; i < (this.bullets.length - 1); i++) {
            this.bullets[i] = this.bullets[i + 1]
        }

        this.bullets[this.bullets.length].destroy();
    }

    DamagePlayer(player, attack) {
        player.actualHP -= attack.damage;

        if (player.actualHP <= 0)
            player.die();
    }
    /** */

    // Comunicación de estado con el servidor
    UpdateGameState() {
        game.global.socket.send(JSON.stringify({
            event: "UPDATE_CLIENT",
            movingLeft: this.movingLeft, movingRight: this.movingRight, falling: this.falling
        }));
    }
    // Petición de salto del personaje
    Jump() {
        this.falling = false;
        game.global.socket.send(JSON.stringify({ event: "ACTION", type: "JUMP" }));
    }
    Fall() {
        this.falling = true;
        game.global.socket.send(JSON.stringify({ event: "ACTION", type: "FALL" }));
    }

    // Petición de ataque básico
    BasicAttack() {
        game.global.socket.send(JSON.stringify({ event: "ACTION", type: "BASIC_ATTACK", room: game.mPlayer.room }));
    }
    // Petición de ataque especial
    SpecialAttack() {
        game.global.socket.send(JSON.stringify({ event: "ACTION", type: "SPECIAL_ATTACK", room: game.mPlayer.room }));
    }

    // Joystick movil
    DumpJoyStickState() {
        var cursorKeys = this.mobileKeys.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        s += '\n';
        s += ('Force: ' + Math.floor(this.mobileKeys.joyStick.force * 100) / 100 + '\n');
        s += ('Angle: ' + Math.floor(this.mobileKeys.joyStick.angle * 100) / 100 + '\n');
        this.text.setText(s);
    }

    HidePlatform(platform) {
        var tween = this.tweens.add({
            targets: platform,
            alpha: 0.3,
            ease: 'Sine.easeInOut',
            duration: 200,
        });
    }

    ShowPlatform(platform) {
        var tween = this.tweens.add({
            targets: platform,
            alpha: 1.0,
            ease: 'Sine.easeInOut',
            duration: 200,
        });
    }

}