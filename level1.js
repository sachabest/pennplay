var GAME = GAME || {};



var videoD, imageD, imageContextD,
            textureD;


GAME.level1 =new GAME.Level({
                            
init:function() {
    //Doesn't do anything yet, but a way to standardize parallax
    GAME.textPlane = 10;
    GAME.backPlane = -300;
    GAME.playerPlane = 0;


    //Array of site objects
    GAME.siteObjects = [];
    //Array of buttons
    GAME.buttons = [];
    //Array of platforms
    GAME.platforms = [];

    //Create player
    GAME.player = new GAME.Player({ x:0, y:100, z:0, health:100, lives:4, width:10, height:15,color:0x000000, velocityX:0, velocityY:0, pathLength:0,mass:20} );
    GAME.player.reset({level:1});
    


    GAME.frontPane = new GAME.SiteObject({x:0, y:0, z:GAME.playerPlane, width:10, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1});
    GAME.siteObjects.push(GAME.frontPane)
    //Create logo and info platforms
    GAME.platforms.push(new GAME.Platform({x:0, y:95, z:GAME.backPlane, width:200, height:69,map:GAME.Textures['logo'].threeObj, color:0xFFFFFF, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:0, y:15, z:GAME.playerPlane, width:250, height:15,map:GAME.Textures['info'].threeObj, color:0xFFFFFF, velocityX:0, velocityY:0,mass:10}));
   
    //create function to pass in as trigger for sign up link
    GAME.goToForm = function(){
        window.open("https://docs.google.com/spreadsheet/viewform?fromEmail=true&formkey=dFZ2cTlpakhrLXlyc3lidkRTZGZLREE6MA", '_blank');
    }

    //Create sign up platform and its background
    GAME.platforms.push(new GAME.Platform({x:0, y:45, z:GAME.playerPlane, width:500, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({locked:true,siteObject:GAME.platforms[GAME.platforms.length-1],trigger: GAME.goToForm, x:0, y:0, z:GAME.textPlane, width:77, height:17,map:GAME.Textures['signup'].threeObj,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    //Create lowest platform
    GAME.platforms.push(new GAME.Platform({x:0, y:-150, z:GAME.playerPlane, width:1000, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Platform({x:0, y:-200, z:GAME.backPlane, width:1000, height:20,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    
    //Create trigger functions for bottom tabs
    var currPlat = GAME.platforms.length;
    GAME.showTab1 = function(){
        GAME.platforms[currPlat].material.opacity = 1.0;
        GAME.platforms[currPlat+1].material.opacity = .1;
        GAME.platforms[currPlat+2].material.opacity = .1;
        GAME.platforms[currPlat+3].material.color = new THREE.Color(0x0033FF);
        GAME.platforms[currPlat+4].material.color = new THREE.Color(0x000000);
        GAME.platforms[currPlat+5].material.color = new THREE.Color(0x000000);
    }

    GAME.showTab2 = function(){
        GAME.platforms[currPlat].material.opacity = .1;
        GAME.platforms[currPlat+1].material.opacity = 1.0;
        GAME.platforms[currPlat+2].material.opacity = .1;
        GAME.platforms[currPlat+3].material.color = new THREE.Color(0x000000);
        GAME.platforms[currPlat+4].material.color = new THREE.Color(0x0033FF);
        GAME.platforms[currPlat+5].material.color = new THREE.Color(0x000000);
    }


    GAME.showTab3 = function(){
        GAME.platforms[currPlat].material.opacity = .1;
        GAME.platforms[currPlat+1].material.opacity = .1;
        GAME.platforms[currPlat+2].material.opacity = 1.0;
        GAME.platforms[currPlat+3].material.color = new THREE.Color(0x000000);
        GAME.platforms[currPlat+4].material.color = new THREE.Color(0x000000);
        GAME.platforms[currPlat+5].material.color = new THREE.Color(0x0033FF);
    }

    //Create text of tabs
    GAME.platforms.push(new GAME.Platform({x:-300, y:-90, z:GAME.backPlane, width:160, height:160,map:GAME.Textures['abouttext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:0, y:-100, z:GAME.backPlane, width:200, height:200,map:GAME.Textures['announcementstext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    GAME.platforms.push(new GAME.Platform({x:300, y:-101, z:GAME.backPlane, width:200, height:200,map:GAME.Textures['contacttext'].threeObj, color:0x000000, velocityX:0, velocityY:0,mass:10}));
    
    //Backgrounds of tabs
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab1,x:-300, y:-40, z:GAME.playerPlane, width:150, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab2,x:0, y:-40, z:GAME.playerPlane, width:150, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({trigger: GAME.showTab3,x:300, y:-40, z:GAME.playerPlane, width:150, height:10,color:0x000000, velocityX:0, velocityY:0,mass:1}));
    
    
    //Initialize tabs  
    GAME.platforms[currPlat].material.opacity = .1;
    GAME.platforms[currPlat+1].material.opacity = 1.0;
    GAME.platforms[currPlat+2].material.opacity = .1;
    GAME.platforms[currPlat+3].material.color = new THREE.Color(0x000000);
    GAME.platforms[currPlat+4].material.color = new THREE.Color(0x0033FF);
    GAME.platforms[currPlat+5].material.color = new THREE.Color(0x000000);

    //Create labels of tabs
    GAME.platforms.push(new GAME.Button({locked:true,siteObject:GAME.platforms[GAME.platforms.length-3],trigger: GAME.showTab1, map:GAME.Textures['about'].threeObj, x:0, y:0, z:GAME.textPlane, width:150, height:10,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({locked:true,siteObject:GAME.platforms[GAME.platforms.length-3],trigger: GAME.showTab2, map:GAME.Textures['announcements'].threeObj, x:0, y:0, z:GAME.textPlane, width:150, height:10,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    GAME.platforms.push(new GAME.Button({locked:true,siteObject:GAME.platforms[GAME.platforms.length-3],trigger: GAME.showTab3, map:GAME.Textures['contact'].threeObj, x:0, y:0, z:GAME.textPlane, width:150, height:10,color:0xFFFFFF, velocityX:0, velocityY:0,mass:1}));
    
    //push everying into siteObjects
    for(var i = 0; i < GAME.platforms.length; i++) {
        GAME.siteObjects.push(GAME.platforms[i]);
    }
    //Add all siteobjects to the scene
     for(var i = 0; i < GAME.siteObjects.length; i++) {
        if(GAME.siteObjects[i].position.z != GAME.backPlane){
            GAME.siteObjects[i].siteObject = GAME.frontPane;
        }
        //GAME.siteObjects[i].siteObject = GAME.frontPane;
        scene.add(GAME.siteObjects[i]);
    }
                            },
                            
                            
                            
                            render : function() {
}
                            });
    