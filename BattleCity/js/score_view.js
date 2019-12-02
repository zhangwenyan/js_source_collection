/*
 *分数显示
*/

class Score
{
	constructor(ctx,resource,sw,sh,cutPos,num,x,y,view_delay)
	{
		this.ctx = ctx;
		this.resource = resource;
		this.sw = sw;
		this.sh = sh;
		this.cutPos = cutPos;
		this.num = num;
		this.x = x;
		this.y = y;
		this.view_delay = view_delay;
		this.viewed = false;
		this.view_count_down = 25;
		this.offsetX = 32;
		this.offsetY = 16;
	}
	paint()
	{
		
		if(this.view_delay>0||this.view_count_down<=0)return;
		var cy = 0;
		switch(this.num)
		{
			case 100:
				cy = 0;
				break;
			case 200:
				cy = 14;
				break;
			case 400:
				cy = 28;
				break;
			case 500:
				cy = 42;
				break;
		};

		this.ctx.drawImage(
			this.resource,
			this.cutPos["score_pos"][0],
			this.cutPos["score_pos"][1]+cy,
			28,14,this.x+this.offsetX+2,this.y+this.offsetY+9,28,14);
			
	}
	clock()
	{
		if(this.view_delay > 0)
		{
			this.view_delay --;
		}
		else
		{
			if(this.view_count_down > 0)
			{
				this.view_count_down --;
			}
			else
			{
				this.viewed = true;
			}
		}
	}
}