function MainGame()
{
	const gameCanvas = new GameCanvas();
	const gameSound = new GameSound();
	const score = new Score();
	let keys = {ArrowLeft: false, ArrowRight: false, ArrowUp: false, Space: false}; 
	let player;
	let maxEnemies = 6;
	let enemies = [];
	let playerBullets = [];
	let playerBulletJustMade = false;
	let enemyJustMade = false;
	let enemyBullets = [];
	let animationId;
	
	this.init = function() {
		player = new Player();
		this.setInitialEnemies();
		this.addbtnPressedEvents();
		this.addKeyPressedEvents();
		this.gameLoop();
	}
	
	
	this.setInitialEnemies = function() {
		for(let i=0; i<5; i++)
		{
			let enemy = new Enemy();
			enemies.push(enemy);
		}
	}
	
	this.addbtnPressedEvents = function() {
		document.querySelector("#pause-resume").innerText = "Pause";
		document.querySelector("#pause-resume").addEventListener("click", pauseClick = ()=>{
			let btn = document.querySelector("#pause-resume");
			if(btn.innerText == "Pause")
			{
				this.pauseGame();
				btn.innerText = "Resume"
			}
			else
			{
				this.resumeGame();
				btn.innerText = "Pause";
			}
		});
		
	}
	
	this.addKeyPressedEvents = function() {
		window.addEventListener("keydown", keydown = (e)=>{
			keys[e.code] = true;
		});
		
		window.addEventListener("keyup", keyup = (e)=>{
			keys[e.code] = false;
		})
		
	}
	
	
	this.gameLoop = function() {
		animationId = window.requestAnimationFrame(this.gameLoop.bind(this));
		gameCanvas.clearCanvas();
		
		this.checkKeys();
		
		// update player
		player.update();
		player.draw();
		
		
		// update playerBullets
		for(let i=0; i<playerBullets.length; i++)
		{
			let bullet = playerBullets[i];
			bullet.update();
			bullet.draw();
			
			if(bullet.y + bullet.height < 0)
				playerBullets.splice(i,1);
		}
		
		
		// update enemies
		for(let i=0; i<enemies.length; i++)
		{
			let enemy = enemies[i];
			enemy.update();
			enemy.draw();
			if(animationId % enemy.shootingInterval == 0)
			{
				let bullet = new EnemyBullet(enemy.x+enemy.width/2, enemy.y+enemy.height, enemy.color);
				enemyBullets.push(bullet);
			}
		}
		
		
		// update enemyBullets
		for(let i=0; i<enemyBullets.length; i++)
		{
			let bullet = enemyBullets[i];
			bullet.update();
			bullet.draw();
			
			if(bullet.y  > gameCanvas.getHeight())
				enemyBullets.splice(i,1);
			
		}
		
		if(enemies.length < maxEnemies)
		{
			if(!enemyJustMade)
			{
				enemyJustMade = true;
				let enemy = new Enemy();
				enemies.push(enemy);
				window.setTimeout(()=>{
					enemyJustMade = false;
				}, 500)
			}
		}
		
		this.checkPlayerBulletEnemyCollision();
		this.checkEnemyBulletPlayerCollision();
		this.checkPlayerEnemyCollision();
		
		score.displayScore();
		score.displayLifeCount();
	}
	
	
	
	this.checkKeys = function() {
		
		if(keys.ArrowRight || keys.ArrowLeft)
		{
			if(keys.ArrowRight)
				player.velX = 8;
			else if(keys.ArrowLeft)
				player.velX = -8;
		}
		else
			player.velX = 0;
		
		
		
		if(keys.ArrowUp || keys.Space)
		{
			if(!playerBulletJustMade)
			{
				playerBulletJustMade = true;
				let x = player.x + player.width/2;
				let y = player.y - 20;
				let playerBullet = new PlayerBullet(x,y);
				playerBullets.push(playerBullet);
				
				setTimeout(()=>{
					playerBulletJustMade = false;
				}, 100);
				
				gameSound.play("bullet");
				
			}
		}
		
	}
	
	
	this.checkCollision = function(obA, obB) {
		if(obA.x + obA.width < obB.x)
			return false;
		if(obA.x > obB.x + obB.width)
			return false;
		if(obA.y + obA.height < obB.y)
			return false;
		if(obA.y > obB.y + obB.height)
			return false;
		return true;
	}
	
	this.checkPlayerBulletEnemyCollision = function() {
		for(let i=0; i<playerBullets.length; i++)
		{
			for(let j=0; j<enemies.length; j++)
			{
				let playerBullet = playerBullets[i];
				let enemy = enemies[j];
				if(this.checkCollision(playerBullet, enemy))
				{
					playerBullets.splice(i,1);
					enemies.splice(j,1);
					
					score.score++;
				}
			}
		}
		
		
	}
	
	this.checkEnemyBulletPlayerCollision = function() {
		if(player.invulnerable == true)
			return;
		
		for(let i=0; i<enemyBullets.length; i++)
		{
			let enemyBullet = enemyBullets[i];
			if(this.checkCollision(enemyBullet, player))
			{
				enemyBullets.splice(i,1);
				if(score.lifeCount == 0)
				{
					this.pauseGame();
					window.setTimeout(this.gameOver.bind(this), 1000)
				}
				else
				{
					score.lifeCount--;
					player.invulnerable = true;
					window.setTimeout(()=>{
						player.invulnerable = false;
					}, 4000);
				}
				gameSound.play("powerDown");
			}
		}
	}
	
	this.checkPlayerEnemyCollision = function() {
		for(let i=0; i<enemies.length; i++)
		{
			let enemy = enemies[i];
			if(this.checkCollision(player, enemy))
			{
				this.pauseGame();
				window.setTimeout(this.gameOver.bind(this), 1000)
			}
		}
	}
	
	
	this.pauseGame = function() {
		window.cancelAnimationFrame(animationId);
	}
	
	this.resumeGame = function() {
		this.gameLoop();
	}
	
	this.gameOver = function() {
		gameSound.play("gameOver");
		this.clearInstances();
		document.querySelector("#game-wrapper").classList.add("hide");
		
		let resultBox = document.querySelector("#result-box");
		resultBox.classList.remove("hide");
		resultBox.querySelector("#score").innerHTML = `Your score is ${score.score}`;
		resultBox.animate(
			[{transform: "scale(0.5)"}, {transform: "scale(1)"}],
			{duration: 400, iterations:1}
		);
		
	}
	
	this.clearInstances = function() {
		window.removeEventListener("keydown", keydown)
		window.removeEventListener("keyup", keyup)
		document.querySelector("#pause-resume").removeEventListener("click", pauseClick);
		
		player = null;
		enemies = [];
		playerBullets = [];
		enemyBullets = [];
	}
	
}