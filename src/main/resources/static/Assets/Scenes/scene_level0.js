class Scene_Level0 extends Phaser.Scene {
    constructor() {
        super({ key: "scene_level0" });
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
        this.returnToMenu;
        this.gamePaused;
        this.gameStopped;

        // Efectos de sonido
        this.changeOptionSound = this.sound.add("change_button");
        this.pressOptionSound = this.sound.add("press_button");
        
        // Variables encargadas del control del jugador
        this.myMovingLeft;
        this.myMovingRight;
        this.falling;
        this.myAttacking;
        this.myProjectiles = [];
        this.myHP;
        this.myAttackSound;
        this.myHitSound;

        // Variables encargadas del control del enemigo
        this.eMovingLeft;
        this.eMovingRight;
        this.eAttacking;
        this.eProjectiles = [];
        this.eHP;
        this.eAttackSound;
        this.eHitSound;

        /// Versus
        // Background
        this.versus_main_bg = this.add.image(0, 0, "simple_bg").setOrigin(0, 0).setDepth(10);
        this.versus_stars = this.add.tileSprite(0, 0, 1920, 1080, "stars").setOrigin(0, 0).setDepth(11);

        this.versus_left_circle = this.add.image(0, 0, "versus_left_circle").setOrigin(0, 0).setDepth(12);
        this.versus_right_circle = this.add.image(0, 0, "versus_right_circle").setOrigin(0, 0).setDepth(12);
        this.versus_vs = this.add.image(931.5, 539, "versus_vs").setDepth(14);

        // Si el enemigo es el B, el jugador es el A
        if (game.mEnemy.AorB == "B") {
            this.versus_usernameA = this.add.text(236.56, 950.19, game.mPlayer.userName, { fontFamily: 'font_Write' }).setOrigin(0.5, 0.5).setDepth(15).setFontSize(52);
            this.versus_usernameB = this.add.text(1582.39, 133.70, game.mEnemy.userName, { fontFamily: 'font_Write' }).setOrigin(0.5, 0.5).setDepth(15).setFontSize(52);

            this.versus_characterA = this.add.image(440, 450, "splashart_" + game.mPlayer.characterSel.type).setDepth(13);
            this.versus_characterB = this.add.image(1680, 700, "splashart_" + game.mEnemy.characterSel.type).setDepth(13);

            this.versus_pointsA = this.add.text(236.56, 1000.19, "Points: " + game.mPlayer.points, { fontFamily: 'font_Write' }).setOrigin(0.5, 0.5).setDepth(15).setFontSize(44);
            this.versus_pointsB = this.add.text(1582.39, 183.70, "Points: " + game.mEnemy.points, { fontFamily: 'font_Write' }).setOrigin(0.5, 0.5).setDepth(15).setFontSize(44);
        }
        // Si no, el jugador es el B
        else {
            this.versus_usernameA = this.add.text(236.56, 950.19, game.mEnemy.userName, { fontFamily: 'font_Write' }).setOrigin(0.5, 0.5).setDepth(15).setFontSize(52);
            this.versus_usernameB = this.add.text(1582.39, 133.70, game.mPlayer.userName, { fontFamily: 'font_Write' }).setOrigin(0.5, 0.5).setDepth(15).setFontSize(52);

            this.versus_characterA = this.add.image(440, 450, "splashart_" + game.mEnemy.characterSel.type).setDepth(13);
            this.versus_characterB = this.add.image(1680, 700, "splashart_" + game.mPlayer.characterSel.type).setDepth(13);
        
            this.versus_pointsA = this.add.text(236.56, 1000.19, "Points: " + game.mEnemy.points, { fontFamily: 'font_Write' }).setOrigin(0.5, 0.5).setDepth(15).setFontSize(44);
            this.versus_pointsB = this.add.text(1582.39, 183.70, "Points: " + game.mPlayer.points, { fontFamily: 'font_Write' }).setOrigin(0.5, 0.5).setDepth(15).setFontSize(44);
        }

        switch (game.mEnemy.AorB) {
            // Player is A
            case "B":
                // Player
                switch (game.mPlayer.characterSel.type) {
                    case "bard":
                        this.versus_characterA.x = 310;
                        this.versus_characterA.y = 280;
                        this.versus_characterA.setScale(1.3, 1.3);
                        break;
                    case "wizard":
                        this.versus_characterA.setScale(1.1, 1.1);
                        this.versus_characterA.setFlip(true);
                        break;
                    case "rogue":
                        this.versus_characterA.x = 400;
                        this.versus_characterA.y = 380;
                        this.versus_characterA.setScale(1.3, 1.3);
                        this.versus_characterA.setFlip(true);
                        break;
                    case "berserker":
                        this.versus_characterA.x = 250;
                        this.versus_characterA.y = 340;
                        this.versus_characterA.setScale(1.2, 1.2);
                        break;
                }

                // Enemy
                switch (game.mEnemy.characterSel.type) {
                    case "bard":
                        this.versus_characterB.x = 1600;
                        this.versus_characterB.y = 640;
                        this.versus_characterB.setScale(1.3, 1.3);
                        this.versus_characterB.setFlip(true);
                        break;
                    case "wizard":
                        this.versus_characterB.x = 1540;
                        this.versus_characterB.setScale(1.1, 1.1);
                        break;
                    case "rogue":
                        this.versus_characterB.x = 1530;
                        this.versus_characterB.setScale(1.3, 1.3);
                        break;
                    case "berserker":
                        this.versus_characterB.setScale(1.3, 1.3);
                        this.versus_characterB.setFlip(true);
                        break;
                }
                break;
            // Player is B
            case "A":
                // Player
                switch (game.mPlayer.characterSel.type) {
                    case "bard":
                        this.versus_characterB.x = 1600;
                        this.versus_characterB.y = 640;
                        this.versus_characterB.setScale(1.3, 1.3);
                        this.versus_characterB.setFlip(true);
                        break;
                    case "wizard":
                        this.versus_characterB.x = 1540;
                        this.versus_characterB.setScale(1.1, 1.1);
                        break;
                    case "rogue":
                        this.versus_characterB.x = 1530;
                        this.versus_characterB.setScale(1.3, 1.3);
                        break;
                    case "berserker":
                        this.versus_characterB.setScale(1.3, 1.3);
                        this.versus_characterB.setFlip(true);
                        break;
                }

                // Enemy
                switch (game.mEnemy.characterSel.type) {
                    case "bard":
                        this.versus_characterA.x = 310;
                        this.versus_characterA.y = 280;
                        this.versus_characterA.setScale(1.3, 1.3);
                        break;
                    case "wizard":
                        this.versus_characterA.setScale(1.1, 1.1);
                        this.versus_characterA.setFlip(true);
                        break;
                    case "rogue":
                        this.versus_characterA.x = 400;
                        this.versus_characterA.y = 380;
                        this.versus_characterA.setScale(1.3, 1.3);
                        this.versus_characterA.setFlip(true);
                        break;
                    case "berserker":
                        this.versus_characterA.x = 250;
                        this.versus_characterA.y = 340;
                        this.versus_characterA.setScale(1.2, 1.2);
                        break;
                }
                break;
        }

        // Versus texts
        this.fight_text = this.add.image(959, 428, "versus_fight").setScale(0.2, 0.2).setDepth(20);
        this.knock_out_text = this.add.image(960, 414.5, "versus_knock_out").setScale(0.2, 0.2).setDepth(20);
        this.error_bg = this.add.image(0,0, "error_bg").setOrigin(0, 0).setDepth(21);
        this.opponent_disconnected_text = this.add.image(960, 528.5, "opponent_disconnected_text").setDepth(22);

        this.fight_text.setVisible(false);
        this.knock_out_text.setVisible(false);
        this.error_bg.setVisible(false);
        this.opponent_disconnected_text.setVisible(false);
    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_level0";

        // Idle timer
        that.time.addEvent({
            delay: 2000,
            callback: that.scene.get("scene_boot").IdleMessage,
            loop: true
        });

        this.returnToMenu = false;
        this.gamePaused = false;
        this.gameStopped = true;

        this.myMovingLeft = false;
        this.myMovingRight = false;
        this.falling = false;
        this.myAttacking = false;
        switch (game.mPlayer.characterSel.type) {
            case "berserker":
                game.mPlayer.image = this.physics.add.sprite(250, 850, "berserker")
                    ;
                game.mPlayer.image.anims.play("berserker_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 1800, 100, 0x00ff00);
                for (var i = 0; i < 3; i++) {
                    this.myProjectiles.push(this.add.image(0, 0, "berserker_projectile").
                        setScale(1, 1).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
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
                    this.myProjectiles.push(this.add.image(0, 0, "wizard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
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
                    this.myProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
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
                    this.myProjectiles.push(this.add.image(0, 0, "rogue_projectile").
                        setScale(1, 1).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
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
                    this.myProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.myProjectiles[0].setVisible(false);
                }
                this.myAttackSound = this.sound.add("bard_attack");
                this.myHitSound = this.sound.add("bard_hit");
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
                game.mEnemy.image = this.physics.add.sprite(250, 850, "berserker")
                    ;
                game.mEnemy.image.anims.play("berserker_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 1800, 100, 0xff0000);
                for (var i = 0; i < 3; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "berserker_projectile").
                        setScale(1, 1).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                this.eAttackSound = this.sound.add("berserker_attack");
                this.eHitSound = this.sound.add("berserker_hit");
                break;
            case "wizard":
                game.mEnemy.image = this.physics.add.sprite(250, 850, "wizard")
                    ;
                game.mEnemy.image.anims.play("wizard_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 1000, 100, 0xff0000);
                for (var i = 0; i < 9; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "wizard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                this.eAttackSound = this.sound.add("wizard_attack");
                this.eHitSound = this.sound.add("wizard_hit");
                break;
            case "bard":
                game.mEnemy.image = this.physics.add.sprite(250, 850, "bard")
                    ;
                game.mEnemy.image.anims.play("bard_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 1200, 100, 0xff0000);
                for (var i = 0; i < 3; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                this.eAttackSound = this.sound.add("bard_attack");
                this.eHitSound = this.sound.add("bard_hit");
                break;
            case "rogue":
                game.mEnemy.image = this.physics.add.sprite(250, 850, "rogue")
                    ;
                game.mEnemy.image.anims.play("rogue_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 800, 75, 0xff0000);
                for (var i = 0; i < 9; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "rogue_projectile").
                        setScale(1, 1).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                this.eAttackSound = this.sound.add("rogue_attack");
                this.eHitSound = this.sound.add("rogue_hit");
                break;
            default:
                game.mEnemy.image = this.physics.add.sprite(250, 850, "bard")
                    ;
                game.mEnemy.image.anims.play("bard_idle");
                this.eHP = new UserInterface(this, game.mEnemy.image, 1200, 50, 0xff0000);
                for (var i = 0; i < 3; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(1, 1).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
                this.eAttackSound = this.sound.add("bard_attack");
                this.eHitSound = this.sound.add("bard_hit");
                break;
        }
        game.mEnemy.image.body.setSize(0, 0);
        game.mEnemy.image.body.allowGravity = false;

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

            
        }else if (game.global.DEVICE === "desktop") {
            this.add.image(62, 28.86, "escape_text").setDepth(5);
            this.input.keyboard.on("keydown-" + "A", function (event) {
                if (!that.gamePaused){
                    that.myMovingRight = false;
                    that.myMovingLeft = true;
                }else{
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
                that.myMovingLeft = false;
            });

            this.input.keyboard.on("keydown-" + "LEFT", function (event) {
                if (!that.gamePaused){
                    that.myMovingRight = false;
                    that.myMovingLeft = true;
                }else{
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
                that.myMovingLeft = false;
            });

            this.input.keyboard.on("keydown-" + "D", function (event) {
                if (!that.gamePaused){
                    that.myMovingRight = true;
                    that.myMovingLeft = false;
                }else{
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
                that.myMovingRight = false;
            });

            this.input.keyboard.on("keydown-" + "RIGHT", function (event) {
                if (!that.gamePaused){
                    that.myMovingRight = true;
                    that.myMovingLeft = false;
                }else{
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
                that.myMovingRight = false;
            });

            this.input.keyboard.on("keydown-" + "W", function (event) {
                that.Jump();
            });
            this.input.keyboard.on("keydown-" + "UP", function (event) {
                that.Jump();
            });
            this.input.keyboard.on("keydown-" + "SPACE", function (event) {
                that.Jump();
            });

            this.input.keyboard.on("keydown-" + "S", function (event) {
                that.Fall();
            });
            this.input.keyboard.on("keydown-" + "DOWN", function (event) {
                that.Fall();
            });

            this.input.keyboard.on("keydown-" + "O", function (event) {
                if (!that.gamePaused)
                {
                    that.BasicAttack();
                }
                else
                {
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    if (that.returnToMenu) {
                        // Volver al menú
                        that.input.keyboard.removeAllKeys(true);
                        game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
                        that.scene.get("scene_boot").FadeTransition("scene_main_menu");
                        //that.scene.start("scene_main_menu");
                    } else {
                        that.gamePaused = false;
                        that.returnToMenu = false;
                        that.msgImg.setAlpha(0);
                        that.pauseText.setAlpha(0);
                        that.yesBtn.setAlpha(0);
                        that.noBtn.setAlpha(0);
                    }
                }
            });

            /*this.input.keyboard.on("keydown-" + "P", function (event) {
                that.SpecialAttack();
            });*/

            this.input.keyboard.on("keydown-" + "ESC", function (event) {
                that.pressOptionSound.play({ volume: game.options.SFXVol });
                if (!that.gamePaused && !that.gameStopped) {
                    that.msgImg.setAlpha(1);
                    that.pauseText.setAlpha(1);
                    that.yesBtn.setAlpha(1);
                    that.yesBtn.setFrame(0);
                    that.noBtn.setAlpha(1);
                    that.noBtn.setFrame(1);
                } else if (that.gamePaused && !that.gameStopped){
                    that.msgImg.setAlpha(0);
                    that.pauseText.setAlpha(0);
                    that.yesBtn.setAlpha(0);
                    that.noBtn.setAlpha(0);
                    that.backBtn.setInteractive();
                }
                if (!that.gameStopped){
                    that.gamePaused = !that.gamePaused;
                }
                that.returnToMenu = false;
                that.myMovingLeft = false;
                that.myMovingRight = false;
            });

            this.input.keyboard.on("keydown-" + "ENTER", function (event) {
                if (that.gamePaused) {
                    that.pressOptionSound.play({ volume: game.options.SFXVol });
                    if (that.returnToMenu) {
                        // Volver al menú
                        that.input.keyboard.removeAllKeys(true);
                        game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
                        that.scene.get("scene_boot").FadeTransition("scene_main_menu");
                        //that.scene.start("scene_main_menu");
                    } else {
                        that.gamePaused = false;
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
            if (!that.gamePaused) {
                that.backBtn.disableInteractive();
                that.msgImg.setAlpha(1);
                that.pauseText.setAlpha(1);
                that.yesBtn.setAlpha(1);
                that.yesBtn.setFrame(0);
                that.noBtn.setAlpha(1);
                that.noBtn.setFrame(0);
            }
            that.gamePaused = !that.gamePaused;
            that.myMovingLeft = false;
            that.myMovingRight = false;
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
            that.input.keyboard.removeAllKeys(true);
            game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
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
            that.gamePaused = false;
            that.msgImg.setAlpha(0);
            that.pauseText.setAlpha(0);
            that.yesBtn.setAlpha(0);
            that.noBtn.setAlpha(0);
            that.noBtn.setFrame(0)
        });

        game.mPlayer.image.on("animationcomplete", function (anim) {
            if (anim.key === game.mPlayer.characterSel.type + "_attack") {
                if (game.global.DEBUG_MODE) {
                    console.log("Fin de animación");
                }
                that.myAttacking = false;
                // Enviar mensaje de ataque
                // game.global.socket.send(JSON.stringify({event: ""}));
            }
        }, this);

        game.mEnemy.image.on("animationcomplete", function (anim) {
            if (anim.key === game.mEnemy.characterSel.type + "_attack") {
                if (game.global.DEBUG_MODE) {
                    console.log("Fin de animación");
                }
                that.eAttacking = false;
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
        // .body.setSize(279,"x"),34,"y")).setOffset(0,12,"y"));

        this.platforms.create(503.0, 717.50, "big_plat_1") // 502.5 x 707
            .refreshBody()
            .body.setSize(328, 90).setOffset(0, -10);

        this.platforms.create(1763.0, 371.5, "big_plat_2") // 1764 x 362
            .refreshBody()
        // .body.setSize(341,"x"),165,"y")).setOffset(0,12,"y"));

        this.platforms.create(90.50, 441.0, "plat_1")
            .refreshBody()
        // .body.setSize(181,"x"),40,"y")).setOffset(0,10,"y"));

        this.platforms.create(517.50, 213.50, "plat_2")
            .refreshBody()
        // .body.setSize(218,"x"),40,"y")).setOffset(0,10,"y"));

        this.platforms.create(1230.50, 115.0, "plat_3")
            .refreshBody()
        // .body.setSize(207,"x"),40,"y")).setOffset(0,10,"y"));

        this.platforms.create(945.50, 371.50, "t_plat")
            .refreshBody()
        // .body.setSize(56,"x"),140,"y")).setOffset(0,10,"y"));

        this.hidePlatforms = [this.transimage];
        this.hidePlatforms.forEach(platform => {
            platform.body.setCollideWorldBounds(true);
            platform.body.allowGravity = false;
        });

        //Colisiones
        this.characters = [game.mPlayer.image, game.mEnemy.image];
        
        this.physics.add.overlap(this.characters, this.hidePlatforms);

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

        if (game.global.DEVICE == "mobile" || game.global.DEBUG_PHONE){
            if (!this.gamePaused) {
                // Izquierda
                if ((this.mobileKeys.joyStick.angle < -(90) || this.mobileKeys.joyStick.angle > 135) && this.mobileKeys.joyStick.force > 16) {
                    this.myMovingLeft = true;
                    this.myMovingRight = false;
                }
                // Derecha
                else if ((this.mobileKeys.joyStick.angle > -(90) && this.mobileKeys.joyStick.angle < 45) && this.mobileKeys.joyStick.force > 16) {
                    this.myMovingRight = true;
                    this.myMovingLeft = false;
                } else if ((this.mobileKeys.joyStick.angle > 45 && this.mobileKeys.joyStick.angle < 135) && this.mobileKeys.joyStick.force > 16) {
                    this.Fall();
                } else {
                    this.myMovingRight = false;
                    this.myMovingLeft = false;
                }
            }
            // Mover el joystick si se sale del radio
            if (this.mobileKeys.joyStick.force > 150) {
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

        // Stars
        this.versus_stars.tilePositionX += 0.2;
        this.versus_stars.tilePositionY += 0.4;
    } // Fin update

    
    BulletHit(player, bullet) {
        this.DamagePlayer(player, bullet);
        this.RemoveBullet(bullet);
    }
    /** *
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

    PreparedForPlay() {
        game.global.socket.send(JSON.stringify({ event: "GAME_START", room: game.mPlayer.room }));
    }

    StartGame() {
        var that = this;
        
        this.gameStopped = false;
        this.versus_main_bg.setVisible(false);
        this.versus_stars.setVisible(false);

        var tween = this.tweens.add({
            targets: that.versus_vs,
            alpha: 0,
            duration: 300,
            repeat: 0,
            onComplete: function () {
                that.fight_text.setVisible(true);
                var tween = that.tweens.add({
                    targets: that.fight_text,
                    scale: (1, 1),
                    duration: 500,
                    repeat: 0,
                });
        
                var tween = that.tweens.add({
                    targets: that.fight_text,
                    alpha: 0,
                    delay: 500,
                    duration: 1000,
                    repeat: 0,
                });
            }
        });

        var tween = this.tweens.add({
            targets: [ that.versus_left_circle, that.versus_usernameA, that.versus_characterA, that.versus_pointsA ],
            x: -1000,
            y: -1000,
            duration: 300,
            repeat: 0,
        });

        var tween = this.tweens.add({
            targets: [ that.versus_right_circle, that.versus_usernameB, that.versus_characterB, that.versus_pointsB ],
            x: 2520,
            y: 1680,
            duration: 300,
            repeat: 0,
        });

    }

    FinishGame(wasDisconnection)
    {
        var that = this;

        // Mostrar pantalla de fin de partida
        this.gameStopped = true;
        // Si fue una desconexión, mostrar al jugador el texto de desconexión
        if (wasDisconnection)
        {
            this.error_bg.setVisible(true);
            this.opponent_disconnected_text.setVisible(true);
        }
        // Si no, mostrar el texto de 'K.O.'
        else
        {
            this.knock_out_text.setVisible(true);
        }

        var tween = this.tweens.add({
            targets: that.knock_out_text,
            scale: (1.5, 1.5),
            duration: 400,
            repeat: 0,
        });
    }
}