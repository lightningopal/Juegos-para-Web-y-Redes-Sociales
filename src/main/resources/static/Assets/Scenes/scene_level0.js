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

        if (game.global.DEVICE == "mobile") {
            var url;
            url = './Assets/Plugins/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
        }

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
                        this.versus_characterA.setScale(RelativeScale(1.3, "x"));
                        break;
                    case "wizard":
                        this.versus_characterA.setScale(RelativeScale(1.1, "x"));
                        this.versus_characterA.setFlip(true);
                        break;
                    case "rogue":
                        this.versus_characterA.x = RelativeScale(400, "x");
                        this.versus_characterA.y = RelativeScale(380, "y");
                        this.versus_characterA.setScale(RelativeScale(1.4, "x"));
                        this.versus_characterA.setFlip(true);
                        break;
                    case "berserker":
                        this.versus_characterA.x = RelativeScale(250, "x");
                        this.versus_characterA.y = RelativeScale(340, "y");
                        this.versus_characterA.setScale(RelativeScale(1.2, "x"));
                        break;
                }

                // Enemy
                switch (game.mEnemy.characterSel.type) {
                    case "bard":
                        this.versus_characterB.x = RelativeScale(1600, "x");
                        this.versus_characterB.y = RelativeScale(640, "y");
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"));
                        this.versus_characterB.setFlip(true);
                        break;
                    case "wizard":
                        this.versus_characterB.x = RelativeScale(1540, "x");
                        this.versus_characterB.setScale(RelativeScale(1.1, "x"));
                        break;
                    case "rogue":
                        this.versus_characterB.x = RelativeScale(1530, "x");
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"));
                        break;
                    case "berserker":
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"));
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
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"));
                        this.versus_characterB.setFlip(true);
                        break;
                    case "wizard":
                        this.versus_characterB.x = RelativeScale(1540, "x");
                        this.versus_characterB.setScale(RelativeScale(1.1, "x"));
                        break;
                    case "rogue":
                        this.versus_characterB.x = RelativeScale(1530, "x");
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"));
                        break;
                    case "berserker":
                        this.versus_characterB.setScale(RelativeScale(1.3, "x"));
                        this.versus_characterB.setFlip(true);
                        break;
                }

                // Enemy
                switch (game.mEnemy.characterSel.type) {
                    case "bard":
                        this.versus_characterA.x = RelativeScale(310, "x");
                        this.versus_characterA.y = RelativeScale(280, "y");
                        this.versus_characterA.setScale(RelativeScale(1.3, "x"));
                        break;
                    case "wizard":
                        this.versus_characterA.setScale(RelativeScale(1.1, "x"));
                        this.versus_characterA.setFlip(true);
                        break;
                    case "rogue":
                        this.versus_characterA.x = RelativeScale(400, "x");
                        this.versus_characterA.y = RelativeScale(380, "y");
                        this.versus_characterA.setScale(RelativeScale(1.3, "x"));
                        this.versus_characterA.setFlip(true);
                        break;
                    case "berserker":
                        this.versus_characterA.x = RelativeScale(250, "x");
                        this.versus_characterA.y = RelativeScale(340, "y");
                        this.versus_characterA.setScale(RelativeScale(1.2, "x"));
                        break;
                }
                break;
        }

    } // Fin preload

    create() {
        // Set the scene
        var that = this;
        game.global.actualScene = "scene_level0";

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
        this.characters = [game.mPlayer.image, game.mEnemy.image/**, enemyPlayer/**/];
        //this.bullets = [];

        //this.physics.add.overlap(this.characters, this.bullets, this.BulletHit, player, bullet);
        //this.physics.add.collider(this.characters, this.platforms);
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
        // var debugText = document.getElementById("debugText");
        // debugText.innerHTML = "Posición del ratón: {x: " + x + ", y: " + y + "} | FPS: " + Math.round(game.loop.actualFps);

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
        game.global.socket.send(JSON.stringify({
            event: "UPDATE_CLIENT",
            movingLeft: this.myMovingLeft, movingRight: this.myMovingRight, falling: this.falling
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

    PreparedForPlay() {
        game.global.socket.send(JSON.stringify({ event: "GAME_START", room: game.mPlayer.room }));
    }

    StartGame() {
        console.log("Se llama a esconder el versus");
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