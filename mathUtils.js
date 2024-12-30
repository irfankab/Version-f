// Math operations utilities
const MathUtils = {
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    calculateAnswer(num1, num2, operation) {
        switch (operation) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '×': return num1 * num2;
            case '÷': return Number((num1 / num2).toFixed(2));
            default: return 0;
        }
    },

    generateOptions(correctAnswer, operation) {
        return operation === '÷' 
            ? DivisionUtils.generateDivisionOptions(correctAnswer)
            : this.generateRegularOptions(correctAnswer);
    },

    generateRegularOptions(correctAnswer) {
        const options = new Set([correctAnswer]);
        const range = Math.max(5, Math.abs(correctAnswer * 0.2));
        
        while (options.size < 4) {
            const wrongAnswer = correctAnswer + this.getRandomInt(-range, range);
            if (wrongAnswer > 0) {
                options.add(wrongAnswer);
            }
        }
        
        return Array.from(options).sort((a, b) => a - b);
    }
};