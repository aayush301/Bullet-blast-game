class GameSound
{
	constructor()
	{
		this.bullet = new Audio("sounds/laser-gun.wav")
		this.powerDown = new Audio("sounds/power-down.mp3")
		this.gameOver = new Audio("sounds/game-over.wav")
	}
	
	play(type)
	{
		if(type == "bullet")
		{
			this.bullet.pause();
			this.bullet.currentTime = 0;
			this.bullet.play();
		}
		else if(type == "powerDown")
		{
			this.powerDown.pause();
			this.powerDown.currentTime = 0;
			this.powerDown.play();
		}
		else if(type == "gameOver")
		{
			this.gameOver.pause();
			this.gameOver.currentTime = 0;
			this.gameOver.play();
		}
	}
}
