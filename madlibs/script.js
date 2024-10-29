(function(){
    'use strict';
    console.log('running js');

    const myForm = document.querySelector('#madlib');
    // const story = document.querySelector('#story');
    const btn = document.querySelector('#send-form');
    const randomize = document.querySelector('#random');

    const storyNouns = document.querySelectorAll('.noun');
    const storypNouns = document.querySelectorAll('.pNoun');
    const storyoNouns = document.querySelectorAll('.oNoun');
    const storyAdj = document.querySelectorAll('.adj');
    const storyVerb = document.querySelectorAll('.verb');
    const storyAdverb = document.querySelectorAll('.adverb');
    const storyVIng = document.querySelectorAll('.vIng');

    const nouns = document.getElementsByName('noun');
    const pNouns = document.getElementsByName('pNoun');
    const oNouns = document.getElementsByName('oNoun');
    const adjectives = document.getElementsByName('adj');
    const adverbs = document.getElementsByName('adverb');
    const verbs = document.getElementsByName('verb');
    const vIngs = document.getElementsByName('vIng');
    
    function replaceNouns() {
        for (let i=0; i<nouns.length; i++) {
            const userInput = nouns[i].value;
        } 
    }

    function replacepNouns() {
        for (let i=0; i<pNouns.length; i++) {
            const userInput = pNouns[i].value;
            storypNouns[i].innerHTML = userInput;
        } 
    }
    
    function replaceoNouns() {
        for (let i=0; i<oNouns.length; i++) {
            const userInput = oNouns[i].value;

            if (i==0){
                const capitalized = userInput.replace(userInput[0], userInput[0].toUpperCase());
                storyoNouns[i].innerHTML = capitalized;
            } else if (i>0){
                storyoNouns[i].innerHTML = userInput;

            }
        } 
    }

    function replaceAdj() {
        for (let i=0; i<adjectives.length; i++) {
            const userInput = adjectives[i].value;

            if (storyAdj[i].id === "repeat"){
                // adjectives.push(userInput);
                storyAdj[i].innerHTML = adjectives[i-1].value;
            } else {
                storyAdj[i].innerHTML = userInput;
            }

            // storyAdj[i].innerHTML = userInput;
        } 
    }

    function replaceAdverbs(){
        for (let i=0; i<adverbs.length; i++) {
            const userInput = adverbs[i].value;
            storyAdverb[i].innerHTML = userInput;
        } 
    }

    function replaceVerbs(){
        for (let i=0; i<verbs.length; i++) {
            const userInput = verbs[i].value;
            storyVerb[i].innerHTML = userInput;
        } 
    }

    function replacevIngs(){
        for (let i=0; i<vIngs.length; i++) {
            const userInput = vIngs[i].value;
            storyVIng[i].innerHTML = userInput;
        } 
    }

    myForm.addEventListener('submit', function(e){
        e.preventDefault();
        myForm.className = 'hidden';
        

        replaceNouns();
        replaceoNouns();
        replacepNouns();
        replaceAdj();
        replaceAdverbs();
        replaceVerbs();
        replacevIngs();
    })
}());