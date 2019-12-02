/*
 *������ײ
*/

class Collision
{
	constructor()
	{
		
	}
	//�ж��Ƿ��ص�
	isCross(rc1,rc2)
	{
		return rc1.x + rc1.w  > rc2.x &&
			rc2.x + rc2.w  > rc1.x &&
			rc1.y + rc1.h > rc2.y &&
			rc2.y + rc2.h > rc1.y;
	}
	/*
	 *���̹���Ƿ���ײ
	 *tank�ò�������ǰ̹��
	*/
	tanIsHit(tank,level,tanks)
	{
		//����Ƿ�������̹����ײ
		for(var i=0;i<tanks.length;++i)
		{
			if(tank === tanks[i])continue;
			
			var rect_a = {};
			var rect_b = {};
			rect_a.x = tanks[i].x;
			rect_a.y = tanks[i].y;
			rect_a.w = 32;
			rect_a.h = 32;

			if(tank.dir == UP)
			{
				rect_b.x = tank.x;
				rect_b.y = tank.y - tank.speed;
				rect_b.w = 32;
				rect_b.h = 1;
			}
			else if(tank.dir == DOWN)
			{
				rect_b.x = tank.x;
				rect_b.y = tank.y + 32;
				rect_b.w = 32;
				rect_b.h = 1;
			}
			else if(tank.dir == LEFT)
			{
				rect_b.x = tank.x - tank.speed;
				rect_b.y = tank.y;
				rect_b.w = 1;
				rect_b.h = 32;
			}
			else if(tank.dir == RIGHT)
			{
				rect_b.x = tank.x + 32;
				rect_b.y = tank.y;
				rect_b.w = 1;
				rect_b.h = 32;
			}

			if(this.isCross(rect_a,rect_b))
			{
				return true;
			}
		}
		//����Ƿ����ͼ��ײ
		if(tank.x%16!=0||tank.y%16!=0)return false;

		if(tank.dir == UP)
		{
			if(tank.y==0)return true;
			var i = tank.y/8;
			var j = tank.x/8;
			for(var k=1;k<=2;++k)
			{
				for(var t=0;t<4;++t)
				{
					if(level[i-k][j+t].type == WALL
						||level[i-k][j+t].type == GRID
						||level[i-k][j+t].type == WATER
						||level[i-k][j+t].type == HOME)
					{
						return true;
					}
				}
			}
		}
		else if(tank.dir == DOWN)
		{
			if(tank.y==ROWS*8-32)return true;
			var i = (tank.y+24)/8;
			var j = tank.x/8;
			for(var k=1;k<=2;++k)
			{
				for(var t=0;t<4;++t)
				{
					if(level[i+k][j+t].type == WALL
						||level[i+k][j+t].type == GRID
						||level[i+k][j+t].type == WATER
						||level[i+k][j+t].type == HOME)
					{
						return true;
					}
				}
			}
		}
		else if(tank.dir == LEFT)
		{
			if(tank.x==0)return true;
			var i = tank.y/8;
			var j = tank.x/8;
			for(var k=1;k<=2;++k)
			{
				for(var t=0;t<4;++t)
				{
					if(level[i+t][j-k].type == WALL
						||level[i+t][j-k].type == GRID
						||level[i+t][j-k].type == WATER
						||level[i+t][j-k].type == HOME)
					{
						return true;
					}
				}
			}
		}
		else if(tank.dir == RIGHT)
		{
			if(tank.x==COLS*8-32)return true;
			var i = tank.y/8;
			var j = (tank.x+24)/8;
			for(var k=1;k<=2;++k)
			{
				for(var t=0;t<4;++t)
				{
					if(level[i+t][j+k].type == WALL
						||level[i+t][j+k].type == GRID
						||level[i+t][j+k].type == WATER
						||level[i+t][j+k].type == HOME)
					{
						return true;
					}
				}
			}
		}
		return false;
	}
	/*
	 *����ӵ���ײ
	*/
	getHitResult(bullet,bullets,level,tanks)
	{
		var rows = level.length;
		var cols = level[0].length;

		var data = {};
		//�����ٵĵĵ�ͼԪ����������
		data.destroyElementIndexArray = [];
		//��ǰ�ӵ��Ƿ��ѷ�����ײ
		data.isHit = false;
		//����ͳ��,�����������Ч
		data.score = 0;
		//��Ǽ��Ƿ񱻻���
		data.homeIsDestroy = false;
		//����Ƿ���к�ɫ̹��
		data.theRedTankHasHit = false;
		//����Ƿ��з�������ײ����Ŀ��δ������
		data.hit_and_had_undestroy = false;
		//��ǻ��е�̹���Ƿ�δ������
		data.enemy_hit_and_undestroy = false;
		//����Ƿ���̹�˱�����
		data.enemy_has_destroy = false;
		/*
		 *����Ƿ��������ӵ����Ͳ�ͬ
		 *�����ͬ�����Ƿ�����ײ
		*/
		
		for(var i=0;i<bullets.length;++i)
		{
			//����ӵ����ѷ��ģ���������ѭ��
			if((bullet.type == BULLET_TYPE_PLAYER1&&bullets[i].type == BULLET_TYPE_PLAYER2)
				||(bullet.type == BULLET_TYPE_PLAYER2&&bullets[i].type == BULLET_TYPE_PLAYER1)
				||(bullet.type == BULLET_TYPE_ENEMY&&bullets[i].type == BULLET_TYPE_ENEMY))continue;
			//ֻ���෴������ӵ�������ײ����Ŀ���ӵ�δ������,������������ѭ��
			if((bullet.dir+bullets[i].dir != UP+DOWN
				&&bullet.dir+bullets[i].dir != LEFT+RIGHT)
				||bullets[i].isDestroy)continue;
			
			if(bullet.dir == UP&&bullets[i].dir == DOWN)
			{
				if(bullet.y-bullet.speed<=bullets[i].y&&bullet.x==bullets[i].x)
				{
					bullet.isDestroy = true;
					bullets[i].isDestroy = true;
					bullet.isCreateCrack = false;
					bullets[i].isCreateCrack = false;
					data.isHit = true;
					return data
				}
			}
			else if(bullet.dir == DOWN&&bullets[i].dir == UP)
			{
				if(bullet.y+bullet.speed>=bullets[i].y&&bullet.x==bullets[i].x)
				{
					bullet.isDestroy = true;
					bullets[i].isDestroy = true;
					bullet.isCreateCrack = false;
					bullets[i].isCreateCrack = false;
					data.isHit = true;
					return data;
				}
			}
			else if(bullet.dir == LEFT&&bullets[i].dir == RIGHT)
			{
				if(bullet.x-bullet.speed<=bullets[i].x&&bullet.y==bullets[i].y)
				{
					bullet.isDestroy = true;
					bullets[i].isDestroy = true;
					bullet.isCreateCrack = false;
					bullets[i].isCreateCrack = false;
					data.isHit = true;
					return data;
				}
			}
			else if(bullet.dir == RIGHT&&bullets[i].dir == LEFT)
			{
				if(bullet.x+bullet.speed>=bullets[i].x&&bullet.y==bullets[i].y)
				{
					bullet.isDestroy = true;
					bullets[i].isDestroy = true;
					bullet.isCreateCrack = false;
					bullets[i].isCreateCrack = false;
					data.isHit = true;
					return data;
				}
			}
		}
		
		//����ǶԷ�̹�˷�����ײ
		for(var i=0;i<tanks.length;++i)
		{
			//���Ŀ�����ѷ�����������ѭ��
			if((bullet.type == BULLET_TYPE_PLAYER1&&(tanks[i].type == PLAYER_2||tanks[i].type == PLAYER_1))
				||(bullet.type == BULLET_TYPE_PLAYER2&&(tanks[i].type == PLAYER_2||tanks[i].type == PLAYER_1))
				||(bullet.type == BULLET_TYPE_ENEMY&&tanks[i].type != PLAYER_1&&tanks[i].type != PLAYER_2))continue;

			var rect_a = {};
			var rect_b = {};
			rect_a.x = tanks[i].x;
			rect_a.y = tanks[i].y;
			rect_a.w = 32;
			rect_a.h = 32;
			

			rect_b.x = bullet.x;
			rect_b.y = bullet.y;
			rect_b.w = 1;
			rect_b.h = 1;
			
			if(bullet.dir == UP)
			{
				rect_b.x = bullet.x-2;
				rect_b.y = bullet.y-3;
				rect_b.w = 4;
				rect_b.h = 6;
			}
			else if(bullet.dir == DOWN)
			{
				rect_b.x = bullet.x-2;
				rect_b.y = bullet.y-3;
				rect_b.w = 4;
				rect_b.h = 6;
			}
			else if(bullet.dir == LEFT)
			{
				rect_b.x = bullet.x-3;
				rect_b.y = bullet.y-2;
				rect_b.w = 6;
				rect_b.h = 4;
			}
			else if(bullet.dir == RIGHT)
			{
				rect_b.x = bullet.x-3;
				rect_b.y = bullet.y-2;
				rect_b.w = 6;
				rect_b.h = 4;
			}
			
			//����true˵��������ײ
			if(this.isCross(rect_a,rect_b))
			{
				
				data.isHit = true;
				bullet.isDestroy = true;
				//����ӵ���AI̹�˵ģ����ҵ�ǰ̹�������̹�˲������޵�״̬�������ӵ�����������ѭ��
				if((bullet.type == BULLET_TYPE_ENEMY&&(tanks[i].type == PLAYER_1||tanks[i].type == PLAYER_2)&&tanks[i].immuneDuration>0))continue;

				
				tanks[i].life --;
				if(tanks[i].isRed)
				{
					data.theRedTankHasHit = true;
					tanks[i].isRed = false;
				}
				if(tanks[i].life == 0)
				{
					//�����AI̹�˱����٣��Ϳ�ʼ�Ʒ�
					if(tanks[i].type != PLAYER_1&&tanks[i].type != PLAYER_2)
					{
						data.score += tanks[i].score;
					}
					tanks[i].isDestroy = true;
					data.enemy_has_destroy = true;
				}
				else
				{
					bullet.isCreateCrack = false;
					data.enemy_hit_and_undestroy = bullet.type != BULLET_TYPE_ENEMY;
				}
			}
		}

		//����ӵ��Ƿ����ͼ��ײ
		if(bullet.x%8!=0||bullet.y%8!=0)return data;
		if(bullet.dir == UP)
		{
			//����̨�ϱ�Ե������ײ
			if(bullet.y==0)
			{
				bullet.isDestroy = true;
				data.isHit = true;
				data.hit_and_had_undestroy = bullet.type != BULLET_TYPE_ENEMY;
			}
			var i = bullet.y/8;
			var j = (bullet.x - 16)/8;

			
			var flag = false;
			var onece_find_grid = false;
			var twoce_find_grid = false;
			for(var k=0;k<4;k++)
			{
				//����Ƿ�����ײ
				if(level[i][j+k].type == WALL||level[i][j+k].type == GRID)
				{
					data.isHit = true;
					bullet.isDestroy = true;
					flag = true;
				}
				if(level[i][j+k].type == WALL)
				{
					level[i][j+k].type = 0;
					data.destroyElementIndexArray.push([i,j+k]);
				}
				if(level[i][j+k].type == GRID&&bullet.power>=2)
				{
					level[i][j+k].type = 0;
					data.destroyElementIndexArray.push([i,j+k]);
					onece_find_grid = true;
				}
				if(level[i][j+k].type == GRID&&bullet.power<2)
				{
					data.hit_and_had_undestroy = bullet.type != BULLET_TYPE_ENEMY;
				}
			}

			if(flag&&i-1>=0&&bullet.power >= 2)
			{
				for(var k=0;k<4;k++)
				{
					if(level[i-1][j+k].type == WALL)
					{
						level[i-1][j+k].type = 0;
						data.destroyElementIndexArray.push([i-1,j+k]);
					}
					if(level[i-1][j+k].type == GRID&&bullet.power>=2)
					{
						level[i-1][j+k].type = 0;
						data.destroyElementIndexArray.push([i-1,j+k]);
						twoce_find_grid = true;
					}
				}
			}
			if(flag&&i-2>=0&&bullet.power >= 2&&!onece_find_grid&&twoce_find_grid)
			{
				for(var k=0;k<4;k++)
				{
					if(level[i-2][j+k].type == WALL||(level[i-2][j+k].type == GRID&&bullet.power>=2))
					{
						level[i-2][j+k].type = 0;
						data.destroyElementIndexArray.push([i-2,j+k]);
					}
				}
			}
		}
		else if(bullet.dir == DOWN)
		{
			//����̨�±�Ե������ײ
			if(bullet.y==ROWS*8)
			{
				bullet.isDestroy = true;
				data.isHit = true;
				data.hit_and_had_undestroy = bullet.type != BULLET_TYPE_ENEMY;
			}
			var i = (bullet.y-8)/8;
			var j = (bullet.x - 16)/8;

			var flag = false;
			var onece_find_grid = false;
			var twoce_find_grid = false;

			for(var k=0;k<4;k++)
			{
				//����Ƿ�����ײ
				if(level[i][j+k].type == HOME)
				{
					data.homeIsDestroy = true;
					data.isHit = true;
					bullet.isDestroy = true;
					flag = true;
					continue;
				}
				if(level[i][j+k].type == WALL||level[i][j+k].type == GRID)
				{
					data.isHit = true;
					bullet.isDestroy = true;
					flag = true;
				}
				if(level[i][j+k].type == WALL)
				{
					level[i][j+k].type = 0;
					data.destroyElementIndexArray.push([i,j+k]);
				}
				if(level[i][j+k].type == GRID&&bullet.power>=2)
				{
					level[i][j+k].type = 0;
					data.destroyElementIndexArray.push([i,j+k]);
					onece_find_grid = true;
				}
				if(level[i][j+k].type == GRID&&bullet.power<2)
				{
					data.hit_and_had_undestroy = bullet.type != BULLET_TYPE_ENEMY;
				}
			}

			if(flag&&i+1<rows&&bullet.power >= 2)
			{
				for(var k=0;k<4;k++)
				{
					if(level[i+1][j+k].type == HOME)
					{
						data.homeIsDestroy = true;
						continue;
					}
					if(level[i+1][j+k].type == WALL)
					{
						level[i+1][j+k].type = 0;
						data.destroyElementIndexArray.push([i+1,j+k]);
					}
					if(level[i+1][j+k].type == GRID&&bullet.power>=2)
					{
						level[i+1][j+k].type = 0;
						data.destroyElementIndexArray.push([i+1,j+k]);
						twoce_find_grid = true;
					}
				}
			}

			if(flag&&i+2<rows&&bullet.power >= 2&&!onece_find_grid&&twoce_find_grid)
			{
				for(var k=0;k<4;k++)
				{
					if(level[i+2][j+k].type == HOME)
					{
						data.homeIsDestroy = true;
						continue;
					}
					if(level[i+2][j+k].type == WALL||(level[i+2][j+k].type == GRID&&bullet.power>=2))
					{
						level[i+2][j+k].type = 0;
						data.destroyElementIndexArray.push([i+2,j+k]);
					}
				}
			}
		}
		else if(bullet.dir == LEFT)
		{
			if(bullet.x==0)
			{
				bullet.isDestroy = true;
				data.isHit = true;
				data.hit_and_had_undestroy = bullet.type != BULLET_TYPE_ENEMY;
			}
			var i = (bullet.y - 16)/8;
			var j = bullet.x/8;





			var flag = false;
			var onece_find_grid = false;
			var twoce_find_grid = false;
			for(var k=0;k<4;k++)
			{
				//����Ƿ�����ײ
				if(level[i+k][j].type == HOME)
				{
					data.homeIsDestroy = true;
					data.isHit = true;
					bullet.isDestroy = true;
					flag = true;
					continue;
				}
				if(level[i+k][j].type == WALL||level[i+k][j].type == GRID)
				{
					data.isHit = true;
					bullet.isDestroy = true;
					flag = true;
				}
				if(level[i+k][j].type == WALL)
				{
					level[i+k][j].type = 0;
					data.destroyElementIndexArray.push([i+k,j]);
				}
				if(level[i+k][j].type == GRID&&bullet.power>=2)
				{
					level[i+k][j].type = 0;
					data.destroyElementIndexArray.push([i+k,j]);
					onece_find_grid = true;
				}
				if(level[i+k][j].type == GRID&&bullet.power<2)
				{
					data.hit_and_had_undestroy = bullet.type != BULLET_TYPE_ENEMY;
				}
			}

			if(flag&&j-1>=0&&bullet.power >= 2)
			{
				for(var k=0;k<4;k++)
				{
					if(level[i+k][j-1].type == HOME)
					{
						data.homeIsDestroy = true;
						continue;
					}
					if(level[i+k][j-1].type == WALL)
					{
						level[i+k][j-1].type = 0;
						data.destroyElementIndexArray.push([i+k,j-1]);
					}
					if(level[i+k][j-1].type == GRID&&bullet.power>=2)
					{
						level[i+k][j-1].type = 0;
						data.destroyElementIndexArray.push([i+k,j-1]);
						twoce_find_grid = true;
					}
				}
			}
			if(flag&&j-2>=0&&bullet.power >= 2&&!onece_find_grid&&twoce_find_grid)
			{
				for(var k=0;k<4;k++)
				{
					if(level[i+k][j-2].type == HOME)
					{
						data.homeIsDestroy = true;
						continue;
					}
					if(level[i+k][j-2].type == WALL||(level[i+k][j-2].type == GRID&&bullet.power>=2))
					{
						level[i+k][j-2].type = 0;
						data.destroyElementIndexArray.push([i+k,j-2]);
					}
				}
			}
		}
		else if(bullet.dir == RIGHT)
		{
			if(bullet.x==COLS*8)
			{
				bullet.isDestroy = true;
				data.isHit = true;
				data.hit_and_had_undestroy = bullet.type != BULLET_TYPE_ENEMY;
			};
			var i = (bullet.y - 16)/8;
			var j = (bullet.x-8)/8;

			var flag = false;
			var onece_find_grid = false;
			var twoce_find_grid = false;
			for(var k=0;k<4;k++)
			{
				//����Ƿ�����ײ
				if(level[i+k][j].type == HOME)
				{
					data.homeIsDestroy = true;
					data.isHit = true;
					bullet.isDestroy = true;
					flag = true;
					continue;
				}
				if(level[i+k][j].type == WALL||level[i+k][j].type == GRID)
				{
					data.isHit = true;
					bullet.isDestroy = true;
					flag = true;
				}
				if(level[i+k][j].type == WALL)
				{
					level[i+k][j].type = 0;
					data.destroyElementIndexArray.push([i+k,j]);
				}
				if(level[i+k][j].type == GRID&&bullet.power>=2)
				{
					level[i+k][j].type = 0;
					data.destroyElementIndexArray.push([i+k,j]);
					onece_find_grid = true;
				}
				if(level[i+k][j].type == GRID&&bullet.power<2)
				{
					data.hit_and_had_undestroy = bullet.type != BULLET_TYPE_ENEMY;
				}
			}

			if(flag&&j+1<cols&&bullet.power >= 2)
			{
				for(var k=0;k<4;k++)
				{
					if(level[i+k][j+1].type == HOME)
					{
						data.homeIsDestroy = true;
						continue;
					}
					if(level[i+k][j+1].type == WALL)
					{
						level[i+k][j+1].type = 0;
						data.destroyElementIndexArray.push([i+k,j+1]);
					}
					if(level[i+k][j+1].type == GRID&&bullet.power>=2)
					{
						level[i+k][j+1].type = 0;
						data.destroyElementIndexArray.push([i+k,j+1]);
						twoce_find_grid = true;
					}
				}
			}

			if(flag&&j+2<cols&&bullet.power >= 2&&!onece_find_grid&&twoce_find_grid)
			{
				for(var k=0;k<4;k++)
				{
					if(level[i+k][j+2].type == HOME)
					{
						data.homeIsDestroy = true;
						continue;
					}
					if(level[i+k][j+2].type == WALL||(level[i+k][j+2].type == GRID&&bullet.power>=2))
					{
						level[i+k][j+2].type = 0;
						data.destroyElementIndexArray.push([i+k,j+2]);
					}
				}
			}
		}

		if(data.homeIsDestroy)
		{
			var home_x = 24;
			var home_y = 48;
			for(var i=0;i<4;++i)
			{
				for(var j=0;j<4;++j)
				{
					level[i+home_y][j+home_x].type = HOME_D;
					data.destroyElementIndexArray.push([i+home_y,j+home_x]);
				}
			}
		}
		
		return data;
	}

	propHit(player,prop)
	{
		var rect_a = {};
		var rect_b = {};
		rect_a.x = prop.x;
		rect_a.y = prop.y;
		rect_a.w = 30;
		rect_a.h = 32;

		rect_b.x = player.x;
		rect_b.y = player.y;
		rect_b.w = 32;
		rect_b.h = 32;

		if(this.isCross(rect_a,rect_b))
		{
			return true;
		}
	}
}