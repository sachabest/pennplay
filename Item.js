var GAME = GAME || {};





GAME.Item = function(params){//(x, y, z, width, height, dWidth, dHeight, map, color, velocityX, velocityY, pathLength, front){
    params.map = GAME.Textures['coin'].threeObj;
    params.width=25;
    params.height = 30;
    params.locked = true;
    GAME.SiteObject.call( this, params );
    this.number = GAME.platforms.length;
    this.relativePosition = new THREE.Vector3 ( params.x, params.y, params.z );
    this.dX = 0;
    this.dY = 0;
    this.used = false;
    if(params.enabled!=null){
        this.enabled=params.enabled;
    } else{
        this.enabled = true;
    }
    if(params.powerUp!=null){
        this.powerUp = params.powerUp;
    } else{
        this.powerUp=true;
    }
    GAME.coinNumber++;
    this.coinNumber = GAME.coinNumber;
};

GAME.Item.prototype = GAME.clone(GAME.SiteObject.prototype);
GAME.Item.prototype.constructor = GAME.Item;
GAME.Item.prototype.intersectPlayer = function(params) {
    if(!this.used&&this.enabled){
        var interNum = params.interNum;
        if(interNum!=-1){
            if(this.powerUp){
                if(this.trigger){
                    this.trigger();
                }
                //this.siteObject = GAME.player;
                //this.locked = true;
                //GAME.player.score+=10;
                GAME.playerFrame = 0;
                GAME.scene.remove(this);
                GAME.score+=10;
                if(GAME.score == 210){
                    console.log("HELLO");
                    GAME.win();
                }
                var oldHeight = GAME.player.jumpHeight;
                var oldJumps = GAME.player.jumps;
                GAME.player.coins+=1;
                var numCoins = GAME.player.coins%3;
                if(numCoins == 0){
                    GAME.player.grow();
                    document.getElementById("levelup").play();
                } else{
                    if(this.coinNumber%10==0){
                        document.getElementById("coin0").play();
                    } else if(this.coinNumber%10==1){
                        document.getElementById("coin1").play();
                    } else if(this.coinNumber%10==2){
                        document.getElementById("coin2").play();
                    } else if(this.coinNumber%10==3){
                        document.getElementById("coin3").play();
                    } else if(this.coinNumber%10==4){
                        document.getElementById("coin4").play();
                    } else if(this.coinNumber%10==5){
                        document.getElementById("coin5").play();
                    } else if(this.coinNumber%10==6){
                        document.getElementById("coin6").play();
                    } else if(this.coinNumber%10==7){
                        document.getElementById("coin7").play();
                    } else if(this.coinNumber%10==8){
                        document.getElementById("coin8").play();
                    } else if(this.coinNumber%10==9){
                        document.getElementById("coin9").play();
                    } 
                /*document.getElementById("coin1").play();
                document.getElementById("coin2").play();*/
                }
                this.used=true;
            }else{
            if(this.coinNumber%10==0){
                document.getElementById("coin0").play();
            } else if(this.coinNumber%10==1){
                document.getElementById("coin1").play();
            } else if(this.coinNumber%10==2){
                document.getElementById("coin2").play();
            } else if(this.coinNumber%10==3){
                document.getElementById("coin3").play();
            } else if(this.coinNumber%10==4){
                document.getElementById("coin4").play();
            } else if(this.coinNumber%10==5){
                document.getElementById("coin5").play();
            } else if(this.coinNumber%10==6){
                document.getElementById("coin6").play();
            } else if(this.coinNumber%10==7){
                document.getElementById("coin7").play();
            } else if(this.coinNumber%10==8){
                document.getElementById("coin8").play();
            } else if(this.coinNumber%10==9){
                document.getElementById("coin9").play();
            } 
                GAME.scene.remove(this);
                this.used=true;
            }
        }
    }
    /*if(interNum==0||interNum==2||interNum==3||interNum==4){
        GAME.collide({object1:GAME.player, object2:this});

        this.setBounds();
        GAME.player.setBounds();
    }else*/ /*
    if(!this.imaginary){
        if(interNum===1){
            GAME.player.intersected = true;
            GAME.player.jumps = 0;
            GAME.player.platformNumber = this.number;
            GAME.player.siteObject = this;
            var adjust = GAME.player.height/2;
            if(GAME.player.dropThrough&&!this.hardBottom){
                adjust-=2;
            }
            GAME.player.velocity.y = this.velocity.y;
            if(GAME.player.velocity.y <0){
                GAME.player.velocity.y = 0;
            }
            GAME.player.setPosition({x:GAME.player.position.x, y:this.bounds.top+adjust, z:GAME.player.position.z});
            
            GAME.player.setBounds();
            if(GAME.keyUp){
                GAME.friction({object1:GAME.player});
            }
             if(this.trigger&&!this.alreadyTriggered){
                //console.log("TRIGGERED");
                this.trigger();
                this.alreadyTriggered = true;
            }
        } else if(this.hardBottom&&interNum===0){
            GAME.player.acceleration.x = 0;
            var adjust = GAME.player.width/2;
            GAME.player.velocity.x = this.velocity.x;
            GAME.player.setPosition({x:this.bounds.left-adjust, y:GAME.player.position.y, z:GAME.player.position.z});
            
            GAME.player.setBounds();
        }else if(this.hardBottom&&interNum===2){
            GAME.player.acceleration.x = 0;
            var adjust = GAME.player.width/2;
            GAME.player.velocity.x = this.velocity.x;
            GAME.player.setPosition({x:this.bounds.right+adjust, y:GAME.player.position.y, z:GAME.player.position.z});
            
            GAME.player.setBounds();
        }else if(this.hardBottom&&interNum===3){
            //GAME.player.acceleration.x = 0;
            var adjust = GAME.player.height/2;
            GAME.player.velocity.y= this.velocity.y;
            GAME.player.setPosition({x:GAME.player.position.x, y:this.bounds.bottom-adjust, z:GAME.player.position.z});
            
            GAME.player.setBounds();
        }
        if(!GAME.player.intersected){
            GAME.player.acceleration.x = 0;
        }
        if(interNum!=1){
            this.alreadyTriggered=false;
            if(GAME.player.siteObject==this){
                GAME.player.siteObject = null;
            }
        }
    }*/
}

GAME.createLetter = function(params){
    for(var i =0; i < 7; i++){
        for(var j =0; j < 5; j++){
            if(params.letter[i][j]==1){
                GAME.letters.push(new GAME.Item({opacity:0.0,enabled:false,powerUp:false, x:32*j+params.x, y:32*(4-i)+params.y, z:GAME.playerPlane, width:20, height:20,color:0xFFD700, velocityX:0, velocityY:0,mass:1}));
                //GAME.letters.push(GAME.platforms[GAME.platforms.length-1]);
            }
        }
    }
}

GAME.win = function(){
        for(var i = 0; i < GAME.letters.length;i++){  
            GAME.letters[i].enabled=true;
            GAME.letters[i].material.opacity=1.0;
        }
    }
