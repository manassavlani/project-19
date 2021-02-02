var trex,trex_running,trex_collided;
var ground,invisibleGround,groundImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacles6;
var obstacle,obstacleGroup;
var cloud,cloudGroup;
var gameOver,gameOverImage;
var restart,restartImage;
var play = 1,end = 0;
var gameState = play;
function preload() {
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  cloudImage=loadImage("cloud.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  trex_collided=loadAnimation("trex_collided.png")
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale=0.5;
  ground = createSprite(300,180,600,20);
  ground.x=ground.width/2;
  ground.addImage(groundImage);
   
  ground.velocityX=-2;
  invisibleGround = createSprite(300,190,600,20);
  invisibleGround.visible=false;
  
  gameOver = createSprite(300,100,20,20);
  gameOver.visible = false;
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,50,20,20);
  restart.visible = false
  obstaclesG = createGroup();
  cloudG = createGroup();
}

function draw() {
  background(180);
  trex.collide(invisibleGround);
  
  
  if (gameState === play) {
    
  if (keyDown("space")) {
    trex.velocityY=-5;
  }
    
    if (ground.x<0) {
    ground.x=ground.width/2;
    }
    
  trex.velocityY = trex.velocityY +0.8;
  
  spawnClouds();
  spawnObstacles();
    
    if (trex.isTouching(obstaclesG)) {
      obstaclesG.destroyEach();
      cloudG.destroyEach();
      
      gameState = end;
      
    }
  }
  
  if (gameState === end) {
    trex.changeAnimation("collided",trex_collided);
    ground.velocityX = 0;
    gameOver.visible = true;
  }
  
  drawSprites();
  
}
function spawnClouds() {
  if (frameCount % 90 === 0) {
    cloud = createSprite(600,0,20,20)
    cloud.y=random(80,140);
    cloud.addImage(cloudImage);
    cloud.velocityX=-3;
    cloud.lifetime=200;
    cloud.scale=0.5;
    cloudG.add(cloud);
  }
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacles = createSprite(600,160,20,20);
    rand = Math.round(random(1,6));
    obstaclesG.add(obstacles)
    
    switch(rand) {
      case 1:obstacles.addImage(obstacle1);
       break;
       case 2 :obstacles.addImage(obstacle2);
        break;
        case 3 :obstacles.addImage(obstacle3);
         break;
         case 4 :obstacles.addImage(obstacle4);
        break;
        case 5 :obstacles.addImage(obstacle5);
        break;
        case 6 :obstacles.addImage(obstacle6);
        break;
    }
    
     obstacles.scale=0.5;
    obstacles.velocityX=-3;
    obstacles.lifetime=200;
  }
}