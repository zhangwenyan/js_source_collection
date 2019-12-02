/*
 *坦克类
*/

class Tank
{
	constructor(ctx,resource,cutPos,type,life,dir)
	{
		this.ctx = ctx;
		this.resource = resource;
		this.cutPos = cutPos;
		this.dir = dir;//方向
		this.x = 0;
		this.y = 0;
		this.type = type;//坦克类型
		this.life = life;//生命
		this.power = 1;//火力
		this.bullet_speed = 4;//产生的子弹的速度
		this.fire_delay = 32;//攻击延时
		this.fire_cout_down = 0;//攻击倒计时，倒计时为0时方可再次攻击

		this.speed = 2;//行走速度
		this.isDestroy = false;//是否销毁
		this.offsetX = 32;
		this.offsetY = 16;
	}
	isFireAble()
	{
		return this.fire_cout_down == 0;
	}
	setLocation(x,y)
	{
		this.x = x;
		this.y = y;
	}
	setDir(dir)
	{
		var preDir = this.dir;
		this.dir = dir;
		//方向切换，重新矫正位置
		if(preDir==UP&&(this.dir==LEFT||this.dir==RIGHT))
		{
			this.y = Math.round(this.y/16)*16;
		}
		if(preDir==DOWN&&(this.dir==LEFT||this.dir==RIGHT))
		{
			this.y = Math.round(this.y/16)*16;
		}

		if(preDir==LEFT&&(this.dir==UP||this.dir==DOWN))
		{
			this.x = Math.round(this.x/16)*16;
		}
		if(preDir==RIGHT&&(this.dir==UP||this.dir==DOWN))
		{
			this.x = Math.round(this.x/16)*16;
		}
	}
	move()
	{
		switch(this.dir)
		{
			case UP:
				this.y -= this.speed;
				break;
			case DOWN:
				this.y += this.speed;
				break;
			case LEFT:
				this.x -= this.speed;
				break;
			case RIGHT:
				this.x += this.speed;
		};
	}
	fire()
	{
		this.fire_cout_down = this.fire_delay-1;
		var bullet_type;
		var x = this.x;
		var y = this.y;
		if(this.type == PLAYER_1)
		{
			bullet_type = BULLET_TYPE_PLAYER1;
		}
		else if(this.type == PLAYER_2)
		{
			bullet_type = BULLET_TYPE_PLAYER2;
		}
		else
		{
			bullet_type = BULLET_TYPE_ENEMY;
		}
		switch(this.dir)
		{
			case UP:
				x += 16;
				y = Math.round(y/8)*8;
				break;
			case DOWN:
				x += 16;
				y = Math.round(y/8)*8 + 32;
				break;
			case LEFT:
				y += 16;
				x = Math.round(x/8)*8
				break;
			case RIGHT:
				y += 16;
				x = Math.round(x/8)*8 + 32;
		};
		return new Bullet(this.ctx,this.resource,this.cutPos,bullet_type,this.dir,this.power,this.bullet_speed,x,y);
	}
}

class EnemyTank extends Tank
{
	constructor(ctx,resource,enemy_resource,cutPos,enemyPos,type,life,score,isRed,dir)
	{
		super(ctx,resource,cutPos,type,life,dir);
		this.enemy_resource = enemy_resource;
		this.enemyPos = enemyPos;
		this.step = 4;//这个是敌方坦克可行走的步数，它会递减，直到为0时，会再次随机方向值和步数
		this.core = 100;
		this.isRed = isRed;
		this.speed = 1;
		this.fire_delay = 96;//攻击延时
		this.initingDuration = 42;//无敌时间
	}
	setStep(step)
	{
		this.step = step;
	}
	paint()
	{
		if(this.initingDuration >= 0)
		{
			this.ctx.drawImage(
			this.resource,
			this.cutPos["enemyBefore"][0]+(parseInt(this.initingDuration/3))%7*32,
			this.cutPos["enemyBefore"][1],
			32,32,this.x+this.offsetX,this.y+this.offsetY,32,32);
		}
		else
		{
			if(!this.isDestroy)
			{
				this.ctx.drawImage(
				this.enemy_resource,
				this.enemyPos[this.enemyPos.length-this.life][0]+this.dir*32,
				this.enemyPos[this.enemyPos.length-this.life][1],
				32,32,this.x+this.offsetX,this.y+this.offsetY,32,32);
			}
		}
	}
	clock()
	{
		if(this.initingDuration >= 0)
		{
			this.initingDuration --;
		}
		if(this.fire_cout_down != 0)
		{
			this.fire_cout_down --;
		}
	}
}

class PlayerTank extends Tank
{
	constructor(ctx,resource,cutPos,type,dir)
	{
		super(ctx,resource,cutPos,type,1,dir);
		this.level = 0;
		this.score = 0;
		this.lives = 2;
		this.max_bullet_power = 2;
		this.max_bullet_speed = 8;
		this.min_fire_delay = 8;
		this.fire_delay = 16;//攻击延时
		this.immuneDuration = 100;
		this.immuneEffectFrame = 0;
		this.x = PLAYER_LIVE_POS[this.type+1][0];
		this.y = PLAYER_LIVE_POS[this.type+1][1];
	}
	//每当下一关时需要重置玩家位置，并初始化无敌时间
	reset_status()
	{
		this.dir = UP;
		this.x = PLAYER_LIVE_POS[this.type+1][0];
		this.y = PLAYER_LIVE_POS[this.type+1][1];
		this.immuneDuration = 100;
	}
	reborn()
	{
		this.lives --;
		this.dir = UP;
		this.immuneDuration = 100;
		this.immuneEffectFrame = 0;
		this.x = PLAYER_LIVE_POS[this.type+1][0];
		this.y = PLAYER_LIVE_POS[this.type+1][1];
		this.life = 1;
		this.power = 1;
		this.bullet_speed = 4;
		this.fire_delay = 16;
		this.isDestroy = false;
	}
	
	clock()
	{
		if(this.immuneDuration >= 0)
		{
			this.immuneDuration --;
			this.immuneEffectFrame++;
			this.immuneEffectFrame = this.immuneEffectFrame%8;
		}
		if(this.fire_cout_down != 0)
		{
			this.fire_cout_down --;
		}
	}
	paint()
	{
		if(this.isDestroy)return;
		var cx = 0;
		if(this.type == PLAYER_2)
		{
			cx = 128;
		}
		this.ctx.drawImage(
			this.resource,
			this.cutPos["player"][0]+cx+this.dir*32,
			this.cutPos["player"][1],
			32,32,this.x+this.offsetX,this.y+this.offsetY,32,32);
		if(this.immuneDuration >= 0)
		{
			this.ctx.drawImage(
			this.resource,
			this.cutPos["protected"][0],
			this.cutPos["protected"][1]+parseInt(this.immuneEffectFrame/4)*32,
			32,32,this.x+this.offsetX,this.y+this.offsetY,32,32);
		}
	}
}