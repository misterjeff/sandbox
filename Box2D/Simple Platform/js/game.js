// some variables that we gonna use in this demo
var initId = 0;
var player = function(){
    this.object = null;
    this.canJump = false;
};
var world;
var ctx;
var canvasWidth;
var canvasHeight;
var keys = [];
 
// HTML5 onLoad event
Event.observe(window, 'load', function() {
    world = createWorld(); // box2DWorld 
    ctx = $('game').getContext('2d'); // 2
    var canvasElm = $('game');
    canvasWidth = parseInt(canvasElm.width);
    canvasHeight = parseInt(canvasElm.height);
    initGame(); // 3
    step(); // 4
     
// 5
    window.addEventListener('keydown',handleKeyDown,true); 
    window.addEventListener('keyup',handleKeyUp,true);
});


function initGame(){
    // create 2 big platforms   
    createBox(world, 3, 400, 597, 10, true, 'ground');
	createBox(world, 300, 360, 140, 30, true, 'ground');
				//createBox(world, 560, 360, 50, 50, true, 'ground');
     
    // create small platforms
				// for (var i = 0; i < 5; i++){
					// createBox(world, 150+(80*i), 360, 5, 40+(i*15), true, 'ground');    
				// }
     
    // create player ball
    var ballSd = new b2CircleDef();
    ballSd.density = 0.1;
    ballSd.radius = 12;
    ballSd.restitution = 0.5;
    ballSd.friction = 1;
    ballSd.userData = 'player';
    var ballBd = new b2BodyDef();
    ballBd.linearDamping = .01;
    ballBd.allowSleep = false;
    ballBd.AddShape(ballSd);
    ballBd.position.Set(20,0);
    player.object = world.CreateBody(ballBd);
}

 
function createBox(world, x, y, width, height, fixed, userData) {
    if (typeof(fixed) == 'undefined') fixed = true;
    //1
var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 1.0;
    //2
    boxSd.userData = userData;
    //3
    boxSd.extents.Set(width, height);
 
    //4
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    //5
    boxBd.position.Set(x,y);
    //6
    return world.CreateBody(boxBd)
}


function step() {
     
    var stepping = false;
    var timeStep = 1.0/60;
    var iteration = 1;
    // 1
    world.Step(timeStep, iteration);
    // 2
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawWorld(world, ctx);
    // 3
    setTimeout('step()', 10);
	
	handleInteractions();
}


function handleKeyDown(evt){
    keys[evt.keyCode] = true;
}
 
 
function handleKeyUp(evt){
    keys[evt.keyCode] = false;
}
 
// disable vertical scrolling from arrows :)
document.onkeydown=function(){return event.keyCode!=38 && event.keyCode!=40}


function handleInteractions(){
	if (player.object.GetCenterPosition().y > canvasHeight){
		player.object.SetCenterPosition(new b2Vec2(20,0),0)
	}   
	else if (player.object.GetCenterPosition().x > canvasWidth-50){
		showWin();
		return; 
	}
    // up arrow
    // 1
    var collision = world.m_contactList;
    player.canJump = false;
    if (collision != null){
        if (collision.GetShape1().GetUserData() == 'player' || collision.GetShape2().GetUserData() == 'player'){
            if ((collision.GetShape1().GetUserData() == 'ground' || collision.GetShape2().GetUserData() == 'ground')){
                var playerObj = (collision.GetShape1().GetUserData() == 'player' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
                var groundObj = (collision.GetShape1().GetUserData() == 'ground' ? collision.GetShape1().GetPosition() :  collision.GetShape2().GetPosition());
                if (playerObj.y < groundObj.y){
                    player.canJump = true;
                }
            }
        }
    }
    // 2
    var vel = player.object.GetLinearVelocity();
    // 3
    if (keys[32] && player.canJump){
        vel.y = -150;   
    }
     
    // 4
    // left/right arrows
    if (keys[65]){
        vel.x = -60;
    }
    else if (keys[68]){
        vel.x = 60;
    }
     
    // 5
    player.object.SetLinearVelocity(vel);
}


function showWin(){
    ctx.fillStyle    = '#000';
    ctx.font         = '30px verdana';
    ctx.textBaseline = 'top';
    ctx.fillText('Congrats! You made it!', 30, 0);
}
