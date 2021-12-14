class PlayerBullet
{
	constructor(x,y)
	{
		this.gameCanvas = new GameCanvas();
		this.x = x;
		this.y = y;
		this.velY = -5;
		this.color = "white";
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