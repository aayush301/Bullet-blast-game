class Enemy
{
	constructor()
	{
		this.gameCanvas = new GameCanvas();
		this.x = this.random(0, this.gameCanvas.getWidth()-100);
		this.y = this.random(0,60);
		this.width = 100;
		this.height = 20;
		this.color = "hsl("+ this.random(0, 360) +", 80%, 50%)";
		this.velX = this.random(2,5);
		this.velY = 0.2;
		this.shootingInterval = this.random(30, 80);	// After every shooting interval, enemy will shoot
	}
	
	update()
	{
		this.x += this.velX;
		this.y += this.velY;
		if(this.x + this.width >= this.gameCanvas.getWidth() || this.x <= 0)
		{
			this.velX = -this.velX;
		}
	}
	
	draw()
	{
		this.gameCanvas.drawFillRect(this.x, this.y, this.x+this.width, this.y+this.height, this.color);
	}
	
	random(min, max)
	{
		return Math.floor(Math.random() * (max - min) + min);
	}
	
	
}