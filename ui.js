// UI helper functions
const UI = {
    showElement(id) {
        const element = document.getElementById(id);
        if (element) {
            Animations.fadeIn(element);
        }
    },

    hideElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    },

    hideElements(ids) {
        ids.forEach(id => this.hideElement(id));
    },

    updateScore(score, attempts) {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `Score: ${score} | Attempts left: ${attempts}`;
        Animations.slideIn(scoreElement);
    },

    updateTimer(timeLeft) {
        document.getElementById('timeLeftDisplay').textContent = timeLeft;
    },

    displayFinalScore(score) {
        const finalScoreDiv = document.getElementById('finalScore');
        finalScoreDiv.innerHTML = `
            <h2>Game Over!</h2>
            <p>Your final score is: ${score}</p>
            <button onclick="game.restart()">Play Again</button>
        `;
        Animations.fadeIn(finalScoreDiv);
    },

    displayQuestion(num1, num2, operation) {
        const questionElement = document.getElementById('question');
        questionElement.textContent = `What is ${num1} ${operation} ${num2}?`;
        Animations.slideIn(questionElement);
    },

    displayOptions(options, onSelect) {
        const container = document.getElementById('options');
        container.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => onSelect(option);
            container.appendChild(button);
        });
        Animations.slideIn(container);
    }
};