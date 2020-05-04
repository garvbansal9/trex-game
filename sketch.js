var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudgroup,cloudimage;
var obstaclegroup,o1image,o2image,o3image,o4image,o5image,o6image;
var count;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  o1image = loadImage("obstacle1.png");
  o2image = loadImage("obstacle2.png");
  o3image = loadImage("obstacle3.png");
  o4image = loadImage("obstacle4.png");
  o5image = loadImage("obstacle5.png");
  o6image = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  cloudgroup = new Group();
  obstaclegroup = new Group();
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background("black");
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  count = Math.round(World.frameCount/4);
  text("Score: "+ count, 250, 100);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addAnimation("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addAnimation("ob1image",o1image);
      break;
      case 2:obstacle.addAnimation("ob2image",o2image);
      break;
      case 3:obstacle.addAnimation("ob3image",o3image);
      break;
      case 4:obstacle.addAnimation("ob4image",o4image);
      break;
      case 5:obstacle.addAnimation("ob5image",o5image);
      break;
      case 6:obstacle.addAnimation("ob6image",o6image);
      break;
      default:break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 150;
    obstaclegroup.add(obstacle);
  }
}