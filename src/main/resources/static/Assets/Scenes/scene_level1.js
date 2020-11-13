class Scene_Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "scene_level1" });
    } // Fin constructor

    preload() {
        var that = this;
        // this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars").setOrigin(0, 0)
        this.bg = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1174.5, "y"), "level_2_bg").setOrigin(0, 0).setDepth(-5);
        this.bg.tileScaleX = scaleX;
        this.bg.tileScaleY = scaleY;
        this.bgDetails = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1174.5, "y"), "level_2_bg_details").setOrigin(0, 0).setDepth(-3);
        this.bgDetails.tileScaleX = scaleX;
        this.bgDetails.tileScaleY = scaleY;
        this.bgMove = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1174.5, "y"), "level_2_bg_move").setOrigin(0, 0).setDepth(-2);
        this.bgMove.tileScaleX = scaleX;
        this.bgMove.tileScaleY = scaleY;
        this.tweens.add({
            targets: that.bgMove,
            y: (that.bgMove.y + 3),
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        this.fgDetails = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1174.5, "y"), "level_2_fg_details").setOrigin(0, 0).setDepth(3);
        this.fgDetails.tileScaleX = scaleX;
        this.fgDetails.tileScaleY = scaleY;
        this.fgMove = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1174.5, "y"), "level_2_fg_move").setOrigin(0, 0).setDepth(4);
        this.fgMove.tileScaleX = scaleX;
        this.fgMove.tileScaleY = scaleY;
        this.tweens.add({
            targets: that.fgMove,
            y: (that.fgMove.y - 4),
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        if (game.global.DEVICE == "mobile") {
            var url;
            url = './Assets/Plugins/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
        }

        this.gamePaused;
        this.gameStopped;
        // Variables encargadas del control del jugador
        this.myMovingLeft;
        this.myMovingRight;
        this.falling;
        this.myAttacking;
        this.myProjectiles = [];
        this.myHP;

        // Variables encargadas del control del enemigo
        this.eMovingLeft;
        this.eMovingRight;
        this.eAttacking;
        this.eProjectiles = [];
        this.eHP;

        /// Versus
        // Background
        this.versus_main_bg = this.add.image(0, 0, "simple_bg").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(10);
        this.versus_stars = this.add.tileSprite(0, 0, RelativeScale(1920, "x"), RelativeScale(1080, "y"), "stars").setOrigin(0, 0).setDepth(11);

        this.versus_bg = this.add.image(0, 0, "versus_bg").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(12);
        this.versus_vs = this.add.image(RelativeScale(931.5, "x"), RelativeScale(539, "y"), "versus_vs").setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(14);

        // Si el enemigo es el B, el jugador es el A
        if (game.mEnemy.AorB == "B") {
            this.versus_usernameA = this.add.text(RelativeScale(236.56, "x"), RelativeScale(950.19, "y"), game.mPlayer.userName).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(52);
            this.versus_usernameB = this.add.text(RelativeScale(1602.39, "x"), RelativeScale(163.70, "y"), game.mEnemy.userName).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(52);

            this.versus_characterA = this.add.image(RelativeScale(440, "x"), RelativeScale(450, "Y"), "splashart_" + game.mPlayer.characterSel.type).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(13);
            this.versus_characterB = this.add.image(RelativeScale(1680, "x"), RelativeScale(700, "Y"), "splashart_" + game.mEnemy.characterSel.type).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(13);
        }
        // Si no, el jugador es el B
        else {
            this.versus_usernameA = this.add.text(RelativeScale(236.56, "x"), RelativeScale(950.19, "y"), game.mEnemy.userName).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(52);
            this.versus_usernameB = this.add.text(RelativeScale(1602.39, "x"), RelativeScale(163.70, "y"), game.mPlayer.userName).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(52);

            this.versus_characterA = this.add.image(RelativeScale(440, "x"), RelativeScale(450, "Y"), "splashart_" + game.mEnemy.characterSel.type).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(13);
            this.versus_characterB = this.add.image(RelativeScale(1680, "x"), RelativeScale(700, "Y"), "splashart_" + game.mPlayer.characterSel.type).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(13);
        }

        switch (game.mEnemy.AorB) {
            // Player is A
            case "B":
                // Player
                switch (game.mPlayer.characterSel.type) {
                    case "bard":
                        this.versus_characterA.x = RelativeScale(310, "x");
                        this.versus_characterA.y = RelativeScale(280, "y");
                        this.versus_characterA.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        break;
                    case "wizard":
                        this.versus_characterA.setScale(RelativeScale(1.1, "x"), RelativeScale(1.1, "y"));
                        this.versus_characterA.setFlip(true);
                        break;
                    case "rogue":
                        this.versus_characterA.x = RelativeScale(400, "x");
                        this.versus_characterA.y = RelativeScale(380, "y");
                        this.versus_characterA.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        this.versus_characterA.setFlip(true);
                        break;
                    case "berserker":
                        this.versus_characterA.x = RelativeScale(250, "x");
                        this.versus_characterA.y = RelativeScale(340, "y");
                        this.versus_characterA.setScale(RelativeScale(1.2, "x"), RelativeScale(1.3, "y"));
                        break;
                }

                // Enemy
                switch (game.mEnemy.characterSel.type) {
                    case "bard":
                        this.versus_characterB.x = RelativeScale(1600, "x");
                        this.versus_characterB.y = RelativeScale(640, "y");
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        this.versus_characterB.setFlip(true);
                        break;
                    case "wizard":
                        this.versus_characterB.x = RelativeScale(1540, "x");
                        this.versus_characterB.setScale(RelativeScale(1.1, "x"), RelativeScale(1.1, "y"));
                        break;
                    case "rogue":
                        this.versus_characterB.x = RelativeScale(1530, "x");
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        break;
                    case "berserker":
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        this.versus_characterB.setFlip(true);
                        break;
                }
                break;
            // Player is B
            case "A":
                // Player
                switch (game.mPlayer.characterSel.type) {
                    case "bard":
                        this.versus_characterB.x = RelativeScale(1600, "x");
                        this.versus_characterB.y = RelativeScale(640, "y");
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        this.versus_characterB.setFlip(true);
                        break;
                    case "wizard":
                        this.versus_characterB.x = RelativeScale(1540, "x");
                        this.versus_characterB.setScale(RelativeScale(1.1, "x"), RelativeScale(1.1, "y"));
                        break;
                    case "rogue":
                        this.versus_characterB.x = RelativeScale(1530, "x");
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        break;
                    case "berserker":
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        this.versus_characterB.setFlip(true);
                        break;
                }

                // Enemy
                switch (game.mEnemy.characterSel.type) {
                    case "bard":
                        this.versus_characterA.x = RelativeScale(310, "x");
                        this.versus_characterA.y = RelativeScale(280, "y");
                        this.versus_characterA.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        break;
                    case "wizard":
                        this.versus_characterA.setScale(RelativeScale(1.1, "x"), RelativeScale(1.1, "y"));
                        this.versus_characterA.setFlip(true);
                        break;
                    case "rogue":
                        this.versus_characterA.x = RelativeScale(400, "x");
                        this.versus_characterA.y = RelativeScale(380, "y");
                        this.versus_characterA.setScale(RelativeScale(1.3, "x"), RelativeScale(1.3, "y"));
                        this.versus_characterA.setFlip(true);
                        break;
                    case "berserker":
                        this.versus_characterA.x = RelativeScale(250, "x");
                        this.versus_characterA.y = RelativeScale(340, "y");
                        this.versus_characterA.setScale(RelativeScale(1.2, "x"), RelativeScale(1.2, "y"));
                        break;
                }
                break;
        }

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_level1";

        this.gamePaused = false;
        this.gameStopped = true;

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
            }).on('update', this.dumpJoyStickState, this);

            this.text = this.add.text(0, 0);
            this.dumpJoyStickState();

            this.mobileKeys.jumpButton = this.add.circle(RelativeScale(1160, "x"), RelativeScale(630, "y"), 20, 0xdddddd).setAlpha(0.7).setScale(RelativeScale()).setDepth(1000).setInteractive();

            this.input.addPointer(2);
        }

        this.myMovingLeft = false;
        this.myMovingRight = false;
        this.falling = false;
        this.myAttacking = false;
        this.canBasicAttack = true;
        this.canSpecialAttack = true;
        switch (game.mPlayer.characterSel.type) {
            case "berserker":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "berserker")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("berserker_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 100);
                for (var i = 0; i < 3; i++) {
                    this.myProjectiles.push(this.add.image(0, 0, "berserker_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
                }
                break;
            case "wizard":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "wizard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("wizard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 100);
                for (var i = 0; i < 9; i++) {
                    this.myProjectiles.push(this.add.image(0, 0, "wizard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
                }
                break;
            case "bard":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "bard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("bard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 100);
                for (var i = 0; i < 3; i++) {
                    this.myProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
                }
                break;
            case "rogue":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "rogue")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("rogue_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 75);
                for (var i = 0; i < 9; i++) {
                    this.myProjectiles.push(this.add.image(0, 0, "rogue_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
                }
                break;
            default:
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "bard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("bard_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 100, 50);
                for (var i = 0; i < 3; i++) {
                    this.myProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
                }
                break;
        }
        game.mPlayer.image.body.setSize(0, 0);
        game.mPlayer.image.body.allowGravity = false;

        // Enemigo
        this.eMovingLeft = false;
        this.eMovingRight = false;
        this.eAttacking = false;
        switch (game.mEnemy.characterSel.type) {
            case "berserker":
                game.mEnemy.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "berserker")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mEnemy.image.anims.play("berserker_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 100, 100);
                for (var i = 0; i < 3; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "berserker_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                break;
            case "wizard":
                game.mEnemy.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "wizard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mEnemy.image.anims.play("wizard_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 100, 100);
                for (var i = 0; i < 9; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "wizard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                break;
            case "bard":
                game.mEnemy.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "bard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mEnemy.image.anims.play("bard_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 100, 100);
                for (var i = 0; i < 3; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                break;
            case "rogue":
                game.mEnemy.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "rogue")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mEnemy.image.anims.play("rogue_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 100, 75);
                for (var i = 0; i < 9; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "rogue_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                break;
            default:
                game.mEnemy.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "bard")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mEnemy.image.anims.play("bard_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 100, 50);
                for (var i = 0; i < 3; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                break;
        }
        game.mEnemy.image.body.setSize(0, 0);
        game.mEnemy.image.body.allowGravity = false;

        if (game.global.DEVICE === "desktop") {
            this.input.keyboard.on("keydown-" + "A", function (event) {
                that.myMovingRight = false;
                that.myMovingLeft = true;
            });
            this.input.keyboard.on("keyup-" + "A", function (event) {
                that.myMovingLeft = false;
            });

            this.input.keyboard.on("keydown-" + "D", function (event) {
                that.myMovingRight = true;
                that.myMovingLeft = false;
            });
            this.input.keyboard.on("keyup-" + "D", function (event) {
                that.myMovingRight = false;
            });

            this.input.keyboard.on("keydown-" + "W", function (event) {
                that.Jump();
            });

            this.input.keyboard.on("keydown-" + "S", function (event) {
                that.Fall();
            });

            this.input.keyboard.on("keydown-" + "O", function (event) {
                that.BasicAttack();
            });

            this.input.keyboard.on("keydown-" + "P", function (event) {
                that.SpecialAttack();
            });
        }// Fin DEVICE == desktop

        game.mPlayer.image.on("animationcomplete", function (anim) {
            if (anim.key === game.mPlayer.characterSel.type + "_attack") {
                console.log("Fin de animación");
                that.myAttacking = false;
                // Enviar mensaje de ataque
                // game.global.socket.send(JSON.stringify({event: ""}));
            }
        }, this);

        game.mEnemy.image.on("animationcomplete", function (anim) {
            if (anim.key === game.mEnemy.characterSel.type + "_attack") {
                console.log("Fin de animación");
                that.eAttacking = false;
                // Enviar mensaje de ataque
                // game.global.socket.send(JSON.stringify({event: ""}));
            }
        }, this);

        /// Comunicación
        that.time.addEvent({
            delay: 3000,
            callback: () => (that.PreparedForPlay())
        });
    } // Fin create

    update() {
        if (this.myMovingLeft || this.myMovingRight) {
            if (!this.myAttacking) {
                game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_walk", true);
            }
        } else {
            if (!this.myAttacking) {
                game.mPlayer.image.anims.play(game.mPlayer.characterSel.type + "_idle", true);
            }
        }

        if (this.eMovingLeft || this.eMovingRight) {
            if (!this.eAttacking) {
                game.mEnemy.image.anims.play(game.mEnemy.characterSel.type + "_walk", true);
            }
        } else {
            if (!this.eAttacking) {
                game.mEnemy.image.anims.play(game.mEnemy.characterSel.type + "_idle", true);
            }
        }
        this.UpdateGameState();

        // Stars
        this.versus_stars.tilePositionX += 0.2;
        this.versus_stars.tilePositionY += 0.4;
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
        if (!this.gameStopped && !this.gamePaused){
            game.global.socket.send(JSON.stringify({
                event: "UPDATE_CLIENT",
                movingLeft: this.myMovingLeft, movingRight: this.myMovingRight, falling: this.falling
            }));
        }
    }
    // Petición de salto del personaje
    Jump() {
        if (!this.gameStopped && !this.gamePaused){
            this.falling = false;
            game.global.socket.send(JSON.stringify({ event: "ACTION", type: "JUMP" }));
        }
    }
    Fall() {
        if (!this.gameStopped && !this.gamePaused){
            this.falling = true;
            game.global.socket.send(JSON.stringify({ event: "ACTION", type: "FALL" }));
        }
    }

    // Petición de ataque básico
    BasicAttack() {
        if (!this.gameStopped && !this.gamePaused){
            game.global.socket.send(JSON.stringify({ event: "ACTION", type: "BASIC_ATTACK", room: game.mPlayer.room }));
        }
    }
    // Petición de ataque especial
    SpecialAttack() {
        if (!this.gameStopped && !this.gamePaused){
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

    PreparedForPlay() {
        game.global.socket.send(JSON.stringify({ event: "GAME_START", room: game.mPlayer.room }));
    }

    StartGame() {
        console.log("Se llama a esconder el versus");
        this.gameStopped = false;
        this.versus_main_bg.setVisible(false);
        this.versus_stars.setVisible(false);
        this.versus_bg.setVisible(false);
        this.versus_vs.setVisible(false);
        this.versus_usernameA.setVisible(false);
        this.versus_usernameB.setVisible(false);
        this.versus_characterA.setVisible(false);
        this.versus_characterB.setVisible(false);
    }

    FinishGame(wasDisconnection)
    {
        // Mostrar pantalla de fin de partida
        this.gameStopped = true;
        // disconnectionText.setVisible(true); o addText
        // Si fue una desconexión, mostrar al jugador el texto de desconexión
        if (wasDisconnection)
        {
            // disconnectionText.setVisible(true);
        }
        // Si no, mostrar el texto de 'K.O.'
        else
        {
            // koText.setVisible(true);
        }
    }
}