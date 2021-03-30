
var scubadiver, scubadiveriamge

var bckimg,backimage;

var Sushi,Suimg,sushiGroup;

var fish, fishimg, fishGroup; 

var angSushi, angryimg, angryGroup;

var edges; 

var oof;

var win;

var gameState = "START";




var score = 0
function preload(){

        scubadiverimage = loadImage("ScubaDiver.png")
        bckimg = loadImage("background.jpg")
        Suimg= loadImage("sushi.png")
        fishimg=loadImage("fish.png")
        angryimg = loadImage("angrySushi.png")
        oof=loadSound("oofsound.mp3")
        win=loadSound("win.wav")
}   

function setup(){

   edges = createEdgeSprites()
    
    createCanvas(700,500)
    backimage=createSprite(350,200,700,500)
    backimage.addImage(bckimg)
    backimage.scale=0.7
   

    scubadiver=createSprite(150,200,50,50)
    scubadiver.addImage(scubadiverimage)
    scubadiver.scale=0.5
    scubadiver.setCollider("circle",0,0,60)

    scubadiver.debug=false;

    fishGroup=createGroup();
    angryGroup=createGroup();
    sushiGroup=createGroup();
}





function draw(){
    background(0) 

    drawSprites();

    if(gameState==="START"){
        textSize(20)
        stroke("red")
        strokeWeight(1)
        fill("red")
        text("Welcome to Sea Catcher!", 400,100)
        text("Here, you are a scuba diver tasked of collecting Suhsi!",200,150)
        text("However you are not allowed to touch(Harm) fish.",230,200)
        text("But be careful, as not every sushi gives you points >:)",210,250)
        text("Scoring: Sushi gives 1 point", 300,300)
        text("By touching a fish a point is taken away, and The wrong Sushi is-3 points",50,350)
        text("To win you need 40 points! To lose you have to have -10 points or lower :/" ,50,400)
        text("PRESS SPACE TO START!",340,450)

        if(keyDown("SPACE")){
            gameState="PLAY"
        }
        
    }

    if(gameState==="PLAY"){

        backimage.velocityX=-3
        
        scubadiver.bounceOff(edges)


        if(backimage.x<0){
            backimage.x= 300
        }

        if(keyDown(UP_ARROW)){
            scubadiver.y-=5;
        }

        if(keyDown(DOWN_ARROW)){
            scubadiver.y+=5;
        } 

        if(score>=40){
            gameState="WIN"
            win.play();
        }

        for (var i =0; i < sushiGroup.length ; i++){
            if(scubadiver.isTouching(sushiGroup)){
                sushiGroup.destroyEach();
                score++ 
            }
        }

        for (var i =0; i < angryGroup.length ; i++){
            if(angryGroup.get(i).isTouching(scubadiver)){
                angryGroup.get(i).destroy();
                score = score-3
            }
        }

        for (var i =0; i < fishGroup.length ; i++){
            if(fishGroup.get(i).isTouching(scubadiver)){
                fishGroup.get(i).destroy();
                score = score-1
            }
        }

        fishyBoi();
        seaFood();
        angrySushi(); 

        if(score<=-10){
            gameState="END"
            oof.play();
        }
    }

    if(gameState==="WIN"){

        fishGroup.destroyEach();
        angryGroup.destroyEach();
        sushiGroup.destroyEach();
        backimage.velocityX=0;  
       
        textSize(20)
        stroke("white")
        fill("Green")
        strokeWeight(3)
        text("VICOTRY! :D " ,250,150)
        w
    }

   

    console.log(gameState)
    if(gameState==="END"){
        fishGroup.destroyEach();
        angryGroup.destroyEach();
        sushiGroup.destroyEach();
        backimage.velocityX=0;
        
        if(keyDown("R")){
            gameState="PLAY"
            console.log("in")
            score= 0;
        }
        
        textSize(20)
        fill("Red")
        stroke("white")
        strokeWeight(3)
        text("YOU LOSE :( (Press R to play again!) " ,250,150)
    
    }

    textSize(20)
    fill("White")
    text("SCORE : "+score,300,50)

}   





function seaFood(){

    if(frameCount%150===0){
        var Sushi = createSprite(700,random(50,350))
        Sushi.addImage(Suimg)
        Sushi.velocityX=-4
        Sushi.scale=0.5
        sushiGroup.add(Sushi) 
        Sushi.debug=false;
        Sushi.setCollider("rectangle",0,0,100,90)

    }

} 

function fishyBoi(){

    if(frameCount%90===0){
        var fish = createSprite(700,random(50,350))
        fish.addImage(fishimg)
        fish.velocityX=-4
        fish.scale=0.5
        fishGroup.add(fish)
        fish.debug= false;
        fish.setCollider("circle",0,0,90)
    }
    
}


function angrySushi(){
    if(frameCount%300===0){
        var angSushi = createSprite(700,random(50,350))
        angSushi.addImage(angryimg)
        angSushi.velocityX=-4
        angSushi.scale=0.2
        angryGroup.add(angSushi)
        angSushi.debug=false;
       angSushi.setCollider("rectangle",0,0,200,70)
    }
}


