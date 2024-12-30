// Math and general utility functions
const Utils = {
    random: {
        getInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        getVariation(base, percentage) {
            return base * (percentage * Math.random());
        }
    },

    math: {
        generateNumbers(operation, difficulty) {
            const range = Config.difficulties[difficulty];
            return operation === '÷' 
                ? this.generateDivisionPair(difficulty)
                : this.generateRegularPair(range);
        },

        generateDivisionPair(difficulty) {
            const range = Config.difficulties[difficulty];
            const maxDivisor = difficulty === 'easy' ? 10 : 20;
            const divisor = Utils.random.getInt(1, maxDivisor);
            const dividend = Utils.random.getInt(range.min, range.max);
            
            return {
                num1: dividend,
                num2: divisor,
                answer: Number((dividend / divisor).toFixed(2))
            };
        },

        generateRegularPair(range) {
            const num1 = Utils.random.getInt(range.min, range.max);
            const num2 = Utils.random.getInt(range.min, range.max);
            
            return { num1, num2 };
        },

        calculateAnswer(num1, num2, operation) {
            switch (operation) {
                case '+': return num1 + num2;
                case '-': return num1 - num2;
                case '×': return num1 * num2;
                case '÷': return Number((num1 / num2).toFixed(2));
            }
        },

        generateOptions(correctAnswer, operation) {
            const options = new Set([correctAnswer]);
            const isDecimal = operation === '÷';
            
            while (options.size < 4) {
                const wrongAnswer = isDecimal
                    ? this.generateDecimalOption(correctAnswer)
                    : this.generateIntegerOption(correctAnswer);
                
                if (wrongAnswer > 0) options.add(wrongAnswer);
            }
            
            return Array.from(options).sort((a, b) => a - b);
        },

        generateDecimalOption(correctAnswer) {
            const variation = Utils.random.getVariation(correctAnswer, 0.3);
            return Number((correctAnswer + (Math.random() < 0.5 ? variation : -variation)).toFixed(2));
        },

        generateIntegerOption(correctAnswer) {
            const range = Math.max(5, Math.abs(correctAnswer * 0.2));
            return correctAnswer + Utils.random.getInt(-range, range);
        }
    }
};