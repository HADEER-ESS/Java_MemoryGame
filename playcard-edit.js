//card Game (4X4)
//creat array of images (8images)[0-7]
var imageArr = ["./card-images/Atsushi.jpg" , "./card-images/chuya.jpg" , "./card-images/Dazai.jpg" , "./card-images/Gin.jpg" , "./card-images/Kenji.jpg" , "./card-images/Kyouka.jpg" , "./card-images/Ranpo.jpg" , "./card-images/Tanizaki.jpg","./card-images/Atsushi.jpg" , "./card-images/chuya.jpg" , "./card-images/Dazai.jpg" , "./card-images/Gin.jpg" , "./card-images/Kenji.jpg" , "./card-images/Kyouka.jpg" , "./card-images/Ranpo.jpg" , "./card-images/Tanizaki.jpg"];
//images
var cardContainer = document.querySelectorAll(".card"); //array of imag tags
console.log(cardContainer[3])
//game flag 0== initialize the game all cards are hidden
//game flag 1== game started there is at least one fliped card
var game_flag = 0;
var cardShow = false;
var checkedArr = [];
var pickedCard = [];
var card ;
var cardIndexArr = [] ;
//pick each item one time randomly
function shuffle(){
    game_flag = 1;
    var t;
    var newAr = [] ;
    for(let i = imageArr.length ; i>0 ; i--){ //i=[0-16]
        t = Math.floor(Math.random() * i); //t=random index
        newAr.push(imageArr[t]);
        imageArr.splice(t, 1);
    }
    cardContainer.forEach(function(e){
        e.addEventListener("click" , function(){
            //console.log(getElementIndex(e));
            card = e.setAttribute("src" , newAr[Math.floor(Math.random()*imageArr.length)])
            cardIndexArr.push(getElementIndex(e));
            checkedArr.push(1);
            pickedCard.push(newAr[Math.floor(Math.random()*imageArr.length)])
            //console.log(newAr[Math.floor(Math.random()*imageArr.length)]);
            newAr.splice(Math.floor(Math.random()*imageArr.length) , 1)
            //console.log(checkedArr);
            //console.log(pickedCard);
            //console.log(cardIndexArr);
            if(checkedArr.length > 2){
                console.log("go to check")
                checkSimilarity();
            }
        })
    })
    return newAr; //return array of string
}
console.log(shuffle()); 
//flip the card

function newGame(){
    game_flag = 0;
    //call another function that responsible for card flipped
}
function checkSimilarity(){
    checkedArr = [];
    var card1 = pickedCard[0];
    var card2 = pickedCard[1]
    if(card1 !== card2){
        console.log("not similar");
        cardContainer[cardIndexArr[0]].setAttribute("src" , "./card-images/logo.png");
        cardContainer[cardIndexArr[1]].setAttribute("src" , "./card-images/logo.png");
    }
    cardIndexArr = [];
    pickedCard = [];
}

function getElementIndex(el) {
    return [...el.parentElement.children].indexOf(el);
  }