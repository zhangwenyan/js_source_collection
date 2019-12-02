/*
 *菜单类
*/
class Menu
{
	constructor(ctx,sw,sh,background,resource,cutPos)
	{
		this.ctx = ctx;
		this.sw = sw;
		this.sh = sh;
		this.background = background;
		this.resource = resource;
		this.cutPos = cutPos;
		this.selected = 0;
		this.drawYPos = sh;
		this.initted = false;//标记菜单动画是否初始化完成
	}
	reset_status()
	{
		this.selected = 0;
		this.drawYPos = this.sh;
		this.initted = false;
	}
	view()
	{
		this.ctx.clearRect(0,0,this.sw,this.sh);
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0,0,this.sw,this.sh);
		this.ctx.drawImage(this.background,0,this.drawYPos);
		if(this.initted)
		{
			this.ctx.drawImage(this.resource,this.cutPos[0],this.cutPos[1],28,28,144,this.drawYPos+250+this.selected*32,28,28);
		}
		if(this.drawYPos == 0)
		{
			this.initted = true;
		}
		else
		{
			this.drawYPos -= 8;
		}
	}
	clear()
	{
		this.ctx.clearRect(0,0,this.sw,this.sh);
	}
	change()
	{
		this.selected += 1;
		this.selected = this.selected%2;
	}
}