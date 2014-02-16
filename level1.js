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

    var xSeparation = 300;
    var ySeparation = 750;
    var startingHeight =75;
    var randomXRange = 5000.0;
    var randomYRange = 250.0;
    var randomZRange = 750.0;

    //Create player
    GAME.playerFrame = 0;
    GAME.playerUpdateRule = function(params){
        if(GAME.player.coins%3 == 0){
            if(GAME.player.coins>0){
                GAME.playerFrame+=1;
                if(GAME.playerFrame<60){
                    var val = GAME.playerFrame%6;
                    if(val<3){
                        console.log("boo");
                    }else {
                        console.log("hoo");
                    }
                }
            }
        }
    }
    GAME.playerLevel =0;
    GAME.player = new GAME.Player({updateRule:GAME.playerUpdateRule, map:GAME.Textures['playerwalkcycleright1'].threeObj,x:-xSeparation/2.0-35, y:startingHeight, z:.5, health:100, lives:4, width:32, height:50,color:0xFFFFFF, velocityX:0, velocityY:0, pathLength:0,mass:20} );

    GAME.scene.add(GAME.player);

    GAME.score = 0;
    


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
    //Create lowest platform
    GAME.gateWay = new GAME.SiteObject({hidden:true, x:0, y:0, z:GAME.playerPlane-.1, width:10, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1});
    GAME.platforms.push(GAME.gateWay);
    var gateColor = 0xDDDDDD;
    GAME.stages = new GAME.SiteObject({hidden:true, x:0, y:0, z:GAME.playerPlane, width:10, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1});
    GAME.platforms.push(GAME.stages);
    GAME.platforms.push(new GAME.Platform({locked:true,opacity:.8,hardBottom:false,siteObject:GAME.gateWay, x:-5.5*1.25*xSeparation/2.0 - xSeparation*1.25*3.0/8.0, y:-155, z:GAME.playerPlane+.01, width:5.5*1.25*xSeparation, height:20,color:0x737373, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({locked:true,opacity:.8,hardBottom:false,siteObject:GAME.gateWay, x:5.5*1.25*xSeparation/2.0 + xSeparation*1.25*3.0/8.0, y:-155, z:GAME.playerPlane+.01, width:5.5*1.25*xSeparation, height:20,color:0x737373, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({locked:true,opacity:.8,hardBottom:false,siteObject:GAME.gateWay, x:0, y:-155, z:GAME.playerPlane+.01, width:xSeparation*1.25*3.0/4.0, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    
   
    //Bottom Barrier
    //GAME.platforms.push(new GAME.Platform({hardBottom:true,x:0, y:-300, z:GAME.playerPlane+.01, width:4000, height:100,color:0x000000, velocityX:0, velocityY:0,mass:1}));
   
    //Side barriers
    //GAME.platforms.push(new GAME.Platform({hardBottom:true,x:-4.25*xSeparation, y:-20, z:GAME.playerPlane+.01, width:300, height:500,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    //GAME.platforms.push(new GAME.Platform({hardBottom:true,x:4.25*xSeparation, y:-20, z:GAME.playerPlane+.01, width:300, height:500,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.sideLocation = 3.7*xSeparation;



    //"Tutorial"
    GAME.siteObjects.push(new GAME.SiteObject({locked:true,siteObject:GAME.stages,map:GAME.Textures['ad'].threeObj,opacity:1.0,x:0, y:-90, z:-.2, width:621, height:62,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.SiteObject({locked:true,siteObject:GAME.stages,map:GAME.Textures['s'].threeObj,opacity:0,x:0, y:-90, z:-.2, width:314, height:62,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.SiteObject({locked:true,siteObject:GAME.stages,map:GAME.Textures['w'].threeObj,opacity:1.0,x:0, y:-90-ySeparation, z:-.2, width:213, height:62,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    GAME.frameCountThing = 0;
    GAME.tempNum = GAME.siteObjects.length;
    GAME.collectIsShown = false;
    GAME.collectUpdateRule = function(params){
        if(GAME.collectIsShown){
            GAME.frameCountThing +=1.0;
            if(GAME.frameCountThing > 90){
                var newOpac = 1.0 - (GAME.frameCountThing-90.0)/120.0;
                if (newOpac >= 0){
                    GAME.siteObjects[GAME.tempNum].material.opacity = newOpac;
                }
            }
        }
    }
    GAME.siteObjects.push(new GAME.SiteObject({updateRule:GAME.collectUpdateRule, locked:true,siteObject:GAME.stages,map:GAME.Textures['collect'].threeObj,opacity:0,x:0, y:-90-ySeparation, z:-.2, width:498, height:93,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    var currNum = GAME.siteObjects.length-4;
    var currPlatNum = GAME.siteObjects.length;
    GAME.ad = function(params){
        GAME.scene.remove(GAME.siteObjects[currNum]);
        GAME.siteObjects[currNum+1].material.opacity = 1.0;
        GAME.platforms[currPlatNum+1].material.opacity = 1.0;
        GAME.platforms[currPlatNum+1].enabled = true;
    }
    GAME.s = function(params){
        GAME.scene.remove(GAME.siteObjects[currNum+1]);
        GAME.siteObjects[currNum+2].material.opacity = 1.0;
        GAME.platforms[currPlatNum+2].material.opacity = 1.0;
        GAME.platforms[currPlatNum+2].enabled = true;
    }
    GAME.w = function(params){
        GAME.scene.remove(GAME.siteObjects[currNum+2]);
        GAME.siteObjects[currNum+3].material.opacity = 1.0;
        GAME.collectIsShown = true;
    }
    /*GAME.collect = function(params){
        GAME.scene.remove(GAME.siteObjects[currNum+3]);
        //GAME.siteObjects[siteObjects.length+1].opacity = .8;
    }*/
    GAME.platforms.push(new GAME.Item({trigger:GAME.ad, siteObject:GAME.stages,x:150, y:-125, z:-.1, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));  
    GAME.platforms.push(new GAME.Item({opacity:0.0,enabled:false,trigger:GAME.s, siteObject:GAME.stages,x:150, y:-180, z:-.1, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Item({opacity:1.0,enabled:true,trigger:GAME.w, siteObject:GAME.stages,x:150, y:-125-ySeparation, z:-.1, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    //GAME.platforms.push(new GAME.Item({trigger:GAME.collect, siteObject:GAME.stages,x:200, y:startingHeight-100, z:-.1, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    //Sponsors
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:2*xSeparation, y:startingHeight+2*ySeparation, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:false,siteObject:GAME.stages,x:0, y:startingHeight+2.5*ySeparation, z:-1500, width:25*xSeparation, height:3*ySeparation,color:0x8B31B4, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['planet1'].threeObj,siteObject:GAME.stages,x:-1500, y:startingHeight+2*ySeparation+200, z:-1000, width:500, height:500,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:-640,relY:startingHeight+2.0*ySeparation-30,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-660, y:startingHeight+2*ySeparation-30, z:-1, width:125, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:-640, y:startingHeight+2*ySeparation+30, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    
    GAME.platforms.push(new GAME.Platform({relX:-160,relY:startingHeight+2.0*ySeparation-50,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-170, y:startingHeight+2*ySeparation-25, z:-1, width:80, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:-160, y:startingHeight+2*ySeparation+10, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['planet2'].threeObj,siteObject:GAME.stages,x:-400, y:startingHeight+2*ySeparation+80, z:-1199, width:400, height:400,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level2back'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+2*ySeparation, z:-1400, width:2.5*1920, height:2.5*540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['1-2transition'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+1.5*ySeparation, z:-760, width:2.5*1920, height:2.35*540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    //Events
    GAME.cloudUpdateRule = function(params){
        if(params.obj.position.x > GAME.sideLocation+200){
            params.obj.position.x = -GAME.sideLocation - (200 + 100);
            //params.obj.position.y = params.obj.siteObject.position.y;
        }
    }
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:xSeparation, y:startingHeight+ySeparation, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:false,siteObject:GAME.stages,x:0, y:startingHeight+ySeparation, z:-randomZRange-1, width:20*xSeparation, height:ySeparation*1.1,color:0x2ECADD, velocityX:0, velocityY:0,mass:1}));
    /*GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level1layer1'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+ySeparation, z:-1, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level1layer2'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+ySeparation, z:-300, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['level1layer3'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+ySeparation, z:-450, width:1920, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    */

    var randomSideLength = 300.0;
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud1'].threeObj,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight-100+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({locked:true,hidden:true,hardBottom:false,siteObject:GAME.siteObjects[GAME.siteObjects.length-1],x:0, y:0, z:0, width:GAME.siteObjects[GAME.siteObjects.length-1].width-150, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({locked:true,siteObject:GAME.platforms[GAME.platforms.length-1],x:0, y:50, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud2'].threeObj,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight-75+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({locked:true,hidden:true,hardBottom:false,siteObject:GAME.siteObjects[GAME.siteObjects.length-1],x:0, y:0, z:0, width:GAME.siteObjects[GAME.siteObjects.length-1].width-150, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({locked:true,siteObject:GAME.platforms[GAME.platforms.length-1],x:0, y:50, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
 
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud3'].threeObj,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight-50+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({locked:true,hidden:true,hardBottom:false,siteObject:GAME.siteObjects[GAME.siteObjects.length-1],x:0, y:0, z:0, width:GAME.siteObjects[GAME.siteObjects.length-1].width-150, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({locked:true,siteObject:GAME.platforms[GAME.platforms.length-1],x:0, y:50, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud4'].threeObj,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight-25+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({locked:true,hidden:true,hardBottom:false,siteObject:GAME.siteObjects[GAME.siteObjects.length-1],x:0, y:0, z:0, width:GAME.siteObjects[GAME.siteObjects.length-1].width-150, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({locked:true,siteObject:GAME.platforms[GAME.platforms.length-1],x:0, y:50, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud5'].threeObj,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({locked:true,hidden:true,hardBottom:false,siteObject:GAME.siteObjects[GAME.siteObjects.length-1],x:0, y:0, z:0, width:GAME.siteObjects[GAME.siteObjects.length-1].width-150, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({locked:true,siteObject:GAME.platforms[GAME.platforms.length-1],x:0, y:50, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['sun'].threeObj,siteObject:GAME.stages,x:800, y:startingHeight+ySeparation, z:-750, width:400, height:400,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:400,relY:startingHeight+ySeparation-110,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-400, y:startingHeight+10, z:-1, width:150, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF})); 
    

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['bird1'].threeObj,siteObject:GAME.stages,x:-800, y:startingHeight+ySeparation+50, z:-300, width:150, height:150,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:-390,relY:startingHeight+ySeparation-105,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-400, y:startingHeight+10, z:-1, width:50, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF})); 
    
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['bird2'].threeObj,siteObject:GAME.stages,x:-550, y:startingHeight+ySeparation-100, z:-300, width:100, height:100,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:-567,relY:startingHeight+ySeparation-13,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-400, y:startingHeight+10, z:-1, width:65, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF})); 
    
    /*
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud2'].threeObj,opacity:.9,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/1.0+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud3'].threeObj,opacity:.9,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/1.0+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud4'].threeObj,opacity:.9,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/1.0+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['cloud5'].threeObj,opacity:.9,updateRule:GAME.cloudUpdateRule, hardBottom:false,siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/1.0+ySeparation, z:GAME.playerPlane-.03, width:randomSideLength*Math.random()+randomSideLength, height:randomSideLength*Math.random()+randomSideLength,color:0xFFFFFF, velocityX:1+2*Math.random(), velocityY:0,mass:1}));
    *///Home
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:0, y:startingHeight-150, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,siteObject:GAME.stages,x:0, y:startingHeight, z:-randomZRange-2, width:20*xSeparation, height:ySeparation,color:0x2ECADD, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['bush3'].threeObj,siteObject:GAME.stages,x:1300, y:startingHeight+70, z:-300, width:700, height:700,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:1000,relY:startingHeight-150,relZ:0,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:1000, y:startingHeight-150, z:-1, width:550, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:900, y:startingHeight-100, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['cloud3'].threeObj,siteObject:GAME.stages,x:-700, y:startingHeight+130, z:-600, width:800, height:800,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:725,relY:startingHeight-25,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:750, y:startingHeight-25, z:-1, width:270, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:725, y:startingHeight+25, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['cloud4'].threeObj,siteObject:GAME.stages,x:1450, y:startingHeight+80, z:-740, width:600, height:600,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:-400,relY:startingHeight+10,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-400, y:startingHeight+10, z:-1, width:350, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF})); 
    GAME.platforms.push(new GAME.Item({relX:0, relY: GAME.player.height/2.0+8,relZ:.01,siteObject:GAME.stages,x:-400, y:startingHeight+60, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    
    GAME.platforms.push(new GAME.Platform({relX:-500,relY:startingHeight-110,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-400, y:startingHeight+10, z:-1, width:450, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF})); 
    GAME.platforms.push(new GAME.Platform({relX:445,relY:startingHeight-70,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-400, y:startingHeight+10, z:-1, width:250, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF})); 
 
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level0back'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+30, z:-600, width:1920*2.2, height:540*2,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
        //Events
        GAME.frameCountThing =0.0;
        GAME.num = GAME.siteObjects.length;
    /*GAME.instructionsUpdateRule = function(params){
        GAME.frameCountThing +=1.0;
        if(GAME.frameCountThing > 600){
            var newOpac = .8 - (GAME.frameCountThing-600.0)/120.0;
            if (newOpac >= 0){
                GAME.siteObjects[GAME.num].material.opacity = newOpac;
            }
        }
    }
    GAME.siteObjects.push(new GAME.SiteObject({updateRule: GAME.instructionsUpdateRule,opacity:.8,map:GAME.Textures['instructions'].threeObj,x:-750, y:startingHeight-40, z:-1, width:325, height:200,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
 */

    //GAME.siteObjects.push(new GAME.Platform({map:GAME.Textures['0--1transition'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight+50, z:-400, width:1920*1.7, height:540*1.5,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    //GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FFFF, velocityX:0, velocityY:0,mass:1}));
  
    //GAME.platforms.push(new GAME.Item({relX:GAME.player.width/2.0+8, relY: 0,relZ:.01,siteObject:GAME.stages,x:200, y:startingHeight-80+ySeparation, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    //GAME.platforms.push(new GAME.Item({relX:-GAME.player.width/2.0-8, relY: 0,relZ:.01,siteObject:GAME.stages,x:-200, y:startingHeight-80, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    //GAME.platforms.push(new GAME.Item({relX:GAME.player.width/2.0+8, relY: 0,relZ:.01,siteObject:GAME.stages,x:200, y:startingHeight-80-2*ySeparation, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    //GAME.platforms.push(new GAME.Item({relX:-GAME.player.width/2.0-8, relY: 0,relZ:.01,siteObject:GAME.stages,x:-200, y:startingHeight-80-3*ySeparation, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));


//GAME.platforms.push(new GAME.Item({relX:-GAME.player.width/2.0-8, relY: 0,relZ:.01,siteObject:GAME.stages,x:-200, y:150, z:GAME.playerPlane, width:20, height:20,color:0xFFD750, velocityX:0, velocityY:0,mass:1}));
    

    //Level 0 -1 transition
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['0--1transition'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-.7*ySeparation, z:-400, width:1920*1.9, height:540*1.5,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));


    //Rules/FAQ
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:-xSeparation, y:startingHeight-ySeparation, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:false,siteObject:GAME.stages,x:0, y:startingHeight-ySeparation, z:-randomZRange-1, width:20*xSeparation, height:ySeparation*1.2,color:0x1889A9, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level-2front'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-ySeparation-20, z:-550, width:1920*2.2, height:540*1.6,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level-2middle'].threeObj,siteObject:GAME.stages,x:-200, y:startingHeight-ySeparation-50, z:-725, width:1920*2.2, height:540*1.5,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level-2back'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-ySeparation, z:-750, width:1920*2.7, height:540*1.3,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:-930,relY:startingHeight-1.0*ySeparation-30,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-870, y:startingHeight-1.0*ySeparation-30, z:-1, width:500, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:-900, y:startingHeight-1.0*ySeparation+20, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.platforms.push(new GAME.Platform({relX:800,relY:startingHeight-1.0*ySeparation-190,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:800, y:startingHeight-1.0*ySeparation-190, z:-1, width:800, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:800, y:startingHeight-1.0*ySeparation-140, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['-1--2transition'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-1.7*ySeparation, z:-400, width:1.9*1920, height:1.8*540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));

    //Resources
    //GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:-2*xSeparation, y:startingHeight-2*ySeparation, z:GAME.playerPlane-.02, width:290, height:20,color:gateColor, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,siteObject:GAME.stages,x:0, y:startingHeight-2*ySeparation, z:-randomZRange-2, width:20*xSeparation, height:ySeparation*1.0,color:0x7C5A33, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level-1middle'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-2*ySeparation-110, z:-650, width:1920*2.3, height:540*1.3,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level-1back'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-2*ySeparation-100, z:-750, width:1920*2.5, height:540*1.6,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:-735, y:startingHeight-2.0*ySeparation+50, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:980, y:startingHeight-2.0*ySeparation, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['-2--3transition'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-2.848*ySeparation, z:-400, width:1920*1.9, height:540*2.5,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));

    //About the tea
    GAME.siteObjects.push(new GAME.Platform({locked:false,siteObject:GAME.stages,x:0, y:startingHeight-3.5*ySeparation, z:-randomZRange-3, width:20*xSeparation, height:1.99*ySeparation,color:0xB43139, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level-3front'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-2.8*ySeparation, z:-600, width:1920*2.4, height:540*2.4,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['level-3middle'].threeObj,siteObject:GAME.stages,x:0, y:startingHeight-3.0*ySeparation-50, z:-700, width:1920*1.7, height:540*1.7,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['people1'].threeObj,siteObject:GAME.stages,x:-1200, y:startingHeight-3.2*ySeparation, z:-300, width:540, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:-850,relY:startingHeight-3.0*ySeparation-155,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-870, y:startingHeight-3.0*ySeparation-127, z:-1, width:150, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:-850, y:startingHeight-3.0*ySeparation-105, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['people2'].threeObj,siteObject:GAME.stages,x:-400, y:startingHeight-3.2*ySeparation, z:-100, width:540, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:-360,relY:startingHeight-3.0*ySeparation-177,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:-360, y:startingHeight-3.0*ySeparation-143, z:-1, width:290, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:-360, y:startingHeight-3.0*ySeparation-127, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));

    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['people3'].threeObj,siteObject:GAME.stages,x:400, y:startingHeight-3.2*ySeparation, z:-200, width:540, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:360,relY:startingHeight-3.0*ySeparation-162,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:360, y:startingHeight-3.0*ySeparation-128, z:-1, width:290, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:360, y:startingHeight-3.0*ySeparation-112, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
    
    GAME.siteObjects.push(new GAME.Platform({locked:true,map:GAME.Textures['people4'].threeObj,siteObject:GAME.stages,x:1200, y:startingHeight-3.2*ySeparation, z:-400, width:540, height:540,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({relX:800,relY:startingHeight-3.0*ySeparation-155,relZ:-1,locked:true,hidden:true,hardBottom:false,siteObject:GAME.stages,x:800, y:startingHeight-3.0*ySeparation-123, z:-1, width:290, height:2, velocityX:0, velocityY:0,mass:1,color:0xFFFFFF}));
    GAME.platforms.push(new GAME.Item({siteObject:GAME.stages,x:800, y:startingHeight-3.0*ySeparation-105, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));


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
    var moveSpeed = 6;
    var selecedColor = 0xFFFFFF;
    GAME.currentStage = 3;
    GAME.showTab1 = function(params){
        if(params.inGame){
            GAME.moving = true;
            var speedAdjust = Math.abs(GAME.currentStage - 1);
            if (speedAdjust == 0){
                speedAdjust=1;
            }
            GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:-2.5*1.25*xSeparation});
            GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:-2*ySeparation});
            GAME.platforms[currPlat].material.opacity = 1;
            GAME.platforms[currPlat+1].material.opacity = 0;
            GAME.platforms[currPlat+2].material.opacity = 0;
            GAME.platforms[currPlat+3].material.opacity = 0;
            GAME.platforms[currPlat+4].material.opacity = 0;
            GAME.platforms[currPlat+5].material.opacity = 0;
           // console.log(Math.abs(GAME.currentStage - 1));
            GAME.currentStage = 1;
            //GAME.player.moveToLocation({velocityX:moveSpeed, targetX:-2*xSeparation});
        }
    }

    GAME.showTab2 = function(params){
        if(params.inGame){
            GAME.moving = true;
            var speedAdjust = Math.abs(GAME.currentStage - 2);
            if (speedAdjust == 0){
                speedAdjust=1;
            }
            GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:-1.5*1.25*xSeparation, velocityY:0});
            GAME.stages.moveToLocation({velocityX:0,velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:-ySeparation});
            GAME.platforms[currPlat].material.opacity = 0;
            GAME.platforms[currPlat+1].material.opacity = 1;
            GAME.platforms[currPlat+2].material.opacity = 0;
            GAME.platforms[currPlat+3].material.opacity = 0;
            GAME.platforms[currPlat+4].material.opacity = 0;
            GAME.platforms[currPlat+5].material.opacity = 0;
            //console.log(Math.abs(GAME.currentStage - 2));
            GAME.currentStage = 2;
            //GAME.platforms[currPlat+3].material.color = new THREE.Color(selecedColor);
        }
    }


    GAME.showTab3 = function(params){
        if(params.inGame){
            GAME.moving = true;
            var speedAdjust = Math.abs(GAME.currentStage - 3);
            if (speedAdjust == 0){
                speedAdjust=1;
            }
            GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:-.5*1.25*xSeparation});
            GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:0});
            GAME.platforms[currPlat].material.opacity = 0;
            GAME.platforms[currPlat+1].material.opacity = 0;
            GAME.platforms[currPlat+2].material.opacity = 1;
            GAME.platforms[currPlat+3].material.opacity = 0;
            GAME.platforms[currPlat+4].material.opacity = 0;
            GAME.platforms[currPlat+5].material.opacity = 0;
            //console.log(Math.abs(GAME.currentStage - 3));
            GAME.currentStage = 3;
            //GAME.platforms[currPlat+4].material.color = new THREE.Color(selecedColor);
        }
    }

    GAME.showTab4 = function(params){
        if(params.inGame){
            GAME.moving = true;
            var speedAdjust = Math.abs(GAME.currentStage - 4);
            if (speedAdjust == 0){
                speedAdjust=1;
            }
            GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:.5*1.25*xSeparation});
            GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:ySeparation});
            GAME.platforms[currPlat].material.opacity = 0;
            GAME.platforms[currPlat+1].material.opacity = 0;
            GAME.platforms[currPlat+2].material.opacity = 0;
            GAME.platforms[currPlat+3].material.opacity = 1;
            GAME.platforms[currPlat+4].material.opacity = 0;
            GAME.platforms[currPlat+5].material.opacity = 0;
            //console.log(Math.abs(GAME.currentStage - 4));
            GAME.currentStage = 4;
            //GAME.platforms[currPlat+5].material.color = new THREE.Color(selecedColor);
        }
    }


    GAME.showTab5 = function(params){
        if(params.inGame){
            GAME.moving = true;
            var speedAdjust = Math.abs(GAME.currentStage - 5);
            if (speedAdjust == 0){
                speedAdjust=1;
            }
            GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:1.5*1.25*xSeparation});
            GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:2*ySeparation});
            GAME.platforms[currPlat].material.opacity = 0;
            GAME.platforms[currPlat+1].material.opacity = 0;
            GAME.platforms[currPlat+2].material.opacity = 0;
            GAME.platforms[currPlat+3].material.opacity = 0;
            GAME.platforms[currPlat+4].material.opacity = 1;
            GAME.platforms[currPlat+5].material.opacity = 0;
            //console.log(Math.abs(GAME.currentStage - 5));
            GAME.currentStage = 5;
            //GAME.platforms[currPlat+6].material.color = new THREE.Color(selecedColor);
        }
    }
    GAME.showTab6 = function(params){
        if(params.inGame){
            GAME.moving = true;
            var speedAdjust = Math.abs(GAME.currentStage - 6);
            if (speedAdjust == 0){
                speedAdjust=1;
            }
            GAME.gateWay.moveToLocation({velocityX:speedAdjust*moveSpeed, targetX:2.5*1.25*xSeparation});
            GAME.stages.moveToLocation({velocityY:(speedAdjust*ySeparation/(1.25*xSeparation))*moveSpeed, targetY:3*ySeparation});
            GAME.platforms[currPlat].material.opacity = 0;
            GAME.platforms[currPlat+1].material.opacity = 0;
            GAME.platforms[currPlat+2].material.opacity = 0;
            GAME.platforms[currPlat+3].material.opacity = 0;
            GAME.platforms[currPlat+4].material.opacity = 0;
            GAME.platforms[currPlat+5].material.opacity = 1;
            //console.log(Math.abs(GAME.currentStage - 5));
            GAME.currentStage = 6;
            //GAME.platforms[currPlat+6].material.color = new THREE.Color(selecedColor);
        }
    }
    //Highlights of tabs
    var border = 3;
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:-2.5*1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:-1.5*1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:-.5*1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:.5*1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:1.5*1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:2.5*1.25*xSeparation, y:-220, z:GAME.playerPlane-.03, width:1.25*xSeparation - 5.0+border, height:xSeparation/6.0+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));

    //Create text of tabs
   /* GAME.platforms.push(new GAME.Platform({x:-300, y:-90, z:GAME.playerPlane, width:160, height:160,map:GAME.Textures['abouttext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:0, y:-100, z:GAME.playerPlane, width:200, height:200,map:GAME.Textures['announcementstext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:300, y:-101, z:GAME.playerPlane, width:200, height:200,map:GAME.Textures['contacttext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    */
    //var 
    //Backgrounds of tabs  
   GAME.platforms.push(new GAME.Button({x:-4.5*1.25*xSeparation-10, y:-220, z:GAME.playerPlane, width:3*1.25*xSeparation, height:xSeparation/6.0,color:0x666666,opacity:.8, velocityX:0, velocityY:0,mass:1}));
   GAME.platforms.push(new GAME.Button({x:4.5*1.25*xSeparation+10, y:-220, z:GAME.playerPlane, width:3*1.25*xSeparation, height:xSeparation/6.0,color:0x666666, opacity:.8,velocityX:0, velocityY:0,mass:1}));
    
    GAME.platforms.push(new GAME.Button({map:GAME.Textures['sponsors'].threeObj,opacity:.8,trigger: GAME.showTab1,x:-2.5*1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({map:GAME.Textures['schedule'].threeObj,opacity:.8,trigger: GAME.showTab2,x:-1.5*1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({map:GAME.Textures['home'].threeObj,opacity:.8,trigger: GAME.showTab3,x:-.5*1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({map:GAME.Textures['rules&faq'].threeObj,opacity:.8,trigger: GAME.showTab4,x:.5*1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({map:GAME.Textures['resources'].threeObj,opacity:.8,trigger: GAME.showTab5,x:1.5*1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({map:GAME.Textures['contact'].threeObj,opacity:.8,trigger: GAME.showTab6,x:2.5*1.25*xSeparation, y:-220, z:GAME.playerPlane+.02, width:1.25*xSeparation - 5.0, height:xSeparation/6.0,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
  
    
    //Initialize tabs  
    /*GAME.platforms[currPlat].material.opacity = .1;
    GAME.platforms[currPlat+1].material.opacity = 1.0;
    GAME.platforms[currPlat+2].material.opacity = .1;
    GAME.platforms[currPlat+3].material.color = new THREE.Color(0x000000);
    GAME.platforms[currPlat+4].material.color = new THREE.Color(0x0033FF);
    GAME.platforms[currPlat+5].material.color = new THREE.Color(0x000000);*/

    //Create labels of tabs
    var textHeight = xSeparation/10;
    var heightAdjust = 2;/*
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-6],map:GAME.Textures['about'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-6],map:GAME.Textures['announcements'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-6],map:GAME.Textures['contact'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-6],map:GAME.Textures['announcements'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-6],map:GAME.Textures['about'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-6],map:GAME.Textures['contact'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:xSeparation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    */
    //push everying into siteObjects
    for(var i = 0; i < GAME.platforms.length; i++) {
        GAME.siteObjects.push(GAME.platforms[i]);
    }
    //Add all siteobjects to the GAME.scene
     for(var i = 0; i < GAME.siteObjects.length; i++) {
        if(GAME.siteObjects[i].position.z != GAME.backPlane){
            //GAME.siteObjects[i].siteObject = GAME.frontPane;
        }
        //GAME.siteObjects[i].siteObject = GAME.frontPane;
        if(!GAME.siteObjects[i].hidden){
            GAME.scene.add(GAME.siteObjects[i]);
        }

    }

        GAME.showTab3({inGame:true});
                            },
                            
                            
                            
                            render : function() {
}
                            });
    