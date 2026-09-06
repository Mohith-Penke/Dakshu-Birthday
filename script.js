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

    const screens = [
        introScreen,
        birthdayScreen,
        questionScreen,
        yesScreen
    ];

    /* =====================================================
       SCREEN NAVIGATION
       100% INSTANT
    ===================================================== */

    function showScreen(target) {

        for (const screen of screens) {
            if (screen) screen.classList.remove("active");
        }

        if (!target) return;

        target.classList.add("active");

        window.scrollTo(0, 0);
    }


    /* =====================================================
       INTRO → BIRTHDAY
    ===================================================== */

    if (openSurprise) {

        openSurprise.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            showScreen(birthdayScreen);

            birthdayEntrance();
            createBirthdayParticles();

        }, { passive: false });

    }


    /* =====================================================
       BIRTHDAY → QUESTION
    ===================================================== */

    if (birthdayContinue) {

        birthdayContinue.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            showScreen(questionScreen);

            questionEntrance();

        }, { passive: false });

    }


    /* =====================================================
       YES → YES SCREEN
    ===================================================== */

    if (yesButton) {

        yesButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            showScreen(yesScreen);

            yesEntrance();
            heartBurst();

        }, { passive: false });

    }


    /* =====================================================
       NO BUTTON
       NEVER ALLOWS CLICK
    ===================================================== */

    let noMoveTimer = null;

    function moveNoButton() {

        if (!noButton) return;

        const rect = noButton.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const padding = 20;

        const maxX = Math.max(
            padding,
            window.innerWidth - width - padding
        );

        const maxY = Math.max(
            padding,
            window.innerHeight - height - padding
        );

        const x =
            padding +
            Math.random() *
            Math.max(1, maxX - padding);

        const y =
            padding +
            Math.random() *
            Math.max(1, maxY - padding);

        noButton.style.position = "fixed";
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
        noButton.style.zIndex = "99999";

        noButton.animate(
            [
                { transform: "scale(.92)" },
                { transform: "scale(1.05)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 120,
                easing: "ease-out"
            }
        );

        if (noMessage) {

            noMessage.classList.add("show");

            clearTimeout(noMoveTimer);

            noMoveTimer = setTimeout(() => {
                noMessage.classList.remove("show");
            }, 700);

        }
    }


    if (noButton) {

        noButton.addEventListener(
            "mouseenter",
            moveNoButton
        );

        noButton.addEventListener(
            "pointerenter",
            moveNoButton
        );

        noButton.addEventListener(
            "pointerdown",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                moveNoButton();

            },
            { passive: false }
        );

        noButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                moveNoButton();

            },
            { passive: false }
        );

        noButton.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();
                    event.stopPropagation();

                    moveNoButton();

                }

            }
        );

    }


    /* =====================================================
       YES SCREEN → LETTER
    ===================================================== */

    if (continueToLetter) {

        continueToLetter.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                screens.forEach(screen => {

                    if (screen) {
                        screen.classList.remove("active");
                    }

                });

                if (!letterSection) return;

                letterSection.classList.add("visible");

                window.scrollTo(0, 0);

                resetLetter();

                requestAnimationFrame(() => {
                    revealLetter();
                });

                startFloatingHearts();

            },
            { passive: false }
        );

    }


    /* =====================================================
       LETTER REVEAL
    ===================================================== */

    const letterElements = document.querySelectorAll(
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

        letterElements.forEach(element => {
            element.classList.remove("revealed");
        });

    }


    function revealLetter() {

        if (!letterSection) return;

        if (!letterSection.classList.contains("visible")) {
            return;
        }

        const trigger = window.innerHeight * 0.86;

        letterElements.forEach(element => {

            if (
                element.getBoundingClientRect().top <
                trigger
            ) {
                element.classList.add("revealed");
            }

        });

    }


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
        { passive: true }
    );


    /* =====================================================
       BIRTHDAY ENTRANCE
       VISUAL ONLY — DOES NOT BLOCK CLICK
    ===================================================== */

    function birthdayEntrance() {

        const title =
            document.querySelector(".birthday-title");

        const name =
            document.querySelector(".birthday-name");

        const description =
            document.querySelector(".birthday-description");

        if (title) {

            title.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(14px) scale(.98)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0) scale(1)"
                    }
                ],
                {
                    duration: 420,
                    easing: "cubic-bezier(.16,1,.3,1)"
                }
            );

        }

        if (name) {

            name.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(10px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 360,
                    easing: "cubic-bezier(.16,1,.3,1)"
                }
            );

        }

        if (description) {

            description.animate(
                [
                    { opacity: 0 },
                    { opacity: 1 }
                ],
                {
                    duration: 300,
                    easing: "ease-out"
                }
            );

        }

    }


    /* =====================================================
       QUESTION ENTRANCE
    ===================================================== */

    function questionEntrance() {

        const card =
            document.querySelector(".question-card");

        if (!card) return;

        card.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(14px) scale(.98)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0) scale(1)"
                }
            ],
            {
                duration: 300,
                easing: "cubic-bezier(.16,1,.3,1)"
            }
        );

    }


    /* =====================================================
       YES ENTRANCE
    ===================================================== */

    function yesEntrance() {

        const orbit =
            document.querySelector(".yes-orbit");

        const content =
            document.querySelector(".yes-content");

        if (orbit) {

            orbit.animate(
                [
                    {
                        opacity: 0,
                        transform: "scale(.8)"
                    },
                    {
                        opacity: 1,
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 400,
                    easing: "cubic-bezier(.16,1,.3,1)"
                }
            );

        }

        if (content) {

            content.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(10px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 350,
                    easing: "cubic-bezier(.16,1,.3,1)"
                }
            );

        }

    }


    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    let heartTimer = null;

    function createHeart() {

        if (!floatingHearts) return;

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        const symbols = ["♡", "♥", "♡", "✦"];

        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.fontSize =
            `${10 + Math.random() * 8}px`;

        heart.style.opacity =
            `${0.3 + Math.random() * 0.35}`;

        heart.style.setProperty(
            "--drift",
            `${-45 + Math.random() * 90}`
        );

        const duration =
            8 + Math.random() * 4;

        heart.style.animationDuration =
            `${duration}s`;

        floatingHearts.appendChild(heart);

        setTimeout(
            () => heart.remove(),
            (duration + 1) * 1000
        );

    }


    function startFloatingHearts() {

        if (heartTimer) {
            clearInterval(heartTimer);
        }

        createHeart();
        createHeart();

        heartTimer =
            setInterval(
                createHeart,
                1800
            );

    }


    /* =====================================================
       HEART BURST
    ===================================================== */

    function heartBurst() {

        if (!floatingHearts) return;

        for (let i = 0; i < 18; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "floating-heart";

            heart.textContent =
                i % 4 === 0 ? "♡" : "♥";

            heart.style.left = "50%";
            heart.style.top = "50%";

            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                70 +
                Math.random() * 170;

            heart.style.setProperty(
                "--burst-x",
                `${Math.cos(angle) * distance}px`
            );

            heart.style.setProperty(
                "--burst-y",
                `${Math.sin(angle) * distance}px`
            );

            heart.style.animation =
                "heartBurst .8s cubic-bezier(.16,1,.3,1) forwards";

            heart.style.fontSize =
                `${10 + Math.random() * 12}px`;

            floatingHearts.appendChild(heart);

            setTimeout(
                () => heart.remove(),
                900
            );

        }

    }


    /* =====================================================
       BIRTHDAY PARTICLES
    ===================================================== */

    let birthdayParticlesCreated = false;

    function createBirthdayParticles() {

        if (birthdayParticlesCreated) return;

        const container =
            document.querySelector(
                ".birthday-particles"
            );

        if (!container) return;

        birthdayParticlesCreated = true;

        for (let i = 0; i < 24; i++) {

            const particle =
                document.createElement("span");

            particle.style.position = "absolute";
            particle.style.width =
                `${1 + Math.random() * 2}px`;

            particle.style.height =
                particle.style.width;

            particle.style.borderRadius = "50%";

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
                        opacity: .1,
                        transform: "scale(.5)"
                    },
                    {
                        opacity: .8,
                        transform: "scale(1.4)"
                    },
                    {
                        opacity: .1,
                        transform: "scale(.5)"
                    }
                ],
                {
                    duration:
                        1800 +
                        Math.random() * 2400,

                    delay:
                        Math.random() * 1200,

                    iterations: Infinity,

                    easing: "ease-in-out"
                }
            );

            container.appendChild(particle);

        }

    }


    /* =====================================================
       HEART BURST CSS
    ===================================================== */

    const style =
        document.createElement("style");

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

    document.head.appendChild(style);


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    showScreen(introScreen);

});
```
