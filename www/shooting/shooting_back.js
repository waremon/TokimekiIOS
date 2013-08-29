var Is_Touch = 0;
var Is_Boss_On = 0;
var Is_Debug = 0;
var Is_Start = 0;
var Is_Game_Over = 0;
var Is_Clear = 0;
var Point = 0;
var My_Frame = 0;
var Shooting_Stage = 1;

Sign = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 450, 70);
        this.image = game.assets['touch_back.png'];
        this.back = 0;
        this.count = 0;
        this.x = (width - this.width)/2;
        this.y = (height - this.height)/2;
        this.start_count = 100;
        this.game_over_count = 100;
        this.clear_count = 100;
        this.sign_off = 0;
        this.addEventListener('enterframe', function() {
            if(this.sign_off == 1) {
                this.image = game.assets['touch_back.png'];
            } else if(this.count%10 == 0) {
                if (this.back == 0) {
                    this.image = game.assets['touch_back.png'];
                    this.back = 1;
                } else {
                    if (Is_Start == 1) {
                        this.image = game.assets['shooting/shooting_start.png'];
                    } else if (Is_Game_Over == 1) {
                        this.image = game.assets['shooting/shooting_game_over.png'];
                    } else if (Is_Clear) {
                        this.image = game.assets['shooting/shooting_clear.png'];
                    }
                    this.back = 0;
                }
            }
            if (this.count > 100) {
                this.count = 1;
            } else {
                this.count++;
            }
		});
	}
});


Me = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 100, 123);
		this.image = game.assets['shooting/hikari.png'];
		this.addEventListener('touchstart', function() {
            Is_Touch = 1;
		});
        this.addEventListener('touchend', function() {
            Is_Touch = 0;
		});
	}
});

Fire_Me = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_me.png'];
        this.addEventListener('enterframe', function() {
            this.y -= 10;
		});
    }
});

My_Fire = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_me.png'];
    }
});

Fire_Enemy = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_enemy.png'];
        this.v = 10;
        this.addEventListener('enterframe', function() {
            this.y += this.v;
            if (this.y > height + this.height) {
                this.v = 0;
                this.y = -height;
            }
		});
    }
});

Enemy1 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 150, 200);
        this.hp = 1;
        this.amp = Math.floor(width*Math.random());
        this.v = Math.floor(5*Math.random()) + 2;
        this.axis = Math.floor(width*Math.random());
        this.phase = Math.floor(180*Math.random());
		this.image = game.assets['enemy_usa1.png'];
        this.fire = new Array(2);
        this.fire_count = 50;
        this.onscreen = 1;
        this.addEventListener('enterframe', function() {
            if(this.y > height+this.height) {
                this.y = - height/3;
                if(Is_Boss_On == 1) {
                    this.onscreen = 0;
                }
            }
            if (this.fire_count < 0) {
                this.fire_count = 50;
            }
            this.fire_count--;
		});
	}
});

Usa1 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 150, 200);
        this.hp = 1;
		this.image = game.assets['enemy_usa1.png'];
        this.fire = new Array(2);
        this.x = width/2;
        this.y = -this.height;
	}
});

Usa1_Fire = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_enemy.png'];
    }
});

Sakiwo = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
        this.hp = 50;
		this.image = game.assets['shooting/sakiwo.png'];
        this.fire_count = 10;
	}
});

Boss1 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
        this.hp = 50;
		this.image = game.assets['shooting/sakiwo.png'];
        this.fire_count = 10;
        this.x = (width - this.width)/2;
        this.y = -this.height;
        this.fire_count = 50;
        this.addEventListener('enterframe', function() {
            if(this.y < this.height/3) {
                this.y ++;
            }
            if (this.fire_count < 0) {
                this.fire_count = 50;
            }
            this.fire_count-=2;
		});
	}
});

