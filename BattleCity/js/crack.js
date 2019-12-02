/*
 *爆炸类
 */
class Crack
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
		if(this.type == CRACK_BULLET)
		{
			this.animateDuration = 6;
		}
		else
		{
			this.animateDuration = 8;
		}
		this.animate_cout_down = 0;
		this.offsetX = 32;
		this.offsetY = 16;
		this.played = false;
	}
	paint()
	{
		if(this.animate_cout_down>=this.animateDuration)return;
		var pos,sw,sh,frame;
		if(this.type == CRACK_BULLET)
		{
			pos = this.cutPos["bulletBomb"];
			sw = 32;
			sh = 32;
			frame = parseInt(this.animate_cout_down/2);
		}
		else
		{
			pos = this.cutPos["tankBomb"];
			sw = 64;
			sh = 64;
			frame = parseInt(this.animate_cout_down/2);
		}
		this.ctx.drawImage(this.resource,pos[0]+frame,pos[1],
			sw,sh,this.x+this.offsetX-16,this.y+this.offsetY-16,sw,sh);
	}
	clock()
	{
		if(this.animate_cout_down <= this.animateDuration)
		{
			this.animate_cout_down ++;
		}
		else
		{
			this.played = true;
		}
	}
}