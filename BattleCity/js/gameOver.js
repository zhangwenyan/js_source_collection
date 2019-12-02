/*
 *游戏结束状态管理
*/

class GameOver
{
	constructor(ctx,resource,background,sw,sh)
	{
		this.ctx = ctx;
		this.resource = resource;
		this.background = background;
		this.sw = sw;
		this.sh = sh;
		this.drawYPos = sh;
		this.offsetX = 32;
		this.offsetY = 16;
		this.played = false;
	}
	reset_status()
	{
		this.played = false;
		this.drawYPos = this.sh;
	}
	paint()
	{
		this.ctx.clearRect(0,0,this.sw,this.sh);
		if(!this.played)
		{
			this.ctx.drawImage(this.resource,this.sw/2-56,this.drawYPos-36);
		}
		else
		{
			this.ctx.drawImage(this.background,0,0);
		}
	}
	clock()
	{
		var flag = false;
		if(this.drawYPos>this.sh/2)
		{
			this.drawYPos -= 2;
		}
		else
		{
			if(!this.played)
			{
				this.played = true;
				flag = true;
			}
		}
		return flag;
	}
}