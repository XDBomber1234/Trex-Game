var trex , trexAnim;
var ground, groundImage;
var invisibleGround;
var cloudImage;
var cloudGroup;
var obstacleGroup;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameOver,gameOverImg,restart,restartImg;
var trexCollided;



function preload(){
  
trexAnim = loadAnimation("trex1.png","trex3.png","trex4.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png")
obstacle4 = loadImage("obstacle4.png")
obstacle5 = loadImage("obstacle5.png")
obstacle6 = loadImage("obstacle6.png")

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

trexCollided = loadAnimation("trex_collided.png");


}

function setup() {
  createCanvas(600,200);
  
  trex = createSprite (50,180,10,10);
  trex.scale = 0.5  
  trex.addAnimation ("trex",trexAnim);
  trex.addAnimation("collided",trexCollided);
  ground = createSprite (200,180,10,10);
  ground.addImage ("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -5;
  invisibleGround = createSprite (200,190,600,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
   
gameOver = createSprite(300,100);
gameOver.addImage("gameOver",gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;

restart = createSprite(300,140);
restart.addImage("restart",restartImg);
restart.scale = 0.5;
restart.visible = false;


}

function draw() {
  background (180);

  trex.collide(invisibleGround);
  text("score : "+ score,500,50);
  
  if(gameState === PLAY){
    spawnClouds();
    
    spawnObstacles();
    
    score = score + Math.round(getFrameRate()/20);
     
    ground.velocityX = -(5+score/100);
  
    if (ground.x < 0) {
      ground.x = ground.width/2;
      }
      
    if (keyDown("space") && trex.y >= 156.5) {
      trex.velocityY = -10;
       //playSound("jump.mp3", false);
  }
      
      trex.velocityY = trex.velocityY + 0.5;
      if (trex.isTouching(obstacleGroup)) {
        gameState = END;  
           //playSound("die.mp3", false);
      }
  } else if(gameState === END){
    trex.changeAnimation("collided",trexCollided);
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.velocityY = 0;  
    
    gameOver.visible = true;
    restart.visible = true;
  
  }
  if (mousePressedOver(restart)) {
    reset();  
    }
   drawSprites();
}

function spawnClouds(){
  if (frameCount % 80 === 0) {
     var cloud = createSprite(600,120,20,20);
     cloud.velocityX = -5;   
     cloud.addImage("cloudImage",cloudImage); 
     cloud.scale = 0.5;
     cloud.y = Math.round(random(80,120)); 
     cloud.depth = trex.depth;
     trex.depth = trex.depth + 1;
     cloud.lifetime = 120;
     cloudGroup.add(cloud);
     
  }
  
}

function spawnObstacles(){
  if (frameCount % 60 === 0) {
  var obstacles = createSprite(600,165,20,20);
  //obstacles.velocityX = -(5//+playerScore/100);
  obstacles.velocityX = -5;
  var n = Math.round(random(1,6));
  
  switch(n){
    case 1: obstacles.addImage("obstacle1",obstacle1);
            break;

    case 2: obstacles.addImage("obstacle2",obstacle2);
            break;

    case 3: obstacles.addImage("obstacle3",obstacle3);
            break;
            
    case 4: obstacles.addImage("obstacle4",obstacle4);
             break;
             
    case 5: obstacles.addImage("obstacle5",obstacle5);
             break;
             
    case 6: obstacles.addImage("obstacle6",obstacle6);
            break;         
  }

  obstacles.scale = 0.5;
  obstacles.lifetime = 120;
   obstacleGroup.add(obstacles);

  }
}


function reset(){
  
  gameState = PLAY;
  trex.changeAnimation("trex",trexAnim);
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
}
