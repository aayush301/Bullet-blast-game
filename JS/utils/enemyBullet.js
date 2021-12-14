class EnemyBullet
{
	constructor(x,y,color)
	{
		this.gameCanvas = new GameCanvas();
		this.x = x;
		this.y = y;
		this.velY = Math.floor(Math.random()*(6-4) + 4);
		this.color = color;
		this.width = 8;
		this.height = 25;
	}
	
	update()
	{
		this.y = this.y + this.velY;
	}
	
	draw()
	{
		this.gameCanvas.drawFillRect(this.x, this.y, this.x+this.width, this.y+this.height, this.color);
	}
	
}