Boss2 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
        this.hp = 50;
		this.image = game.assets['shooting/shunsuke.png'];
        this.fire_count = 50;
        this.x = (width - this.width)/2;
        this.y = -this.height;
        this.fire_count = 50;
        this.xv = 5;
        this.yv = 5;
        this.onframe = 0;
        this.addEventListener('enterframe', function() {
            this.rotate(1);
            this.x += this.xv;
            this.y += this.yv;
            if (this.x < 0) {
                this.xv *= -1;
                this.xv++;
                this.yv++;
            }
            if (this.x > width-this.width) {
                this.xv *= -1;
            }
            if (this.y < 0 && this.onframe == 1) {
                this.yv *= -1;
                this.xv++;
                this.yv++;
            }
            if (this.y > height-this.height) {
                this.yv *= -1;
                this.onframe = 1;
            }
		});
	}
});

Boss3 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
        this.hp = 50;
		this.image = game.assets['shooting/shingo.png'];
        this.fire_count = 50;
        this.x = (width - this.width)/2;
        this.y = -this.height;
        this.xv = 5;
        this.fire_count = 50;
        this.addEventListener('enterframe', function() {
            if(this.y < this.height/2) {
                this.y ++;
            }
            if (this.x < 0) {
                this.xv *= -1;
            }
            if (this.x > width-this.width) {
                this.xv *= -1;
            }
            this.x += this.xv;
            if (this.fire_count < 0) {
                this.fire_count = 50;
            }
            this.fire_count-=2;
		});
	}
});

Boss4 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
        this.hp = 50;
		this.image = game.assets['shooting/airi.png'];
        this.fire_count = 50;
        this.x = (width - this.width)/2;
        this.y = -this.height;
        this.xv = 5;
        this.fire_count = 50;
        this.addEventListener('enterframe', function() {
            if(this.y < this.height/2) {
                this.y ++;
            }
            if (this.x < 0) {
                this.xv *= -1;
            }
            if (this.x > width-this.width) {
                this.xv *= -1;
            }
            this.x += this.xv;
            if (this.fire_count < 0) {
                this.fire_count = 50;
            }
            this.fire_count-=2;
		});
	}
});

Fire_Boss1 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_enemy.png'];
        this.xv = 10;
        this.yv = 10;
        this.amp = 5;
        this.addEventListener('enterframe', function() {
            this.x += this.xv;
            this.y += this.yv;
            if (this.y > height + this.height) {
                this.yv = 0;
                this.xv = 0;
                this.y = -height;
            }
		});
    }
});

Fire_Boss3 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 50, 50);
		this.image = game.assets['shooting/shingo_mini.png'];
        this.xv = 10;
        this.yv = 10;
        this.amp = 5;
        this.addEventListener('enterframe', function() {
            this.x += this.xv;
            this.y += this.yv;
            if (this.y > height + this.height) {
                this.yv = 0;
                this.xv = 0;
                this.y = -height;
            }
		});
    }
});

Fire_Boss4 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 100);
		this.image = game.assets['shooting/airi_hat.png'];
        this.xv = 10;
        this.yv = 10;
        this.amp = 5;
        this.addEventListener('enterframe', function() {
            this.x += this.xv;
            this.y += this.yv;
            if (this.y > height + this.height) {
                this.yv = 0;
                this.xv = 0;
                this.y = -height;
            }
		});
    }
});

var Fire_Boss1_xv = new Array("0.71", "0.5","0.26", "0", "-0.26", "-0.5", "-0.71");
var Fire_Boss1_yv = new Array("0.71", "0.87", "0.97", "1", "0.97", "0.87", "0.71");
var Fire_Boss1_i = 0;

function select_fire_me_num(fire_me) {
    for (var i = 0; i < fire_me.length; i++) {
        if (fire_me[i].y < 0) {
            return i;
        }
    }
    return -1;
}

function is_collisioned (obj1, obj2) {
    var obj1_x = obj1.x + obj1.width/2;
    var obj1_y = obj1.y + obj1.height/2;
    var obj2_x = obj2.x + obj2.width/2;
    var obj2_y = obj2.y + obj2.height/2;
    if (Math.sqrt(Math.pow((obj1_x - obj2_x), 2) + Math.pow((obj1_y - obj2_y), 2)) < (obj1.width + obj2.width)/2 * 0.8) {
        return 1;
    }
    return 0;
}

