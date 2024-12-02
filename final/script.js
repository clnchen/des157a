(function(){
    'use strict';
    console.log('running JS');

    const startBtn = document.querySelector('#startgame');
    const nextBtn = document.querySelector('#next');
    const overlay = document.querySelector('#overlay');
    const actionArea = document.querySelector('#actions');
    const tempScore = document.querySelector('#tempscore');
    const playerImgs = document.querySelector('#playerimgs');
    const playerone = document.querySelector('#playerone');
    const playertwo = document.querySelector('#playertwo');
    const spriteImgs = document.querySelectorAll('.character');

    const gameData = {
        dice: ['images/di1.png', 'images/di2.png', 'images/di3.png', 'images/di4.png', 'images/di5.png', 'images/di6.png'],
        players: ['player 1', 'player 2'],
        sprites: [playerone, playertwo],
        health: [50, 50],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 50
    }

    let gameEnd = false;
    let doneRolling = false;


    nextBtn.addEventListener('click', function(){
        document.querySelector('#firstoverlay').className = 'overlaycontent hiddenoverlay';
        document.querySelector('#secondoverlay').className = 'overlaycontent currentoverlay';
    })

    startBtn.addEventListener('click', function(e){
        e.preventDefault();
        gameData.players[0] = document.querySelector('#playeronename').value;
        gameData.players[1] = document.querySelector('#playertwoname').value;

        document.querySelector('#statone p').innerHTML = gameData.players[0];
        document.querySelector('#stattwo p').innerHTML = gameData.players[1];


        overlay.className = 'hidden';

        gameData.index = Math.round(Math.random());
        actionArea.innerHTML = `<p>${gameData.players[gameData.index]} starts</p>`

        setTimeout(setUpTurn, 1200)
        console.log('set up the turn');
        console.log(gameData.index);

        currentPlayer();
        
    })

    function setUpTurn(){
        
        actionArea.innerHTML = '<div id="moves"> <button id="roll">ROLL</button> <button id="pass" >PASS</button></>';
        actionArea.innerHTML += '<div> <button id="forfeit">forfeit</button></div>'

        document.querySelector('#roll').addEventListener('click', throwDice);
        document.querySelector('#pass').addEventListener('click', switchPlayer);
        document.querySelector('#forfeit').addEventListener('click', function(){
            gameData.index ? (gameData.health[1] = 0) : (gameData.health[0] = 0);
            applyScore();
            checkWinningCondition();
        });


    };

    function throwDice(){
        console.log('rolled');
        gameData.roll1 = Math.floor((Math.random()*6))+1; //gives number from 1-6
        gameData.roll2 = Math.floor((Math.random()*6))+1; //gives number from 1-6
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // add dice roll
        const diceImgs = document.querySelector('#diceImgs');
        const diceone = document.querySelector('#dice1');
        const dicetwo = document.querySelector('#dice2');

        diceone.src = `${gameData.dice[gameData.roll1-1]}`;
        dicetwo.src = `${gameData.dice[gameData.roll2-1]}`;
        diceone.className = 'dicesheet rolling';
        dicetwo.className = 'dicesheet rolling';


        document.querySelector('.rolling').addEventListener('animationend', function(){
         doneRolling = true;  
         diceone.className = 'dicesheet still';
         dicetwo.className = 'dicesheet still'; 
        })       
        
        setTimeout(function(){
            if (gameData.rollSum == 2) {

                setTimeout(function(){
                    console.log('snake eyes');
                    actionArea.innerHTML = `<p>snake eyes rolled<br> ${gameData.players[Math.abs(gameData.index-1)]} is healed!</p>`;

                    // reset opponent to full health
                    gameData.health[Math.abs(gameData.index-1)] = 50;
                    gameData.index ? (gameData.index = 0): (gameData.index = 1);
                    console.log('playerone:' + gameData.health[0]);
                    console.log('playertwo:' + gameData.health[1]);
        
                    
                    setTimeout(applyScore, 500);
                },1200);
    
                setTimeout(function(){
                    setUpTurn();
                    currentPlayer();
                }, 2400);
                
            } else if (gameData.roll1 === 1 || gameData.roll2 === 1){
                console.log('rolled a 1')
                gameData.index ? (gameData.index = 0): (gameData.index = 1);
                
                setTimeout(function(){
                    actionArea.innerHTML = `<p>you rolled a one! switching to ${gameData.players[gameData.index]}</p>`;
                }, 800);
                
    
                setTimeout(function(){
                    setUpTurn();
                    currentPlayer();
                }, 2400);
                
    
            } else {
                console.log('the game proceeds');
                gameData.index ? (gameData.health[0] = gameData.health[0] - gameData.rollSum) : (gameData.health[1] = gameData.health[1] - gameData.rollSum);

                setUpTurn();
    
                setTimeout(function(){
                    
                    setTimeout(playSound, 190)
    
                    gameData.sprites[gameData.index].className = 'spritesheet fight';
                    document.querySelector('.fight').addEventListener('animationend', function(){
                        checkWinningCondition();
                        if(gameEnd == false){
                            gameData.index ? (gameData.sprites[0].className = 'spritesheet idle', gameData.sprites[1].className = 'spritesheet active'): (gameData.sprites[1].className = 'spritesheet idle', gameData.sprites[0].className = 'spritesheet active')
                        }
                        applyScore();
                    })
                }, 500);
            }
        }, 500)
        
    }
    
    function checkWinningCondition(){
        if (gameData.health[1] <= 0 ){
            actionArea.innerHTML = `${gameData.players[0]} has defeated ${gameData.players[1]}!`
            actionArea.innerHTML += '<button id="restart">restart?</button>';

            gameEnd = true;

        } else if (gameData.health[0] <=0) {
            actionArea.innerHTML = `${gameData.players[1]} has defeated ${gameData.players[0]}!`
            actionArea.innerHTML += '<button id="restart">restart?</button>';

            gameEnd = true;
        } 
    
        if (gameEnd) {
            document.querySelector('#restart').addEventListener('click', function(){
                console.log('clicked');
                location.reload(true);
            })
        }
    }

    function applyScore(){
        document.querySelector('#healthtwo').value = gameData.health[1]; 
        document.querySelector('#healthone').value = gameData.health[0];
        document.querySelector('#healthvalone').innerHTML = gameData.health[0];
        document.querySelector('#healthvaltwo').innerHTML = gameData.health[1];

        setTimeout(function(){
            if (gameData.health[1] <= 0 ){
                gameData.sprites[1].className = 'spritesheet defeat'
                gameData.sprites[0].className = 'spritesheet celebrate'
    
    
            } else if (gameData.health[0] <=0) {
                gameData.sprites[0].className = 'spritesheet defeat';
                gameData.sprites[1].className = 'spritesheet celebrate';
    
            } 
        }, 500);
        

        if (gameData.index == 0){
            if (gameData.health[1] <= 0) {
                document.querySelector('#healthvaltwo').innerHTML = 0;
            } 
            else {
                document.querySelector('#healthvaltwo').innerHTML = gameData.health[1];
            }
        } else if (gameData.index == 1){

            if (gameData.health[0] <= 0) {
                document.querySelector('#healthvalone').innerHTML = 0;
            } 
            else {
                document.querySelector('#healthvalone').innerHTML = gameData.health[0];
            }
        }
    }

    function switchPlayer(){
        gameData.index ? (gameData.index = 0): (gameData.index = 1);
        console.log('switching players');

        actionArea.innerHTML = `<p>switching to ${gameData.players[gameData.index]}</p>`

        setTimeout(function(){
            setUpTurn();
            currentPlayer();
        }, 2000);     
    }


    function currentPlayer() {
        const statone = document.querySelector('#statone p');
        const stattwo = document.querySelector('#stattwo p');
        
        gameData.index ? (
            stattwo.className = 'selected',
            playertwo.className='spritesheet active',
            playerone.className='spritesheet idle',
            statone.className = '') 
        : (
            statone.className = 'selected', 
            playerone.className='spritesheet active',
            playertwo.className='spritesheet idle',
            stattwo.className = '');
    }

    function playSound() {
        const sliceSound = new Audio('sounds/slice.mp3');
        const punchSound = new Audio('sounds/punch.mp3');

        gameData.index ? (punchSound.play()) : (sliceSound.play());
    }

})();