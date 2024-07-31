document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.button-option');
    const scoreboard = {
      playerX: {
        element: document.getElementById('scoreX'),
        score: 0,
        emoji: '❌' // Default emoji for player X
      },
      playerO: {
        element: document.getElementById('scoreO'),
        score: 0,
        emoji: '⭕' // Default emoji for player O
      },
    };
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    // Event listeners for game buttons
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (board[index] === '' && gameActive) {
          board[index] = currentPlayer;
          const emoji = scoreboard[`player${currentPlayer}`].emoji;
          button.innerHTML = `<span class="inner-box">${emoji}</span>`;
          button.disabled = true;
          if (checkWin()) {
            endGame(false);
          } else if (checkDraw()) {
            endGame(true);
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
        }
      });
    });
  
    // Function to check for a win
    function checkWin() {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      return winConditions.some((condition) => {
        if (board[condition[0]] !== '' &&
          board[condition[0]] === board[condition[1]] &&
          board[condition[1]] === board[condition[2]]) {
          return true;
        }
        return false;
      });
    }
  
    // Function to check for a draw
    function checkDraw() {
      return board.every((cell) => cell !== '');
    }
  
    // Function to end the game
    function endGame(draw) {
      gameActive = false;
      const popup = document.getElementById('popup');
      const message = document.getElementById('message');
      if (draw) {
        message.textContent = 'Draw!';
      } else {
        message.textContent = `Player ${currentPlayer} wins!`;
        scoreboard[`player${currentPlayer}`].score++;
        scoreboard[`player${currentPlayer}`].element.textContent = scoreboard[`player${currentPlayer}`].score;
      }
      popup.classList.remove('hide');
    }
  
    // Event listener for closing the popup
    document.getElementById('close-popup').addEventListener('click', () => {
      resetGame();
      const popup = document.getElementById('popup');
      popup.classList.add('hide');
    });
  
    // Function to reset the game
    function resetGame() {
      board = ['', '', '', '', '', '', '', '', ''];
      buttons.forEach((button) => {
        button.innerHTML = `<span class="inner-box"></span>`;
        button.disabled = false;
      });
      currentPlayer = 'X';
      gameActive = true;
    }
  
    // Event listener for New Game button
    document.getElementById('new-game').addEventListener('click', resetGame);
  
    // Event listener for Restart button
    document.getElementById('restart').addEventListener('click', () => {
      scoreboard.playerX.score = 0;
      scoreboard.playerO.score = 0;
      scoreboard.playerX.element.textContent = '0';
      scoreboard.playerO.element.textContent = '0';
      resetGame();
    });
  
    // Event listener for Toggle Mode button
    document.getElementById('toggle-mode').addEventListener('click', () => {
      alert('Toggle Mode functionality not implemented yet.');
    });
  
    // Event listener for Adjust Color button
    document.getElementById('adjust-color').addEventListener('click', () => {
      const colorPicker = document.getElementById('color-picker');
      colorPicker.style.display = 'flex';
    });
  
    // Event listener for Cancel Color Picker button
    document.getElementById('cancel-color-picker').addEventListener('click', () => {
      const colorPicker = document.getElementById('color-picker');
      colorPicker.style.display = 'none';
    });
  
    // Event listener for Apply Color button
    document.getElementById('confirm-color').addEventListener('click', () => {
      const colorPicker = document.getElementById('color-picker');
      const selectedColor = document.querySelector('.color-option.selected');
      if (selectedColor) {
        const color = selectedColor.dataset.color;
        document.body.style.background = color;
      }
      colorPicker.style.display = 'none';
    });
  
    // Event listener for Select Emoji button
    document.getElementById('select-emoji').addEventListener('click', () => {
      const emojiPicker = document.getElementById('emoji-picker');
      emojiPicker.style.display = 'flex';
    });
  
    // Event listener for Cancel Emoji Picker button
    document.getElementById('cancel-emoji-picker').addEventListener('click', () => {
      const emojiPicker = document.getElementById('emoji-picker');
      emojiPicker.style.display = 'none';
    });
  
    // Event listener for Apply Emoji button
    document.getElementById('confirm-emoji').addEventListener('click', () => {
      const emojiPicker = document.getElementById('emoji-picker');
      const selectedEmojis = document.querySelectorAll('.emoji-option.selected');
      if (selectedEmojis.length === 2) {
        selectedEmojis.forEach((emojiOption) => {
          const player = emojiOption.dataset.player;
          const emoji = emojiOption.textContent;
          scoreboard[player].emoji = emoji;
        });
      }
      emojiPicker.style.display = 'none';
    });
  
    // Event listener for selecting emojis
    const emojiOptions = document.querySelectorAll('.emoji-option');
    emojiOptions.forEach((emojiOption) => {
      emojiOption.addEventListener('click', () => {
        if (document.querySelectorAll('.emoji-option.selected').length < 2 || emojiOption.classList.contains('selected')) {
          emojiOption.classList.toggle('selected');
        }
      });
    });
  
  });
  