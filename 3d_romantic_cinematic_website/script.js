
/* =========================================
   A UNIVERSE FOR YOU ✦
   Complete JavaScript
========================================= */

// =========================================
// 1. GET HTML ELEMENTS
// =========================================

const universe = document.getElementById('universe');

const photoInput = document.getElementById('photoInput');
const portrait = document.getElementById('portrait');
const portraitPlaceholder = document.getElementById('portraitPlaceholder');
const portraitShell = document.getElementById('portraitShell');

const yesButton = document.getElementById('yesButton');
const laterButton = document.getElementById('laterButton');
const answerMessage = document.getElementById('answerMessage');

const envelopeWrap = document.getElementById('envelopeWrap');
const letterPaper = document.getElementById('letterPaper');
const openLetter = document.getElementById('openLetter');

const audioButton = document.getElementById('audioButton');
const toast = document.getElementById('toast');


// =========================================
// 2. DEFAULT PHOTO
// =========================================

function showPortrait(src) {
    if (!portrait) return;

    portrait.src = src;
    portrait.style.display = 'block';

    if (portraitPlaceholder) {
        portraitPlaceholder.style.display = 'none';
    }
}

// Display her photo automatically every time
// someone opens the website.

if (portrait) {
    showPortrait('assets/her-photo.jpeg');

    portrait.onerror = function () {
        portrait.style.display = 'none';

        if (portraitPlaceholder) {
            portraitPlaceholder.style.display = 'block';
        }

        console.error(
            'Default photo not found. Check assets/her-photo.jpg'
        );
    };
}


// =========================================
// 3. PHOTO UPLOAD
// =========================================

if (photoInput) {
    photoInput.addEventListener('change', function (event) {

        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file. ♡');
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            showPortrait(e.target.result);

            // Keep the uploaded photo for this browser session.
            // The default photo will appear again after a reload.

            showToast('Your photo has been added! ♡');
        };

        reader.readAsDataURL(file);
    });
}


// =========================================
// 4. STARFIELD BACKGROUND
// =========================================

if (universe) {
    const ctx = universe.getContext('2d');

    let stars = [];
    let width = 0;
    let height = 0;

    function resizeUniverse() {
        width = universe.width = window.innerWidth;
        height = universe.height = window.innerHeight;

        stars = [];

        const totalStars = Math.floor(
            (width * height) / 3500
        );

        for (let i = 0; i < totalStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.3,
                alpha: Math.random() * 0.7 + 0.2,
                speed: Math.random() * 0.015 + 0.003
            });
        }
    }

    function drawUniverse() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(function (star) {

            star.alpha += star.speed;

            if (star.alpha >= 1 || star.alpha <= 0.2) {
                star.speed *= -1;
            }

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255, 190, 220, ${star.alpha})`;

            ctx.fill();
        });

        requestAnimationFrame(drawUniverse);
    }

    resizeUniverse();
    drawUniverse();

    window.addEventListener('resize', resizeUniverse);
}


// =========================================
// 5. BACKGROUND PARALLAX
// =========================================

window.addEventListener('mousemove', function (event) {

    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;

    if (universe) {
        universe.style.transform =
            `translate(${x}px, ${y}px)`;
    }
});


// =========================================
// 6. PORTRAIT 3D TILT EFFECT
// =========================================

if (portraitShell) {

    portraitShell.addEventListener('mousemove', function (event) {

        const rect = portraitShell.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 20;
        const rotateY = (x - centerX) / 20;

        portraitShell.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    portraitShell.addEventListener('mouseleave', function () {
        portraitShell.style.transform =
            'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
}


// =========================================
// 7. OPEN AND CLOSE LETTER
// =========================================

if (openLetter) {

    openLetter.addEventListener('click', function (event) {

        event.preventDefault();

        if (envelopeWrap) {
            envelopeWrap.classList.toggle('open');
        }

        if (letterPaper) {
            letterPaper.classList.toggle('open');
        }

        const isOpen = envelopeWrap
            ? envelopeWrap.classList.contains('open')
            : letterPaper?.classList.contains('open');

        openLetter.textContent = isOpen
            ? 'CLOSE YOUR LETTER ↗'
            : 'OPEN YOUR LETTER ↗';
    });
}


// =========================================
// 8. TOAST MESSAGE
// =========================================

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add('show');

    setTimeout(function () {
        toast.classList.remove('show');
    }, 2500);
}


// =========================================
// 9. HEART SHOWER EFFECT
// =========================================

function heartShower() {

    const hearts = ['♡', '♥', '💕', '💗', '✨'];

    for (let i = 0; i < 35; i++) {

        const heart = document.createElement('div');

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-30px';
        heart.style.fontSize =
            Math.random() * 20 + 15 + 'px';

        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '99999';

        heart.style.animation =
            `heartFall ${Math.random() * 2 + 3}s linear forwards`;

        document.body.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 5500);
    }
}


// Add heart animation CSS dynamically

const heartStyle = document.createElement('style');

heartStyle.textContent = `
@keyframes heartFall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(110vh) rotate(360deg);
        opacity: 0;
    }
}
`;

document.head.appendChild(heartStyle);


// =========================================
// 10. ACCEPT BUTTON
// =========================================

if (yesButton) {

    yesButton.addEventListener('click', function () {

        if (answerMessage) {
            answerMessage.textContent =
                "You just made my universe brighter. Thank you! ♡";
        }

        yesButton.textContent = "It's a date! ♡";

        if (laterButton) {
            laterButton.style.display = 'none';
        }

        heartShower();

        showToast('A little happiness for you! ♡');
    });
}


// =========================================
// 11. REJECT BUTTON MOVEMENT
// =========================================

function moveRejectButton() {

    if (!laterButton) return;

    const buttonWidth = laterButton.offsetWidth;
    const buttonHeight = laterButton.offsetHeight;

    const maxX = Math.max(0, window.innerWidth - buttonWidth - 20);
    const maxY = Math.max(0, window.innerHeight - buttonHeight - 20);

    const randomX = Math.random() * maxX + 10;
    const randomY = Math.random() * maxY + 10;

    laterButton.classList.add('moving');

    laterButton.style.left = randomX + 'px';
    laterButton.style.top = randomY + 'px';
}

if (laterButton) {

    laterButton.addEventListener(
        'pointerenter',
        moveRejectButton
    );

    laterButton.addEventListener(
        'touchstart',
        function (event) {
            event.preventDefault();
            moveRejectButton();
        },
        { passive: false }
    );

    laterButton.addEventListener('click', function (event) {
        event.preventDefault();
        moveRejectButton();
    });
}


// =========================================
// 12. SCROLL REVEAL
// =========================================

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add('visible');

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add('visible');
    });
}


// =========================================
// 13. SOUND BUTTON
// =========================================

if (audioButton) {

    audioButton.addEventListener('click', function () {

        showToast('A little music makes everything magical. ♡');

    });
}

console.log('A Universe for You ✦ website loaded successfully!');
