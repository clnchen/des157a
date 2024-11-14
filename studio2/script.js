(function() {
    'use strict';
    console.log('reading JS');

    //basic
    
    const banner = document.querySelector('.a');
    const bannerwidth = banner.offsetWidth;
    const cloned = banner.cloneNode(true);
    cloned.className = 'b';
    banner.appendChild(cloned);
    const endLeftPos = `-${bannerwidth}px`;
    let root = document.querySelector(':root');
    root.style.setProperty('--bannerwidth', endLeftPos);

    // intermediate
    const myImages = [
        'smiski1.png',
        'smiski2.png',
        'smiski3.png'
    ];

    let currentImage = 0;
    const slide = document.querySelector('#myimage');

    document.getElementById('next').addEventListener('click', nextPhoto);

    function nextPhoto(){
        currentImage++;
        if (currentImage > myImages.length-1){
            currentImage = 0;
        }

        slide.src=`images/${myImages[currentImage]}`;
    }

    document.getElementById('previous').addEventListener('click', previousPhoto);


    function previousPhoto(){
        console.log(currentImage);
        currentImage--;
        if (currentImage < 0){
            currentImage = myImages.length-1;
        }
        
        slide.src=`images/${myImages[currentImage]}`;
    }

    const diffBtn = document.querySelector('#difference');
    const multiplyBtn = document.querySelector('#multiply');
    const colors = document.querySelectorAll('.color');


    const colorBtns = document.querySelectorAll('#colorButtons button');

  
    function changeFilter(){
        colorBtns.forEach(function(btn){
            btn.addEventListener('click',function(){
                const colorType = this.id;
                console.log(colorType);
                if (slide.className != colorType){
                    slide.className = `${colorType}`;
                } else {
                    slide.className = 'normal';
                }
            })
        }) 
    }
    
    function changeHue(){
        const slider = document.querySelector('#mySlider');
        console.log(slider.value);
        slider.addEventListener('input', function(){
            document.querySelector('#slideImage').style.filter = `hue-rotate(${slider.value}deg)`;
        }); 
    }
    
    changeHue();

    changeFilter();

    // advanced
    const container = document.querySelector('#container');
    const hovers = document.querySelectorAll('.icon');
    const bigpic = document.querySelector('#bigpic');

    hovers.forEach(function(eachIcon){
        eachIcon.addEventListener('mouseover', zoomPhoto);
        eachIcon.addEventListener('mouseout', function(){
            bigpic.className = 'start';
        })
    })

    function zoomPhoto(e){
        const thisIcon = e.target.id;
        console.log(thisIcon);

        switch(thisIcon) {
            case 'smFlute': bigpic.className = 'smFlute'; break;
            case 'smWeight': bigpic.className = 'smWeight'; break;
            case 'smPeek': bigpic.className = 'smPeek'; break;
            case 'smSquat': bigpic.className = 'smSquat'; break;
            case 'smSmell': bigpic.className = 'smSmell'; break;
            case 'smPaper': bigpic.className = 'smPaper'; break;
            default: bigpic.className = 'start';
        }
    }



})();
