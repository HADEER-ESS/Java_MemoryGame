//card Game (4X4)
var winSentence
//creat array of images (8images)[0-7] then repeat
var imageArr = ["./card-images/Atsushi.jpg" , "./card-images/chuya.jpg" , "./card-images/Dazai.jpg" , "./card-images/Gin.jpg" , "./card-images/Kenji.jpg" , "./card-images/Kyouka.jpg" , "./card-images/Ranpo.jpg" , "./card-images/Tanizaki.jpg","./card-images/Atsushi.jpg" , "./card-images/chuya.jpg" , "./card-images/Dazai.jpg" , "./card-images/Gin.jpg" , "./card-images/Kenji.jpg" , "./card-images/Kyouka.jpg" , "./card-images/Ranpo.jpg" , "./card-images/Tanizaki.jpg"];
var imageArrBack = ["./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png","./card-images/logo.png"]
//images
var cardContainer = document.querySelectorAll(".card"); //nodeList of imag tags
//convert nodeList array to normal array to can work with it
var hintcontainer = document.querySelectorAll(".hintIMG"); //3 hint images
//the div which hold card images
var cardHolder = document.getElementById("card-holders");
var TimeForCheck = [];
var IndexOfSelectedCard = [];
var IndexOfSelectedCardForHint = [];
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
    //this == index clicked image
    var cardNum = cardIndex(this);
    //IndexOfSelectedCard is array of index of clicked image
    IndexOfSelectedCard.push(cardNum); //array of images index
    this.setAttribute('src', imageArr[cardNum]);
    TimeForCheck.push(1) //when length = 2 , means I clicked 2 cards , check for similarity
    if(IndexOfSelectedCard.length == 2){
        if(IndexOfSelectedCard[0] != IndexOfSelectedCard[1]){
            cardContainer.forEach(function(e){e.removeEventListener("click" , flip)})
            setTimeout(checkMatchingCard, 400);
        }
        else{
            IndexOfSelectedCard.pop()
            flip;
            console.log(TimeForCheck.length);
        }
    } 
}
function cardIndex(elem){
    return [...elem.parentElement.children].indexOf(elem)
}
function checkMatchingCard(){
    var card1 = IndexOfSelectedCard[0];
    var card2 = IndexOfSelectedCard[1]
    if(imageArr[card1] != imageArr[card2]){
        cardContainer[card1].setAttribute("src" , "./card-images/logo.png");
        cardContainer[card2].setAttribute("src" , "./card-images/logo.png");
    }
    else{
        winCardMatch+= 2;
    }
    IndexOfSelectedCard = [];
    TimeForCheck = [];
    cardContainer.forEach(function(e){e.addEventListener("click" , flip)})
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
var hintbtn = document.getElementById("hintButton");
hintbtn.addEventListener("click" , hint);
function hint(){
    var showedCard = [];
     if(h!=3){
        hintbtn.removeEventListener("click" , hint);
        console.log("removed event");
        for(let i =0; i<imageArr.length ; i++){
            if(cardContainer[i].getAttribute("src") != "./card-images/logo.png"){
                console.log("not equal");
                showedCard.push(cardIndex(cardContainer[i]));
            }
            cardContainer[i].setAttribute("src" , imageArr[i])
            //console.log(cardContainer[i].getAttribute("src"))
        }
        console.log(showedCard); 
        setTimeout(function(){
            for(let i =0; i<imageArr.length ; i++){
                for(var x=0; x<showedCard.length; x++){
                    if(i==showedCard[x]){
                        console.log("i= " , i , "showcard element= " , showedCard[x]);
                        cardContainer[i].setAttribute("src" , imageArr[i]);
                        imageArrBack.splice(showedCard[x],1,imageArr[i] );
                    }
                    else{
                        cardContainer[i].setAttribute("src" , imageArrBack[i]);
                    }
                } 
                } 
        
     } , 1000) 
        hintbtn.disabled = false;
        hintcontainer[h].setAttribute("style" , "display:none");
        h += 1;
        hintbtn.addEventListener("click" , hint);
        console.log("rework event");
    }
    else{
       hintbtn.setAttribute('disabled','');
       hintbtn.removeEventListener("click" , hint);
    } 
} 