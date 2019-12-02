/*
 *场景类
*/

class Stage
{
	constructor(ctx,resource,sw,sh,cutPos,level)
	{
		this.ctx = ctx;
		this.resource = resource;
		this.sw = sw;
		this.sh = sh;
		this.cutPos = cutPos;
		this.level = JSON.parse(JSON.stringify(level));
		this.offsetX = 32;
		this.offsetY = 16;
	}
	//设置关卡
	setLevel(level)
	{
		this.level = level;
	}
	update_map(changeIndexs)//局部刷新会提升效率
	{
		for(var k=0;k<changeIndexs.length;++k)
		{
			var j = changeIndexs[k][1];
			var i = changeIndexs[k][0];
			
			this.ctx[0].fillRect(this.offsetX+j*8,this.offsetY+i*8,8,8);
			if(this.level[i][j].type == HOME_D)
			{
				this.ctx[0].drawImage(
					this.resource,
					this.cutPos["home"][0]+this.level[i][j].x*8+32,
					this.cutPos["home"][1]+this.level[i][j].y*8,
					8,8,
					this.offsetX+j*8,
					this.offsetY+i*8,8,8);
				continue;
			}
			if(this.level[i][j].type == WALL)
			{
				this.ctx[0].drawImage(
					this.resource,
					this.cutPos["map"][0]+this.level[i][j].x*8,
					this.cutPos["map"][1]+this.level[i][j].y*8,
					8,8,
					this.offsetX+j*8,
					this.offsetY+i*8,8,8);
				continue;
			}
			if(this.level[i][j].type == GRID)
			{
				this.ctx[0].drawImage(
					this.resource,
					this.cutPos["map"][0]+this.level[i][j].x*8+16,
					this.cutPos["map"][1]+this.level[i][j].y*8,
					8,8,
					this.offsetX+j*8,
					this.offsetY+i*8,8,8);
				continue;
			}
			
		}
	}
	init_map()
	{
		this.ctx[0].clearRect(0,0,this.sw,this.sh);
		this.ctx[0].fillStyle = "#7f7f7f";
		this.ctx[0].fillRect(0,0,this.sw,this.sh);
		this.ctx[0].fillStyle = "#000";
		this.ctx[0].fillRect(this.offsetX,this.offsetY,416,416);
		this.ctx[1].clearRect(0,0,this.sw,this.sh);
		for(var i=0;i<this.level.length;++i)
		{
			for(var j=0;j<this.level[i].length;++j)
			{
				if(this.level[i][j].type == 0)continue;
				var ctx = this.ctx[0];
				var ox = 0,oy = 0;
				var cutpos = this.cutPos["map"];


				if(this.level[i][j].type == HOME)
				{
					ox = 0;
					oy = 0;
					cutpos = this.cutPos["home"];
					
					ctx.drawImage(
					this.resource,
					cutpos[0]+this.level[i][j].x*8+16*ox,
					cutpos[1]+this.level[i][j].y*8+16*oy,
					8,8,
					this.offsetX+j*8,
					this.offsetY+i*8,8,8);
					continue;
				}
				if(this.level[i][j].type == WALL)
				{
					ox = 0;
					oy = 0;
				}
				else if(this.level[i][j].type == GRID)
				{
					ox = 1;
					oy = 0;
				}
				else if(this.level[i][j].type == GRASS)
				{
					ctx = this.ctx[1];
					ox = 2;
					oy = 0;
				}
				else if(this.level[i][j].type == WATER)
				{
					ox = 3;
					oy = 0;
				}
				else if(this.level[i][j].type == ICE)
				{
					ox = 4;
					oy = 0;
				}
				
				ctx.drawImage(
					this.resource,
					cutpos[0]+this.level[i][j].x*8+16*ox,
					cutpos[1]+this.level[i][j].y*8+16*oy,
					8,8,
					this.offsetX+j*8,
					this.offsetY+i*8,8,8);
			}
		}
	}
}