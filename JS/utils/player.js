class Player
{
	constructor()
	{
		this.gameCanvas = new GameCanvas();
		this.x = this.gameCanvas.getWidth()/2 - 45;
		this.y = this.gameCanvas.getHeight() - 20;
		this.width = 100;
		this.height = 20;
		this.color = "#fff";
		this.velX = 0;
		this.invulnerable = false;
		this.invulnerableColor = "#666";
	}
	
	update()
	{
		this.x += this.velX;
		if(this.x + this.width >= this.gameCanvas.getWidth())
			this.x = this.gameCanvas.getWidth() - this.width;
		else if(this.x <= 0)
			this.x = 0;
	}
	
	draw()
	{
		let color = this.color;
		if(this.invulnerable)
			color = this.invulnerableColor;
		this.gameCanvas.drawFillRect(this.x, this.y, this.x+this.width, this.y+this.height, color);
	}
	
}