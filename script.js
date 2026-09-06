document.addEventListener("DOMContentLoaded", () => {

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
       SCREEN CONTROL
    ===================================================== */

    function showScreen(screen) {

        const screens = [
            introScreen,
            birthdayScreen,
            questionScreen,
            yesScreen
        ];

        screens.forEach(item => {
            if (item) {
                item.classList.remove("active");
            }
        });

        if (screen) {
            screen.classList.add("active");
        }

        window.scrollTo(0, 0);
    }


    /* =====================================================
       INTRO
    ===================================================== */

    if (openSurprise) {
        openSurprise.addEventListener("click", () => {

            sparkleBurst();

            setTimeout(() => {
                showScreen(birthdayScreen);
            }, 400);

        });
    }


    /* =====================================================
       BIRTHDAY
    ===================================================== */

    if (birthdayContinue) {
        birthdayContinue.addEventListener("click", () => {

            sparkleBurst();

            setTimeout(() => {
                showScreen(questionScreen);
            }, 350);

        });
    }


    /* =====================================================
       YES
    ===================================================== */

    if (yesButton) {
        yesButton.addEventListener("click", () => {

            heartBurst();

            setTimeout(() => {
                showScreen(yesScreen);
            }, 450);

        });
    }


    /* =====================================================
       NO BUTTON
    ===================================================== */

    function moveNoButton() {

        if (!noButton) return;

        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        const margin = 20;

        const maxX =
            window.innerWidth - buttonWidth - margin;

        const maxY =
            window.innerHeight - buttonHeight - margin;

        const x =
            margin +
            Math.random() * Math.max(0, maxX - margin);

        const y =
            margin +
            Math.random() * Math.max(0, maxY - margin);

        noButton.style.position = "fixed";
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
        noButton.style.zIndex = "999";

        if (noMessage) {

            noMessage.classList.add("show");

            setTimeout(() => {
                noMessage.classList.remove("show");
            }, 900);

        }
    }


    if (noButton) {

        noButton.addEventListener("mouseenter", moveNoButton);

        noButton.addEventListener("pointerdown", event => {

            event.preventDefault();
            moveNoButton();

        });

        noButton.addEventListener("click", event => {

            event.preventDefault();
            moveNoButton();

        });

    }


    /* =====================================================
       YES → LETTER
    ===================================================== */

    if (continueToLetter) {

        continueToLetter.addEventListener("click", () => {

            document.querySelectorAll(".screen").forEach(screen => {
                screen.classList.remove("active");
            });

            letterSection.classList.add("visible");

            window.scrollTo(0, 0);

            setTimeout(() => {
                revealLetter();
            }, 700);

            startFloatingHearts();

        });

    }


    /* =====================================================
       LETTER SCROLL REVEAL
    ===================================================== */

    const letterElements = document.querySelectorAll(
        ".letter-opening, .letter-paragraph, .letter-special, .letter-emphasis, .letter-final, .birthday-ending, .signature"
    );


    function revealLetter() {

        const triggerPoint =
            window.innerHeight * 0.88;

        letterElements.forEach(element => {

            const position =
                element.getBoundingClientRect().top;

            if (position < triggerPoint) {
                element.classList.add("revealed");
            }

        });

    }


    window.addEventListener("scroll", () => {

        if (!letterSection.classList.contains("visible")) {
            return;
        }

        revealLetter();

    }, {
        passive: true
    });


    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    let heartTimer = null;

    function createHeart() {

        if (!floatingHearts) return;

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        const symbols = [
            "♡",
            "♥",
            "♡",
            "✦"
        ];

        heart.textContent =
            symbols[
                Math.floor(Math.random() * symbols.length)
            ];

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.fontSize =
            `${10 + Math.random() * 9}px`;

        heart.style.animationDuration =
            `${8 + Math.random() * 5}s`;

        floatingHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 14000);

    }


    function startFloatingHearts() {

        if (heartTimer) {
            clearInterval(heartTimer);
        }

        heartTimer = setInterval(() => {
            createHeart();
        }, 1800);

    }


    /* =====================================================
       HEART BURST
    ===================================================== */

    function heartBurst() {

        if (!floatingHearts) return;

        for (let i = 0; i < 16; i++) {

            const heart = document.createElement("span");

            heart.className = "floating-heart";
            heart.textContent = "♥";

            heart.style.left = "50%";
            heart.style.bottom = "45%";

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                70 + Math.random() * 160;

            const x =
                Math.cos(angle) * distance;

            const y =
                Math.sin(angle) * distance;

            heart.style.setProperty(
                "--burst-x",
                `${x}px`
            );

            heart.style.setProperty(
                "--burst-y",
                `${y}px`
            );

            heart.style.animation =
                "heartBurst 1.6s ease-out forwards";

            floatingHearts.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 1800);

        }

    }


    /* =====================================================
       SPARKLES
    ===================================================== */

    function createSparkle(x, y) {

        if (!sparkles) return;

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.textContent =
            Math.random() > 0.5
                ? "✦"
                : "✧";

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        sparkle.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 80}px`
        );

        sparkle.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 80}px`
        );

        sparkles.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 900);

    }


    function sparkleBurst() {

        const centerX =
            window.innerWidth / 2;

        const centerY =
            window.innerHeight / 2;

        for (let i = 0; i < 14; i++) {

            setTimeout(() => {

                createSparkle(
                    centerX +
                    (Math.random() - 0.5) * 260,

                    centerY +
                    (Math.random() - 0.5) * 180
                );

            }, i * 35);

        }

    }


    /* =====================================================
       CLICK SPARKLE
    ===================================================== */

    document.addEventListener("click", event => {

        if (event.target.closest("button")) {
            return;
        }

        createSparkle(
            event.clientX,
            event.clientY
        );

    });


    /* =====================================================
       HEART BURST CSS
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        @keyframes heartBurst {

            0% {
                opacity: 0;
                transform:
                    translate(0, 0)
                    scale(0.4);
            }

            15% {
                opacity: 1;
            }

            100% {
                opacity: 0;
                transform:
                    translate(var(--burst-x), var(--burst-y))
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
