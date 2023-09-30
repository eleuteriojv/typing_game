const gameContainer = document.getElementById("game-container");
const menu = document.getElementById("menu");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let speed = 1;
const letterWidth = 24;
const letterHeight = 24;
let score = 0.0;
let gameInterval;
let currentPlayerScore = 0;
const maxVisibleLetters = 1;

const highScores = []; //Armazena no array a pontuação dos jogadores

    function showDifficultyOptions() {
        const startMenu = document.getElementById("menu");
        const difficultyOptions = document.getElementById("difficulty-options");
        startMenu.style.display = "none";
        difficultyOptions.style.display = "block";
    }
    
    function startGame(difficulty) {
        clearInterval(gameInterval); // Limpa o intervalo anterior

        currentPlayerScore = 0; // Redefina a pontuação do jogador atual
    
        if (difficulty === "easy") {
            speed = 0.5;
        } else if (difficulty === "medium") {
            speed = 1.3;
        } else if (difficulty === "hard") {
            speed = 2;
        }
    
        errors = 0; // Reinicia a contagem de erros
    
        const difficultyOptions = document.getElementById("difficulty-options");
        const gameContainer = document.getElementById("game-container");
    
        difficultyOptions.style.display = "none";
        gameContainer.style.display = "block";
    
        score = 0;
        updateScore(); //Contabilização dos pontos
        gameInterval = setInterval(createLetter, 1000);
    }

    function showCredits() {
      const creditsScreen = document.getElementById("credits-screen");
      const menu = document.getElementById("menu");
      const gameContainer = document.getElementById("game-container");
    
      // Oculta o menu principal e o jogo
      menu.style.display = "none";
      gameContainer.style.display = "none";
    
      creditsScreen.style.display = "block";
    }

    function showMainMenu() {
      const creditsScreen = document.getElementById("credits-screen");
      const menu = document.getElementById("menu");
    
      // Oculta a tela de créditos e exibe o menu principal
      creditsScreen.style.display = "none";
      menu.style.display = "block";
    }
    
    function restartGame() {
        location.reload();
    }      

    function createLetter() {
      const letterElements = document.querySelectorAll(".letter");
      
      // Verifica quantas letras visíveis estão atualmente
      const visibleCount = letterElements.length;
    
      // Calcula o espaçamento vertical entre as letras com base na altura das letras
      const verticalSpacing = letterHeight * 1.5; // Ajuste esse valor conforme necessário
        
      // Se o número de letras visíveis for menor que o máximo permitido, cria uma nova letra
      if (visibleCount < maxVisibleLetters) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const letterElement = document.createElement("div");
        letterElement.textContent = randomLetter;
        letterElement.classList.add("letter");
        letterElement.style.left =
          Math.random() * (gameContainer.clientWidth - letterWidth) + "px";
    
        // Define a posição vertical com base no número de letras visíveis
        letterElement.style.top = (visibleCount * verticalSpacing) + "px";
    
        gameContainer.appendChild(letterElement);
    
        const letterInterval = setInterval(() => {
          const top = letterElement.offsetTop;
          letterElement.style.top = top + speed + "px";
    
          if (top > gameContainer.clientHeight - letterHeight) {
            clearInterval(letterInterval);
            if (gameContainer.contains(letterElement)) {
              gameContainer.removeChild(letterElement);
            }
    
            // Se a letra atingir a parte inferior do contêiner, o jogador perde
            endGame();
          }
        }, 15);
    
        letterElement.addEventListener("click", () => {
          if (letterElement.textContent === randomLetter) {
            score++;
            if (gameContainer.contains(letterElement)) {
              gameContainer.removeChild(letterElement);
            }
            updateScore();
    
            // Cria uma nova letra quando uma letra é acertada
            createLetter();
          }
        });
    
        document.addEventListener("keydown", (event) => {
          const key = event.key.toUpperCase();
          if (key === randomLetter) {
            score++;
            if (gameContainer.contains(letterElement)) {
              gameContainer.removeChild(letterElement);
            }
            updateScore();
    
            // Cria uma nova letra quando uma letra é acertada
            createLetter();
          }
        });
      }
    }    

    // Atualiza a pontuação
    function updateScore() {
        document.getElementById("score").textContent = "Pontuação: " + score;
    }

    function endGame() {
        clearInterval(gameInterval);
        gameContainer.innerHTML = "";
        gameContainer.style.display = "none";
      
        // Exiba a tela de perda com o nome e a pontuação do jogador atual
        const gameOverScreen = document.getElementById("game-over-screen");
        const playerInfo = document.getElementById("player-info");
        playerInfo.textContent = `Sua pontuação foi de: ${score}`;
        gameOverScreen.style.display = "block";
      
        // Exibe o botão de reiniciar
        const restartButton = document.getElementById("restart-button");
    }
      

        