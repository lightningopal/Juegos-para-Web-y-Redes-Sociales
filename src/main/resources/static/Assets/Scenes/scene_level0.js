class Scene_Level0 extends Phaser.Scene {
    constructor() {
        super({ key: "scene_level0" });
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
        this.noBtn = this.add.image(RelativeScale(1325.50, "x"), RelativeScale(616.0, "y"), "no!!_button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(10);
        this.noBtn.setAlpha(0);
        this.yesBtn = this.add.image(RelativeScale(587.0, "x"), RelativeScale(616.0, "y"), "yes..._button")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(10);
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
            this.versus_usernameA = this.add.text(RelativeScale(236.56, "x"), RelativeScale(950.19, "y"), game.mPlayer.userName, { fontFamily: 'font_Write' }).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(Math.round(RelativeScale(104, "x")));
            this.versus_usernameB = this.add.text(RelativeScale(1582.39, "x"), RelativeScale(133.70, "y"), game.mEnemy.userName, { fontFamily: 'font_Write' }).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(Math.round(RelativeScale(104, "x")));

            this.versus_characterA = this.add.image(RelativeScale(440, "x"), RelativeScale(450, "Y"), "splashart_" + game.mPlayer.characterSel.type).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(13);
            this.versus_characterB = this.add.image(RelativeScale(1680, "x"), RelativeScale(700, "Y"), "splashart_" + game.mEnemy.characterSel.type).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(13);

            this.versus_pointsA = this.add.text(RelativeScale(236.56, "x"), RelativeScale(1000.19, "y"), "Points: " + game.mPlayer.points, { fontFamily: 'font_Write' }).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(Math.round(RelativeScale(88, "x")));
            this.versus_pointsB = this.add.text(RelativeScale(1582.39, "x"), RelativeScale(183.70, "y"), "Points: " + game.mEnemy.points, { fontFamily: 'font_Write' }).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(Math.round(RelativeScale(88, "x")));
        }
        // Si no, el jugador es el B
        else {
            this.versus_usernameA = this.add.text(RelativeScale(236.56, "x"), RelativeScale(950.19, "y"), game.mEnemy.userName, { fontFamily: 'font_Write' }).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(Math.round(RelativeScale(104, "x")));
            this.versus_usernameB = this.add.text(RelativeScale(1582.39, "x"), RelativeScale(133.70, "y"), game.mPlayer.userName, { fontFamily: 'font_Write' }).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(Math.round(RelativeScale(104, "x")));

            this.versus_characterA = this.add.image(RelativeScale(440, "x"), RelativeScale(450, "Y"), "splashart_" + game.mEnemy.characterSel.type).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(13);
            this.versus_characterB = this.add.image(RelativeScale(1680, "x"), RelativeScale(700, "Y"), "splashart_" + game.mPlayer.characterSel.type).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(13);
        
            this.versus_pointsA = this.add.text(RelativeScale(236.56, "x"), RelativeScale(1000.19, "y"), "Points: " + game.mEnemy.points, { fontFamily: 'font_Write' }).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(Math.round(RelativeScale(88, "x")));
            this.versus_pointsB = this.add.text(RelativeScale(1582.39, "x"), RelativeScale(183.70, "y"), "Points: " + game.mPlayer.points, { fontFamily: 'font_Write' }).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setOrigin(0.5, 0.5).setDepth(15).setFontSize(Math.round(RelativeScale(88, "x")));
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
                        this.versus_characterA.setScale(RelativeScale(1.2, "x"), RelativeScale(1.2, "y"));
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

        // Versus texts
        this.fight_text = this.add.image(RelativeScale(959, "x"), RelativeScale(428, "Y"), "versus_fight").setScale(RelativeScale(0.2, "x"), RelativeScale(0.2, "y")).setDepth(20);
        this.knock_out_text = this.add.image(RelativeScale(960, "x"), RelativeScale(414.5, "Y"), "versus_knock_out").setScale(RelativeScale(0.2, "x"), RelativeScale(0.2, "y")).setDepth(20);
        this.error_bg = this.add.image(0,0, "error_bg").setOrigin(0, 0).setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(21);
        this.opponent_disconnected_text = this.add.image(RelativeScale(960, "x"), RelativeScale(528.5, "Y"), "opponent_disconnected_text").setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(22);

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
            delay: 10000,
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
        this.canBasicAttack = true;
        this.canSpecialAttack = true;
        switch (game.mPlayer.characterSel.type) {
            case "berserker":
                game.mPlayer.image = this.physics.add.sprite(RelativeScale(250, "x"), RelativeScale(850, "y"), "berserker")
                    .setScale(RelativeScale(1, "x"), RelativeScale(1, "y"));
                game.mPlayer.image.anims.play("berserker_idle");
                this.myHP = new UserInterface(this, game.mPlayer.image, 1500, 100, 0x00ff00);
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
                this.myHP = new UserInterface(this, game.mPlayer.image, 1000, 100, 0x00ff00);
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
                this.myHP = new UserInterface(this, game.mPlayer.image, 1200, 100, 0x00ff00);
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
                this.myHP = new UserInterface(this, game.mPlayer.image, 800, 75, 0x00ff00);
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
                this.myHP = new UserInterface(this, game.mPlayer.image, 1200, 50, 0x00ff00);
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
                this.eHP = new UserInterface(this, game.mEnemy.image, 1500, 100, 0xff0000);
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
                this.eHP = new UserInterface(this, game.mEnemy.image, 1000, 100, 0xff0000);
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
                this.eHP = new UserInterface(this, game.mEnemy.image, 1200, 100, 0xff0000);
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
                this.eHP = new UserInterface(this, game.mEnemy.image, 800, 75, 0xff0000);
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
                this.eHP = new UserInterface(this, game.mEnemy.image, 1200, 50, 0xff0000);
                for (var i = 0; i < 3; i++) {
                    this.eProjectiles.push(this.add.image(0, 0, "bard_projectile").
                        setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setDepth(6));
                    this.eProjectiles[0].setVisible(false);
                }
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
                x: RelativeScale(200, "x"),
                y: RelativeScale(900, "y"),
                radius: RelativeScale(40,"x"),
                base: this.add.circle(0, 0, RelativeScale(100, "x"), 0x888888).setAlpha(0.7).setDepth(8),
                thumb: this.add.circle(0, 0, RelativeScale(80, "x"), 0xcccccc).setAlpha(0.7).setDepth(9),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            }).on('update', this.DumpJoyStickState, this);

            this.text = this.add.text(0, 0);
            this.DumpJoyStickState();

            this.input.addPointer(2);
            this.mobileKeys.jumpButton = this.add.image(RelativeScale(1717.50, "x"), RelativeScale(895.50, "y"), "jump_button_mobile")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setAlpha(0.5).setDepth(8);
            this.mobileKeys.jumpButton.setInteractive().on('pointerdown', that.Jump, this);
            
            this.mobileKeys.attackButton = this.add.image(RelativeScale(1614.00, "x"), RelativeScale(635.50, "y"), "skills_button_mobile")
            .setScale(RelativeScale(1, "x"), RelativeScale(1, "y")).setAlpha(0.5).setDepth(8);
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
                if (Unscale(pointer.downX,"x") < 960 && Unscale(pointer.downY, "y") > 540){
                    that.mobileKeys.joyStick.x = pointer.downX;
                    that.mobileKeys.joyStick.y = pointer.downY;
                }
            });

            this.input.on('pointerup', function () {
                that.backBtn.setFrame(0);
                that.yesBtn.setFrame(0);
                that.noBtn.setFrame(0);
                that.mobileKeys.joyStick.x = RelativeScale(200, "x");
                that.mobileKeys.joyStick.y = RelativeScale(900, "y");
            });

            this.backBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                that.backBtn.setFrame(1);
                if (game.global.DEBUG_MODE) {
                    console.log("Back pulsado");
                }
            });
            this.backBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
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
                that.yesBtn.setFrame(1);
                that.noBtn.setFrame(0);
            });
            this.yesBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
                game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
                that.scene.start("scene_main_menu");
            });

            this.noBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
                that.yesBtn.setFrame(0);
                that.noBtn.setFrame(1);
            });
            this.noBtn.setInteractive().on('pointerup', function (pointer, localX, localY, event) {
                that.backBtn.setInteractive();
                that.gamePaused = false;
                that.msgImg.setAlpha(0);
                that.pauseText.setAlpha(0);
                that.yesBtn.setAlpha(0);
                that.noBtn.setAlpha(0);
                that.noBtn.setFrame(0)
            });
        }else if (game.global.DEVICE === "desktop") {
            this.input.keyboard.on("keydown-" + "A", function (event) {
                if (!that.gamePaused){
                    that.myMovingRight = false;
                    that.myMovingLeft = true;
                }else{
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

            this.input.keyboard.on("keydown-" + "D", function (event) {
                if (!that.gamePaused){
                    that.myMovingRight = true;
                    that.myMovingLeft = false;
                }else{
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

            this.input.keyboard.on("keydown-" + "ESC", function (event) {
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
                    if (that.returnToMenu) {
                        // Volver al menú
                        game.global.socket.send(JSON.stringify({ event: "LEAVE_GAME", room: game.mPlayer.room }));
                        that.input.keyboard.removeAllKeys(true);
                        that.scene.start("scene_main_menu");
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
            if (this.mobileKeys.joyStick.force > (RelativeScale(150,"x"))){
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

    PreparedForPlay() {
        game.global.socket.send(JSON.stringify({ event: "GAME_START", room: game.mPlayer.room }));
    }

    StartGame() {
        var that = this;
        
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
        this.versus_pointsA.setVisible(false);
        this.versus_pointsB.setVisible(false);

        this.fight_text.setVisible(true);

        var tween = this.tweens.add({
            targets: that.fight_text,
            scale: (RelativeScale(1, "x"), RelativeScale(1, "y")),
            duration: 500,
            repeat: 0,
        });

        var tween = this.tweens.add({
            targets: that.fight_text,
            alpha: 0,
            delay: 500,
            duration: 1000,
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
            scale: (RelativeScale(1, "x"), RelativeScale(1, "y")),
            duration: 400,
            repeat: 0,
        });
    }
}