function display_point(point, display_point) {
    var num5_s = Math.floor(point / 10000);
    var num5_a = point % 10000;
    var num4_s = Math.floor(num5_a / 1000);
    var num4_a = num5_a % 1000;
    var num3_s = Math.floor(num4_a /  100);
    var num3_a = num4_a %  100;
    var num2_s = Math.floor(num3_a /   10);
    var num2_a = num3_a %   10;
    var num1_s = Math.floor(num2_a);
    display_point[4].frame = num5_s;
    display_point[3].frame = num4_s;
    display_point[2].frame = num3_s;
    display_point[1].frame = num2_s;
    display_point[0].frame = num1_s;
}


function shooting_menu(game, scene) {
    var bg = new Sprite(width, height);
    bg.image = game.assets['back_sinkei.png'];
    scene.addChild(bg);
    scene.addEventListener(Event.TOUCH_START, function(e) {
        audio_back.pause();
        audio_back.currentTime = 0;
        game.replaceScene(game.game2Scene());
    });
    return scene;
}

function init_constant(game, scene) {
    Is_Touch = 0;
    Is_Boss_On = 0;
    Is_Debug = 0;
    Is_Start = 0;
    Is_Game_Over = 0;
    Is_Clear = 0;
    My_Frame = 0;
    console.log(Is_Boss_On);
    //game.replaceScene(game.game2Scene());
}

