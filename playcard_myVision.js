//card Game (4X4)
var winSentence
//creat array of images (8images)[0-7]
var imageArr = ["./card-images/Atsushi.jpg" , "./card-images/chuya.jpg" , "./card-images/Dazai.jpg" , "./card-images/Gin.jpg" , "./card-images/Kenji.jpg" , "./card-images/Kyouka.jpg" , "./card-images/Ranpo.jpg" , "./card-images/Tanizaki.jpg","./card-images/Atsushi.jpg" , "./card-images/chuya.jpg" , "./card-images/Dazai.jpg" , "./card-images/Gin.jpg" , "./card-images/Kenji.jpg" , "./card-images/Kyouka.jpg" , "./card-images/Ranpo.jpg" , "./card-images/Tanizaki.jpg"];
//var cardHolder = document.getElementById("card-holders");
//images
var cardContainer = document.querySelectorAll(".card"); //array of imag tags
var hintcontainer = document.querySelectorAll(".hintIMG"); //3 hint images
//hintcontainer.setAttribute("style" , "display:block");
//the div which hold card images
var cardHolder = document.getElementById("card-holders");
var TimeForCheck = [];
var IndexOfSelectedCard = [];
//to show YOU WIN sentence on div
var winCardMatch = 0 ;
var h ; //for hint button
//pick each item one time randomly
function newOrderedCard(){
    var t;
    var newAr = [] ;
    for(let i = imageArr.length ; i>0 ; i--){ //i=[0-16]
        t = Math.floor(Math.random() * i); //t=random index
        newAr.push(imageArr[t]);
        imageArr.splice(t, 1);
    }
    imageArr = newAr
    return imageArr; //return array of string
}
//once the page load
imageArr = newOrderedCard();
document.addEventListener("DOMContentLoaded" , GameLoad)
function GameLoad(){
    TimeForCheck = [];
    IndexOfSelectedCard = [];
    cardMatch = 0 ;
    winCardMatch = 0;
    imageArr = newOrderedCard();
    h = 0;
    cardContainer.forEach(function(e){e.addEventListener("click" , flip)})
}
function flip(){
    //this == clicked image
    var cardNum = cardIndex(this);
    IndexOfSelectedCard.push(cardNum); //array of images index
    this.setAttribute('src', imageArr[cardNum]);
    TimeForCheck.push(1) //when length = 2 , means I clicked 2 cards , check for similarity
    if(TimeForCheck.length == 2){
        setTimeout(checkMatchingCard, 500);
    }  
    //console.log(cardMatch); 
}
function cardIndex(elem){
    return [...elem.parentElement.children].indexOf(elem)
}
function checkMatchingCard(){
    var card1 = IndexOfSelectedCard[0];
    var card2 = IndexOfSelectedCard[1]
    console.log(imageArr[card1])
    console.log(imageArr[card2])
    if(imageArr[card1] != imageArr[card2]){
        cardContainer[card1].setAttribute("src" , "./card-images/logo.png");
        cardContainer[card2].setAttribute("src" , "./card-images/logo.png");
    }
    else{
        console.log(winCardMatch);
        winCardMatch+= 2;
        console.log(winCardMatch);
    }
    IndexOfSelectedCard = [];
    TimeForCheck = [];
    if(winCardMatch >= 16){
        console.log("you win");
        for(let i=0 ; i<cardContainer.length ; i++){
            cardContainer[i].setAttribute("style" , "display:none");
        }
        winSentence = document.createElement("p");
        winSentence.setAttribute("style" , "font-size:30px");
        winSentence.innerHTML = "You Win ☺";
        cardHolder.append(winSentence);
    }
}
function newGame(){
    TimeForCheck = [];
    IndexOfSelectedCard = [];
    cardMatch = 0 ;
    winCardMatch = 0;
    newOrderedCard();
    for(let i=0 ; i<cardContainer.length ; i++){
        cardContainer[i].setAttribute("src" , "./card-images/logo.png");
        cardContainer[i].setAttribute("style" , "display:block");
    }
    for(let l=0; l<hintcontainer.length ; l++){
        hintcontainer[l].setAttribute("style" , "display:block");
    }
    h = 0;
    winSentence.remove();
    GameLoad;
}
var x = document.getElementById("hintButton");

function hint(){
    //     var x =document.getElementById("hintButton")
   
    if(h!=3){
        for(let i =0; i<cardContainer.length ; i++){
            cardContainer[i].setAttribute("src" , imageArr[i])
        } 
        setTimeout(function(){
            for(let i =0; i<cardContainer.length ; i++){
                cardContainer[i].setAttribute("src" , "./card-images/logo.png")
            }  
        } , 1000)
        document.getElementById("hintButton").disabled = false;
        hintcontainer[h].setAttribute("style" , "display:none");
        h += 1;
        console.log(h);}
    else{
       x .setAttribute('disabled','')
        // document.getElementById("hintButton").disabled
        console.log("disabled")
    } 
}