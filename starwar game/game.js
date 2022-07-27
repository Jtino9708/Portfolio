$(function(){
    var canvas = $('#canvas')[0];
    var context = canvas.getContext('2d');
    var shipX = 300;
    var shipY = 450;
    var shipBarrelX = 290;
    var shipBarrelY = 410;
    var barrelWidth = 20;
    var barrelHeight = 30;
    var shipRadius = 25;
    
    function drawship(){
        context.fillStyle = 'rgba(0,0,0,0.1)';
        context.fillRect(shipBarrelX,shipBarrelY,barrelWidth,barrelHeight);
        context.beginPath();
        context.arc(shipX,shipY,shipRadius,0,Math.PI*2,true);
        context.fill();
        context.drawImage(falcon,shipX-32,shipY-55);
    }
    //drawship();
    
    var bullet = new Array();
    // var bulletX = shipBarrelX+10;
    // var bulletY = shipBarrelY;
    var bulletRadius = 8;
    function drawBullet(){
        fire();
        for (var i = 0;i<bullet.length;i++){
            context.beginPath();
            context.arc(bullet[i].bulletX,bullet[i].bulletY,bulletRadius,0, Math.PI*2,true);
            if(bullet[i].who == 'enemy'){
                context.fillStyle = 'rgba(255,0,0,0)';
                context.drawImage(bulletRed,bullet[i].bulletX-bulletRadius,bullet[i].bulletY-bulletRadius)
            }else if(bullet[i].who == 'ship'){
                context.fillStyle = 'rgba(255,0,0,0)';
                context.drawImage(bulletBlue,bullet[i].bulletX-bulletRadius,bullet[i].bulletY-bulletRadius)
            }else{
                context.fillStyle = 'rgba(255,0,0,0)';
                context.drawImage(bulletOrange,bullet[i].bulletX-bulletRadius,bullet[i].bulletY-bulletRadius)
            }
            context.fill();
            if(bullet[i].bulletY < -50 ||bullet[i].bulletY > 650){
                bullet.splice(i,1);
            }
        }
    }

    var enemy = new Array();
    var enemyRoundKill = 0;
    var toBoss = 'false';
    //enemy =[{enemyX:0,enemyY:0,enemytype:3,enemySpeedX:1,enemySpeedY:1,enemyDeltaX:1,enemyDeltaY:1}]
    var enemyWidth = 52;
    var enemyHeight = 52;
    function drawEnemy(){
        for(i=0;i<enemy.length;i++){

            context.fillStyle = 'rgba(0,0,0,0.1)';
            context.fillRect(enemy[i].enemyX,enemy[i].enemyY,enemyWidth,enemyHeight);
            context.drawImage(TIEfighter,enemy[i].enemyX,enemy[i].enemyY) 
                
            if(enemyRoundKill>0 && enemyRoundKill%(1+whichBoss) == 0){
                clearInterval(newEnemySI);
                enemy.splice(0,enemy.length);
                //bullet.splice(0,bullet.length);
                toBoss = 'true';
            }
        }
    }
    
    
    function animate(){
        context.clearRect(0,0,canvas.width,canvas.height);
        drawStarBackground();
        drawship();
        shipMoveTo();
        drawBullet();
        moveBullet();
        drawEnemy();
        enemyMove();
        drawBoss();
        bossMove();
        drawShield();
        drawWeapon();
        drawAndMoveIteam();
        bloodAndScore();
        
    }

    var gameloop;
    var shipMove;
    var onFire;
    var fireNext;
    var weaponOn;
    var weaponNext;
    function startGame(){

        shipMove = 'NONE';
        onFire = 'NONE';
        fireNext = 'OK';
        weaponOn = 'NONE';
        weaponNext = 'OK';
        //gameloop = setInterval(animate,1000/120);

        $(document).keydown(function(evt){
            if (evt.keyCode == 39){
                shipMove = 'RIGHT';
            }else if (evt.keyCode == 37){
                shipMove = 'LEFT';
            }else if (evt.keyCode == 38){
                shipMove = 'GOUP';
                //console.log(shipmove);
            }else if (evt.keyCode == 40){
                shipMove = 'GODOWN';
                //console.log(shipmove);
            }else if (evt.keyCode == 90){
                onFire = 'ONFIRE';
            }else if (evt.keyCode == 88){
                shieldOn = 'SHIELDON';
            }else if (evt.keyCode == 67){
                weaponOn = 'ONWEAPON';
            }
        });
        $(document).keyup(function(evt){
            if (evt.keyCode == 39){
                shipMove = 'NONE';
            }else if (evt.keyCode == 37){
                shipMove = 'NONE';
            }else if (evt.keyCode == 38){
                shipMove = 'NONE';
            }else if (evt.keyCode == 40){
                shipMove = 'NONE';
            }else if (evt.keyCode == 90){
                onFire = 'NONE';
                fireNext = 'OK';
            }
            else if (evt.keyCode == 67){
                weaponOn = 'NONE';
                weaponNext = 'OK';
            }
        });


    }
    startGame();

    //shipMove
    var shipDeltaX;
    var shipDeltaY;
    var shipSpeedX = 10;
    var shipSpeedY = 10;
    function shipMoveTo(){
        // console.log(shipMove);
        if(shipMove == 'RIGHT'){
            shipDeltaX = shipSpeedX;
            if(shipX+shipRadius > canvas.width){
                shipDeltaX = 0;
            }
        }else if(shipMove == 'LEFT'){
            shipDeltaX = -shipSpeedX;
            if(shipX-shipRadius < 0){
                shipDeltaX = 0;
            }
        }else if(shipMove == 'GOUP'){
            //console.log('1');
            shipDeltaY = -shipSpeedY;
            if(shipY-(shipY-shipBarrelY) < canvas.height/2){
                shipDeltaY = 0;
            }
        }else if(shipMove == 'GODOWN'){
            //console.log('2');
            shipDeltaY = shipSpeedY;
            if(shipY+shipRadius > canvas.height){
                shipDeltaY = 0;
            }
        }else{
            shipDeltaX = 0;
            shipDeltaY = 0;
        }
        shipX += shipDeltaX;
        shipBarrelX += shipDeltaX;
        shipY += shipDeltaY;
        shipBarrelY += shipDeltaY;
        //keep with mouse
        // $(canvas).mousemove(function(event){
        //     shipX = event.offsetX;
        //     shipBarrelX = event.offsetX-10;
        //     shipY = event.offsetY;
        //     shipBarrelY = event.offsetY-40;
        // });


    }

    var bulletDeltaY = 5;
    var bulletDeltaX = 5;
    function moveBullet(){
        for (var i = 0;i<bullet.length;i++){
            bulletDeltaY = bullet[i].bulletSpeedY;
            bulletDeltaX = bullet[i].bulletSpeedX;
            if(bullet[i].who == "ship"){
                bullet[i].bulletY -= bulletDeltaY;
            }else if(bullet[i].who == "enemy"){
                bullet[i].bulletY += bulletDeltaY;
            }else if(bullet[i].who == "boss"){
                bullet[i].bulletY += bulletDeltaY;
                bullet[i].bulletX += bulletDeltaX;
            }
        }   
    }

    var enemyDeltaX;
    var enemyDeltaY;
    function enemyMove(){
        for(i=0;i<enemy.length;i++){
            enemy[i].enemySpeedX = 2*Math.random();
            enemy[i].enemySpeedY = 2*Math.random();
            if(enemy[i].enemyX+enemyWidth>canvas.width){
                enemy[i].enemyDeltaX = -enemy[i].enemySpeedX
            }
            if(enemy[i].enemyX<0){
                enemy[i].enemyDeltaX = enemy[i].enemySpeedX
            }
            if(enemy[i].enemyY<0){
                enemy[i].enemyDeltaY = enemy[i].enemySpeedY
            }
            if(enemy[i].enemyY+enemyHeight>(canvas.height/3)){
                enemy[i].enemyDeltaY = -enemy[i].enemySpeedY
            }
            enemy[i].enemyX +=enemy[i].enemyDeltaX;
            enemy[i].enemyY +=enemy[i].enemyDeltaY;
        }
    }
        //ship attak
    var waitBossTofireNext ='OK';
    function fire(){
        if(onFire == 'ONFIRE' && fireNext == 'OK' && waitBossTofireNext =='OK'){
            bullet.push({bulletX:shipBarrelX+10,bulletY:shipBarrelY,bulletSpeedY : 5,who:"ship"});
            const lazerSound = new Audio('/sound/lazer.wav');
            lazerSound.play();
            fireNext = 'NONE';
        }                
    }

    // enemy attak
    var enemyFireSI; //= setInterval(enemyFire,1000);
    function enemyFire(){
        if(enemy.length){
            const enemyFireSound = new Audio('/sound/enemyFire.wav');
            enemyFireSound.play();
        }
        for(i=0;i<enemy.length;i++){
            bullet.push({bulletX:(enemy[i].enemyX+25),bulletY:(enemy[i].enemyY+25),bulletSpeedY : Math.floor(Math.random()*4+1),who:"enemy"});
        }
    }
    
    var newEnemySI; //= setInterval(newEnemy,1000);
    function newEnemy(){
        if(enemy.length<(4+whichBoss)){
            enemy.push({enemyX:0,enemyY:0,enemytype:3,enemySpeedX:1,enemySpeedY:1,enemyDeltaX:2.5,enemyDeltaY:2.5});
        }
    }

    //boss
    var drawBossCountdowntype = 0;
    function drawBossCountdown(){
        switch(drawBossCountdowntype){
            case 1:
                context.drawImage(bossText,canvas.width/2-100,canvas.height/2-50);
                break;
            case 2:
                context.drawImage(oneText,canvas.width/2-50,canvas.height/2-50);
                break;
            case 3:
                context.drawImage(twoText,canvas.width/2-50,canvas.height/2-50);
                break;
            case 4:
                context.drawImage(threeText,canvas.width/2-50,canvas.height/2-50);
                break;

        }
            
    }
    
    var bossX = 0;
    var bossY = -150;
    var bossWidth = 200;
    var bossHeight = 70;
    var bossBlood = 600;
    var countdowmTimer = 0;
    var whichBoss = 1;
    function drawBoss(){
        if(toBoss == 'true'){
            countdowmTimer +=1;
            context.fillStyle="rgba(255,255,255,0)";
            context.fillRect(bossX,bossY,bossWidth,bossHeight);
            context.drawImage(superBoss,bossX,bossY);
            context.fillStyle="rgba(255,255,0,0.5)";
            context.fillRect((canvas.width-bossBlood)/2,0,bossBlood,30);
            waitBossTofireNext = 'NONE';
            if(countdowmTimer==1){drawBossCountdowntype=1}
            else if(countdowmTimer==240){drawBossCountdowntype=4}
            else if(countdowmTimer==360){drawBossCountdowntype=3}
            else if(countdowmTimer==480){drawBossCountdowntype=2}
            else if(countdowmTimer>600){drawBossCountdowntype=0;waitBossTofireNext ='OK'}
            drawBossCountdown();
        }else if(toBoss =='false'){countdowmTimer = 0;}
    }

    var bossDeltaX = 0;
    var bossDeltaY = 0;
    var bossSpeedX = 0;
    var bossStartSpeedX = 0.5;
    var bossSpeedY = 0 ;
    var bossStartSpeedY = 0.3;
    function bossMove(){
        if(toBoss == 'true'){
            if(bossY < -5){
                bossDeltaY = bossStartSpeedY;
                bossDeltaX = bossStartSpeedX;
            }else{
                bossSpeedX = 2*Math.random();
                bossSpeedY = 2*Math.random();
                if(bossX+bossWidth>canvas.width){
                    bossDeltaX = -bossSpeedX
                }
                if(bossX<=0){
                    bossDeltaX = bossSpeedX
                }
                if(bossY<=0){
                    bossDeltaY = bossSpeedY
                }
                if(bossY+bossHeight>(canvas.height/3)){
                    bossDeltaY = -bossSpeedY
                }
            }
            bossX += bossDeltaX;
            bossY += bossDeltaY;
        }

    }
    
    //boss fire
    const bossFireSound = new Audio('/sound/bossFire.wav');
    function bossFire(){
        if(toBoss == 'true' && countdowmTimer>600){
            //console.log(whichBoss);
            switch(whichBoss){
                case 1:
                    bossFireSound.play();
                    bullet.push({bulletX:(bossX+25),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    bullet.push({bulletX:(bossX+175),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    break;
                case 2:
                    bossFireSound.play();
                    bullet.push({bulletX:(bossX+25),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    bullet.push({bulletX:(bossX+25),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    bullet.push({bulletX:(bossX+175),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    bullet.push({bulletX:(bossX+175),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    break;
                case 3:
                    bossFireSound.play();
                    bullet.push({bulletX:(bossX+25),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    bullet.push({bulletX:(bossX+25),bulletY:(bossY+70),bulletSpeedY : 3.5,bulletSpeedX : Math.random()*5-2.5,who:"boss"});
                    bullet.push({bulletX:(bossX+175),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    bullet.push({bulletX:(bossX+175),bulletY:(bossY+70),bulletSpeedY : 3.5,bulletSpeedX : Math.random()*5-2.5,who:"boss"});
                    break;
                default:
                    bossFireSound.play();
                    bullet.push({bulletX:(bossX+25),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    bullet.push({bulletX:(bossX+175),bulletY:(bossY+70),bulletSpeedY : 3,bulletSpeedX : Math.random()*4-2,who:"boss"});
                    break;
            }
        }
    }


    //
    var upgradeIteam = []; //upgradeIteam = [{iteamX,iteamY,iteamDeltaX,iteamDeltaY,iteamReboundTime,type:["shield" || "weapon"]}];
    var iteamRadius = 15;
    var iteamSpeed = 2;
    var iteamDeltaX = 1.5;
    var iteamDeltaY = -1;
    var shipIteam = {shield:0,weapon:0};  //shipiteam = {shield:0,weapon:0}
    function drawAndMoveIteam(){
        for(i=0;i<upgradeIteam.length;i++){
            //draw
            context.fillStyle = 'red'//'rgba(0,0,0,0.1)';
            context.beginPath();
            context.arc(upgradeIteam[i].iteamX,upgradeIteam[i].iteamY,iteamRadius,0,Math.PI*2,true);
            context.fill();
            if(upgradeIteam[i].type == "shield"){
                context.drawImage(shieldBubble,upgradeIteam[i].iteamX-15,upgradeIteam[i].iteamY-15);
            }else if(upgradeIteam[i].type == "weapon"){
                context.drawImage(weaponBubble,upgradeIteam[i].iteamX-15,upgradeIteam[i].iteamY-15);
            }

            //move
            if(upgradeIteam[i].iteamReboundTime<10){
                if(upgradeIteam[i].iteamX+iteamRadius>canvas.width){
                    upgradeIteam[i].iteamDeltaX = -iteamSpeed
                    upgradeIteam[i].iteamReboundTime+=1;
                }
                if(upgradeIteam[i].iteamX-iteamRadius<0){
                    upgradeIteam[i].iteamDeltaX = iteamSpeed
                    upgradeIteam[i].iteamReboundTime+=1;
                }
                if(upgradeIteam[i].iteamY-iteamRadius<0){
                    upgradeIteam[i].iteamDeltaY = iteamSpeed
                    upgradeIteam[i].iteamReboundTime+=1;
                }
                if(upgradeIteam[i].iteamY+iteamRadius>canvas.height){
                    upgradeIteam[i].iteamDeltaY = -iteamSpeed
                    upgradeIteam[i].iteamReboundTime+=1;
                }
                upgradeIteam[i].iteamX +=upgradeIteam[i].iteamDeltaX;
                upgradeIteam[i].iteamY +=upgradeIteam[i].iteamDeltaY;
            }else{
                upgradeIteam[i].iteamX +=iteamDeltaX;
                upgradeIteam[i].iteamY +=iteamDeltaY;
                if(upgradeIteam[i].iteamX<-50||upgradeIteam[i].iteamX>650||
                    upgradeIteam[i].iteamY<-50||upgradeIteam[i].iteamY>650){
                        upgradeIteam.splice(i,1);
                    }
            }
            //get iteam
            if(Math.hypot(Math.abs(upgradeIteam[i].iteamY-shipY),Math.abs(upgradeIteam[i].iteamX-shipX))<=iteamRadius+shipRadius)
            {
                if(upgradeIteam[i].type == "shield" && shipIteam.shield<3){
                    shipIteam.shield +=1;
                }else if(upgradeIteam[i].type == "weapon"){
                    shipIteam.weapon = 3;
                }
                console.log(shipIteam);
                upgradeIteam.splice(i,1);
            }
        }
    }

    var shieldRadius = 50;
    var shieldLive = 5;
    var shieldOn = 'NONE';
    var shieldSoundTag = 'off';
    function drawShield(){
        if(shieldOn == 'SHIELDON' && shipIteam.shield>0){
            if(shieldSoundTag == 'off'){
                const shieldSound = new Audio('/sound/shield.wav');
                shieldSound.play();
                shieldSoundTag = 'on';
            }
            context.fillStyle = 'rgba(60,58,244,0.4)';
            context.beginPath();
            context.arc(shipX,shipY-10,shieldRadius,0,Math.PI*2,true);
            context.fill();
            context.drawImage(shieldImg,shipX-50,shipY-60);
            for(i=0;i<bullet.length;i++){
                if(Math.hypot(Math.abs(bullet[i].bulletY-shipY),Math.abs(bullet[i].bulletX-shipX))<=bulletRadius+shieldRadius 
                &&(bullet[i].who == "enemy"||bullet[i].who == "boss"))
                {
                    bullet.splice(i,1);
                    shieldLive-=1;
                }
            }
            if(shieldLive <= 0){
                shipIteam.shield -= 1;
                shieldOn = 'NONE';
                shieldSoundTag = 'off';
                shieldLive = 5;
                console.log(shipIteam);
            }
        }
    }

    var weaponRadius = 15;
    var weaponSpeed = 5;
    var weapon = [];  //weapon = {weaponX,weaponY,weaponDeltaY}
    function drawWeapon(){
        for(i=0;i<weapon.length;i++){
            context.fillStyle = 'rgba(226, 252, 28, 0.4)';
            context.beginPath();
            context.arc(weapon[i].weaponX,weapon[i].weaponY,weaponRadius,0,Math.PI*2,true);
            context.fill();
            context.drawImage(weaponImg,weapon[i].weaponX-15,weapon[i].weaponY-15);
            weapon[i].weaponY -= weaponSpeed;
            if(weapon[i].weaponY<=-50){weapon.splice(i,1);};
            //weapon hit enemy
            for (var y = 0;y<enemy.length;y++){
                if(weapon[i].weaponY-weaponRadius <= enemy[y].enemyY+enemyHeight && weapon[i].weaponY+weaponRadius >= enemy[y].enemyY
                && weapon[i].weaponX+weaponRadius>enemy[y].enemyX && weapon[i].weaponX-weaponRadius<enemy[y].enemyX+enemyWidth){
                    //console.log(bullet[i]);
                    score+=1;
                    enemy[y].enemytype=0;
                    enemy[y].enemyY-=5;
                    enemy[y].enemyX-=5;
                    weapon.splice(i,1);
                    //enemy dead
                    if(enemy[y].enemytype<=0){
                        let temp = Math.floor(Math.random()*4+1);
                        if(temp == 1){
                            upgradeIteam.push({iteamX:enemy[y].enemyX,iteamY:enemy[y].enemyY,iteamDeltaX:1.5,iteamDeltaY:-1,iteamReboundTime:0,type:"shield"})
                        }else if(temp == 2){
                            upgradeIteam.push({iteamX:enemy[y].enemyX,iteamY:enemy[y].enemyY,iteamDeltaX:1.5,iteamDeltaY:1,iteamReboundTime:0,type: "weapon"})
                        }
                        score+=5;
                        enemy.splice(y,1);
                        enemyRoundKill +=1;
                    }
                }
            }
            //weapon hit boss
            if(weapon[i].weaponY-weaponRadius<=bossY+bossHeight && weapon[i].weaponY+weaponRadius>=bossY
            && weapon[i].weaponX+weaponRadius>=bossX && weapon[i].weaponX-weaponRadius<=bossX+bossWidth ){
                score+=1;
                weapon.splice(i,1);
                bossY -=5;
                bossX -=5;
                bossBlood -= 100;
                //boss dead
                if(bossBlood <= 0){
                    let temp = Math.floor(Math.random()*2+1);
                    if(temp == 1){
                        upgradeIteam.push({iteamX:bossX,iteamY:bossY,iteamDeltaX:1.5,iteamDeltaY:-1,iteamReboundTime:0,type:"shield"})
                    }else if(temp == 2){
                        upgradeIteam.push({iteamX:bossX,iteamY:bossY,iteamDeltaX:1.5,iteamDeltaY:1,iteamReboundTime:0,type: "weapon"})
                    }
                    score+=100;
                    bossX = 0;
                    bossY = -150;
                    bossBlood = 600;
                    toBoss = 'false';
                    waitBossTofireNext ='OK';
                    //bullet.splice(0,bullet.length);
                    enemyRoundKill = 0;
                    newEnemySI=setInterval(newEnemy,2000);
                    whichBoss += 1;
                }
            }

        }
        if(weaponOn =='ONWEAPON' && weaponNext == 'OK' && waitBossTofireNext =='OK'&& shipIteam.weapon>0){
            weapon.push({weaponX:shipBarrelX+10,weaponY:shipBarrelY})
            shipIteam.weapon -= 1; 
            const weaponSound = new Audio('/sound/weapon.wav');
            weaponSound.play();
            weaponNext = 'NONE';
        }
    }

    var blood = 300;
    var bloodBarHeight = 20;
    var score = 0;
    function bloodAndScore(){
        context.font="10pt Time New Romen";
        context.fillStyle="orange";
        context.fillRect(0,canvas.height-bloodBarHeight,blood,bloodBarHeight);
        context.fillStyle="white";
        context.fillText('blood: '+blood/10,10, canvas.height - 5);
        context.fillText('score: '+score,canvas.width-100, canvas.height - 5);
        //shield
        context.fillStyle = 'rgba(60,58,244,0.4)';
        context.beginPath();
        context.arc(130,canvas.height - 50,15,0,Math.PI*2,true);
        context.fill();
        context.drawImage(shieldSmallImg,115,canvas.height - 65);
        context.font="20pt Time New Romen";
        context.fillStyle = 'white';
        context.fillText('X '+shipIteam.shield,155,canvas.height - 40);
        //weapon
        context.fillStyle = 'rgba(226, 252, 28, 0.4)';
        context.beginPath();
        context.arc(40,canvas.height - 50,15,0,Math.PI*2,true);
        context.fill();
        context.drawImage(weaponImg,25,canvas.height - 65);
        context.font="20pt Time New Romen";
        context.fillStyle = 'white';
        context.fillText('X '+shipIteam.weapon,65,canvas.height - 40);

        for (var i = 0;i<bullet.length;i++){
            if(bullet[i].who == "ship"){
                //bullet hit enemy
                for (var y = 0;y<enemy.length;y++){
                    if(bullet[i].bulletY-bulletRadius <= enemy[y].enemyY+enemyHeight && bullet[i].bulletY+bulletRadius >= enemy[y].enemyY
                    && bullet[i].bulletX+bulletRadius>enemy[y].enemyX && bullet[i].bulletX-bulletRadius<enemy[y].enemyX+enemyWidth){
                        //console.log(bullet[i]);
                        score+=1;
                        enemy[y].enemytype-=1;
                        enemy[y].enemyY-=5;
                        enemy[y].enemyX-=5;
                        bullet.splice(i,1);
                        //enemy dead
                        if(enemy[y].enemytype<=0){
                            let temp = Math.floor(Math.random()*4+1);
                            if(temp == 1){
                                upgradeIteam.push({iteamX:enemy[y].enemyX,iteamY:enemy[y].enemyY,iteamDeltaX:1.5,iteamDeltaY:-1,iteamReboundTime:0,type:"shield"})
                            }else if(temp == 2){
                                upgradeIteam.push({iteamX:enemy[y].enemyX,iteamY:enemy[y].enemyY,iteamDeltaX:1.5,iteamDeltaY:1,iteamReboundTime:0,type: "weapon"})
                            }
                            score+=5;
                            enemy.splice(y,1);
                            enemyRoundKill +=1;
                        }
                    }
                }
                //bullet hit boss
                if(bullet[i].bulletY-bulletRadius<=bossY+bossHeight && bullet[i].bulletY+bulletRadius>=bossY
                && bullet[i].bulletX+bulletRadius>=bossX && bullet[i].bulletX-bulletRadius<=bossX+bossWidth ){
                    score+=1;
                    bullet.splice(i,1);
                    bossY -=5;
                    bossX -=5;
                    bossBlood -= 10;
                    //boss dead
                    if(bossBlood == 0){
                        let temp = Math.floor(Math.random()*2+1);
                        if(temp == 1){
                            upgradeIteam.push({iteamX:bossX,iteamY:bossY,iteamDeltaX:1.5,iteamDeltaY:-1,iteamReboundTime:0,type:"shield"})
                        }else if(temp == 2){
                            upgradeIteam.push({iteamX:bossX,iteamY:bossY,iteamDeltaX:1.5,iteamDeltaY:1,iteamReboundTime:0,type: "weapon"})
                        }
                        score+=100;
                        bossX = 0;
                        bossY = -150;
                        bossBlood = 600;
                        toBoss = 'false';
                        waitBossTofireNext ='OK';
                        //bullet.splice(0,bullet.length);
                        enemyRoundKill = 0;
                        newEnemySI=setInterval(newEnemy,2000);
                        whichBoss += 1;
                    }
                }
            }else if(bullet[i].who == "enemy" ||bullet[i].who == "boss"){
                if(Math.hypot(Math.abs(bullet[i].bulletY-shipY),Math.abs(bullet[i].bulletX-shipX))<=bulletRadius+shipRadius
                ){
                    //console.log(bullet[i]);
                    blood-=10;
                    shipY +=5;
                    shipX +=5;
                    shipBarrelX +=5;
                    shipBarrelY +=5;
                    bullet.splice(i,1);
                    if(blood<=0){
                        clearInterval(gameloop);
                        clearInterval(enemyFireSI);
                        clearInterval(newEnemySI);
                        clearInterval(bossFireSI);
                        bgMusic.pause();
                        const gameOverSound = new Audio('/sound/gameover.wav');
                        gameOverSound.play();
                        context.clearRect(0,0,canvas.width,canvas.height);
                        $('#restart').css('visibility','visible');
                        document.getElementById("nameSingIn").style.height = "100%";
                        $('#endScore').text(`score: ${score}`);
                        // context.fillStyle = 'white';
                        // context.fillText('Game Over',canvas.width/2, canvas.height/2);
                    }
                }
            }
            
        }
    }



    //background
    var backgroundY = -100;
    function drawStarBackground(){
        if(backgroundY == 600){backgroundY=-100;}
        context.drawImage(starBackground,0,backgroundY);
        context.drawImage(starBackground,0,backgroundY-700);
        backgroundY += 5;
    }
    

    $('#stop').on('click',function(){
        clearInterval(gameloop);
        clearInterval(enemyFireSI);
        clearInterval(newEnemySI);
        clearInterval(bossFireSI);
        $('#stop').css('visibility','hidden');
        $('#start').css('visibility','visible');
        $('#restart').css('visibility','hidden');
    })
    $('#start').on('click',function(){
        gameloop=setInterval(animate,1000/120);
        enemyFireSI=setInterval(enemyFire,1000);
        bossFireSI = setInterval(bossFire,500);
        newEnemy();
        newEnemySI=setInterval(newEnemy,2000);
        $('#stop').css('visibility','visible');
        $('#start').css('visibility','hidden');
        $('#restart').css('visibility','hidden');  
    })
    $('#restart').on('click',function(){
        clearInterval(gameloop);
        clearInterval(enemyFireSI);
        clearInterval(newEnemySI);
        clearInterval(bossFireSI);
        shipX = 300;
        shipY = 450;
        bossX = 0;
        bossY = -150;
        shipBarrelX = 290;
        shipBarrelY = 410;
        enemyRoundKill = 0;
        blood = 300;
        score = 0;
        toBoss = 'false';
        waitBossTofireNext ='OK';
        whichBoss = 1;
        bossBlood = 600;
        shipIteam = {shield:0,weapon:0};
        enemy.splice(0,enemy.length);
        bullet.splice(0,bullet.length);
        gameloop=setInterval(animate,1000/120);
        enemyFireSI=setInterval(enemyFire,1000);
        bossFireSI = setInterval(bossFire,500);
        newEnemy();
        newEnemySI=setInterval(newEnemy,2000);
        $('#stop').css('visibility','visible');
        $('#start').css('visibility','hidden');
        $('#restart').css('visibility','hidden');
        bgMusic.currentTime = 0;
        bgMusic.play();
    })
    const bgMusic = new Audio('/sound/bgmusic.wav');
    $("#doorbtn1").on('click',function(){
        document.getElementById("mydoornav").style.width = "0";
        document.getElementById("mydoornav2").style.width = "0";
        myrankList();
        bgMusic.play();
        bgMusic.loop = true;
    })
    $("#rankSingInBtn").on('click',function () {
        document.getElementById("nameSingIn").style.height = "0";
        player=$('#playerName').prop('value');
        totalScore = score;
        myrankList(player,totalScore);
    })

    //rankList
    var rankList = [{name:"ABC",score:0},{name:"ABC",score:0},{name:"ABC",score:0},
                    {name:"ABC",score:0},{name:"ABC",score:0},{name:"ABC",score:0},
                    {name:"ABC",score:0},{name:"ABC",score:0},{name:"ABC",score:0},
                    {name:"ABC",score:0}]; //rankList = [{name:ABC,score:123}]
    function myrankList(player="ABC",totalScore=0){
        rankList.push({name:player,score:totalScore});
        rankList.sort(function(a,b){
            return (b.score - a.score);
        });
        console.log(rankList);
        $('#rankList').find('table').empty();
        $('#rankList').find('table').append('<tr><td></td><td>Name</td><td>Score</td></tr>');
        for(i=0;i<10;i++){
            $('#rankList').find('table').append(`<tr><td>${i+1}</td><td>${rankList[i].name}</td><td>${rankList[i].score}</td></tr>`)
        }
    }
});