function shooting_start (game, scene) {
    //var bg1 = new Sprite(width, height);
    //bg1.image = game.assets['shooting/shooting_back1.png'];
    //scene.addChild(bg1);
    //var bg2 = new Sprite(width, height);
    //bg2.image = game.assets['shooting/shooting_back2.png'];
    //bg2.y = -height;
    //scene.addChild(bg2);

//    var sign = new Sign();
//    scene.addChild(sign);
//    sign.sign_off = 1;
//    Is_Start = 1;
//    var start_count = sign.start_count;
//    var game_over_count = sign.game_over_count;
//    var clear_count = sign.clear_count;
    
    var you_point = new Array(5);
    for (var i = 0; i < you_point.length; i++) {
        you_point[i] = new Sprite(POINT_NUM_WIDTH, POINT_HEIGHT);
        you_point[i].image = game.assets['points.png'];
        you_point[i].x = width - POINT_NUM_WIDTH * (i + 1);
        you_point[i].x += POINT_NUM_WIDTH/3 * i;
        you_point[i].y = 0;
        you_point[i].frame = 0;
        scene.addChild(you_point[i]);
    }
    
    // me
    var me = new Me();
    me.x = (width - me.width)/2;
    me.y = height - me.height;
    scene.addChild(me);
        
    scene.addEventListener("touchmove", function(e) {
        if (Is_Touch != 0) {
            me.x = e.localX - me.width/2;
        }
    });
    
    // init : fire of me
    var fire_me = new Array(10);
    for (var i = 0; i < fire_me.length; i++){
        fire_me[i] = new Fire_Me();
        fire_me[i].x = -1;
        fire_me[i].y = -1;
    }
    
    // init : enemy loop
    var enemy1 = new Array(3);
    for (var i = 0; i < enemy1.length; i++) {
        enemy1[i] = new Enemy1();
        enemy1[i].y = -10 - width/3 * i;
        enemy1[i].hp = 5;
        //scene.addChild(enemy1[i]);
        for (var j = 0; j < enemy1[i].fire.length; j++) {
            enemy1[i].fire[j] = new Fire_Enemy();
            enemy1[i].fire[j].x = -1;
            enemy1[i].fire[j].y = -1;
        }
    }
    
    // boss params
//    Is_Boss_On = 0;
//    var boss1;
//    if (Shooting_Stage == 1) {
//        boss1 = new Boss1();
//    } else if (Shooting_Stage == 2) {
//        boss1 = new Boss2();
//    } else if (Shooting_Stage == 3) {
//        boss1 = new Boss3();
//        boss1.image = game.assets['shooting/shingo.png'];
//    } else if (Shooting_Stage == 4) {
//        boss1 = new Boss4();
//        boss1.image = game.assets['shooting/airi.png'];
//    }
    // boss fire
//    var boss1_fire = new Array(10);
//    for (var i = 0; i < boss1_fire.length; i++) {
//        boss1_fire[i] = new Fire_Boss1();
//        boss1_fire[i].x = -1;
//        boss1_fire[i].y = -1;
//    }
    
    var label = new Label();
    label.text = "xxxxxxxxxx";
    label.moveTo(20,20);
    scene.addChild(label);
    
    var angle  = 0;
    var angle1 = 0;
    var angle2 = 0;
    var angle3 = 0;
    window.addEventListener("devicemotion", function(e){
        angle3 = angle2;
        angle2 = angle1;
        angle1 = (Math.floor(100*e.accelerationIncludingGravity.x)/100+angle)/2;
        angle  = (angle1 + angle2 + angle3)/3;
        me.x = width/2 - me.width/2 + width/2/3*angle;
    }, false);
    
    // my fire
    var my_fire = new Array(5);
    for (var i = 0; i < my_fire.length; i++) {
        my_fire[i] = new My_Fire();
        scene.addChild(my_fire[i]);
        my_fire[i].x = width;
        my_fire[i].y = height;
        scene.addChild(my_fire[i]);
        my_fire[i].tl.cue({
            100:function(){this.tl.moveTo(me.x, me.y, 1).moveY(-this.height,50)}
        });
    }
    
    
    // enemy
    var enemy = new Usa1();
    scene.addChild(enemy);
    enemy.y = 0;
    enemy.x = 0;
    //enemy.tl.moveTo(width/2, height, 200);
    //enemy.tl.fadeIn(30).fadeOut(30).loop();
    enemy.tl.moveTo(width/2, 0, 200, enchant.Easing.ELASTIC_EASEINOUT).and().moveTo(width/2, height-enemy.height, 200);
    
    // enemy's fire
    
    // boss
    var boss = new Sakiwo();
    boss.x = (width-boss.width)/2;
    boss.y = -height;
    scene.addChild(boss);
    boss.tl.delay(5 * game.fps).moveTo((width-boss.width)/2, boss.height, 60);
    
    scene.addEventListener("enterframe", function(e) {
/*        //signal
         if (Is_Game_Over == 1) {
            sign.sign_off = 0;
            //me.y = -height;
            //scene.removeChild(me);
            if(game_over_count == sign.game_over_count) {
                
            }
            game_over_count--;
            if(game_over_count == 0) {
                init_constant(game, scene);
                Point = 0;
                Shooting_Stage = 1;
                game.replaceScene(game.game2SelectScene());
            }
        } else if (Is_Start == 1 && start_count > 0) {
            sign.sign_off = 0;
            if(start_count == sign.start_count) {
                
            }
            start_count--;
        } else if (Is_Clear == 1) {
            sign.sign_off = 0;
            if(clear_count == sign.clear_count) {
                
            }
            clear_count--;
            if(clear_count == 0) {
                init_constant(game, scene);
                if (Shooting_Stage != 4) {
                    Shooting_Stage++;
                }
                game.replaceScene(game.game2Scene());
            }
        } else {
            sign.sign_off = 1;
            Is_Start = 0;
        }
        //bg
//        if (bg1.y >= height) {
//            bg1.y = -height;
//        } else {
//            bg1.y++;
//        }
//        if (bg2.y >= height) {
//            bg2.y = -height;
//        } else {
//            bg2.y++;
//        }
        
        // my fire
        if (My_Frame % 10 == 0) {
            var num = select_fire_me_num(fire_me);
            if (num != -1) {
                fire_me[num] = new Fire_Me();
                fire_me[num].x = me.x + me.width/2 - fire_me[num].width/2;
                fire_me[num].y = me.y;
                scene.addChild(fire_me[num]);
            }
        }
        
        // enemy loop
        for (var i = 0; i < enemy1.length; i++) {
            // enemy moving
            if (enemy1[i].onscreen == 1) {
                enemy1[i].x = enemy1[i].axis + enemy1[i].amp * Math.sin(My_Frame/100 + enemy1[i].phase);
                enemy1[i].y += enemy1[i].v;
            }
            // game over -- collsion widh enemy
            if (is_collisioned(enemy1[i], me)){
                Is_Game_Over = 1;
            }
            if(enemy1[i].y > 0) {
                if(enemy1[i].fire_count == 0) {
                    var fire_num = select_fire_me_num(enemy1[i].fire);
                    if (fire_num != -1) {
                        enemy1[i].fire[fire_num] = new Fire_Enemy();
                        enemy1[i].fire[fire_num].x = enemy1[i].x + enemy1[i].width/2;
                        enemy1[i].fire[fire_num].y = enemy1[i].y + enemy1[i].height;
                        enemy1[i].fire[fire_num].v = enemy1[i].v + 5;
                        scene.addChild(enemy1[i].fire[fire_num]);
                    }
                }
            }
            // enemy fire loop
            for (var j = 0; j < enemy1[i].fire.length; j++) {
                if(is_collisioned(enemy1[i].fire[j], me)) {
                    Is_Game_Over = 1;
                }
            }
        }
        
        // collision with boss
        if(is_collisioned(me, boss1) == 1) {
            Is_Game_Over = 1;
        }
        
        // boss loop
        if(boss1.fire_count == 0) {
            var boss1_fire_num = select_fire_me_num(boss1_fire);
            if (boss1_fire_num != -1) {
                if (Shooting_Stage == 3) {
                    boss1_fire[boss1_fire_num] = new Fire_Boss3();
                } else if (Shooting_Stage == 4) {
                    boss1_fire[boss1_fire_num] = new Fire_Boss4();
                } else {
                    boss1_fire[boss1_fire_num] = new Fire_Boss1();
                }
                boss1_fire[boss1_fire_num].x = boss1.x + boss1.width/2;
                boss1_fire[boss1_fire_num].y = boss1.y + boss1.height/2;
                boss1_fire[boss1_fire_num].xv =
                    boss1_fire[boss1_fire_num].amp * Fire_Boss1_xv[Fire_Boss1_i];
                boss1_fire[boss1_fire_num].yv =
                    boss1_fire[boss1_fire_num].amp * Fire_Boss1_yv[Fire_Boss1_i];
                if (Fire_Boss1_i+1 == Fire_Boss1_xv.length) {
                    Fire_Boss1_i = 0;
                } else {
                    Fire_Boss1_i++;
                }
                scene.addChild(boss1_fire[boss1_fire_num]);
            }
        }
        // boss fire
        for (var i = 0; i < boss1_fire.length; i++) {
            if (is_collisioned(boss1_fire[i], me)) {
                Is_Game_Over = 1;
            }
        }
        
        // fire_me loop
        for (var i = 0; i < fire_me.length; i++) {
            for (var j = 0; j < enemy1.length; j++) {
                // shot the enemy
                if (is_collisioned(fire_me[i], enemy1[j]) == 1 && fire_me[i].y > 0) {
                    fire_me[i].y = -50;
                    enemy1[j].hp--;
                    Point++;
                    display_point(Point, you_point);
                    // enemy die
                    if (enemy1[j].hp == 0) {
                        Point+=10;
                        display_point(Point, you_point);
                        enemy1[j].y = -200;
                        enemy1[j].hp = 5;
                        if(Is_Boss_On == 1) {
                            enemy1[j].onscreen = 0;
                        }
                    }
                }
            }
            if (is_collisioned(fire_me[i], boss1) == 1 && fire_me[i].y > 0) {
                fire_me[i].y = -50;
                boss1.hp--;
                Point++;
                display_point(Point, you_point);
                // boss die
                if (boss1.hp == 0) {
                    Point+=100;
                    display_point(Point, you_point);
                    boss1.y = -200;
                    scene.removeChild(boss1);
                    Is_Clear = 1;
                }
            }

        }
        label.text = Math.floor(My_Frame/game.fps)+' '+Is_Boss_On+' '+angle+' '+game.fps;
        if (Math.floor(My_Frame/game.fps) > 10 && Is_Boss_On == 0 && Is_Clear != 1) {
            Is_Boss_On = 1;
            console.log('set is_boss_on to 1');
            scene.addChild(boss1);
        }
        
        My_Frame++;
        console.log(Is_Boss_On);
*/
    });
    
    return scene;
}
