class Score
{
	constructor()
	{
		this.gameCanvas = new GameCanvas();
		this.score = 0;
		this.lifeCount = 5;
	}
	
	
	displayScore()
	{
		const text = `Score: ${this.score}`;
		this.gameCanvas.writeText(text,5,30);
	}
	
	displayLifeCount()
	{
		const text = `Lives: ${this.lifeCount}`;
		this.gameCanvas.writeText(text,5,60);
	}
	
}