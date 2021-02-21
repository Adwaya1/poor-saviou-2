
var backImg;
var cityGroup1;
var trainGroup;

var foodtruck;

var truckUp,truckDown,truckLeft,truckRight;
var homelessMan;

var gameState = 0;
var level = 1;

function preload(){
  //background images for the levels
    backImg1 = loadImage("Images/city.jpg");
    backImg2 = loadImage("Images/city2.png");
    
    //Animations for truck movement
    truckDown = loadImage("Images/truckDown.jpeg");
    truckUp = loadImage("Images/truckUp.jpeg");
    truckLeft = loadImage("Images/truckLeft.jpeg");
    truckRight = loadImage("Images/truckRight.jpeg");

}

function setup() {
  createCanvas(800,600);
 // createSprite(400, 200, 50, 50);

 //level 1 Maze 
 cityGroup1 = new Group();
 trainGroup = new Group();
 
 building1 = createSprite(60,93,170,180);
 building2 = createSprite(60,550,170,95);
 building3 = createSprite(340,350,160,220);
 building4 = createSprite(340,560,150,100);
 building5 = createSprite(650,560,360,100);

 swimmingpool = createSprite(60,345,170,246);
 helipad = createSprite(345,90,165,196);
 footballground = createSprite(580,90,230,190);
 carparking = createSprite(580,340,220,230);
 
 patch1 = createSprite(205,93,40,180);
 patch2 = createSprite(205,348,40,230);
 patch3 = createSprite(205,560,40,100);
 patch4 = createSprite(770,90,60,180);
 patch5 = createSprite(770,348,60,230);

 cityGroup1.add(building1);
 cityGroup1.add(building2);
 cityGroup1.add(building3);
 cityGroup1.add(building4);
 cityGroup1.add(building5);

 cityGroup1.add(patch1);
 cityGroup1.add(patch2);
 cityGroup1.add(patch3);
 cityGroup1.add(patch4);
 cityGroup1.add(patch5);

 cityGroup1.add(swimmingpool);
 cityGroup1.add(helipad);
 cityGroup1.add(footballground);
 cityGroup1.add(carparking);

 cityGroup1.setVisibleEach(false);


 //Level 2 Maze 

 cityGroup2 = new Group();




 //Level 3 Maze

 cityGroup3 = new Group();

 homelessMan = createSprite(100,20);

 foodtruck = createSprite(100,100);
 foodtruck.addImage("right",truckRight);
 foodtruck.addImage("left",truckLeft);
 foodtruck.addImage("up",truckUp);
 foodtruck.addImage("down",truckDown);
 foodtruck.scale=0.2;

 foodtruck.x = width-10;
 foodtruck.y = 500;

}

function draw() {

  if(level === 1){
    background(backImg1);

    homelessMan.x = 100;
    homelessMan.y = 10;
    spawnTrain();
    foodtruck.collide(cityGroup1);
    gameStateControl();
  }

  else if(level === 2){
    
    background(backImg2); 
    //foodtruck.x = width-10;
    //foodtruck.y = 500;
   // homelessMan.x = 100;
   // homelessMan.y = 10;
    //foodtruck.collide(cityGroup2);
    gameStateControl();
  }
  else if(level === 3){
      //background(backImg3); 
     //foodtruck.x = width-10;
    //foodtruck.y = 500;
   // homelessMan.x = 100;
  // homelessMan.y = 10;
//foodtruck.collide(cityGroup2);
    gameStateControl();
  }



  drawSprites();
}



function spawnTrain(){
  if(frameCount%150 === 0){
    var train = createSprite(200,height);
    train.velocityY = -7;
    train.lifetime = 200;
    trainGroup.add(train);
  }
}

function gameStateControl(){
  if(gameState === 0){
    textSize(30);
    fill("red");
    stroke("yellow");
    strokeWeight(6);
      text("Press Space to Start",width/2 -100,height/2);
      if(keyDown("space")){
        gameState = 1;
      }
  }
  else if(gameState === 1){

  if(keyIsDown(LEFT_ARROW)){
   setTimeout(changePosition(-5,0),3000)
   foodtruck.changeAnimation("left",truckLeft)
  }
  if(keyIsDown(RIGHT_ARROW)){
    setTimeout(changePosition(5,0),3000)
    foodtruck.changeAnimation("right",truckRight)
  }
  if(keyIsDown(UP_ARROW)){
    setTimeout(changePosition(0,-5),3000)
    foodtruck.changeAnimation("up",truckUp)
  }
  if(keyIsDown(DOWN_ARROW)){
    setTimeout(changePosition(0,5),3000)
    foodtruck.changeAnimation("down",truckDown)
  }

  if(foodtruck.isTouching(homelessMan)){
    gameState = 2;
  }

}
else if(gameState === 2){
  textSize(30);
  fill("red");
  stroke("yellow");
  strokeWeight(6);
  text("Level Completed, Press Space to Level Up",width/2 -200,height/2);
  if(keyDown("space")){
    level = level+1;
    gameState = 0;
  }
}
}


function changePosition(x,y){
  foodtruck.x +=x;
  foodtruck.y +=y;
}