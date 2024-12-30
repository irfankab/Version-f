// Sound effects manager
const SoundEffects = {
    correct: new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'),
    wrong: new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'),
    gameOver: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'),
    click: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),

    playSound(sound) {
        const audio = this[sound];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
};