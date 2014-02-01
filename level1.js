var GAME = GAME || {};



var videoD, imageD, imageContextD,
            textureD;


GAME.level1 =new GAME.Level({
                            
init:function() {
    //Doesn't do anything yet, but a way to standardize parallax
    GAME.textPlane = 10;
    GAME.backPlane = -1000;
    GAME.playerPlane = 0;


    //Array of site objects
    GAME.siteObjects = [];
    //Array of buttons
    GAME.buttons = [];
    //Array of platforms
    GAME.platforms = [];

    //Create player
    GAME.player = new GAME.Player({ x:0, y:-150, z:-.02, health:100, lives:4, width:45, height:30,color:0x000000, velocityX:0, velocityY:0, pathLength:0,mass:20} );
    
    scene.add(GAME.player);
    


    GAME.frontPane = new GAME.SiteObject({hidden:true,x:0, y:100, z:GAME.textPlane, width:10, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1});
    GAME.siteObjects.push(GAME.frontPane)
    //Create logo and info platforms
    //GAME.platforms.push(new GAME.Platform({x:0, y:95, z:GAME.backPlane, width:200, height:69,map:GAME.Textures['logo'].threeObj, color:0xFFFFFF, velocityX:0, velocityY:0,mass:10}));
    //GAME.platforms.push(new GAME.Platform({x:0, y:15, z:GAME.playerPlane, width:250, height:15,map:GAME.Textures['info'].threeObj, color:0xFFFFFF, velocityX:0, velocityY:0,mass:10}));
   
    //create function to pass in as trigger for sign up link
    GAME.goToForm = function(){
        window.open("https://docs.google.com/spreadsheet/viewform?fromEmail=true&formkey=dFZ2cTlpakhrLXlyc3lidkRTZGZLREE6MA", '_blank');
    }

    //Create sign up platform and its background
    //GAME.platforms.push(new GAME.Platform({x:0, y:45, z:GAME.playerPlane, width:500, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    //GAME.platforms.push(new GAME.Button({locked:true,siteObject:GAME.platforms[GAME.platforms.length-1],trigger: GAME.goToForm, x:0, y:0, z:GAME.textPlane, width:77, height:17,map:GAME.Textures['signup'].threeObj,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
 
    //GAME.platforms.push(new GAME.Platform({x:0, y:-200, z:GAME.backPlane, width:1000, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
   
    //Create trigger functions for bottom tabs
    var xSeparation = 300;
    var ySeparation = 600;
    var startingHeight =100;
    var randomXRange = 4000.0;
    var randomYRange = 250.0;
    var randomZRange = 750.0;

    //Create lowest platform
    GAME.gateWay = new GAME.SiteObject({hidden:true, x:0, y:0, z:GAME.playerPlane, width:10, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1});
    GAME.platforms.push(GAME.gateWay);
    var gateColor = 0xDDDDDD;
    GAME.stages = new GAME.SiteObject({hidden:true, x:0, y:0, z:GAME.playerPlane, width:10, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1});
    GAME.platforms.push(GAME.stages);
    GAME.platforms.push(new GAME.Platform({hardBottom:false,siteObject:GAME.gateWay, x:-5.25*1.25*xSeparation/2.0 - xSeparation*1.25*3.0/8.0, y:-155, z:GAME.playerPlane+.01, width:5.25*1.25*xSeparation, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({hardBottom:false,siteObject:GAME.gateWay, x:5.25*1.25*xSeparation/2.0 + xSeparation*1.25*3.0/8.0, y:-155, z:GAME.playerPlane+.01, width:5.25*1.25*xSeparation, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({hardBottom:false,siteObject:GAME.gateWay, x:0, y:-155, z:GAME.playerPlane+.01, width:xSeparation*1.25*3.0/4.0, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    
   
    //Bottom Barrier
    GAME.platforms.push(new GAME.Platform({hardBottom:true,x:0, y:-300, z:GAME.playerPlane+.01, width:4000, height:100,color:0x000000, velocityX:0, velocityY:0,mass:1}));
   
    //Side barriers
    GAME.platforms.push(new GAME.Platform({hardBottom:true,x:-4*xSeparation, y:-20, z:GAME.playerPlane+.01, width:300, height:500,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({hardBottom:true,x:4*xSeparation, y:-20, z:GAME.playerPlane+.01, width:300, height:500,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.sideLocation = 4*xSeparation-150;


    //Sponsors
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:2*xSeparation, y:startingHeight+2*ySeparation, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight+2*ySeparation, z:-randomZRange-2, width:14*xSeparation, height:ySeparation,color:0x8B31B4, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level2layer1'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+2*ySeparation+350, z:-500, width:1920*3, height:540*3,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level2layer2'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+2*ySeparation, z:-525, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level2layer3'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+2*ySeparation, z:-550, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level2layer4'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+2*ySeparation, z:-750, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));

    //Events
    GAME.cloudUpdateRule = function(params){
        if(params.obj.position.x > GAME.sideLocation+100){
            params.obj.position.x = -GAME.sideLocation - (200*Math.random() + 100);
            params.obj.position.y = startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation+params.obj.siteObject.position.y;
        }
    }
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:xSeparation, y:startingHeight+ySeparation, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight+ySeparation, z:-randomZRange-1, width:14*xSeparation, height:ySeparation*1.1,color:0x31B4AC, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level1layer1'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+ySeparation, z:-1, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level1layer2'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+ySeparation, z:-300, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level1layer3'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+ySeparation, z:-450, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    /*GAME.platforms.push(new GAME.Platform({opacity:.7,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation, z:GAME.playerPlane-.03, width:200, height:80,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({opacity:.7,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation, z:GAME.playerPlane-.03, width:200, height:80,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({opacity:.7,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation, z:GAME.playerPlane-.03, width:200, height:80,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({opacity:.7,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation, z:GAME.playerPlane-.03, width:200, height:80,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({opacity:.7,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation, z:GAME.playerPlane-.03, width:200, height:80,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({opacity:.7,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation, z:GAME.playerPlane-.03, width:200, height:80,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({opacity:.7,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation, z:GAME.playerPlane-.03, width:200, height:80,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({opacity:.7,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+ySeparation, z:GAME.playerPlane-.03, width:200, height:80,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
*/
    //Home
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:0, y:startingHeight-150, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight, z:-randomZRange-2, width:14*xSeparation, height:ySeparation,color:0x31B4AC, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level0layer1'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+50, z:-400, width:1920*1.7, height:540*1.5,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level0layer2'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+30, z:-600, width:1920*2.0, height:540*1.3,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level0layer3'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight, z:-610, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level0layer4'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight, z:-650, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    //GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FFFF, velocityX:0, velocityY:0,mass:1}));
  
    GAME.platforms.push(new GAME.Item({relX:0, relY: GAME.player.height/2.0+8,relZ:.01,siteObject:GAME.stages,x:0, y:startingHeight-40, z:GAME.playerPlane, width:20, height:20,color:0xBDA27E, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Item({relX:GAME.player.width/2.0+8, relY: 0,relZ:.01,siteObject:GAME.stages,x:200, y:startingHeight-40, z:GAME.playerPlane, width:20, height:20,color:0xBDA27E, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Item({relX:-GAME.player.width/2.0-8, relY: 0,relZ:.01,siteObject:GAME.stages,x:-200, y:startingHeight-40, z:GAME.playerPlane, width:20, height:20,color:0xBDA27E, velocityX:0, velocityY:0,mass:1}));


    //Level 0 -1 transition
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level0-1transition'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-ySeparation+50, z:-401, width:1920*1.7, height:540*.9,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));


    //Rules/FAQ
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:-xSeparation, y:startingHeight-ySeparation, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight-ySeparation, z:-randomZRange-1, width:14*xSeparation, height:ySeparation*1,color:0xB46B31, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level-1layer1'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-ySeparation-100, z:-402, width:1920*1.7, height:540*1.3,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level-1layer2'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-ySeparation, z:-450, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level-1layer3'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-ySeparation, z:-550, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level-1layer4'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-ySeparation, z:-600, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));

    //Resources
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:-2*xSeparation, y:startingHeight-2*ySeparation, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight-2*ySeparation, z:-randomZRange, width:14*xSeparation, height:ySeparation,color:0xB43139, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level-2layer1'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-2*ySeparation, z:-1, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level-2layer2'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-2*ySeparation, z:-20, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level-2layer3'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-2*ySeparation, z:-550, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    //About the team


   /*
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:-3000, x:startingHeight+200, z:GAME.backPlane-100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:-2500, x:startingHeight+200, z:GAME.backPlane, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:-2000, x:startingHeight+200, z:GAME.backPlane+100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:-1500, x:startingHeight+200, z:GAME.backPlane-100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:-1000, x:startingHeight+200, z:GAME.backPlane, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:-500, x:startingHeight+200, z:GAME.backPlane+100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:0, x:startingHeight+200, z:GAME.backPlane-100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:500, x:startingHeight+200, z:GAME.backPlane+100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:1000, x:startingHeight+200, z:GAME.backPlane, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:1500, x:startingHeight+200, z:GAME.backPlane-100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:2000, x:startingHeight+200, z:GAME.backPlane+100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:2500, x:startingHeight+200, z:GAME.backPlane, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,y:3000, x:startingHeight+200, z:GAME.backPlane-100, width:50, height:50,color:0xBB0000, velocityX:0, velocityY:0,mass:1}));
 */

    var currPlat = GAME.platforms.length;
    var moveSpeed = 4;
    var selecedColor = 0xFFFFFF;
    GAME.currentStage = 3;
    GAME.showTab1 = function(){
        var speedAdjust = Math.abs(GAME.currentStage - 1);
        if (speedAdjust == 0){
            speedAdjust=1;
        }
        GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:-2*1.25*xSeparation});
        GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:-2*ySeparation});
        GAME.platforms[currPlat].material.opacity = 1;
        GAME.platforms[currPlat+1].material.opacity = 0;
        GAME.platforms[currPlat+2].material.opacity = 0;
        GAME.platforms[currPlat+3].material.opacity = 0;
        GAME.platforms[currPlat+4].material.opacity = 0;
        console.log(Math.abs(GAME.currentStage - 1));
        GAME.currentStage = 1;
        //GAME.player.moveToLocation({velocityX:moveSpeed, targetX:-2*xSeparation});
    }

    GAME.showTab2 = function(){
        var speedAdjust = Math.abs(GAME.currentStage - 2);
        if (speedAdjust == 0){
            speedAdjust=1;
        }
        GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:-1.25*xSeparation});
        GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:-ySeparation});
        GAME.platforms[currPlat].material.opacity = 0;
        GAME.platforms[currPlat+1].material.opacity = 1;
        GAME.platforms[currPlat+2].material.opacity = 0;
        GAME.platforms[currPlat+3].material.opacity = 0;
        GAME.platforms[currPlat+4].material.opacity = 0;
        console.log(Math.abs(GAME.currentStage - 2));
        GAME.currentStage = 2;
        //GAME.platforms[currPlat+3].material.color = new THREE.Color(selecedColor);
    }


    GAME.showTab3 = function(){
        var speedAdjust = Math.abs(GAME.currentStage - 3);
        if (speedAdjust == 0){
            speedAdjust=1;
        }
        GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:0});
        GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:0});
        GAME.platforms[currPlat].material.opacity = 0;
        GAME.platforms[currPlat+1].material.opacity = 0;
        GAME.platforms[currPlat+2].material.opacity = 1;
        GAME.platforms[currPlat+3].material.opacity = 0;
        GAME.platforms[currPlat+4].material.opacity = 0;
        console.log(Math.abs(GAME.currentStage - 3));
        GAME.currentStage = 3;
        //GAME.platforms[currPlat+4].material.color = new THREE.Color(selecedColor);
    }

    GAME.showTab4 = function(){
        var speedAdjust = Math.abs(GAME.currentStage - 4);
        if (speedAdjust == 0){
            speedAdjust=1;
        }
        GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:1.25*xSeparation});
        GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:ySeparation});
        GAME.platforms[currPlat].material.opacity = 0;
        GAME.platforms[currPlat+1].material.opacity = 0;
        GAME.platforms[currPlat+2].material.opacity = 0;
        GAME.platforms[currPlat+3].material.opacity = 1;
        GAME.platforms[currPlat+4].material.opacity = 0;
        console.log(Math.abs(GAME.currentStage - 4));
        GAME.currentStage = 4;
        //GAME.platforms[currPlat+5].material.color = new THREE.Color(selecedColor);
    }


    GAME.showTab5 = function(){
        var speedAdjust = Math.abs(GAME.currentStage - 5);
        if (speedAdjust == 0){
            speedAdjust=1;
        }
        GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:2*1.25*xSeparation});
        GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:2*ySeparation});
        GAME.platforms[currPlat].material.opacity = 0;
        GAME.platforms[currPlat+1].material.opacity = 0;
        GAME.platforms[currPlat+2].material.opacity = 0;
        GAME.platforms[currPlat+3].material.opacity = 0;
        GAME.platforms[currPlat+4].material.opacity = 1;
        console.log(Math.abs(GAME.currentStage - 5));
        GAME.currentStage = 5;
        //GAME.platforms[currPlat+6].material.color = new THREE.Color(selecedColor);
    }
    //Highlights of tabs
    var border = 3;
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:-2*1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:-1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:0, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:2*1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));

    //Create text of tabs
   /* GAME.platforms.push(new GAME.Platform({x:-300, y:-90, z:GAME.playerPlane, width:160, height:160,map:GAME.Textures['abouttext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:0, y:-100, z:GAME.playerPlane, width:200, height:200,map:GAME.Textures['announcementstext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:300, y:-101, z:GAME.playerPlane, width:200, height:200,map:GAME.Textures['contacttext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    */
    //var 
    //Backgrounds of tabs  
    GAME.platforms.push(new GAME.Button({x:-4*1.25*xSeparation-10, y:-220, z:GAME.playerPlane, width:3*1.25*xSeparation, height:xSeparation/6.0,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({x:4*1.25*xSeparation+10, y:-220, z:GAME.playerPlane, width:3*1.25*xSeparation, height:xSeparation/6.0,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab1,x:-2*1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab2,x:-1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab3,x:0, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab4,x:1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab5,x:2*1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0x000000, velocityX:0, velocityY:0,mass:1}));
  
    
    //Initialize tabs  
    /*GAME.platforms[currPlat].material.opacity = .1;
    GAME.platforms[currPlat+1].material.opacity = 1.0;
    GAME.platforms[currPlat+2].material.opacity = .1;
    GAME.platforms[currPlat+3].material.color = new THREE.Color(0x000000);
    GAME.platforms[currPlat+4].material.color = new THREE.Color(0x0033FF);
    GAME.platforms[currPlat+5].material.color = new THREE.Color(0x000000);*/

    //Create labels of tabs
    var textHeight = xSeparation/10;
    var heightAdjust = 2;
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab1, map:GAME.Textures['about'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab2, map:GAME.Textures['announcements'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab3, map:GAME.Textures['contact'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab2, map:GAME.Textures['announcements'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab3, map:GAME.Textures['about'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    //push everying into siteObjects
    for(var i = 0; i < GAME.platforms.length; i++) {
        GAME.siteObjects.push(GAME.platforms[i]);
    }
    //Add all siteobjects to the scene
     for(var i = 0; i < GAME.siteObjects.length; i++) {
        if(GAME.siteObjects[i].position.z != GAME.backPlane){
            //GAME.siteObjects[i].siteObject = GAME.frontPane;
        }
        //GAME.siteObjects[i].siteObject = GAME.frontPane;
        if(!GAME.siteObjects[i].hidden){
            scene.add(GAME.siteObjects[i]);
        }
    }
                            },
                            
                            
                            
                            render : function() {
}
                            });
    