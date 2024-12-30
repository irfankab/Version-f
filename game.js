// Game logic
let num1, num2, operation, correctAnswer;
let difficulty;
let attempts;
let score = 0;
let totalTime;
let timeLeft;
let timer;

function startGame() {
    SoundEffects.playSound('click');
    document.getElementById('startButton').style.display = 'none';
    Animations.slideIn(document.getElementById('operation'));
}

function checkAnswer(selectedAnswer) {
    const isCorrect = selectedAnswer == correctAnswer;
    const questionElement = document.getElementById('question');
    
    if (isCorrect) {
        score++;
        SoundEffects.playSound('correct');
        Animations.addCorrectAnimation(questionElement);
    } else {
        attempts--;
        SoundEffects.playSound('wrong');
        Animations.addWrongAnimation(questionElement);
    }
    
    updateScoreboard();
    
    if (attempts > 0 && timeLeft > 0) {
        setTimeout(nextQuestion, 700); // Delay for animation
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    SoundEffects.playSound('gameOver');
    
    ['options', 'question', 'timer'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    
    displayFinalScore();
}

// ... (rest of the game logic remains the same, but with animations and sounds added)