/*
 *×Óµ¯Àà
*/
class Bullet
{
	constructor(ctx,resource,cutPos,type,dir,power,speed,x,y)
	{
		this.ctx = ctx;
		this.resource = resource;
		this.cutPos = cutPos;
		this.type = type;
		this.dir = dir;
		this.power = power;
		this.speed = speed;
		
		this.x = x;
		this.y = y;
		this.isDestroy = false;
		this.isCreateCrack = true;
		this.offsetX = 32;
		this.offsetY = 16;
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
	paint()
	{
		var x = this.x;
		var y = this.y;
		switch(this.dir)
		{
			case UP:
				x -= 3;
				y -= 2;
				break;
			case DOWN:
				x -= 3;
				y += 2;
				break;
			case LEFT:
				y -= 3;
				x -= 2;
				break;
			case RIGHT:
				y -= 3;
				x += 2;
		};

		this.ctx.drawImage(
			this.resource,
			this.cutPos["bullet"][0]+this.dir*6,
			this.cutPos["bullet"][1],
			6,6,x+this.offsetX,y+this.offsetY,6,6);
	}
	clock()
	{
		
	}
}