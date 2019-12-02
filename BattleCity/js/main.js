/*
 *��ڽű�
*/

//��Ļ��ʾ���ģ��
var wallCtx;//��ͼ����������
var tankCtx;//̹�˻���������
var crackCtx;//��ը��Ч����������
var grassCtx;//�ݵػ���������
var propCtx;//���߻���������
var scoreCtx;//��������������
var statusCtx;//��Ϸ��״̬������������
var intermediaryCtx;//�ؿ����ɻ���������
var overCtx;//��Ϸ��������������
var menuCtx;//��ʼ�˵�����������

var GAME_STATE = GAME_STATE_MENU;//��ʼ״̬Ĭ��Ϊ��ʼ�˵�

var collision;//������ײ�Ĺ��߶���
var isPause = false;//�Ƿ���ͣ��Ϸ

var keyboard;//����
var keys = [];//��¼���µİ���
var menu;//�˵�
var intermediary;//���ɽ���
var stage;//��̨
var player = null;//���1
var player2 = null;//���2
var enemyArray = [];//�з�̹��
var prop = null;//����
var gameOver = null;//��Ϸ��������



var home_pos = [192,384];//�ҵ�λ��

var lev = 1;
var level = null;
var bulletArray = [];//�ӵ�����
var crackArray = [];//��ը����
var scoreArray = [];//��������
var maxEnemy = 20;//�з�̹������
var maxAppearEnemy = 5;//��Ļ��һ����ֵ������
var enemyCount = 0; //�ѳ��ֹ��ĵĵз�̹��
var initingEnemyArray = [];//���ڳ�ʼ���ĵз�̹��
var mapChangeIndexs = [];//����Ǽ�¼��ͼ�����ı�ʱ����������Ҫ��Ϊ��������ͼЧ��

var prop_count_down = 0;//������ʧ����ʱ
var emeny_count_down = 0;//�з�̹��ֹͣ����ʱ
var home_protected_count_down = 0;//�ҵı�������ʧ����ʱ
//���Ǽ���Χ��ש������
var home_wall_indexs = 
[
	[46,22],[46,23],[46,24],[46,25],
	[46,26],[46,27],[46,28],[46,29],
	[47,22],[47,23],[47,24],[47,25],
	[47,26],[47,27],[47,28],[47,29],
	[48,22],[48,23],[48,28],[48,29],
	[49,22],[49,23],[49,28],[49,29],
	[50,22],[50,23],[50,28],[50,29],
	[51,22],[51,23],[51,28],[51,29]
];

var homeIsDestroy = false;//���Ƿ񱻻���
var game_duration = 250;//�����Ҫ������Ϸ��������ʤ����һ����ʱ

//������л���
function clear_all()
{
	wallCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	tankCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	crackCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	grassCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	propCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	scoreCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	statusCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	intermediaryCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	overCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	menuCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
}
//�ص��˵�
function back_to_menu()
{
	clear_all();

	isPause = false;
	keys = [];
	menu.reset_status();
	intermediary.reset_status();
	enemyArray = [];
	prop = null;
	gameOver.reset_status();
	lev = 1;
	level = JSON.parse(JSON.stringify(levels[lev-1]));
	intermediary.level = lev;
	stage.setLevel(level);
	bulletArray = [];
	crackArray = [];
	scoreArray = [];
	enemyCount = 0;
	initingEnemyArray = [];
	mapChangeIndexs = [];

	prop_count_down = 0;
	emeny_count_down = 0;
	home_protected_count_down = 0;
	homeIsDestroy = false;
	game_duration = 250;
}

