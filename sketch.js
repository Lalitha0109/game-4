

var gameState=1;
var bg;
var helicopter,helicopter_img;
var scientist,sci_img;
var ground;
var plantsGroup;
var restart,restart_img;
var END;
var dead_img;
var distance=1000;
var count=0;
var num=0;
var level2,level2_img;
var next;



function preload(){
   backgroundStory=loadImage("background_story.png");
   background_level1=loadImage("bg2.png");
   helicopter_img=loadAnimation("aeroplane.png","aeroplane.png","aeroplane.png","blast.png");
   tiger_animation=loadAnimation("Tiger animation1.png","Tiger animation 2.png","Tiger animation 3.png");
   sci_img=loadAnimation("girl1.png","gril2.png","girl3.png","girl4.png");
   sci_img2=loadAnimation("girl4.png");
   sci_stand=loadAnimation("girl1.png");
   plant1 = loadImage("plant1.png");
  plant2 = loadImage("plant2.png");
  plant3 = loadImage("plant3.png");
  plant4 = loadImage("plant4.png");
  start_img=loadImage("start.png");
  restart_img=loadImage("restart.png");
  dead_img=loadAnimation("girl_dead.png");
  bridge_img=loadImage("bridge.png");
  pillar1_img=loadImage("pillar1.png");
  pillar2_img=loadImage("pillar2.png");
  pillar3_img=loadImage("pillar3.png");
  pillar4_img=loadImage("pillar4.png");
  pillar5_img=loadImage("pillar5.png");
  lava_img=loadImage("lava.png");
  level2_img=loadImage("level2_background.png");
  story_img=loadImage("STORY.png");
  next=loadImage("next.png");
  fuel_img=loadImage("fuel.png");
  
     
   
}


function setup() {
   createCanvas(displayWidth,displayHeight);
   bg=createSprite(displayWidth/2,displayHeight/2,800,40);
   bg.addImage(backgroundStory);
   bg.scale=2;
   helicopter=createSprite(displayWidth/4,displayHeight/3,20,20);
   helicopter.addAnimation("helicopter",helicopter_img);
   helicopter.scale=0.5;
   level2=createSprite(displayWidth-300,displayHeight/2,50,50);
   scientist=createSprite(displayWidth/4,displayHeight-200,50,50);
   scientist.addAnimation("run",sci_img);
   scientist.addAnimation("jump",sci_img2);
   scientist.addAnimation("stand",sci_stand);
   scientist.debug=true;
   scientist.setCollider("rectangle",0,0,120,280);
   ground=createSprite(displayWidth/2,displayHeight-15,displayWidth,50);
   ground.visible=false;
   restart=createSprite(displayWidth/2,displayHeight/2,30,30);
   restart.addImage(restart_img);
   restart.visible=false;
   story=createSprite(displayWidth-330,displayHeight-450);
   story.addImage(story_img);
   start=createSprite(displayWidth-125,displayHeight-100,50,50);
   start.addImage(start_img);
   plantsGroup = createGroup();
   pillarsGroup = createGroup();
   level2.visible=false;
   

}

