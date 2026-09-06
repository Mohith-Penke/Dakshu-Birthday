```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const introScreen = document.getElementById("intro-screen");
    const birthdayScreen = document.getElementById("birthday-screen");
    const questionScreen = document.getElementById("question-screen");
    const yesScreen = document.getElementById("yes-screen");
    const letterSection = document.getElementById("letter-section");

    const openSurprise = document.getElementById("open-surprise");
    const birthdayContinue = document.getElementById("birthday-continue");

    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");

    const continueToLetter = document.getElementById("continue-to-letter");

    const noMessage = document.getElementById("no-message");

    const floatingHearts = document.getElementById("floating-hearts");
    const sparkles = document.getElementById("sparkles");


    /* =====================================================
       HELPERS
    ===================================================== */

    const screens = [
        introScreen,
        birthdayScreen,
        questionScreen,
        yesScreen
    ];

    function showScreen(target) {

        screens.forEach(screen => {

            if (!screen) return;

            screen.classList.remove("active");

        });

        if (!target) return;

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }


    /* =====================================================
       INTRO → BIRTHDAY
       INSTANT RESPONSE
    ===================================================== */

    if (openSurprise) {

        openSurprise.addEventListener("click", () => {

            sparkleBurst();

            showScreen(birthdayScreen);

            birthdayEntrance();

        });

    }


    /* =====================================================
       BIRTHDAY → QUESTION
    ===================================================== */

    if (birthdayContinue) {

        birthdayContinue.addEventListener("click", () => {

            sparkleBurst();

            showScreen(questionScreen);

            questionEntrance();

        });

    }


    /* =====================================================
       YES BUTTON
    ===================================================== */

    if (yesButton) {

        yesButton.addEventListener("click", event => {

            event.preventDefault();

            buttonPulse(yesButton);

            heartBurst();

            showScreen(yesScreen);

            yesEntrance();

        });

    }


    /* =====================================================
       NO BUTTON
    ===================================================== */

    let noMoveCount = 0;

    function moveNoButton() {

        if (!noButton) return;

        noMoveCount++;

        const rect = noButton.getBoundingClientRect();

        const buttonWidth = rect.width;
        const buttonHeight = rect.height;

        const padding = 18;

        const maxX =
            window.innerWidth -
            buttonWidth -
            padding;

        const maxY =
            window.innerHeight -
            buttonHeight -
            padding;

        const safeTop = 10;

        let x =
            padding +
            Math.random() *
            Math.max(1, maxX - padding);

        let y =
            safeTop +
            Math.random() *
            Math.max(1, maxY - safeTop);

        /*
           Keep the button away from the very edges.
        */

        x = Math.max(
            padding,
            Math.min(x, maxX)
        );

        y = Math.max(
            safeTop,
            Math.min(y, maxY)
        );

        noButton.style.position = "fixed";
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;

        noButton.style.zIndex = "9999";

        /*
           Tiny visual shake.
        */

        noButton.animate(
            [
                {
                    transform:
                        "translate3d(0,0,0) scale(0.96)"
                },
                {
                    transform:
                        "translate3d(0,0,0) scale(1.04)"
                },
                {
                    transform:
                        "translate3d(0,0,0) scale(1)"
                }
            ],
            {
                duration: 180,
                easing: "cubic-bezier(.2,.8,.2,1)"
            }
        );

        showNoMessage();

        createSparkle(
            x + buttonWidth / 2,
            y + buttonHeight / 2
        );
    }


    function showNoMessage() {

        if (!noMessage) return;

        noMessage.classList.remove("show");

        requestAnimationFrame(() => {

            noMessage.classList.add("show");

        });

        clearTimeout(
            showNoMessage.timer
        );

        showNoMessage.timer =
            setTimeout(() => {

                noMessage.classList.remove("show");

            }, 850);

    }


    if (noButton) {

        /*
           Desktop
        */

        noButton.addEventListener(
            "mouseenter",
            moveNoButton
        );

        /*
           Touch / mobile
        */

        noButton.addEventListener(
            "pointerdown",
            event => {

                event.preventDefault();

                moveNoButton();

            }
        );

        /*
           Keyboard accessibility:
           prevent accidental activation.
        */

        noButton.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    moveNoButton();

                }

            }
        );

        noButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                moveNoButton();

            }
        );

    }


    /* =====================================================
       YES SCREEN → LETTER
    ===================================================== */

    if (continueToLetter) {

        continueToLetter.addEventListener(
            "click",
            event => {

                event.preventDefault();

                buttonPulse(
                    continueToLetter
                );

                screens.forEach(screen => {

                    if (screen) {
                        screen.classList.remove("active");
                    }

                });

                if (!letterSection) return;

                letterSection.classList.add("visible");

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant"
                });

                /*
                   Start immediately.
                */

                resetLetter();

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        revealLetter();

                    });

                });

                startFloatingHearts();

            }
        );

    }


    /* =====================================================
       LETTER ELEMENTS
    ===================================================== */

    const letterElements =
        document.querySelectorAll(
            `
            .letter-opening,
            .letter-paragraph,
            .letter-special,
            .letter-emphasis,
            .letter-final,
            .birthday-ending,
            .signature
            `
        );


    function resetLetter() {

        letterElements.forEach(
            element => {

                element.classList.remove(
                    "revealed"
                );

            }
        );

    }


    function revealLetter() {

        if (!letterSection) return;

        if (
            !letterSection.classList.contains(
                "visible"
            )
        ) {
            return;
        }

        const trigger =
            window.innerHeight * 0.86;

        letterElements.forEach(
            element => {

                const rect =
                    element.getBoundingClientRect();

                if (
                    rect.top <
                    trigger
                ) {

                    element.classList.add(
                        "revealed"
                    );

                }

            }
        );

    }


    /* =====================================================
       FAST SCROLL HANDLER
    ===================================================== */

    let scrollTicking = false;

    window.addEventListener(
        "scroll",
        () => {

            if (scrollTicking) return;

            scrollTicking = true;

            requestAnimationFrame(() => {

                revealLetter();

                scrollTicking = false;

            });

        },
        {
            passive: true
        }
    );


    /* =====================================================
       BIRTHDAY ENTRANCE
    ===================================================== */

    function birthdayEntrance() {

        const title =
            document.querySelector(
                ".birthday-title"
            );

        const name =
            document.querySelector(
                ".birthday-name"
            );

        const description =
            document.querySelector(
                ".birthday-description"
            );

        if (title) {

            title.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(18px) scale(.97)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0) scale(1)"
                    }
                ],
                {
                    duration: 650,
                    easing:
                        "cubic-bezier(.16,1,.3,1)"
                }
            );

        }

        if (name) {

            name.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(12px)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                ],
                {
                    duration: 550,
                    delay: 100,
                    easing:
                        "cubic-bezier(.16,1,.3,1)"
                }
            );

        }

        if (description) {

            description.animate(
                [
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }
                ],
                {
                    duration: 500,
                    delay: 180
                }
            );

        }

        createBirthdayParticles();

    }


    /* =====================================================
       QUESTION ENTRANCE
    ===================================================== */

    function questionEntrance() {

        const card =
            document.querySelector(
                ".question-card"
            );

        if (!card) return;

        card.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(20px) scale(.97)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0) scale(1)"
                }
            ],
            {
                duration: 420,
                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        );

    }


    /* =====================================================
       YES ENTRANCE
    ===================================================== */

    function yesEntrance() {

        const orbit =
            document.querySelector(
                ".yes-orbit"
            );

        const content =
            document.querySelector(
                ".yes-content"
            );

        if (orbit) {

            orbit.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "scale(.65) rotate(-12deg)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "scale(1) rotate(0)"
                    }
                ],
                {
                    duration: 600,
                    easing:
                        "cubic-bezier(.16,1,.3,1)"
                }
            );

        }

        if (content) {

            content.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(15px)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                ],
                {
                    duration: 520,
                    delay: 80,
                    easing:
                        "cubic-bezier(.16,1,.3,1)"
                }
            );

        }

    }


    /* =====================================================
       BUTTON MICRO INTERACTION
    ===================================================== */

    function buttonPulse(button) {

        if (!button) return;

        button.animate(
            [
                {
                    transform:
                        "scale(1)"
                },
                {
                    transform:
                        "scale(.94)"
                },
                {
                    transform:
                        "scale(1.035)"
                },
                {
                    transform:
                        "scale(1)"
                }
            ],
            {
                duration: 210,
                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );

    }


    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    let heartTimer = null;

    function createHeart() {

        if (!floatingHearts) return;

        const heart =
            document.createElement(
                "span"
            );

        heart.className =
            "floating-heart";

        const symbols = [
            "♡",
            "♥",
            "♡",
            "✦",
            "·"
        ];

        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        const start =
            Math.random() * 100;

        heart.style.left =
            `${start}%`;

        heart.style.fontSize =
            `${10 + Math.random() * 9}px`;

        heart.style.opacity =
            `${0.3 + Math.random() * 0.4}`;

        heart.style.setProperty(
            "--drift",
            `${-45 + Math.random() * 90}`
        );

        const duration =
            8 + Math.random() * 5;

        heart.style.animationDuration =
            `${duration}s`;

        floatingHearts.appendChild(
            heart
        );

        setTimeout(
            () => heart.remove(),
            (duration + 1) * 1000
        );

    }


    function startFloatingHearts() {

        if (heartTimer) {

            clearInterval(
                heartTimer
            );

        }

        /*
           Small number of elements
           = smooth performance.
        */

        for (let i = 0; i < 4; i++) {

            setTimeout(
                createHeart,
                i * 500
            );

        }

        heartTimer =
            setInterval(
                createHeart,
                1700
            );

    }


    /* =====================================================
       HEART BURST
    ===================================================== */

    function heartBurst() {

        if (!floatingHearts) return;

        const count = 22;

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const heart =
                document.createElement(
                    "span"
                );

            heart.className =
                "floating-heart";

            heart.textContent =
                i % 4 === 0
                    ? "♡"
                    : "♥";

            heart.style.left =
                "50%";

            heart.style.top =
                "50%";

            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                70 +
                Math.random() *
                190;

            const x =
                Math.cos(angle) *
                distance;

            const y =
                Math.sin(angle) *
                distance;

            heart.style.setProperty(
                "--burst-x",
                `${x}px`
            );

            heart.style.setProperty(
                "--burst-y",
                `${y}px`
            );

            heart.style.animation =
                "heartBurst .9s cubic-bezier(.16,1,.3,1) forwards";

            heart.style.fontSize =
                `${10 + Math.random() * 13}px`;

            floatingHearts.appendChild(
                heart
            );

            setTimeout(
                () => heart.remove(),
                1000
            );

        }

    }


    /* =====================================================
       SPARKLES
    ===================================================== */

    function createSparkle(x, y) {

        if (!sparkles) return;

        const sparkle =
            document.createElement(
                "span"
            );

        sparkle.className =
            "sparkle";

        sparkle.textContent =
            Math.random() > 0.5
                ? "✦"
                : "✧";

        sparkle.style.left =
            `${x}px`;

        sparkle.style.top =
            `${y}px`;

        sparkle.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 80}px`
        );

        sparkle.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 80}px`
        );

        sparkle.style.fontSize =
            `${8 + Math.random() * 8}px`;

        sparkles.appendChild(
            sparkle
        );

        setTimeout(
            () => sparkle.remove(),
            800
        );

    }


    function sparkleBurst() {

        const centerX =
            window.innerWidth / 2;

        const centerY =
            window.innerHeight / 2;

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            setTimeout(
                () => {

                    const angle =
                        Math.random() *
                        Math.PI *
                        2;

                    const radius =
                        40 +
                        Math.random() *
                        190;

                    createSparkle(
                        centerX +
                        Math.cos(angle) *
                        radius,

                        centerY +
                        Math.sin(angle) *
                        radius
                    );

                },
                i * 18
            );

        }

    }


    /* =====================================================
       BIRTHDAY PARTICLES
    ===================================================== */

    function createBirthdayParticles() {

        const container =
            document.querySelector(
                ".birthday-particles"
            );

        if (!container) return;

        /*
           Don't create hundreds of particles.
           A small number looks premium
           and keeps the page fast.
        */

        for (
            let i = 0;
            i < 24;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );

            particle.style.position =
                "absolute";

            particle.style.width =
                `${1 + Math.random() * 2}px`;

            particle.style.height =
                particle.style.width;

            particle.style.borderRadius =
                "50%";

            particle.style.background =
                "rgba(255,210,224,.75)";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.boxShadow =
                "0 0 9px rgba(255,190,215,.7)";

            particle.animate(
                [
                    {
                        opacity: 0.1,
                        transform:
                            "scale(.5)"
                    },
                    {
                        opacity: 0.8,
                        transform:
                            "scale(1.4)"
                    },
                    {
                        opacity: 0.1,
                        transform:
                            "scale(.5)"
                    }
                ],
                {
                    duration:
                        1800 +
                        Math.random() *
                        2600,

                    delay:
                        Math.random() *
                        1500,

                    iterations:
                        Infinity,

                    easing:
                        "ease-in-out"
                }
            );

            container.appendChild(
                particle
            );

        }

    }


    /* =====================================================
       CLICK SPARKLES
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    "button"
                )
            ) {
                return;
            }

            createSparkle(
                event.clientX,
                event.clientY
            );

        }
    );


    /* =====================================================
       DYNAMIC HEART BURST CSS
    ===================================================== */

    const style =
        document.createElement(
            "style"
        );

    style.textContent = `

        @keyframes heartBurst {

            0% {
                opacity: 0;
                transform:
                    translate3d(0,0,0)
                    scale(.35);
            }

            12% {
                opacity: 1;
            }

            100% {
                opacity: 0;
                transform:
                    translate3d(
                        var(--burst-x),
                        var(--burst-y),
                        0
                    )
                    scale(1.15);
            }

        }

    `;

    document.head.appendChild(
        style
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    showScreen(
        introScreen
    );

});
```