//��ʼ��������Ļ
function Init_Screen()
{
	var wallCanvas = document.getElementById("wallCanvas");
	wallCanvas.width = SCREEN_WIDTH;
	wallCanvas.height = SCREEN_HEIGHT;
	wallCtx = wallCanvas.getContext("2d");

	var tankCanvas = document.getElementById("tankCanvas");
	tankCanvas.width = SCREEN_WIDTH;
	tankCanvas.height = SCREEN_HEIGHT;
	tankCtx = tankCanvas.getContext("2d");

	var crackCanvas = document.getElementById("crackCanvas");
	crackCanvas.width = SCREEN_WIDTH;
	crackCanvas.height = SCREEN_HEIGHT;
	crackCtx = crackCanvas.getContext("2d");

	var grassCanvas = document.getElementById("grassCanvas");
	grassCanvas.width = SCREEN_WIDTH;
	grassCanvas.height = SCREEN_HEIGHT;
	grassCtx = grassCanvas.getContext("2d");

	var propCanvas = document.getElementById("propCanvas");
	propCanvas.width = SCREEN_WIDTH;
	propCanvas.height = SCREEN_HEIGHT;
	propCtx = propCanvas.getContext("2d");


	var scoreCanvas = document.getElementById("scoreCanvas");
	scoreCanvas.width = SCREEN_WIDTH;
	scoreCanvas.height = SCREEN_HEIGHT;
	scoreCtx = scoreCanvas.getContext("2d");

	var statusCanvas = document.getElementById("statusCanvas");
	statusCanvas.width = SCREEN_WIDTH;
	statusCanvas.height = SCREEN_HEIGHT;
	statusCtx = statusCanvas.getContext("2d");


	var intermediaryCanvas = document.getElementById("intermediaryCanvas");
	intermediaryCanvas.width = SCREEN_WIDTH;
	intermediaryCanvas.height = SCREEN_HEIGHT;
	intermediaryCtx = intermediaryCanvas.getContext("2d");

	var overCanvas = document.getElementById("overCanvas");
	overCanvas.width = SCREEN_WIDTH;
	overCanvas.height = SCREEN_HEIGHT;
	overCtx = overCanvas.getContext("2d");

	var menuCanvas = document.getElementById("menuCanvas");
	menuCanvas.width = SCREEN_WIDTH;
	menuCanvas.height = SCREEN_HEIGHT;
	menuCtx = overCanvas.getContext("2d");
}

function Init_Object()
{
	keyboard = new Keyboard();
	menu = new Menu(menuCtx,SCREEN_WIDTH,SCREEN_HEIGHT,MENU_IMAGE,RESOURCE_IMAGE,POS["selectTank"]);
	intermediary = new Intermediary(intermediaryCtx,SCREEN_WIDTH,SCREEN_HEIGHT,RESOURCE_IMAGE,POS["stageLevel"],lev);
	
	gameOver = new GameOver(overCtx,GAME_OVER_IMG,GAME_OVER_BG,SCREEN_WIDTH,SCREEN_HEIGHT);

	level = JSON.parse(JSON.stringify(levels[lev-1]));
	stage = new Stage([wallCtx,grassCtx],RESOURCE_IMAGE,SCREEN_WIDTH,SCREEN_HEIGHT,POS,level);
	collision = new Collision();
}

//��������
function build_prop()
{
	//��������
	var PROP_TYPES = [LIFE,TIMER,SPADE,BOMB,STAR,HELMET];
	var TYPE = PROP_TYPES[parseInt(Math.random()*PROP_TYPES.length)];
	var x = parseInt(Math.random()*(stage.level[0].length-1))*8;
	var y = parseInt(Math.random()*(stage.level.length-1))*8;
	prop = new Prop(propCtx,RESOURCE_IMAGE,SCREEN_WIDTH,SCREEN_HEIGHT,POS,TYPE,x,y);
	prop_count_down = 750;
}

