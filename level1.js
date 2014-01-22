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
    GAME.player = new GAME.Player({ x:0, y:-150, z:0, health:100, lives:4, width:18, height:25,color:0x000000, velocityX:0, velocityY:0, pathLength:0,mass:20} );
    
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
    
    //Create lowest platform
    GAME.gateWay = new GAME.SiteObject({hidden:true, x:0, y:0, z:GAME.playerPlane, width:10, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1});
    GAME.platforms.push(GAME.gateWay);
    GAME.stages = new GAME.SiteObject({hidden:true, x:0, y:0, z:GAME.playerPlane, width:10, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1});
    GAME.platforms.push(GAME.stages);
    GAME.platforms.push(new GAME.Platform({hardBottom:true,siteObject:GAME.gateWay, x:-560, y:-155, z:GAME.playerPlane, width:1000, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({hardBottom:true,siteObject:GAME.gateWay, x:560, y:-155, z:GAME.playerPlane, width:1000, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({hardBottom:false,siteObject:GAME.gateWay, x:0, y:-155, z:GAME.playerPlane, width:120, height:20,color:0xBBBBBB, velocityX:0, velocityY:0,mass:1}));
    
    //Side barriers
    GAME.platforms.push(new GAME.Platform({hardBottom:true,x:-500, y:-20, z:GAME.playerPlane+.01, width:300, height:400,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({hardBottom:true,x:500, y:-20, z:GAME.playerPlane+.01, width:300, height:400,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    
    //Bottom Barrier
    GAME.platforms.push(new GAME.Platform({hardBottom:true,x:0, y:-260, z:GAME.playerPlane+.01, width:4000, height:100,color:0x000000, velocityX:0, velocityY:0,mass:1}));
   
    //GAME.platforms.push(new GAME.Platform({x:0, y:-200, z:GAME.backPlane, width:1000, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
   
    //Create trigger functions for bottom tabs
    var separation = 100;
    var startingHeight =-75;
    var randomXRange = 1000.0;
    var randomYRange = 500.0;
    var randomZRange = 750.0;
    //ABOUT
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:-2*separation, y:startingHeight-20*separation, z:GAME.playerPlane, width:290, height:20,color:0xBBBBBB, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight-20*separation, z:-randomZRange-2, width:1500, height:separation*10,color:0x5555FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFFFF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFFFF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFFFF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFFFF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFFFF55, velocityX:0, velocityY:0,mass:1}));

    //ANNOUNCEMENTS
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:-separation, y:startingHeight-10*separation, z:GAME.playerPlane, width:290, height:20,color:0xBBBBBB, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight-10*separation, z:-randomZRange-2, width:1500, height:separation*10,color:0x55FF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFF55FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFF55FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFF55FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFF55FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0-10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0xFF55FF, velocityX:0, velocityY:0,mass:1}));
    
    //CONTACT
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:0, y:startingHeight, z:GAME.playerPlane, width:290, height:20,color:0xBBBBBB, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight, z:-randomZRange-2, width:1500, height:separation*10,color:0xFF5555, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FFFF, velocityX:0, velocityY:0,mass:1}));


    //ANNOUNCEMENTS
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:separation, y:startingHeight+10*separation, z:GAME.playerPlane, width:290, height:20,color:0xBBBBBB, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight+10*separation, z:-randomZRange-2, width:1500, height:separation*10,color:0xFFFF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x5555FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x5555FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x5555FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x5555FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+10*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x5555FF, velocityX:0, velocityY:0,mass:1}));

    //CONTACT
    GAME.platforms.push(new GAME.Button({hardBottom:false,siteObject:GAME.stages,x:2*separation, y:startingHeight+20*separation, z:GAME.playerPlane, width:290, height:20,color:0xBBBBBB, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:0, y:startingHeight+20*separation, z:-randomZRange-2, width:1500, height:separation*10,color:0xFF55FF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FF55, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({siteObject:GAME.stages,x:randomXRange*Math.random()-randomXRange/2.0, y:startingHeight+randomYRange*Math.random()-randomYRange/3.0+20*separation, z:-1 -250- (randomZRange-250)*Math.random(), width:50, height:50,color:0x55FF55, velocityX:0, velocityY:0,mass:1}));



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
    var moveSpeed = 2;
    var selecedColor = 0xFFFFFF;
    GAME.showTab1 = function(){
        GAME.gateWay.moveToLocation({velocityX:moveSpeed, targetX:-2*separation});
        GAME.stages.moveToLocation({velocityY:10*moveSpeed, targetY:20 * separation});
        GAME.platforms[currPlat].material.opacity = 1;
        GAME.platforms[currPlat+1].material.opacity = 0;
        GAME.platforms[currPlat+2].material.opacity = 0;
        GAME.platforms[currPlat+3].material.opacity = 0;
        GAME.platforms[currPlat+4].material.opacity = 0;
        //GAME.player.moveToLocation({velocityX:moveSpeed, targetX:-2*separation});
    }

    GAME.showTab2 = function(){
        GAME.gateWay.moveToLocation({velocityX:moveSpeed, targetX:-separation});
        GAME.stages.moveToLocation({velocityY:10*moveSpeed, targetY:10*separation});
        GAME.platforms[currPlat].material.opacity = 0;
        GAME.platforms[currPlat+1].material.opacity = 1;
        GAME.platforms[currPlat+2].material.opacity = 0;
        GAME.platforms[currPlat+3].material.opacity = 0;
        GAME.platforms[currPlat+4].material.opacity = 0;
        //GAME.platforms[currPlat+3].material.color = new THREE.Color(selecedColor);
    }


    GAME.showTab3 = function(){
        GAME.gateWay.moveToLocation({velocityX:moveSpeed, targetX:0});
        GAME.stages.moveToLocation({velocityY:10*moveSpeed, targetY:0});
        GAME.platforms[currPlat].material.opacity = 0;
        GAME.platforms[currPlat+1].material.opacity = 0;
        GAME.platforms[currPlat+2].material.opacity = 1;
        GAME.platforms[currPlat+3].material.opacity = 0;
        GAME.platforms[currPlat+4].material.opacity = 0;
        //GAME.platforms[currPlat+4].material.color = new THREE.Color(selecedColor);
    }

    GAME.showTab4 = function(){
        GAME.gateWay.moveToLocation({velocityX:moveSpeed, targetX:separation});
        GAME.stages.moveToLocation({velocityY:10*moveSpeed, targetY:-10*separation});
        GAME.platforms[currPlat].material.opacity = 0;
        GAME.platforms[currPlat+1].material.opacity = 0;
        GAME.platforms[currPlat+2].material.opacity = 0;
        GAME.platforms[currPlat+3].material.opacity = 1;
        GAME.platforms[currPlat+4].material.opacity = 0;
        //GAME.platforms[currPlat+5].material.color = new THREE.Color(selecedColor);
    }


    GAME.showTab5 = function(){
        GAME.gateWay.moveToLocation({velocityX:moveSpeed, targetX:2*separation});
        GAME.stages.moveToLocation({velocityY:10*moveSpeed, targetY:-20*separation});
        GAME.platforms[currPlat].material.opacity = 0;
        GAME.platforms[currPlat+1].material.opacity = 0;
        GAME.platforms[currPlat+2].material.opacity = 0;
        GAME.platforms[currPlat+3].material.opacity = 0;
        GAME.platforms[currPlat+4].material.opacity = 1;
        //GAME.platforms[currPlat+6].material.color = new THREE.Color(selecedColor);
    }
    //Highlights of tabs
    var border = 3;
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:-2*separation, y:-200, z:GAME.playerPlane-.1, width:separation - separation/10.0+border, height:10+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:-separation, y:-200, z:GAME.playerPlane-.1, width:separation - separation/10.0+border, height:10+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:0, y:-200, z:GAME.playerPlane-.1, width:separation - separation/10.0+border, height:10+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:separation, y:-200, z:GAME.playerPlane-.1, width:separation - separation/10.0+border, height:10+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,opacity:0,x:2*separation, y:-200, z:GAME.playerPlane-.1, width:separation - separation/10.0+border, height:10+border,color:selecedColor, velocityX:0, velocityY:0,mass:1}));

    //Create text of tabs
   /* GAME.platforms.push(new GAME.Platform({x:-300, y:-90, z:GAME.playerPlane, width:160, height:160,map:GAME.Textures['abouttext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:0, y:-100, z:GAME.playerPlane, width:200, height:200,map:GAME.Textures['announcementstext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:300, y:-101, z:GAME.playerPlane, width:200, height:200,map:GAME.Textures['contacttext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    */
    //var 
    //Backgrounds of tabs  
    GAME.platforms.push(new GAME.Button({x:-3*separation-450, y:-200, z:GAME.playerPlane, width:1000, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({x:3*separation+450, y:-200, z:GAME.playerPlane, width:1000, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab1,x:-2*separation, y:-200, z:GAME.playerPlane, width:separation - separation/10.0, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab2,x:-separation, y:-200, z:GAME.playerPlane, width:separation - separation/10.0, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab3,x:0, y:-200, z:GAME.playerPlane, width:separation - separation/10.0, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab4,x:separation, y:-200, z:GAME.playerPlane, width:separation - separation/10.0, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab5,x:2*separation, y:-200, z:GAME.playerPlane, width:separation - separation/10.0, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
  
    
    //Initialize tabs  
    /*GAME.platforms[currPlat].material.opacity = .1;
    GAME.platforms[currPlat+1].material.opacity = 1.0;
    GAME.platforms[currPlat+2].material.opacity = .1;
    GAME.platforms[currPlat+3].material.color = new THREE.Color(0x000000);
    GAME.platforms[currPlat+4].material.color = new THREE.Color(0x0033FF);
    GAME.platforms[currPlat+5].material.color = new THREE.Color(0x000000);*/

    //Create labels of tabs
    var textHeight = separation/10;
    var heightAdjust = 2;
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab1, map:GAME.Textures['about'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:separation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab2, map:GAME.Textures['announcements'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:separation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab3, map:GAME.Textures['contact'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:separation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab2, map:GAME.Textures['announcements'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:separation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({imaginary:true,siteObject:GAME.platforms[GAME.platforms.length-5],trigger: GAME.showTab3, map:GAME.Textures['about'].threeObj, x:0, y:heightAdjust, z:GAME.textPlane, width:separation, height:textHeight,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
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
    