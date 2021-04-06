const twentyOne = {};
twentyOne.url = "https://deckofcardsapi.com/api/deck/new/draw/?count=10";
//assign card numerical value from string
twentyOne.getCardValue = (card) => {
    if (card.value === "ACE") {
        card.value = 11
    } else if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
                card.value = 10
    } else {
        card.value = card.value * 1
    };
    return card.value
}

// select img area and assign the src url and alt text
twentyOne.assignImage = (imgId, imgUrl, imgValue, imgSuit) => {
    let image = document.getElementById(`${imgId}`)
    image.innerHTML = `<img src = ${imgUrl} alt = ${imgValue} of ${imgSuit}>`
 }

twentyOne.results = (resultText) => {
    let resultDiv = document.createElement("div");
    console.log(resultDiv);
    resultDiv.classList = "result";
    resultDiv.innerHTML = resultText;
}

// twentyOne.reset = () => {
//     } 

twentyOne.dealCards = () => {
    fetch(twentyOne.url)  
        .then( (res) => {
            return res.json();
        })
        .then( (cardData) => {
            let cardsArray = cardData.cards;
            let pC1 = cardsArray[0];
            cardsArray.shift();
            let pC2 = cardsArray[0];
            cardsArray.shift();
            let dC1 = cardsArray[0];
            cardsArray.shift();
            let dC2 = cardsArray[0];
            cardsArray.shift();

            document.querySelector(".playerButtons").style.opacity = "1";
            twentyOne.assignImage("playerCard1", pC1.image, pC1.value, pC1.suit);
            twentyOne.assignImage("playerCard2", pC2.image, pC2.value, pC2.suit);
            twentyOne.assignImage("dealerCard1", dC1.image, dC1.value, dC1.suit);
            let dealerBlank = document.getElementById("dealerCard2")
            dealerBlank.innerHTML = `<img src="./assets/cards.png"  alt="Dealer Face Down Card">`
         
            let playerScore = twentyOne.getCardValue(pC1) + twentyOne.getCardValue(pC2);
            let dealerScore = twentyOne.getCardValue(dC1) + twentyOne.getCardValue(dC2);
            
            console.log(playerScore, dealerScore);
            twentyOne.checkFor21 = () => {
                if (playerScore === 21) {
                    console.log("Black Jack!  You win!")
                }
            }

            twentyOne.checkFor21 ();

            twentyOne.checkForBust = () => {
                if (playerScore > 21) {
                    console.log(`You bust! Your score was ${playerScore}`);
                }
            }

            twentyOne.hit = () => {
                
                if (cardsArray.length === 6) {
                
                let pC3 = cardsArray[0];
                cardsArray.shift();
                twentyOne.assignImage("playerCard3", pC3.image, pC3.value, pC3.suit);
                playerScore = playerScore + twentyOne.getCardValue(pC3);
                twentyOne.checkPlayerFor11 = () => {
                    if (playerScore > 21 && pC1.value === 11) {
                        pC1.value = 1;
                        playerScore = playerScore + pC1.value - 11;
                    } else if (playerScore > 21 && pC2.value === 11) {
                        pC2.value = 1;
                        playerScore = playerScore + pC2.value - 11;
                    } else if (playerScore > 21 && pC3.value === 11) {
                        pC3.value = 1;
                        playerScore = playerScore + pC3.value - 11;
                    } else {
                        twentyOne.checkFor21();
                        twentyOne.checkForBust();
                    }
                }
                twentyOne.checkPlayerFor11();
                twentyOne.checkFor21();
                twentyOne.checkForBust();

            } else if (cardsArray.length === 5) {
                let pC4 = cardsArray[0];
                cardsArray.shift();
                twentyOne.checkPlayerFor11Two = () => {
                    if (playerScore > 21 && pC1.value === 11) {
                        pC1.value = 1;
                        playerScore = playerScore + pC1.value - 11;
                    } else if (playerScore > 21 && pC2.value === 11) {
                        pC2.value = 1;
                        playerScore = playerScore + pC2.value - 11;
                    }
                    else if (playerScore > 21 && pC4.value === 11) {
                        pC4.value = 1;
                        playerScore = playerScore + pC4.value - 11;
                        twentyOne.checkFor21();
                        twentyOne.checkForBust();
                    } else {
                        twentyOne.checkFor21();
                        twentyOne.checkForBust();
                    }
                }
                playerScore = playerScore + twentyOne.getCardValue(pC4);
                twentyOne.assignImage("playerCard4", pC4.image, pC4.value, pC4.suit);
                twentyOne.checkPlayerFor11Two();
                twentyOne.checkFor21();
                twentyOne.checkForBust();
                console.log(cardsArray);

            } else if (cardsArray.length === 4) {
                let pC5 = cardsArray[0];
                cardsArray.shift();
                twentyOne.checkPlayerFor11Three = () => {
                    if (playerScore > 21 && pC5.value === 11) {
                        pC5.value = 1;
                        playerScore = playerScore + pC5.value - 11;
                    } else {
                        twentyOne.checkFor21();
                        twentyOne.checkForBust();
                    }
                playerScore = playerScore + twentyOne.getCardValue(pC5);    
                twentyOne.assignImage("playerCard5", pC5.image, pC5.value, pC5.suit);
                twentyOne.checkPlayerFor11Three();
                twentyOne.checkFor21();
                twentyOne.checkForBust();
                console.log(cardsArray);
                }
                }
            }
            
            document.getElementById("hit").addEventListener("click", twentyOne.hit)
            
            twentyOne.stand = () => {
                twentyOne.assignImage("dealerCard2", dC2.image, dC2.value, dC2.suit);
                
                if (dealerScore < 17) {
                    let dC3 = cardsArray[0]
                    cardsArray.shift;
                    twentyOne.assignImage("dealerCard3", dC3.image, dC3.value, dC3.suit);
                    dealerScore = dealerScore + twentyOne.getCardValue(dC3);
                    dealerScoreCheck = () => {
                    if (dealerScore > playerScore && dealerScore > 22) {
                            console.log("dealer wins")
                    } else if (dealerScore === playerScore) {
                        console.log("tie");
                    }   else if (dealerScore > 21) {
                        console.log("you win dealer bust")
                    } else if (dealerScore < 17) {
                        let dC4 = cardsArray[0]
                        cardsArray.shift;
                        dealerScore = dealerScore + dC4.value;
                        dealerScoreCheck2 = () => {
                        if (dealerScore > playerScore && dealerScore < 22) {
                            console.log("dealer wins")
                        } else if (dealerScore > 21) {
                            console.log("you win dealer bust")
                        } else {
                            console.log(`you win!  your scorse is ${PlayerScore} dealer score is ${dealerScore}`)
                        }
                        dealerScoreCheck2 ();
                        }

                    }
                    dealerScoreCheck();
                }
                } else if (dealerScore < 21 && dealerScore > 16) {
                    console.log("you win!  score better than dealer")
                }
            }
            document.getElementById("stand").addEventListener("click", twentyOne.stand)
        })
    };

twentyOne.init = () => {
    document.querySelector(".cardsToDeal").addEventListener("click", twentyOne.dealCards)
};

twentyOne.init();
