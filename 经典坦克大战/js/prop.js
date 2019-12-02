/*
 *道具类
*/

class Prop
{
	constructor(ctx,resource,sw,sh,cutPos,type,x,y)
	{
		this.ctx = ctx;
		this.resource = resource;
		this.sw = sw;
		this.sh = sh;
		this.cutPos = cutPos;
		this.type = type;
		this.x = x;
		this.y = y;
		this.offsetX = 32;
		this.offsetY = 16;
		this.destroy_cout_down = 750;//道具消失倒计时
		this.isDestroy = false;
	}
	paint()
	{
		this.ctx.clearRect(0,0,this.sw,this.sh);

		if(parseInt(this.destroy_cout_down/10)%2==1)return;
		this.ctx.drawImage(
			this.resource,
			this.cutPos["prop"][0]+(this.type-1)*30,
			this.cutPos["prop"][1],
			30,32,this.x+this.offsetX,this.y+this.offsetY,30,32);
	}

	clock()
	{
		if(this.destroy_cout_down>0)
		{
			this.destroy_cout_down --;
		}
	}
}