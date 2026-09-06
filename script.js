/* =========================================================
   DAKSHU BIRTHDAY — MAIN SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

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

    const letterElements = document.querySelectorAll(
        ".letter-opening, .letter-paragraph, .letter-special, .letter-emphasis, .letter-final, .birthday-ending, .signature"
    );


    /* =====================================================
       SCREEN SWITCHING
    ====================================================== */

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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       INTRO → BIRTHDAY
    ====================================================== */

    if (openSurprise) {

        openSurprise.addEventListener("click", () => {

            createSparkleBurst();

            setTimeout(() => {
                showScreen(birthdayScreen);
                startBirthdayEffects();
            }, 350);

        });

    }


    /* =====================================================
       BIRTHDAY → QUESTION
    ====================================================== */

    if (birthdayContinue) {

        birthdayContinue.addEventListener("click", () => {

            createSparkleBurst();

            setTimeout(() => {
                showScreen(questionScreen);
            }, 300);

        });

    }


    /* =====================================================
       YES BUTTON
    ====================================================== */

    if (yesButton) {

        yesButton.addEventListener("click", () => {

            createHeartBurst();

            setTimeout(() => {
                showScreen(yesScreen);
            }, 450);

        });

    }


    /* =====================================================
       YES SCREEN → LETTER
    ====================================================== */

    if (continueToLetter) {

        continueToLetter.addEventListener("click", () => {

            document.querySelectorAll(".screen").forEach(screen => {
                screen.classList.remove("active");
            });

            letterSection.classList.add("visible");

            setTimeout(() => {

                letterSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 250);

            startFloatingHearts();

        });

    }


    /* =====================================================
       NO BUTTON — ESCAPE
    ====================================================== */

    function escapeNoButton() {

        if (!noButton) return;

        const padding = 25;

        const maxX =
            Math.max(
                padding,
                window.innerWidth - noButton.offsetWidth - padding
            );

        const maxY =
            Math.max(
                padding,
                window.innerHeight - noButton.offsetHeight - padding
            );

        const randomX =
            Math.floor(
                Math.random() * (maxX - padding) + padding
            );

        const randomY =
            Math.floor(
                Math.random() * (maxY - padding) + padding
            );

        noButton.style.position = "fixed";
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
        noButton.style.zIndex = "100";

        if (noMessage) {
            noMessage.classList.add("show");

            setTimeout(() => {
                noMessage.classList.remove("show");
            }, 900);
        }
    }


    if (noButton) {

        noButton.addEventListener("mouseenter", escapeNoButton);

        noButton.addEventListener("touchstart", (event) => {
            event.preventDefault();
            escapeNoButton();
        });

        noButton.addEventListener("pointerdown", (event) => {

            if (event.pointerType === "touch") {
                event.preventDefault();
                escapeNoButton();
            }

        });

        noButton.addEventListener("click", (event) => {
            event.preventDefault();
            escapeNoButton();
        });

    }


    /* =====================================================
       SCROLL-BASED LETTER REVEAL
    ====================================================== */

    let revealTicking = false;

    function revealLetterOnScroll() {

        if (!letterSection.classList.contains("visible")) {
            return;
        }

        const windowHeight = window.innerHeight;

        letterElements.forEach((element, index) => {

            const rect = element.getBoundingClientRect();

            const revealPoint =
                windowHeight * 0.88;

            if (rect.top < revealPoint) {

                if (!element.classList.contains("revealed")) {

                    setTimeout(() => {
                        element.classList.add("revealed");
                    }, Math.min(index * 35, 250));

                }

            }

        });

        revealTicking = false;
    }


    window.addEventListener("scroll", () => {

        if (!letterSection.classList.contains("visible")) {
            return;
        }

        if (!revealTicking) {

            window.requestAnimationFrame(() => {
                revealLetterOnScroll();
            });

            revealTicking = true;
        }

    }, {
        passive: true
    });


    /* =====================================================
       FIRST LETTER REVEAL
    ====================================================== */

    function initializeLetter() {

        letterElements.forEach(element => {
            element.classList.remove("revealed");
        });

        setTimeout(() => {
            revealLetterOnScroll();
        }, 500);

    }


    if (continueToLetter) {

        continueToLetter.addEventListener("click", () => {
            setTimeout(initializeLetter, 700);
        });

    }


    /* =====================================================
       FLOATING HEARTS
    ====================================================== */

    let heartInterval = null;

    function createFloatingHeart() {

        if (!floatingHearts) return;

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        const hearts = [
            "♡",
            "♥",
            "♡",
            "❤",
            "✦"
        ];

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.fontSize =
            `${10 + Math.random() * 12}px`;

        heart.style.animationDuration =
            `${7 + Math.random() * 6}s`;

        heart.style.opacity =
            `${0.25 + Math.random() * 0.45}`;

        floatingHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 14000);

    }


    function startFloatingHearts() {

        if (heartInterval) {
            clearInterval(heartInterval);
        }

        heartInterval = setInterval(() => {

            if (
                letterSection.classList.contains("visible")
            ) {
                createFloatingHeart();
            }

        }, 1500);

    }


    /* =====================================================
       BIRTHDAY EFFECTS
    ====================================================== */

    function startBirthdayEffects() {

        createSparkleBurst();

        setTimeout(() => {
            createSparkleBurst();
        }, 700);

        setTimeout(() => {
            createHeartBurst();
        }, 1300);

    }


    /* =====================================================
       HEART BURST
    ====================================================== */

    function createHeartBurst() {

        if (!floatingHearts) return;

        for (let i = 0; i < 18; i++) {

            const heart = document.createElement("span");

            heart.className = "floating-heart";

            heart.textContent =
                Math.random() > 0.5 ? "♡" : "♥";

            heart.style.left = "50%";
            heart.style.bottom = "45%";

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                80 + Math.random() * 180;

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
                `heartBurst ${1.5 + Math.random()}s ease-out forwards`;

            floatingHearts.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);

        }

    }


    /* =====================================================
       CLICK SPARKLES
    ====================================================== */

    function createSparkle(x, y) {

        if (!sparkles) return;

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.textContent =
            Math.random() > 0.5 ? "✦" : "✧";

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        sparkle.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 70}px`
        );

        sparkle.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 70}px`
        );

        sparkles.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 900);

    }


    function createSparkleBurst() {

        const centerX =
            window.innerWidth / 2;

        const centerY =
            window.innerHeight / 2;

        for (let i = 0; i < 15; i++) {

            setTimeout(() => {

                createSparkle(
                    centerX + (Math.random() - 0.5) * 260,
                    centerY + (Math.random() - 0.5) * 180
                );

            }, i * 35);

        }

    }


    /* =====================================================
       CLICK ANYWHERE → SMALL SPARKLE
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (
            event.target.closest("button")
        ) {
            return;
        }

        createSparkle(
            event.clientX,
            event.clientY
        );

    });


    /* =====================================================
       KEYBOARD SUPPORT
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" &&
            document.activeElement === openSurprise
        ) {
            openSurprise.click();
        }

    });


    /* =====================================================
       RESET NO BUTTON WHEN QUESTION OPENS
    ====================================================== */

    const questionObserver =
        new MutationObserver(() => {

            if (
                questionScreen.classList.contains("active") &&
                noButton
            ) {

                noButton.style.position = "relative";
                noButton.style.left = "";
                noButton.style.top = "";
                noButton.style.zIndex = "";

            }

        });


    if (questionScreen) {

        questionObserver.observe(
            questionScreen,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );

    }


    /* =====================================================
       DYNAMIC HEART BURST STYLE
    ====================================================== */

    const dynamicStyle =
        document.createElement("style");

    dynamicStyle.textContent = `

        @keyframes heartBurst {

            0% {
                transform:
                    translate(0, 0)
                    scale(0.4);
                opacity: 0;
            }

            15% {
                opacity: 1;
            }

            100% {
                transform:
                    translate(var(--burst-x), var(--burst-y))
                    scale(1.2);
                opacity: 0;
            }

        }

    `;

    document.head.appendChild(dynamicStyle);


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    showScreen(introScreen);

});