//ʹ�õ���
function use_prop(p)
{
	if(p==1)
	{
		switch(prop.type)
		{
			case LIFE:
				player.lives ++;
				ADD_LIFE_AUDIO.play();
				break;
			case TIMER:
				emeny_count_down = 750;
				ANOTHER_PROP_AUDIO.play();
				break;
			case SPADE:
				home_protected_count_down = 750;
				ANOTHER_PROP_AUDIO.play();
				for(var i=0;i<home_wall_indexs.length;i++)
				{
					stage.level[home_wall_indexs[i][0]][home_wall_indexs[i][1]].type = GRID;
				}
				stage.update_map(home_wall_indexs);
				break;
			case BOMB:
				for(var i=0;i<enemyArray.length;i++)
				{
					enemyArray[i].isDestroy = true;
					//��ӱ�ը����������
					crackArray.push(new Crack(
						crackCtx,RESOURCE_IMAGE,
						SCREEN_WIDTH,SCREEN_HEIGHT,
						POS,CRACK_TANK,enemyArray[i].x,
						enemyArray[i].y));
					//��ӷ�����ʾ������
					scoreArray.push(new Score(
						scoreCtx,RESOURCE_IMAGE,
						SCREEN_WIDTH,SCREEN_HEIGHT,
						POS,enemyArray[i].score,enemyArray[i].x,
						enemyArray[i].y,6));
				}
				USE_BOMB_AUDIO.play();
				break;
			case STAR:
				if(player.fire_delay != player.min_fire_delay)
				{
					player.fire_delay = player.min_fire_delay;
				}
				else
				{
					if(player.bullet_speed != player.max_bullet_speed)
					{
						player.bullet_speed = player.max_bullet_speed;
					}
					else
					{
						player.power = player.max_bullet_power;
					}
				}
				UPGRADE_POWER_AUDIO.play();
				break;
			case HELMET:
				player.immuneDuration = 750;
				ANOTHER_PROP_AUDIO.play();
				break;
		};
		//���߼ӷ�
		scoreArray.push(new Score(
			scoreCtx,RESOURCE_IMAGE,
			SCREEN_WIDTH,SCREEN_HEIGHT,
			POS,500,prop.x,prop.y,1));
	}
	else
	{
		switch(prop.type)
		{
			case LIFE:
				player2.lives ++;
				ADD_LIFE_AUDIO.play();
				break;
			case TIMER:
				emeny_count_down = 750;
				ANOTHER_PROP_AUDIO.play();
				break;
			case SPADE:
				home_protected_count_down = 750;
				ANOTHER_PROP_AUDIO.play();
				for(var i=0;i<home_wall_indexs.length;i++)
				{
					stage.level[home_wall_indexs[i][0]][home_wall_indexs[i][1]].type = GRID;
				}
				stage.update_map(home_wall_indexs);
				break;
			case BOMB:
				for(var i=0;i<enemyArray.length;i++)
				{
					enemyArray[i].isDestroy = true;
					//��ӱ�ը����������
					crackArray.push(new Crack(
						crackCtx,RESOURCE_IMAGE,
						SCREEN_WIDTH,SCREEN_HEIGHT,
						POS,CRACK_TANK,enemyArray[i].x,
						enemyArray[i].y));
					//��ӷ�����ʾ������
					scoreArray.push(new Score(
						scoreCtx,RESOURCE_IMAGE,
						SCREEN_WIDTH,SCREEN_HEIGHT,
						POS,enemyArray[i].score,enemyArray[i].x,
						enemyArray[i].y,6));
				}
				USE_BOMB_AUDIO.play();
				break;
			case STAR:
				if(player2.fire_delay != player2.min_fire_delay)
				{
					player2.fire_delay = player2.min_fire_delay;
				}
				else
				{
					if(player2.bullet_speed != player2.max_bullet_speed)
					{
						player2.bullet_speed = player2.max_bullet_speed;
					}
					else
					{
						player2.power = player2.max_bullet_power;
					}
				}
				UPGRADE_POWER_AUDIO.play();
				break;
			case HELMET:
				player2.immuneDuration = 750;
				ANOTHER_PROP_AUDIO.play();
				break;
		};
		scoreArray.push(new Score(
			scoreCtx,RESOURCE_IMAGE,
			SCREEN_WIDTH,SCREEN_HEIGHT,
			POS,500,prop.x,prop.y,1));
	}
	prop_count_down = 0;
	prop = null;
}
//��Ҳ�������
function KeyEvent()
{
	if(GAME_STATE == GAME_STATE_OVER)return;
	var tanks = [];
	tanks = tanks.concat(enemyArray);
	if(player.lives!=0)
	{
		tanks.push(player);
	}
	if(player2!=null&&player2.lives!=0)
	{
		tanks.push(player2);
	}
	if(!player.isDestroy)
	{
		if(keys.contain(keyboard.W))
		{
			if(player.dir != UP)
			{
				player.setDir(UP);
			}
			if(!collision.tanIsHit(player,stage.level,tanks))
			{
				player.move();
			}
		}
		else if(keys.contain(keyboard.S))
		{
			if(player.dir != DOWN)
			{
				player.setDir(DOWN);
			}
			if(!collision.tanIsHit(player,stage.level,tanks))
			{
				player.move();
			}
		}
		else if(keys.contain(keyboard.A))
		{
			if(player.dir != LEFT)
			{
				player.setDir(LEFT);
			}
			if(!collision.tanIsHit(player,stage.level,tanks))
			{
				player.move();
			}
		}
		else if(keys.contain(keyboard.D))
		{
			if(player.dir != RIGHT)
			{
				player.setDir(RIGHT);
			}
			if(!collision.tanIsHit(player,stage.level,tanks))
			{
				player.move();
			}
		}

		//�Ե���
		if(prop!=null&&collision.propHit(player,prop))
		{
			use_prop(1);
			player.score += 500;
		}

		player.clock();
	}
	else
	{
		//��ӱ�ը����������
		crackArray.push(new Crack(
			crackCtx,RESOURCE_IMAGE,
			SCREEN_WIDTH,SCREEN_HEIGHT,
			POS,CRACK_TANK,player.x,player.y));
		if(player.lives!=0)
		{
			player.reborn();
		}
	}

	//���2�ж�
	if(player2 != null)
	{
		if(!player2.isDestroy)
		{
			if(keys.contain(keyboard.UP))
			{
				if(player2.dir != UP)
				{
					player2.setDir(UP);
				}
				if(!collision.tanIsHit(player2,stage.level,tanks))
				{
					player2.move();
				}
			}
			else if(keys.contain(keyboard.DOWN))
			{
				if(player2.dir != DOWN)
				{
					player2.setDir(DOWN);
				}
				if(!collision.tanIsHit(player2,stage.level,tanks))
				{
					player2.move();
				}
			}
			else if(keys.contain(keyboard.LEFT))
			{
				if(player2.dir != LEFT)
				{
					player2.setDir(LEFT);
				}
				if(!collision.tanIsHit(player2,stage.level,tanks))
				{
					player2.move();
				}
			}
			else if(keys.contain(keyboard.RIGHT))
			{
				if(player2.dir != RIGHT)
				{
					player2.setDir(RIGHT);
				}
				if(!collision.tanIsHit(player2,stage.level,tanks))
				{
					player2.move();
				}
			}

			//�Ե���
			if(prop!=null&&collision.propHit(player2,prop))
			{
				use_prop(2);
				player2.score += 500;
			}


			player2.clock();
		}
		else
		{
			//��ӱ�ը����������
			crackArray.push(new Crack(
				crackCtx,RESOURCE_IMAGE,
				SCREEN_WIDTH,SCREEN_HEIGHT,
				POS,CRACK_TANK,player2.x,player2.y));
			if(player2.lives!=0)
			{
				player2.reborn();
			}
		}
	}
}
function nextLevel()
{
	clear_all();

	isPause = false;
	keys = [];
	menu.reset_status();
	intermediary.reset_status();
	enemyArray = [];
	prop = null;
	gameOver.reset_status();
	
	bulletArray = [];
	crackArray = [];
	scoreArray = [];
	enemyCount = 0;
	initingEnemyArray = [];
	mapChangeIndexs = [];

	prop_count_down = 0;
	emeny_count_down = 0;
	home_protected_count_down = 0;
	homeIsDestroy = false;
	game_duration = 250;


	lev += 1;
	intermediary.level = lev;
	level = JSON.parse(JSON.stringify(levels[lev-1]));
	stage.setLevel(level);
	stage.init_map();

	player.reset_status();
	if(player2!=null)
	{
		player2.reset_status();
	}
	GAME_STATE = GAME_STATE_INIT;
}

