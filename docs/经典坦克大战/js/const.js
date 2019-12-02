/**
 * 静态变量
 */

var SCREEN_WIDTH = 512; //屏幕宽
var SCREEN_HEIGHT = 448;//屏幕高
var ROWS = 52;
var COLS = 52;


/**************图片资源*****************/
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


/**************各个图块在图片中的位置*****************/
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

/**************声音资源*****************/
var START_AUDIO = new Audio("audio/intro.mp3");//开始音乐
var GAME_OVER_AUDIO = new Audio("audio/gameOver.mp3");//游戏失败
var GAME_PAUSE_AUDIO = new Audio("audio/game.pause.mp3");//游戏暂停
var SCORE_COUNT_AUDIO = new Audio("audio/total.score.tick.mp3");//胜利后分数统计
var HIGHT_SCORE_AUDIO = new Audio("audio/hi.mp3");//游戏结束后分数炫耀
var ATTACK_AUDIO = new Audio("audio/shoot.mp3");//发射子弹

var CREATE_PROP_AUDIO = new Audio("audio/prop.create.mp3");//生成道具
var USE_BOMB_AUDIO = new Audio("audio/bonus.bomb.mp3");//吃炸弹
var ADD_LIFE_AUDIO = new Audio("audio/bonus.life.mp3");//加命
var UPGRADE_POWER_AUDIO = new Audio("audio/star.mp3");//吃五角星加火力
var ANOTHER_PROP_AUDIO = new Audio("audio/bonus.default.mp3");//吃其它道具

var ENEMY_MOVE_AUDIO = new Audio("audio/enemy.move.mp3");//敌方坦克移动
var PLAYER_STATIC_AUDIO = new Audio("audio/holostij.mp3");//玩家静止
var PLAYER_MOVE_AUDIO = new Audio("audio/player.move.mp3");//玩家坦克移动

var BULLET_DESTROY_AUDIO = new Audio("audio/bullet.destroy.mp3");//子弹被销毁
var ENEMY_HIT_AUDIO = new Audio("audio/enemy.armor.hit.mp3");//敌方坦克被击中但未击毁
var BRICK_DESTROY_AUDIO = new Audio("audio/brickErase.mp3");//砖块被销毁
var BULLET_OUT_MAP_AUDIO = new Audio("audio/block.mp3");//子弹与边界或钢墙碰撞

var TANK_DESTROY_AUDIO = new Audio("audio/kill.mp3");//坦克被击毁
var HOME_DESTROY_AUDIO = new Audio("audio/buh.mp3");//家被击毁

/**************游戏状态*****************/
var GAME_STATE_MENU = 0;
var GAME_STATE_INIT = 1;
var GAME_STATE_PLAYING = 2;
var GAME_STATE_OVER = 3;
var GAME_STATE_WIN = 4;


/**************地图块*****************/
var WALL = 1;
var GRID = 2;
var GRASS = 3;
var WATER = 4;
var ICE = 5;
var HOME_D = 8;
var HOME = 9;

/**************坦克及子弹的四个方向*****************/
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

/**************敌方坦克类型*****************/
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
/**************玩家坦克生成的位置*****************/
var PLAYER_LIVE_POS = [[128,384],[256,384]];
/**************敌方坦克生成的位置*****************/
var ENEMY_LIVE_POS = [[0,0],[192,0],[384,0]];
/**************子弹类型*****************/
var BULLET_TYPE_PLAYER1 = 1;
var BULLET_TYPE_PLAYER2 = 2;
var BULLET_TYPE_ENEMY = 3;
/**************玩家类型*****************/
var PLAYER_1 = -1;
var PLAYER_2 = 0;

/**************爆炸类型****************/
var CRACK_BULLET = 1;//子弹爆炸
var CRACK_TANK = 2;//坦克爆炸
var CRACK_HOME = 3;//家爆炸

/**************道具类型***************/
var LIFE = 1;//命
var TIMER = 2;//定时器
var SPADE = 3;//铁锹
var BOMB = 4;//炸弹
var STAR = 5;//五角星
var HELMET = 6;//钢盔