/**
 * ��̬����
 */

var SCREEN_WIDTH = 512; //��Ļ��
var SCREEN_HEIGHT = 448;//��Ļ��
var ROWS = 52;
var COLS = 52;


/**************ͼƬ��Դ*****************/
var MENU_IMAGE = new Image();
MENU_IMAGE.src = "Graphics/menu.png";
var RESOURCE_IMAGE = new Image();
RESOURCE_IMAGE.src = "Graphics/tankAll.png";
var ENEMY_IMAGE = new Image();
ENEMY_IMAGE.src = "Graphics/enemy.png";

var GAME_OVER_BG = new Image();
GAME_OVER_BG.src = "Graphics/game_over_bg.png";

var GAME_OVER_IMG = new Image();
GAME_OVER_IMG.src = "Graphics/game_over.png";


/**************����ͼ����ͼƬ�е�λ��*****************/
var POS = {};
POS["selectTank"] = [128,96];
POS["stageLevel"] = [396,96];
POS["num"] = [256,96];
POS["map"] = [0,96];
POS["home"] = [256,0];
POS["score"] = [0,112];
POS["score_pos"] = [192,96];
POS["player"] = [0,0];
POS["protected"] = [160,96];
POS["enemyBefore"] = [256,32];
POS["bullet"] = [80,96];
POS["tankBomb"] = [0,160];
POS["bulletBomb"] = [320,0];
POS["over"] = [384,64];
POS["prop"] = [256,110];
POS["playerFlagOne"] = [0,112];
POS["playerFlagTwo"] = [30,112];
POS["enemyFlag"] = [92,112];
POS["flag"] = [60,112];

/**************������Դ*****************/
var START_AUDIO = new Audio("audio/intro.mp3");//��ʼ����
var GAME_OVER_AUDIO = new Audio("audio/gameOver.mp3");//��Ϸʧ��
var GAME_PAUSE_AUDIO = new Audio("audio/game.pause.mp3");//��Ϸ��ͣ
var SCORE_COUNT_AUDIO = new Audio("audio/total.score.tick.mp3");//ʤ�������ͳ��
var HIGHT_SCORE_AUDIO = new Audio("audio/hi.mp3");//��Ϸ�����������ҫ
var ATTACK_AUDIO = new Audio("audio/shoot.mp3");//�����ӵ�

var CREATE_PROP_AUDIO = new Audio("audio/prop.create.mp3");//���ɵ���
var USE_BOMB_AUDIO = new Audio("audio/bonus.bomb.mp3");//��ը��
var ADD_LIFE_AUDIO = new Audio("audio/bonus.life.mp3");//����
var UPGRADE_POWER_AUDIO = new Audio("audio/star.mp3");//������Ǽӻ���
var ANOTHER_PROP_AUDIO = new Audio("audio/bonus.default.mp3");//����������

var ENEMY_MOVE_AUDIO = new Audio("audio/enemy.move.mp3");//�з�̹���ƶ�
var PLAYER_STATIC_AUDIO = new Audio("audio/holostij.mp3");//��Ҿ�ֹ
var PLAYER_MOVE_AUDIO = new Audio("audio/player.move.mp3");//���̹���ƶ�

var BULLET_DESTROY_AUDIO = new Audio("audio/bullet.destroy.mp3");//�ӵ�������
var ENEMY_HIT_AUDIO = new Audio("audio/enemy.armor.hit.mp3");//�з�̹�˱����е�δ����
var BRICK_DESTROY_AUDIO = new Audio("audio/brickErase.mp3");//ש�鱻����
var BULLET_OUT_MAP_AUDIO = new Audio("audio/block.mp3");//�ӵ���߽���ǽ��ײ

var TANK_DESTROY_AUDIO = new Audio("audio/kill.mp3");//̹�˱�����
var HOME_DESTROY_AUDIO = new Audio("audio/buh.mp3");//�ұ�����

/**************��Ϸ״̬*****************/
var GAME_STATE_MENU = 0;
var GAME_STATE_INIT = 1;
var GAME_STATE_PLAYING = 2;
var GAME_STATE_OVER = 3;
var GAME_STATE_WIN = 4;


/**************��ͼ��*****************/
var WALL = 1;
var GRID = 2;
var GRASS = 3;
var WATER = 4;
var ICE = 5;
var HOME_D = 8;
var HOME = 9;

/**************̹�˼��ӵ����ĸ�����*****************/
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

/**************�з�̹������*****************/
var ENEMY_TYPES = 
[
	{type:1,life:1,score:100,pos:[[0,0]],isRed:false},
	{type:2,life:1,score:200,pos:[[0,32]],isRed:true},
	{type:3,life:1,score:100,pos:[[0,64]],isRed:false},
	{type:4,life:1,score:200,pos:[[0,96]],isRed:true},
	{type:5,life:4,score:400,pos:[[0,192],[0,128],[0,160],[0,192]],isRed:false},
	{type:6,life:5,score:500,pos:[[0,224],[0,192],[0,128],[0,160],[0,192]],isRed:true},
	{type:7,life:2,score:200,pos:[[0,128],[0,192]],isRed:false}
];
/**************���̹�����ɵ�λ��*****************/
var PLAYER_LIVE_POS = [[128,384],[256,384]];
/**************�з�̹�����ɵ�λ��*****************/
var ENEMY_LIVE_POS = [[0,0],[192,0],[384,0]];
/**************�ӵ�����*****************/
var BULLET_TYPE_PLAYER1 = 1;
var BULLET_TYPE_PLAYER2 = 2;
var BULLET_TYPE_ENEMY = 3;
/**************�������*****************/
var PLAYER_1 = -1;
var PLAYER_2 = 0;

/**************��ը����****************/
var CRACK_BULLET = 1;//�ӵ���ը
var CRACK_TANK = 2;//̹�˱�ը
var CRACK_HOME = 3;//�ұ�ը

/**************��������***************/
var LIFE = 1;//��
var TIMER = 2;//��ʱ��
var SPADE = 3;//����
var BOMB = 4;//ը��
var STAR = 5;//�����
var HELMET = 6;//�ֿ