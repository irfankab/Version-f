// Animation manager
const Animations = {
    addCorrectAnimation(element) {
        element.classList.add('correct-answer');
        element.addEventListener('animationend', () => {
            element.classList.remove('correct-answer');
        });
    },

    addWrongAnimation(element) {
        element.classList.add('wrong-answer');
        element.addEventListener('animationend', () => {
            element.classList.remove('wrong-answer');
        });
    },

    fadeIn(element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transition = 'opacity 0.5s';
        }, 10);
    },

    slideIn(element) {
        element.style.transform = 'translateY(-20px)';
        element.style.opacity = '0';
        element.style.display = 'block';
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
            element.style.transition = 'all 0.5s ease-out';
        }, 10);
    }
};