function add_enemy()
{
	var NEnemyType = [0,0,1,2,3,4,4,4,5,5,5,5,6,6];
	var DIRS = [UP,DOWN,LEFT,RIGHT];
	var dir = DIRS[parseInt(Math.random()*DIRS.length)];
	var enemy_type = ENEMY_TYPES[NEnemyType[parseInt(Math.random()*NEnemyType.length)]];
	var elocation = ENEMY_LIVE_POS[parseInt(Math.random()*ENEMY_LIVE_POS.length)];

	var enemyPos = enemy_type.pos;
	var type = enemy_type.type;
	var life = enemy_type.life;
	var score = enemy_type.score;
	var isRed = enemy_type.isRed;
	var tank = new EnemyTank(tankCtx,RESOURCE_IMAGE,ENEMY_IMAGE,POS,enemyPos,type,life,score,isRed,dir);
	tank.setLocation(elocation[0],elocation[1]);
	tank.setStep(parseInt(Math.random()*20)+20);
	//��ӵ����ڳ�ʼ����������
	initingEnemyArray.push(tank);

	enemyCount++;
}

//��������������Ϸ�е�����
function game_process()
{
	//�ж���Ϸ�Ƿ����
	if(homeIsDestroy||(player.lives==0&&player.isDestroy&&player2 == null)
		||(player.lives==0&&player.isDestroy&&player2!=null&&player2.lives==0&&player2.isDestroy))
	{
		GAME_STATE = GAME_STATE_OVER;
	}
	//�ж���Ϸ�Ƿ�ʤ��
	if(!homeIsDestroy&&enemyCount == maxEnemy&&enemyArray.length==0&&initingEnemyArray.length==0)
	{
		GAME_STATE = GAME_STATE_WIN;
	}
	//���������ϵı�ը��Ч
	for(var i=crackArray.length-1;i>=0;i--)
	{
		if(crackArray[i].played)
		{
			crackArray.splice(i,1);
		}
	}
	//�������ٵ��ӵ�
	for(var i=bulletArray.length-1;i>=0;i--)
	{
		if(bulletArray[i].isDestroy)
		{
			if(bulletArray[i].isCreateCrack)
			{
				crackArray.push(new Crack(
					crackCtx,RESOURCE_IMAGE,
					SCREEN_WIDTH,SCREEN_HEIGHT,
					POS,CRACK_BULLET,
					bulletArray[i].x,bulletArray[i].y));
			}
			bulletArray.splice(i,1);
		}
	}
	//�������ٵ�̹��
	for(var i=enemyArray.length-1;i>=0;i--)
	{
		if(enemyArray[i].isDestroy)
		{
			//��ӱ�ը����������
			crackArray.push(new Crack(
				crackCtx,RESOURCE_IMAGE,
				SCREEN_WIDTH,SCREEN_HEIGHT,
				POS,CRACK_TANK,enemyArray[i].x,
				enemyArray[i].y));

			//��ӷ�����ʾ������
			scoreArray.push(new Score(
				scoreCtx,RESOURCE_IMAGE,
				SCREEN_WIDTH,SCREEN_HEIGHT,
				POS,enemyArray[i].score,enemyArray[i].x,
				enemyArray[i].y,6));
			//�Ƴ���̹��
			enemyArray.splice(i,1);
			continue;
		}
	}

	/*
	 *����Ѿ����ֹ��ĵз�̹����С�����з�̹����
	 *���ҵ�ǰ��Ļ�ϵз�̹�����������������ֵĵ�
	 *��̹�����ʹ���������µĵз�̹�ˡ�
	 */
	if(enemyCount<maxEnemy
		&&enemyArray.length<maxAppearEnemy-1
		&&initingEnemyArray.length<ENEMY_LIVE_POS.length)
	{
		add_enemy();
	}
	/*
	 *������ڳ�ʼ����̹���ѳ�ʼ����ɾͽ�����ӵ�
	 *�ѳ�ʼ��̹��������
	 */
	for(var i=initingEnemyArray.length-1;i>=0;i--)
	{
		if(initingEnemyArray[i].initingDuration == 0)
		{
			enemyArray.push(initingEnemyArray[i]);
			initingEnemyArray[i].clock();
			initingEnemyArray.splice(i,1);
			continue;
		}
		initingEnemyArray[i].clock();
	}

	if(emeny_count_down == 0)
	{
		//�з�̹���ж�
		for(var i=enemyArray.length-1;i>=0;i--)
		{
			var fire_able = Math.random()*100>90;
			if(enemyArray[i].isFireAble()&&fire_able)
			{
				bulletArray.push(enemyArray[i].fire());
			}
			if(enemyArray[i].step != 0)
			{
				var tanks = [];
				tanks = tanks.concat(enemyArray);
				if(player.lives!=0)
				{
					tanks.push(player);
				}
				if(player2!=null&&player2.lives!=0)
				{
					tanks.push(player2);
				}
				if(!collision.tanIsHit(enemyArray[i],stage.level,tanks))
				{
					enemyArray[i].move();
				}
				enemyArray[i].setStep(enemyArray[i].step-1);
			}
			else
			{
				var DIRS = [UP,DOWN,LEFT,RIGHT];
				var dir = DIRS[parseInt(Math.random()*DIRS.length)];
				var step = parseInt(Math.random()*40)+40;
				enemyArray[i].setDir(dir);
				enemyArray[i].setStep(step);
			}
			enemyArray[i].clock();
		}
	}
	else
	{
		emeny_count_down --;
	}
	//����ж�

	KeyEvent();

	//�ӵ��ж�
	for(var i=0;i<bulletArray.length;++i)
	{
		if(bulletArray[i].isDestroy)continue;
		var tanks = [];
		tanks = tanks.concat(enemyArray);
		if(player.lives!=0)
		{
			tanks.push(player);
		}
		if(player2!=null&&player2.lives!=0)
		{
			tanks.push(player2);
		}
		var result = collision.getHitResult(bulletArray[i],bulletArray,stage.level,tanks);
		if(!result.isHit)
		{
			bulletArray[i].move();
		}
		else
		{
			mapChangeIndexs = mapChangeIndexs.concat(result.destroyElementIndexArray);
			if(result.theRedTankHasHit)
			{
				CREATE_PROP_AUDIO.play();
				build_prop();
			}
			if(result.hit_and_had_undestroy)
			{
				BULLET_DESTROY_AUDIO.play();
			}
			if(result.enemy_hit_and_undestroy)
			{
				ENEMY_HIT_AUDIO.play();
			}
			if(result.enemy_has_destroy)
			{
				TANK_DESTROY_AUDIO.play();
			}
			if(result.homeIsDestroy)
			{
				HOME_DESTROY_AUDIO.play();
				homeIsDestroy = result.homeIsDestroy;
				crackArray.push(new Crack(
					crackCtx,RESOURCE_IMAGE,
					SCREEN_WIDTH,SCREEN_HEIGHT,
					POS,CRACK_HOME,home_pos[0],
					home_pos[1]));
			}

			if(bulletArray[i].type == PLAYER_1)
			{
				player.score += result.score;
			}
			if(bulletArray[i].type == PLAYER_2)
			{
				player2.score += result.score;
			}
		}
	}
	
	//������ʧ��ʱ
	if(prop != null)
	{
		if(prop.destroy_cout_down==0)
		{
			prop = null;
		}
		else
		{
			prop.clock();
		}
	}

	//�ҵķ���Ȧ��ʧ��ʱ
	if(home_protected_count_down > 0)
	{
		var BLOCK_TYPE = GRID;
		if(home_protected_count_down<=250&&parseInt(home_protected_count_down/10)%2==0)
		{
			BLOCK_TYPE = WALL;
		}
		for(var i=0;i<home_wall_indexs.length;i++)
		{
			stage.level[home_wall_indexs[i][0]][home_wall_indexs[i][1]].type = BLOCK_TYPE;
		}
		home_protected_count_down --;
	}

	//������ʾ��ʧ��ʱ
	for(var i=scoreArray.length-1;i>=0;i--)
	{
		if(!scoreArray[i].viewed)
		{
			scoreArray[i].clock()
			continue;
		}
		scoreArray.splice(i,1);
	}
}
//��Ϸ�����������
function paint_over()
{
	gameOver.paint();
	return gameOver.clock();
}
//����״̬��
function paint_status()
{
	//Ԥ����AI̹����
	var surplus_enemy = maxEnemy - enemyCount;
	var offsetX = 464;
	var offsetY = 16;

	statusCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);

	for(var i=0;i<surplus_enemy;i++)
	{
		var cx = offsetX+(i%2)*16;
		var cy = offsetY+16 + parseInt(i/2)*16;
		statusCtx.drawImage(
			RESOURCE_IMAGE,
			POS["enemyFlag"][0],
			POS["enemyFlag"][1],
			16,16,cx,cy,16,16);
	}
	
	var p1_lives = player.lives>=9?9:player.lives;
	statusCtx.drawImage(
		RESOURCE_IMAGE,
		POS["playerFlagOne"][0],
		POS["playerFlagOne"][1],
		30,30,offsetX,224,30,30);
	
	statusCtx.drawImage(
		RESOURCE_IMAGE,
		POS["num"][0]+14*p1_lives,
		POS["num"][1],
		14,14,offsetX+16,240,14,14);
	if(player2!=null)
	{
		var p2_lives = player2.lives>=9?9:player2.lives;
		statusCtx.drawImage(
			RESOURCE_IMAGE,
			POS["playerFlagTwo"][0],
			POS["playerFlagTwo"][1],
			30,30,offsetX,288,30,30);
		statusCtx.drawImage(
			RESOURCE_IMAGE,
			POS["num"][0]+14*p2_lives,
			POS["num"][1],
			14,14,offsetX+16,304,14,14);
	}
	
	statusCtx.drawImage(
		RESOURCE_IMAGE,
		POS["flag"][0],
		POS["flag"][1],
		30,30,offsetX,352,30,30);

	statusCtx.drawImage(
		RESOURCE_IMAGE,
		POS["num"][0]+(lev%10)*14,
		POS["num"][1],
		14,14,offsetX+24,384,14,14);
	
	if(lev>10)
	{
		statusCtx.drawImage(
			RESOURCE_IMAGE,
			POS["num"][0]+parseInt(lev/10)*14,
			POS["num"][1],
			14,14,offsetX+8,384,14,14);
	}
	
}
//�滭����Ԫ��
function paint_all()
{
	//��ʾ����
	if(prop != null)
	{
		prop.paint();
	}
	else
	{
		propCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	}
	//��ʾ����
	scoreCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	for(var i=0;i<scoreArray.length;i++)
	{
		scoreArray[i].paint();
	}
	//���µ�ͼ
	if(home_protected_count_down<=250&&home_protected_count_down%10==0)
	{
		stage.update_map(home_wall_indexs);
	}
	stage.update_map(mapChangeIndexs);
	mapChangeIndexs = [];

	tankCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	crackCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	for(var i=0;i<bulletArray.length;++i)
	{
		bulletArray[i].paint();
	}
	for(var i=initingEnemyArray.length-1;i>=0;i--)
	{
		initingEnemyArray[i].paint();
	}
	for(var i=enemyArray.length-1;i>=0;i--)
	{
		enemyArray[i].paint();
	}
	player.paint();
	if(player2!=null)
	{
		player2.paint();
	}
	for(var i=0;i<crackArray.length;i++)
	{
		crackArray[i].paint();
		crackArray[i].clock();
	}

	paint_status();
}


