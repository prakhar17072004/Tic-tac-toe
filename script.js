const  boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentplayer;
let gameGrid;
const winningPostions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create  a funtion to intitalise the game//
function initGame(){
    currentplayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI par bhi empty show karna hoga//
    boxes.forEach((box, index )=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing , intialise box with css propertise  again//
       box.classList =`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentplayer}`;
}
initGame();
console.log("hello");
function swapTurn(){
    if(currentplayer ==="X"){
        currentplayer = "O"
    }
    else{
        currentplayer ="X";
    }
    //uI update//
    gameInfo.innerText = `Current Player -${currentplayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPostions.forEach((position)=>{
        //all 3 bxes should be non-empty and exactly same in value//
        if((gameGrid[position[0]]!==""|| gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
        && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]])){
    
       //check if winner is X//
       if(gameGrid[position[0]]==="X")
         answer="X";
        else{
        answer = "O";
        }
         //disable pointer events
         boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

         //now we know X/O is a winner
         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");
        }
    });
//it mean we have a winner//
if(answer !==""){
    gameInfo.innerText = `Winner Player -${answer}`;
    newGameBtn.classList.add("active");
    return;
}

//when  no winner found//

let fillCount = 0;
gameGrid.forEach((box)=>{
    if(box!=="")
    fillCount++;
});

 //board is Filled, game is TIE
 if(fillCount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
}

}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentplayer;
        gameGrid[index]= currentplayer;
        boxes[index].style.pointerEvents="none";
        //swap karo turn ko//
        swapTurn();
        //ckeck kio jeet toh nahi gya//
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);