function draw() {
   background(180);
   drawSprites();
   scientist.collide(ground);
   scientist.collide(pillarsGroup);

   if(keyDown("space")) {
      scientist.velocityY = -12;
     scientist.changeAnimation("jump",sci_img2);
  }
  
  scientist.velocityY = scientist.velocityY + 0.8;
   
   
   if(gameState===1){
      
      scientist.visible=false;
      bg.addImage(backgroundStory);
      bg.scale=2;
      bg.velocityX=0;
      bg.x=displayWidth/2;
      bg.y=displayHeight/2;
      
    
      
      //start.visible=true;
      restart.visible=false;

      if (mousePressedOver(start)){
         story.destroy();
         start.destroy();
         gameState=2;
   
         
      }
      
   }
   
   if (gameState===2){

      fill("white");
      stroke("green");
      strokeWeight(4);
      textSize(20);
      text("Number of Plants:"+(12-count),displayWidth-270,20);

      scientist.changeAnimation("run",sci_img);
      bg.addImage(background_level1);
      bg.scale=0.9;
      //bg.x=displayWidth/3;
      bg.velocityX=-5;
      helicopter.visible=false;
      
      scientist.visible=true;
      if(bg.x<-50){
         bg.x=displayWidth/2+200;
      }
      if(plantsGroup.isTouching(scientist)){
         restart.visible=true;
         //gameState = END;
      }
     //distance=distance-(count*100);
     spawnPlants();
      ground.depth=scientist.depth;
      if(count>=2){
         gameState="HOLD";
        
        
         }
         
         
   }
   if(gameState==="HOLD"){
      scientist.velocityY = 0;
        plantsGroup.setLifetimeEach(-1);
        plantsGroup.setVelocityXEach(0);
        bg.velocityX=0;
        fill("white");
        textSize(40);
        text("Level completed find materials for another \n can of fuel for Ava to escape",displayWidth/2-250,displayHeight/2-230);
        level2.visible=true;
        level2.addImage(next);
        image(fuel_img,displayWidth-200,100,150,150);

        if (mousePressedOver(level2)){
         gameState=3;
         spawnPillars();
         scientist.x=100;
         scientist.y=50;
         scientist.changeAnimation("stand",sci_stand);
         ground2=createSprite(displayWidth/6,displayHeight-350,400,100);
         lake=createSprite(displayWidth/2,displayHeight-100,displayWidth,50);
         
         plantsGroup.destroyEach();
      }
   }
   
      
   if(gameState===3){

    bg.addImage(level2_img);
    bg.x=camera.position.x;
    lake.x=camera.position.x;
    lake.visible=false;
    ground2.visible=false;
      
     camera.position.x=scientist.x;
     camera.position.y=scientist.y;

     scientist.changeAnimation("run",sci_img);
     scientist.collide(ground2);
     level2.visible=false;
     if(lake.isTouching(scientist)){
        // gameState=END;
        restart.visible=true;
        }
     scientist.collide(pillarsGroup);

     if(keyDown(RIGHT_ARROW)){
        scientist.x=scientist.x+10;

     }
     if(keyDown(LEFT_ARROW)){
      scientist.x=scientist.x-10;

   }
   if(scientist.x>=num){
      scientist.velocityY = 0
      
      fill("white");
      textSize(20);
      text("Congratuations!! Level completed.Ava has \n found enough fuel for her to escape from here.",scientist.x,scientist.y-200);
      image(fuel_img,scientist.x+200,100,150,150);
      image(fuel_img,scientist.x+300,100,150,150);

      
   }
   
   }
   
   
   
   if (gameState === END) {
      
      
      
      ground.velocityX = 0;
      scientist.velocityY = 0
     plantsGroup.setLifetimeEach(-1);
     plantsGroup.setVelocityXEach(0);
     bg.velocityX=0;
    
   }
   
   if (mousePressedOver(restart)){
      reset();
   }
   
   
   
  
     
   }
   function spawnPlants(){
      if (frameCount % 300 === 0){
        var plant = createSprite(displayWidth+100,displayHeight-120,10,40);
        plant.velocityX = -4;
        
         //generate random plants
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: plant.addImage(plant1);
           
                   break;
           case 2: plant.addImage(plant3);
                   break;
           case 3: plant.addImage(plant4);
                   break;

           default: break;
         }
         count=count+1;
        
         //assign scale and lifetime to the plant           
         plant.scale = 0.5;
         plant.lifetime =displayWidth/4;
        
        //add each plant to the group
         plantsGroup.add(plant);
      }
     }
     function reset(){
      
      gameState=1;
      
      plantsGroup.destroyEach();
      pillarsGroup.destroyEach();
      



   }
   function spawnPillars(){
      for(var i=1;i<=13;i++){
         var pillar = createSprite(i*random(350,500),displayHeight-170,10,40);
         num=pillar.x;
         //generate random plants
         var rand = Math.round(random(1,5));
         switch(rand) {
           case 1: pillar.addImage(pillar1_img);
                   break;
           case 2: pillar.addImage(pillar2_img);
                   break;
           case 3: pillar.addImage(pillar3_img);
                   break;
           case 4: pillar.addImage(pillar4_img);
                   break;
           case 5: pillar.addImage(pillar5_img);
                   break;

           default: break;
         }
         
         pillar.scale = 0.9;
         //add each plant to the group
         pillarsGroup.add(pillar);
         //pillar.depth=lava.depth+1;
         

      }
        
      
        
        
         
        
        
         
      }


   
   
    