function game_egine()
{
	paint_all();
	if(!isPause)
	{
		game_process();
	}
}



function Game_Loop()
{
	switch(GAME_STATE)
	{
		case GAME_STATE_MENU:
			menu.view();
			break;
		case GAME_STATE_INIT:
			GAME_STATE = intermediary.view();
			break;
		case GAME_STATE_PLAYING:
			game_egine();
			break;
		case GAME_STATE_OVER:
			game_egine();
			if(paint_over())
			{
				GAME_OVER_AUDIO.play();
			}
			break;
		case GAME_STATE_WIN:
			if(game_duration > 0)
			{
				game_egine();
				game_duration --;
			}
			else
			{
				nextLevel();
			}
			break;
	}
}

$(document).keydown(function(e){
	var keyCode = e.which||e.keyCode;
	switch(GAME_STATE)
	{
		case GAME_STATE_MENU:
			//�ж��Ƿ������¼�������Ϸ��ʼ�˵�����ɳ�ʼ��
			if(keyCode == keyboard.UP||keyCode == keyboard.DOWN&&menu.initted)
			{
				menu.change();
			}
			//�ж��Ƿ��»س���������Ϸ��ʼ�˵�����ɳ�ʼ��
			if(keyCode == keyboard.ENTER&&menu.initted)
			{
				player = new PlayerTank(tankCtx,RESOURCE_IMAGE,POS,PLAYER_1,UP);
				player2 = null;
				if(menu.selected==1)
				{
					player2 = new PlayerTank(tankCtx,RESOURCE_IMAGE,POS,PLAYER_2,UP);
					player2.setLocation(PLAYER_LIVE_POS[1][0],PLAYER_LIVE_POS[1][1]);
				}
				menu.clear();
				stage.init_map();
				GAME_STATE = GAME_STATE_INIT;
			}
			break;
		case GAME_STATE_INIT:
			//�ж��Ƿ��»س������ҹ��ɶ����ѽ���
			if(keyCode == keyboard.ENTER&&intermediary.initted)
			{
				intermediary.game_started = true;
				START_AUDIO.play();
			}
			break;
		case GAME_STATE_OVER:
			if(keyCode == keyboard.ENTER)
			{
				back_to_menu();
				GAME_STATE = GAME_STATE_MENU;
			}
			break;
		case GAME_STATE_WIN:
		case GAME_STATE_PLAYING:
			if(keyCode == keyboard.ENTER)
			{
				break;
			}
			if(keyCode == keyboard.SPACE&&player.isFireAble())
			{
				bulletArray.push(player.fire());
				ATTACK_AUDIO.play();
			}
			if(player2 != null)
			{
				if(keyCode == keyboard.K&&player2.isFireAble())
				{
					bulletArray.push(player2.fire());
					ATTACK_AUDIO.play();
				}
			}
			if(!keys.contain(keyCode)){
				keys.push(keyCode);
			}
			break;
	}
});
$(document).keyup(function(e)
{
	keys.remove(e.keyCode);
	if(e.keyCode == keyboard.ENTER&&GAME_STATE == GAME_STATE_PLAYING)
	{
		isPause = !isPause;
		if(isPause)
		{
			GAME_PAUSE_AUDIO.play();
		}
	}
});

$(function()
{
	Init_Screen();
	Init_Object();
	setInterval(Game_Loop,20);
});