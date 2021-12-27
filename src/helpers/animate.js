import anime from 'animejs';

let current = null;
export const handleAnimateEmail = () => {
    if(current){ current.pause() }
    current = anime({
            targets: 'path',
            strokeDashoffset: {
            value: 0,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    });
}

export const handleAnimatePassword = () => {
    if(current){ current.pause() }
    current = anime({
            targets: 'path',
            strokeDashoffset: {
            value: -336,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    });
}

export const handleAnimateButton = () => {
    if(current){ current.pause() }
    current = anime({
            targets: 'path',
            strokeDashoffset: {
            value: -730,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: '530 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    });
}