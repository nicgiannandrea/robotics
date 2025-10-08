function PlayScreen () {
	PIXI.Container.call(this);

	this.setupUi();
}

PlayScreen.prototype = Object.create(PIXI.Container.prototype);

PlayScreen.prototype.constructor = PlayScreen;




PlayScreen.prototype.setupUi = function(){


	/*var bg = new PIXI.Graphics();
	bg.beginFill(0xffffff);
	bg.lineStyle(4, 0x83009f);
	bg.drawRect(0,0,520,390);

	bg.lineStyle(2,0x83009f);
	bg.moveTo(76,0);
	bg.lineTo(76,44);

	bg.moveTo(0,44);
	bg.lineTo(154,44);

	this.addChild(bg);*/


	var bg = new PIXI.Sprite(currR.bg.texture);
	this.addChild(bg);
	bg.x = -1;
	bg.y = -1;


	var tank = new PIXI.Sprite(currR.tank.texture);
	tank.name = "tank";
	//tank.anchor.set(0.5);
	tank.pivot.x = 16;
	tank.pivot.y = 42;
	this.tank = tank;
	this.addChild(tank);
	tank.x = 336;
	tank.y = 200;
	tank.rotation = -1.57;

	/*var tankRect = new PIXI.Graphics();
	tankRect.beginFill(0xFF3300, 0.5);
	tankRect.drawRect(0, 0, 100, 100);
	this.addChild(tankRect);
	this.tankRect = tankRect;*/


	var leftBar = new PIXI.Graphics();
	leftBar.x = 154;
	leftBar.beginFill(0xFF3300, 0);
	leftBar.drawRect(0, 0, 4, 390);
	this.addChild(leftBar);
	this.leftBar = leftBar;

	var topBar = new PIXI.Graphics();
	topBar.x = 154;
	topBar.beginFill(0xFF3300, 0);
	topBar.drawRect(0, 0, 366, 4);
	this.addChild(topBar);
	this.topBar = topBar;

	var rightBar = new PIXI.Graphics();
	rightBar.x = 516;
	rightBar.beginFill(0xFF3300, 0);
	rightBar.drawRect(0, 0, 4, 390);
	this.addChild(rightBar);
	this.rightBar = rightBar;

	var bottomBar = new PIXI.Graphics();
	bottomBar.x = 154;
	bottomBar.y = 386;
	bottomBar.beginFill(0xFF3300, 0);
	bottomBar.drawRect(0, 0, 366, 4);
	this.addChild(bottomBar);
	this.bottomBar = bottomBar;


	var button1 = new PIXI.Graphics();
	button1.x = 14;
	button1.y = 64;
	button1.beginFill(0xFF3300, 0);
	button1.drawRect(0,0,130,46)
   	this.addChild(button1);
	button1.interactive = true;
	button1.on('pointerdown', this.onButton1Click, this);
	button1.on('pointerup', this.onButton1Up, this);

	var button2 = new PIXI.Graphics();
	button2.x = 14;
	button2.y = 152;
	button2.beginFill(0xFF3300, 0);
	button2.drawRect(0,0,130,46)
   	this.addChild(button2);
	button2.interactive = true;
	button2.on('pointerdown', this.onButton2Click, this);
	button2.on('pointerup', this.onButton1Up, this);

	var button3 = new PIXI.Graphics();
	button3.x = 14;
	button3.y = 238;
	button3.beginFill(0xFF3300, 0);
	button3.drawRect(0,0,130,46)
   	this.addChild(button3);
	button3.interactive = true;
	button3.on('pointerdown', this.onButton3Click, this);
	button3.on('pointerup', this.onButton1Up, this);

	var button4 = new PIXI.Graphics();
	button4.x = 14;
	button4.y = 324;
	button4.beginFill(0xFF3300, 0);
	button4.drawRect(0,0,130,46)
   	this.addChild(button4);
	button4.interactive = true;
	button4.on('pointerdown', this.onButton4Click, this);
	button4.on('pointerup', this.onButton1Up, this);


	app.ticker.add(this.tick, this);
};


var currPress = 0;
var auto = false;


PlayScreen.prototype.onButton1Up = function(e){
	currPress=0;
	
}

function move(object, distance) {
	object.x = object.x + distance * Math.cos(object.rotation);
	object.y = object.y + distance * Math.sin(object.rotation);
}

PlayScreen.prototype.onButton1Click = function(e){
	currPress=1;
	
}

PlayScreen.prototype.onButton2Click = function(e){
	currPress=2;
	
}

PlayScreen.prototype.onButton3Click = function(e){
	currPress=3;
}

PlayScreen.prototype.onButton4Click = function(e){
	currPress=4;
}

PlayScreen.prototype.tick = function (delta)
{
	if(currPress>0)
	{
		if(currPress==1)
		{
			move(this.tank, 2)
		}
		else if(currPress==2)
		{
			move(this.tank, -2)
		}
		else if(currPress==3)
		{
			this.tank.rotation -= 0.02;
		}
		else if(currPress==4)
		{
			this.tank.rotation += 0.02;

			
		}

		/*var obj1 = this.tank.getBounds();
		this.tankRect.x = obj1.x;
		this.tankRect.y = obj1.y;
		this.tankRect.width = obj1.width;
		this.tankRect.height = obj1.height;*/

		if(intersect(this.tank, this.leftBar) || intersect(this.tank, this.topBar) || intersect(this.tank, this.rightBar) || intersect(this.tank, this.bottomBar))
		{
			if(currPress == 1)
			{
				currPress = 2;
			}
			else if(currPress == 2)
			{
				currPress = 1;
			}
			else if(currPress == 3)
			{
				currPress = 4;
			}
			else if(currPress == 4)
			{
				currPress = 3;
			}
			auto = true;
		}
		else if(auto)
		{
			auto = false;
			currPress = 0;
		}
	}
}

function intersect(obj1, obj2) {
	var objBounds1 = obj1.getBounds().clone();
	var objBounds2 = obj2.getBounds().clone();

		
	var r1 = {left:objBounds1.x, right:objBounds1.x+objBounds1.width, top:objBounds1.y, bottom:objBounds1.y+objBounds1.height};
	var r2 = {left:objBounds2.x, right:objBounds2.x+objBounds2.width, top:objBounds2.y, bottom:objBounds2.y+objBounds2.height};

	return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

