var GAME = GAME || {};





GAME.Platform = function(params){//(x, y, z, width, height, dWidth, dHeight, map, color, velocityX, velocityY, pathLength, front){
    GAME.SiteObject.call( this, params );
    this.number = GAME.platforms.length;
    this.dX = 0;
    this.dY = 0;
};

GAME.Platform.prototype = GAME.clone(GAME.SiteObject.prototype);
GAME.Platform.prototype.constructor = GAME.Platform;
GAME.Platform.prototype.intersectPlayer = function(params) {
var interNum = params.interNum
//console.log(interNum);
    /*if(interNum==0||interNum==2||interNum==3||interNum==4){
        GAME.collide({object1:GAME.player, object2:this});

        this.setBounds();
        GAME.player.setBounds();
    }else*/ if(interNum===1){
        GAME.player.intersected = true;
        GAME.player.jumps = 0;
        GAME.player.platformNumber = this.number;
        var adjust = GAME.player.height/2;
        GAME.player.velocity.y = this.velocity.y;
        if(GAME.player.velocity.y <0){
            GAME.player.velocity.y = 0;
        }GAME.player.setPosition({x:GAME.player.position.x, y:this.bounds.top+adjust, z:GAME.player.position.z});
        
        GAME.player.setBounds();
        if(GAME.keyUp){
            GAME.friction({object1:GAME.player});
        }
         if(this.trigger){//&&!this.alreadyTriggered){
            //this.trigger();
            //this.alreadyTriggered = true;
        }
    } else if(interNum===0){
        GAME.player.acceleration.x = 0;
        var adjust = GAME.player.width/2;
        GAME.player.velocity.x = this.velocity.x;
        GAME.player.setPosition({x:this.bounds.left-adjust, y:GAME.player.position.y, z:GAME.player.position.z});
        
        GAME.player.setBounds();
    }else if(interNum===2){
        GAME.player.acceleration.x = 0;
        var adjust = GAME.player.width/2;
        GAME.player.velocity.x = this.velocity.x;
        GAME.player.setPosition({x:this.bounds.right+adjust, y:GAME.player.position.y, z:GAME.player.position.z});
        
        GAME.player.setBounds();
    }
    if(!GAME.player.intersected){
        GAME.player.acceleration.x = 0;
    }
}
    