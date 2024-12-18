(function(){
    'use strict';
    console.log('running JS');

    const startBtn = document.querySelector('#startgame');
    const overlay = document.querySelector('#overlay');
    const actionArea = document.querySelector('#actions');
    const tempScore = document.querySelector('#tempscore');
    const gameData = {
        dice: ['images/dice1.png', 'images/dice2.png', 'images/dice3.png', 'images/dice4.png', 'images/dice5.png', 'images/dice6.png'],
        players: ['player 1', 'player 2'],
        health: [50, 50],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 50
    }

    let gameEnd = false;


    startBtn.addEventListener('click', function(){
        overlay.className = 'hidden';

        gameData.index = Math.round(Math.random());
        setUpTurn();
         console.log('set up the turn');
        console.log(gameData.index);

        currentPlayer();
        
    })

    function setUpTurn(){
        
        actionArea.innerHTML = '<div id="moves"> <button id="roll">ROLL</button> <button id="pass" >PASS</button></>';
        actionArea.innerHTML += '<div> <button id="forfeit">forfeit</button></div>'

        document.querySelector('#roll').addEventListener('click', throwDice);
        document.querySelector('#pass').addEventListener('click', function(){
            gameData.index ? (gameData.index = 0): (gameData.index = 1);
            console.log('switching players');

            actionArea.innerHTML = `switching to ${gameData.players[gameData.index]}`

            setTimeout(function(){
                setUpTurn();
                currentPlayer();
            }, 2000);
        });
        document.querySelector('#forfeit').addEventListener('click', function(){
            gameData.index ? (gameData.health[1] = 0) : (gameData.health[0] = 0);
                checkWinningCondition();
        })


    };

    function throwDice(){
        console.log('rolled');
        gameData.roll1 = Math.floor((Math.random()*6))+1; //gives number from 1-6
        gameData.roll2 = Math.floor((Math.random()*6))+1; //gives number from 1-6

        // add dice roll
        const dice = document.querySelector('#dice');
        dice.innerHTML = `<img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}">`

        gameData.rollSum = gameData.roll1 + gameData.roll2;


        if (gameData.rollSum == 2) {
            console.log('snake eyes');
            actionArea.innerHTML = '<p>snake eyes rolled</p>';
            actionArea.querySelector('p').style.margin = 'auto';

            // reset opponent to full health
            gameData.index ? (gameData.health[0] = 50) : (gameData.health[1] = 50);
            gameData.index ? (gameData.index = 0): (gameData.index = 1);

            
            setTimeout(function(){applyScore();}, 500);
            setTimeout(function(){
                setUpTurn();
                currentPlayer();
            }, 2000);
            
        } else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            console.log('rolled a 1')
            gameData.index ? (gameData.index = 0): (gameData.index = 1);

            actionArea.innerHTML = `<p>you rolled a one! switching to ${gameData.players[gameData.index]}</p>`;
            actionArea.querySelector('p').style.margin = 'auto';

            setTimeout(function(){
                setUpTurn();
                currentPlayer();
            }, 2000);
            

        } else {
            console.log('the game proceeds');
            gameData.index ? (gameData.health[0] = gameData.health[0] - gameData.rollSum) : (gameData.health[1] = gameData.health[1] - gameData.rollSum);

            actionArea.innerHTML = '<div id="moves"> <button id="roll">ROLL</button> <button id="pass">PASS</button></>';
            actionArea.innerHTML += '<div> <button id="forfeit">forfeit</button></div>'

            document.querySelector('#roll').addEventListener('click', throwDice);
            document.querySelector('#pass').addEventListener('click', function(){
                console.log(`currently ${gameData.players[gameData.index]}`)
                gameData.index ? (gameData.index = 0): (gameData.index = 1);
                console.log(`now ${gameData.players[gameData.index]}`)
                console.log('switching players');
                
                // setTimeout(currentPlayer, 2000);               
                // setUpTurn();

                actionArea.innerHTML = `switching to ${gameData.players[gameData.index]}`;
                setTimeout(function(){
                    setUpTurn();
                    currentPlayer();
                }, 2000);
            });

            document.querySelector('#forfeit').addEventListener('click', function(){
                console.log('ffed, reloading');
                gameData.index ? (gameData.health[1] = 0) : (gameData.health[0] = 0);
                checkWinningCondition();
            })

            setTimeout(function(){
                applyScore();
                playSound();
            }, 500);
        }

        console.log(`${gameData.players[0]} : ${gameData.health[0]}`);
        console.log(`${gameData.players[1]} : ${gameData.health[1]}`);
        checkWinningCondition();
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
        
        if (gameData.index == 0){
            document.querySelector('#healthtwo').value = gameData.health[1]; 

            if (gameData.health[1] <= 0) {
                document.querySelector('#healthvaltwo').innerHTML = 0;
            } else {
                document.querySelector('#healthvaltwo').innerHTML = gameData.health[1];
            }
        } else if (gameData.index == 1){
            document.querySelector('#healthone').value = gameData.health[0];

            if (gameData.health[0] <= 0) {
                document.querySelector('#healthvalone').innerHTML = 0;
            } else {
                document.querySelector('#healthvalone').innerHTML = gameData.health[0];
            }
        }

    }


    function currentPlayer() {
        const playerone = document.querySelector('#statone p');
        const playertwo = document.querySelector('#stattwo p');
        
        gameData.index ? (playertwo.className = 'selected', playerone.className = '') : (playerone.className = 'selected', playertwo.className = '');
    }

    function playSound() {
        const sliceSound = new Audio('sounds/slice.mp3');
        const punchSound = new Audio('sounds/punch.mp3');

        gameData.index ? (punchSound.play()) : (sliceSound.play());
    }

})();