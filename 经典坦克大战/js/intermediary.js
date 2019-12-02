/*
 *过渡动画效果
*/

class Intermediary
{
	constructor(ctx,sw,sh,resource,cutPos,level)
	{
		this.ctx = ctx;
		this.sw = sw;
		this.sh = sh;
		this.resource = resource;
		this.cutPos = cutPos;
		this.level = level;
		this.offsetX = 0;
		this.offsetY = 0;
		this.drawYPos = sh/2;
		this.initted = false;
		this.game_started = false;
	}
	reset_status(level)
	{
		this.level = level;
		this.offsetX = 0;
		this.offsetY = 0;
		this.drawYPos = this.sh/2;
		this.initted = false;
		this.game_started = false;
	}
	view()
	{
		
		if(!this.game_started)
		{
			this.ctx.clearRect(0,0,this.sw,this.sh);
			this.ctx.fillStyle = "#000";
			this.ctx.fillRect(0,0,this.sw,this.sh);
			this.ctx.fillStyle = "#7f7f7f";
			this.ctx.fillRect(0,-1*this.drawYPos,this.sw,this.sh/2);
			this.ctx.fillRect(0,this.sh/2+this.drawYPos,this.sw,this.sh/2);
			if(this.drawYPos == 0)
			{
				var a = parseInt(this.level/10);
				var b = this.level%10;
				this.ctx.drawImage(this.resource,this.cutPos[0],this.cutPos[1],80,14,192,217,80,14);
				if(a>0)
				{
					this.ctx.drawImage(this.resource,this.cutPos[0]-14*10+a*14,this.cutPos[1],14,14,272+2*14,217,14,14);
				}
				this.ctx.drawImage(this.resource,this.cutPos[0]-14*10+b*14,this.cutPos[1],14,14,272+3*14,217,14,14);
				this.initted = true;
			}
			else
			{
				this.drawYPos -= 8;
			}
		}
		else
		{
			this.ctx.clearRect(0,0,this.sw,this.sh);
			this.ctx.fillStyle = "#7f7f7f";
			this.ctx.fillRect(0,-1*this.drawYPos,this.sw,this.sh/2);
			this.ctx.fillRect(0,this.sh/2+this.drawYPos,this.sw,this.sh/2);
			if(this.drawYPos == this.sh/2)
			{
				this.clear();
				return GAME_STATE_PLAYING;
			}
			else
			{
				this.drawYPos += 8;
			}
		}
		return GAME_STATE_INIT;
	}
	clear()
	{
		this.ctx.clearRect(0,0,this.sw,this.sh);
	}
}