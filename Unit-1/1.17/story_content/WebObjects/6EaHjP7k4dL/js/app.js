initApp();

var winWidth, winHeight;


var app, currR, playBg, gameView, ps;

function initApp()
{
	winWidth = 520;
	winHeight = 390;
	
	
	app = new PIXI.Application({width:winWidth, height:winHeight, forceCanvas:true, backgroundColor:0xffffff});
	document.getElementById("gamePlay").appendChild(app.view);

	gameView = new PIXI.Container();
	app.stage.addChild(gameView);;

	loadAssets();
}

function loadAssets()
{
	var ldr = PIXI.loader;

	ldr.add("bg","assets/bg.jpg");
	ldr.add("tank","assets/tank.png");
	ldr.add("button1","assets/button1.png");


	ldr.load(onAssetsLoaded);
}

function onAssetsLoaded(loader, resources)
{
	currR = resources;

	showPlayScreen();
}

function showPlayScreen()
{
	if(!ps)
	{
		ps = new PlayScreen();
	}
	gameView.addChild(ps);
}