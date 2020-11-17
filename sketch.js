var player,player_running;
var obstacleGroup,obstacleimage;
var bananaGroup,bananaimage;
var scene,sceneimage;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score;
function preload(){
  sceneimage=loadImage("jungle.jpg")
  bananaimage=loadImage("banana.png")
  obstacleimage=loadImage("stone.png")
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_10.png");


}
function setup() {
  createCanvas(400, 400);
  scene=createSprite(0,0,400,400);
  scene.addImage(sceneimage);
  scene.scale=1;
  scene.x=scene.width/2;
  scene.velocityX=-4;
  
  player=createSprite(100,340,20,20);
  player.addAnimation("running",player_running);
  player.scale=0.2;
  
  ground=createSprite(400,375,800,10);
  ground.velocityX=-6;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  score=0;
  }

function draw() {
  background(220);
  if(gameState===PLAY){
    if(keyDown("space")){
     player.velocityY=-10; 
    }
   if(ground.x<0){
     ground.x=ground.width/2;
   }
    if(scene.x<0){
      scene.x=scene.width/2;
    }
    player.velocityY=player.velocityY+0.6;
    player.collide(ground);

     spawnbanana();
     spawnobstacle();

    if(bananaGroup.isTouching(player)){
     score=score+2; 
     bananaGroup.destroyEach();  
    }
    
    if(obstacleGroup.isTouching(player)) {
       player.scale=0.08;
    }

     camera.position.x = displayWidth/2;   
  }
  
  
    
  
 
  text("Score:"+score,300,50);
  switch(score){
    case 10:player.scale=0.12;
            break;
    case 20:player.scale=0.14; 
            break;
    case 30:player.scale=0.16;
            break;
    case 40:player.scale=0.18;
            break;
    default:break;
  }
  drawSprites();
}
function spawnbanana() {
  if(frameCount % 80===0){
    banana=createSprite(209,350,20,20);
    banana.y=Math.round(random(220,250));
    banana.addImage(bananaimage);
    banana.scale=0.08;
    banana.velocityX=-3;
    banana.lifetime=200;
    banana.depth=player.depth;
    bananaGroup.add(banana);
  }
}
function spawnobstacle() {
  if(frameCount%90===0){
    obstacle=createSprite(154,350,20,20);
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleimage);
    obstacle.scale=0.18;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
    
  }
}

