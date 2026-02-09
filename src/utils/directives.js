export const vRippleEffect = {
    mounted: (el) => {
        el.addEventListener('click', (e) => {
            const originalPosition = el.style.position;
            const originalOverflow = el.style.overflow;

            el.style.position = 'relative';
            el.style.overflow = 'hidden';

            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            el.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
                el.style.position = originalPosition;
                el.style.overflow = originalOverflow;

            }, 800);
        });
    }
}