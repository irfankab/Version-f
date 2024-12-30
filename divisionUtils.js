// Division-specific utilities
const DivisionUtils = {
    generateDivisionNumbers(difficulty) {
        const ranges = {
            easy: { min: 1, max: 20 },
            medium: { min: 1, max: 50 },
            hard: { min: 1, max: 100 }
        };

        const range = ranges[difficulty];
        const maxDivisor = difficulty === 'easy' ? 10 : 20;
        const divisor = Math.floor(Math.random() * maxDivisor) + 1;
        const dividend = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

        return {
            dividend,
            divisor,
            answer: Number((dividend / divisor).toFixed(2))
        };
    },

    generateDivisionOptions(correctAnswer) {
        const options = new Set([correctAnswer]);
        
        while (options.size < 4) {
            let wrongAnswer;
            const randomChoice = Math.random();
            
            if (randomChoice < 0.3) {
                // Off by one error
                wrongAnswer = Number((correctAnswer + (Math.random() < 0.5 ? 1 : -1)).toFixed(2));
            } else if (randomChoice < 0.6) {
                // Decimal place error
                wrongAnswer = Number((correctAnswer + (Math.random() < 0.5 ? 0.1 : -0.1)).toFixed(2));
            } else {
                // Random close number
                const variation = correctAnswer * (0.1 + Math.random() * 0.2);
                wrongAnswer = Number((correctAnswer + (Math.random() < 0.5 ? variation : -variation)).toFixed(2));
            }
            
            if (wrongAnswer > 0) {
                options.add(wrongAnswer);
            }
        }
        
        return Array.from(options).sort((a, b) => a - b);
    }
};