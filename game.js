// Main game logic
class Game {
    constructor() {
        this.score = 0;
        this.attempts = 3;
        this.timeLeft = 60;
        this.operation = null;
        this.difficulty = null;
        this.timer = null;
        this.correctAnswer = null;
    }

    init() {
        document.getElementById('startButton').onclick = () => this.start();
        document.getElementById('quitButton').onclick = () => this.quit();
        this.showWelcome();
    }

    showWelcome() {
        UI.showElement('welcome');
        setTimeout(() => {
            UI.hideElement('welcome');
            UI.showElement('startButton');
        }, 3000);
    }

    start() {
        SoundEffects.playSound('click');
        UI.hideElement('startButton');
        UI.showElement('operation');
    }

    setOperation(op) {
        this.operation = op;
        SoundEffects.playSound('click');
        UI.hideElement('operation');
        UI.showElement('difficulty');
    }

    setDifficulty(level) {
        this.difficulty = level;
        SoundEffects.playSound('click');
        UI.hideElement('difficulty');
        UI.showElement('timeInput');
    }

    startQuestions() {
        this.timeLeft = parseInt(document.getElementById('totalTime').value);
        this.startTimer();
        this.nextQuestion();
        UI.showElement('score');
        UI.showElement('timer');
        UI.showElement('quitButton');
        UI.hideElement('timeInput');
    }

    checkAnswer(selectedAnswer) {
        const isCorrect = Number(selectedAnswer) === Number(this.correctAnswer);
        const questionElement = document.getElementById('question');
        
        if (isCorrect) {
            this.score++;
            SoundEffects.playSound('correct');
            Animations.addCorrectAnimation(questionElement);
        } else {
            this.attempts--;
            SoundEffects.playSound('wrong');
            Animations.addWrongAnimation(questionElement);
        }
        
        UI.updateScore(this.score, this.attempts);
        
        if (this.attempts > 0 && this.timeLeft > 0) {
            setTimeout(() => this.nextQuestion(), 700);
        } else {
            this.endGame();
        }
    }

    nextQuestion() {
        if (this.operation === '÷') {
            const numbers = DivisionUtils.generateDivisionNumbers(this.difficulty);
            this.correctAnswer = numbers.answer;
            UI.displayQuestion(numbers.dividend, numbers.divisor, this.operation);
        } else {
            const range = this.getDifficultyRange();
            const num1 = MathUtils.getRandomInt(range.min, range.max);
            const num2 = MathUtils.getRandomInt(range.min, range.max);
            this.correctAnswer = MathUtils.calculateAnswer(num1, num2, this.operation);
            UI.displayQuestion(num1, num2, this.operation);
        }
        
        const options = MathUtils.generateOptions(this.correctAnswer, this.operation);
        UI.displayOptions(options, (answer) => this.checkAnswer(answer));
    }

    getDifficultyRange() {
        const ranges = {
            easy: { min: 1, max: 10 },
            medium: { min: 1, max: 50 },
            hard: { min: 1, max: 100 }
        };
        return ranges[this.difficulty];
    }

    startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            UI.updateTimer(this.timeLeft);
            if (this.timeLeft <= 0) this.endGame();
        }, 1000);
    }

    endGame() {
        clearInterval(this.timer);
        SoundEffects.playSound('gameOver');
        UI.hideElements(['options', 'question', 'timer']);
        UI.displayFinalScore(this.score);
    }

    restart() {
        this.score = 0;
        this.attempts = 3;
        this.timeLeft = parseInt(document.getElementById('totalTime').value);
        UI.updateScore(this.score, this.attempts);
        UI.hideElement('finalScore');
        this.startTimer();
        this.nextQuestion();
    }

    quit() {
        clearInterval(this.timer);
        this.score = 0;
        this.attempts = 3;
        this.operation = null;
        this.difficulty = null;
        
        UI.hideElements([
            'score', 'finalScore', 'question', 'options', 'timer',
            'operation', 'difficulty', 'timeInput', 'quitButton'
        ]);
        
        UI.showElement('startButton');
    }
}

const game = new Game();
game.init();