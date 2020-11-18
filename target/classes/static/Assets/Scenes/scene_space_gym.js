class Scene_Space_Gym extends Phaser.Scene {
    constructor() {
        super({ key: "scene_space_gym" });
    } // Fin constructor

    preload() {
        var that = this;

        this.add.image(0, 0, "level_1_bg").setOrigin(0, 0).setDepth(-5);
        this.add.image(0, 0, "level_1_bg_details").setOrigin(0, 0).setDepth(-3);
        this.bgMove = this.add.image(0, 0, "level_1_bg_move").setOrigin(0, 0).setDepth(-2);
        this.tweens.add({
            targets: that.bgMove,
            y: (that.bgMove.y + 3),
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        this.add.image(0, 0, "level_1_plats_floor").setOrigin(0, 0).setDepth(-1);
        this.add.image(0, 0, "level_1_fg_details").setOrigin(0, 0).setDepth(3);
        this.fgMove = this.add.image(0, 0, "level_1_fg_move").setOrigin(0, 0).setDepth(4);
        this.tweens.add({
            targets: that.fgMove,
            y: (that.fgMove.y - 4),
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        this.add.image(114.50, 112.0, "back_button_interface")
            .setDepth(5);
        this.backBtn = this.add.image(66.0, 78.5, "back_button")
            .setDepth(5);

        this.msgImg = this.add.image(0.0, 0.0, "msg_bg").setOrigin(0, 0)
            .setDepth(10);
        this.msgImg.setAlpha(0);
        this.pauseText = this.add.image(960.0, 270.0, "pause_text")
            .setDepth(10);
        this.pauseText.setAlpha(0);
        this.noBtn = this.add.image(1325.50, 616.0, "no!!_button")
            .setDepth(10);
        this.noBtn.setAlpha(0);
        this.yesBtn = this.add.image(587.0, 616.0, "yes..._button")
            .setDepth(10);
        this.yesBtn.setAlpha(0);

        this.mobileKeys;
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

        // Efectos de sonido
        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");
        this.myAttackSound;
        this.myHitSound;

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_space_gym";

        // Fade in
        this.cam = this.cameras.main;
        this.cam.fadeIn(300);

        // Idle timer
        that.time.addEvent({
            delay: 2000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

        // Dummy de prácticas
        this.dummy = this.add.image(1500, 940, "dummy");
        this.dummyBar = new UserInterface(this, this.dummy, 1000, 80, 0xff0000);
        this.dummy.userInterface = this.dummyBar;
        
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
                game.mPlayer.image = this.physics.add.sprite(250, 850, "berserker")
                    ;
                game.mPlayer.image.anims.play("berserker_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 1500, 100, 0x00ff00);
                for (var i = 0; i < 3; i++) {
                    this.projectiles.push(this.add.image(0, 0, "berserker_projectile").
                        setScale(1, 1).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                this.myAttackSound = this.sound.add("berserker_attack");
                this.myHitSound = this.sound.add("berserker_hit");
                break;
            case "wizard":
                game.mPlayer.image = this.physics.add.sprite(250, 850, "wizard")
                    ;
                game.mPlayer.image.anims.play("wizard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 1000, 100, 0x00ff00);
                for (var i = 0; i < 9; i++) {
                    this.projectiles.push(this.add.image(0, 0, "wizard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                this.myAttackSound = this.sound.add("wizard_attack");
                this.myHitSound = this.sound.add("wizard_hit");
                break;
            case "bard":
                game.mPlayer.image = this.physics.add.sprite(250, 850, "bard")
                    ;
                game.mPlayer.image.anims.play("bard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 1200, 100, 0x00ff00);
                for (var i = 0; i < 3; i++) {
                    this.projectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                this.myAttackSound = this.sound.add("bard_attack");
                this.myHitSound = this.sound.add("bard_hit");
                break;
            case "rogue":
                game.mPlayer.image = this.physics.add.sprite(250, 850, "rogue")
                    ;
                game.mPlayer.image.anims.play("rogue_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 800, 75, 0x00ff00);
                for (var i = 0; i < 9; i++) {
                    this.projectiles.push(this.add.image(0, 0, "rogue_projectile").
                        setScale(1, 1).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                this.myAttackSound = this.sound.add("rogue_attack");
                this.myHitSound = this.sound.add("rogue_hit");
                break;
            default:
                game.mPlayer.image = this.physics.add.sprite(250, 850, "bard")
                    ;
                game.mPlayer.image.anims.play("bard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 1200, 50, 0x00ff00);
                for (var i = 0; i < 3; i++) {
                    this.projectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.projectiles[0].setVisible(false);
                }
                this.myAttackSound = this.sound.add("bard_attack");
                this.myHitSound = this.sound.add("bard_hit");
                break;
        }
        game.mPlayer.image.body.setSize(0, 0);
        game.mPlayer.image.body.allowGravity = false;

        // Si el dispositivo es movil, añadir un joystick y un boton
        if (game.global.DEVICE == "mobile" || game.global.DEBUG_PHONE) {
            // Create mobileKeys
            this.mobileKeys = {
                joyStick: null,
                jumpButton: null,
                attackButton: null
            };

            this.mobileKeys.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 200,
                y: 900,
                radius: 40,
                base: this.add.circle(0, 0, 100, 0x888888).setAlpha(0.7).setDepth(8),
                thumb: this.add.circle(0, 0, 80, 0xcccccc).setAlpha(0.7).setDepth(9),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            }).on('update', this.DumpJoyStickState, this);
            this.text = this.add.text(0, 0);
            this.DumpJoyStickState();

            this.input.addPointer(2);
            
            this.mobileKeys.jumpButton = this.add.image(1717.50, 895.50, "jump_button_mobile")
            .setAlpha(0.5).setDepth(8);
            this.mobileKeys.jumpButton.setInteractive().on('pointerdown', that.Jump, this);
            
            this.mobileKeys.attackButton = this.add.image(1614.00, 635.50, "skills_button_mobile")
            .setAlpha(0.5).setDepth(8);
            switch (game.mPlayer.characterSel.type) {
                case 'berserker':
                    this.mobileKeys.attackButton.setFrame(2);
                    break;
                case 'wizard':
                    this.mobileKeys.attackButton.setFrame(0);
                    break;
                case 'bard':
                    this.mobileKeys.attackButton.setFrame(3);
                    break;
                case 'rogue':
                    this.mobileKeys.attackButton.setFrame(1);
                    break;
                default:
                    this.mobileKeys.attackButton.setFrame(0);
                    break;
            }
            this.mobileKeys.attackButton.setInteractive().on('pointerdown', that.BasicAttack, this);

            this.input.on('pointerdown', function (pointer, localX, localY, event) {
                if ((Unscale(pointer.downX) < 960) && (Unscale(pointer.downY) > 540)) {
                    that.mobileKeys.joyStick.x = pointer.downX;
                    that.mobileKeys.joyStick.y = pointer.downY;
                }
            });

            this.input.on('pointerup', function () {
                that.backBtn.setFrame(0);
                that.yesBtn.setFrame(0);
                that.noBtn.setFrame(0);
                that.mobileKeys.joyStick.x = 200;
                that.mobileKeys.joyStick.y = 900;
            });

            

        } else if (game.global.DEVICE === "desktop") {
            this.add.image(62, 28.86, "escape_text")
                .setDepth(5);
            this.input.keyboard.on("keydown-" + "A", function (event) {
                if (!that.paused) {
                    that.movingRight = false;
                    that.movingLeft = true;
                } else {
                    that.changeOptionSound.play({ volume: game.options.SFXVol });
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
            this.input.keyboard.on("keydown-" + "LEFT", function (event) {
                if (!that.paused) {
                    that.movingRight = false;
                    that.movingLeft = true;
                } else {
                    that.changeOptionSound.play({ volume: game.options.SFXVol });
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
            this.input.keyboard.on("keyup-" + "LEFT", function (event) {
                if (!that.paused) {
                    that.movingLeft = false;
                }
            });

            this.input.keyboard.on("keydown-" + "D", function (event) {
                if (!that.paused) {
                    that.movingRight = true;
                    that.movingLeft = false;
                } else {
                    that.changeOptionSound.play({ volume: game.options.SFXVol });
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
            this.input.keyboard.on("keydown-" + "RIGHT", function (event) {
                if (!that.paused) {
                    that.movingRight = true;
                    that.movingLeft = false;
                } else {
                    that.changeOptionSound.play({ volume: game.options.SFXVol });
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
            this.input.keyboard.on("keyup-" + "RIGHT", function (event) {
                if (!that.paused) {
                    that.movingRight = false;
                }
            });

            this.input.keyboard.on("keydown-" + "W", function (event) {
                if (!that.paused) {
                    that.Jump();
                }
            });
            this.input.keyboard.on("keydown-" + "UP", function (event) {
                if (!that.paused) {
                    that.Jump();
                }
            });
            this.input.keyboard.on("keydown-" + "SPACE", function (event) {
                if (!that.paused) {
                    that.Jump();
                }
            });

            this.input.keyboard.on("keydown-" + "S", function (event) {
                if (!that.paused) {
                    that.Fall();
                }
            });
            this.input.keyboard.on("keydown-" + "DOWN", function (event) {
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
                else
                {
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    if (that.returnToMenu) {
                        // Volver al menú
                        game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.get("scene_boot").FadeTransition("scene_main_menu");
                        //that.scene.start("scene_main_menu");
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

            /*this.input.keyboard.on("keydown-" + "P", function (event) {
                if (!that.paused) {
                    if (!that.attacking) {
                        that.SpecialAttack();
                    }
                }
            });*/

            this.input.keyboard.on("keydown-" + "ESC", function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
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
                    that.backBtn.setInteractive();
                }
                that.paused = !that.paused;
                that.returnToMenu = false;
                that.movingLeft = false;
                that.movingRight = false;
            });

            this.input.keyboard.on("keydown-" + "ENTER", function (event) {
                if (that.paused) {
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    if (that.returnToMenu) {
                        // Volver al menú
                        game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.get("scene_boot").FadeTransition("scene_main_menu");
                        //that.scene.start("scene_main_menu");
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

        this.backBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.backBtn.setFrame(1);
            if (game.global.DEBUG_MODE) {
                console.log("Back pulsado");
            }
        });
        this.backBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.backBtn.setFrame(0);
            if (!that.paused) {
                that.backBtn.disableInteractive();
                that.msgImg.setAlpha(1);
                that.pauseText.setAlpha(1);
                that.yesBtn.setAlpha(1);
                that.yesBtn.setFrame(0);
                that.noBtn.setAlpha(1);
                that.noBtn.setFrame(0);
            }
            that.paused = !that.paused;
            that.movingLeft = false;
            that.movingRight = false;
            if (game.global.DEBUG_MODE) {
                console.log("Back soltado");
            }
        });

        this.yesBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.returnToMenu = true;
            that.yesBtn.setFrame(1);
            that.noBtn.setFrame(0);
        });
        this.yesBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
            that.input.keyboard.removeAllKeys(true);
            that.scene.get("scene_boot").FadeTransition("scene_main_menu");
            //that.scene.start("scene_main_menu");
        });

        this.noBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            that.returnToMenu = false;
            that.yesBtn.setFrame(0);
            that.noBtn.setFrame(1);
        });
        this.noBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
            that.pressOptionSound.play({ volume: game.options.SFXVol });
            that.backBtn.setInteractive();
            that.paused = false;
            that.msgImg.setAlpha(0);
            that.pauseText.setAlpha(0);
            that.yesBtn.setAlpha(0);
            that.noBtn.setAlpha(0);
            that.noBtn.setFrame(0)
        });

        game.mPlayer.image.on("animationcomplete", function (anim) {
            if (anim.key === game.mPlayer.characterSel.type + "_attack") {
                console.log("Fin de animación");
                that.attacking = false;
                // Enviar mensaje de ataque
                // game.global.socket.send(JSON.stringify({event: ""}));
            }
        }, this);

        //Plataformas
        this.transimage = this.physics.add.image(522.50, 889.0, "level_1_trans").setDepth(2);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(960.0, 1038.0, "floor")
            .refreshBody().setDepth(-1)
            .body.setSize(1920, 84).setOffset(0, 20);

        this.platforms.create(1527.5, 747.50, "base_big_plat_2")
            .refreshBody()
            .body.setSize(385, 75).setOffset(0, -10);

        this.platforms.create(947.0, 511.0, "base_t_plat")
            .refreshBody()
        // .body.setSize(279,34).setOffset(0,12);

        this.platforms.create(503.0, 717.50, "big_plat_1") // 502.5 x 707
            .refreshBody()
            .body.setSize(328, 90).setOffset(0, -10);

        this.platforms.create(1763.0, 371.5, "big_plat_2") // 1764 x 362
            .refreshBody()
        // .body.setSize(341,165).setOffset(0,12);

        this.platforms.create(90.50, 441.0, "plat_1")
            .refreshBody()
        // .body.setSize(181,40).setOffset(0,10);

        this.platforms.create(517.50, 213.50, "plat_2")
            .refreshBody()
        // .body.setSize(218,40).setOffset(0,10);

        this.platforms.create(1230.50, 115.0, "plat_3")
            .refreshBody()
        // .body.setSize(207,40).setOffset(0,10);

        this.platforms.create(945.50, 371.50, "t_plat")
            .refreshBody()
        // .body.setSize(56,140).setOffset(0,10);

        this.hidePlatforms = [this.transimage];
        this.hidePlatforms.forEach(platform => {
            platform.body.setCollideWorldBounds(true);
            platform.body.allowGravity = false;
        });

        //Colisiones
        this.characters = [game.mPlayer.image, this.dummy];
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

        if (game.global.DEVICE == "mobile" || game.global.DEBUG_PHONE){
            // Movimiento
            if (!this.paused) {
                // Izquierda
                if ((this.mobileKeys.joyStick.angle < -(90) || this.mobileKeys.joyStick.angle > 135) && this.mobileKeys.joyStick.force > 16) {
                    this.movingLeft = true;
                    this.movingRight = false;
                }
                // Derecha
                else if ((this.mobileKeys.joyStick.angle > -(90) && this.mobileKeys.joyStick.angle < 45) && this.mobileKeys.joyStick.force > 16) {
                    this.movingRight = true;
                    this.movingLeft = false;
                } else if ((this.mobileKeys.joyStick.angle > 45 && this.mobileKeys.joyStick.angle < 135) && this.mobileKeys.joyStick.force > 16) {
                    this.Fall();
                } else {
                    this.movingRight = false;
                    this.movingLeft = false;
                }
            }
            // Mover el joystick si se sale del radio
            if (this.mobileKeys.joyStick.force > (150)){
                this.mobileKeys.joyStick.x += ((this.mobileKeys.joyStick.thumb.x - this.mobileKeys.joyStick.base.x));
                this.mobileKeys.joyStick.y += ((this.mobileKeys.joyStick.thumb.y - this.mobileKeys.joyStick.base.y));
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
        if (!this.paused) {
            this.falling = false;
            game.global.socket.send(JSON.stringify({ event: "ACTION", type: "JUMP" }));
        }
    }
    Fall() {
        if (!this.paused) {
            this.falling = true;
            game.global.socket.send(JSON.stringify({ event: "ACTION", type: "FALL" }));
        }

    }

    // Petición de ataque básico
    BasicAttack() {
        if (!this.paused) {
            game.global.socket.send(JSON.stringify({ event: "ACTION", type: "BASIC_ATTACK", room: game.mPlayer.room }));
        }
    }
    // Petición de ataque especial
    SpecialAttack() {
        if (!this.paused) {
            game.global.socket.send(JSON.stringify({ event: "ACTION", type: "SPECIAL_ATTACK", room: game.mPlayer.room }));
        }
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