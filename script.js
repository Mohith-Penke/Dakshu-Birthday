document.addEventListener("DOMContentLoaded", () => {
    "use strict";

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

    const screens = [
        introScreen,
        birthdayScreen,
        questionScreen,
        yesScreen
    ].filter(Boolean);


    /* =====================================================
       BASIC SETUP
    ===================================================== */

    [
        openSurprise,
        birthdayContinue,
        yesButton,
        noButton,
        continueToLetter
    ].forEach(button => {
        if (button) {
            button.setAttribute("type", "button");
        }
    });


    /* =====================================================
       SCREEN NAVIGATION
    ===================================================== */

    function showScreen(target) {
        if (!target) return;

        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        if (letterSection) {
            letterSection.classList.remove("visible");
        }

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }


    /* =====================================================
       INTRO → BIRTHDAY
    ===================================================== */

    if (openSurprise) {
        openSurprise.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            showScreen(birthdayScreen);

            birthdayEntrance();
            createBirthdayParticles();
        });
    }


    /* =====================================================
       BIRTHDAY → QUESTION
    ===================================================== */

    if (birthdayContinue) {
        birthdayContinue.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            showScreen(questionScreen);

            questionEntrance();
        });
    }


    /* =====================================================
       YES → YES SCREEN
    ===================================================== */

    if (yesButton) {
        yesButton.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            showScreen(yesScreen);

            yesEntrance();
            heartBurst();
        });
    }


    /* =====================================================
       NO BUTTON
       IT ALWAYS ESCAPES
    ===================================================== */

    let noMessageTimer = null;

    function moveNoButton() {
        if (!noButton) return;

        const padding = 18;

        const buttonWidth = noButton.offsetWidth || 100;
        const buttonHeight = noButton.offsetHeight || 48;

        const maxX = Math.max(
            padding,
            window.innerWidth - buttonWidth - padding
        );

        const maxY = Math.max(
            padding,
            window.innerHeight - buttonHeight - padding
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
                {
                    transform: "scale(.88) rotate(-2deg)"
                },
                {
                    transform: "scale(1.06) rotate(2deg)"
                },
                {
                    transform: "scale(1) rotate(0)"
                }
            ],
            {
                duration: 160,
                easing: "cubic-bezier(.16,1,.3,1)"
            }
        );

        if (noMessage) {
            noMessage.classList.add("show");

            clearTimeout(noMessageTimer);

            noMessageTimer = setTimeout(() => {
                noMessage.classList.remove("show");
            }, 800);
        }
    }


    if (noButton) {

        noButton.addEventListener("mouseenter", moveNoButton);

        noButton.addEventListener("pointerenter", moveNoButton);

        noButton.addEventListener(
            "pointerdown",
            event => {
                event.preventDefault();
                event.stopPropagation();
                moveNoButton();
            },
            { passive: false }
        );

        noButton.addEventListener(
            "click",
            event => {
                event.preventDefault();
                event.stopPropagation();
                moveNoButton();
            },
            { passive: false }
        );

        noButton.addEventListener("keydown", event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                event.stopPropagation();
                moveNoButton();
            }
        });
    }


    /* =====================================================
       YES SCREEN → LETTER
    ===================================================== */

    if (continueToLetter) {
        continueToLetter.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            screens.forEach(screen => {
                screen.classList.remove("active");
            });

            if (!letterSection) return;

            letterSection.classList.add("visible");

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });

            prepareLetter();

            requestAnimationFrame(() => {
                revealLetter();
            });

            startFloatingHearts();
        });
    }


    /* =====================================================
       LETTER SCROLL REVEAL
    ===================================================== */

    const letterElements = letterSection
        ? letterSection.querySelectorAll(
            `
            .letter-opening,
            .letter-paragraph,
            .letter-special,
            .letter-emphasis,
            .letter-final,
            .birthday-ending,
            .signature,
            p,
            h1,
            h2,
            h3
            `
        )
        : [];


    function prepareLetter() {
        letterElements.forEach(element => {
            element.classList.remove("revealed");
        });
    }


    function revealLetter() {
        if (!letterSection) return;

        if (!letterSection.classList.contains("visible")) {
            return;
        }

        const trigger =
            window.innerHeight * 0.86;

        letterElements.forEach(element => {

            const rect =
                element.getBoundingClientRect();

            if (rect.top < trigger) {
                element.classList.add("revealed");
            }
        });
    }


    let scrollFrame = null;

    window.addEventListener(
        "scroll",
        () => {

            if (scrollFrame) return;

            scrollFrame = requestAnimationFrame(() => {
                revealLetter();
                scrollFrame = null;
            });

        },
        { passive: true }
    );


    /* =====================================================
       BIRTHDAY ENTRANCE
    ===================================================== */

    function birthdayEntrance() {

        const title =
            birthdayScreen?.querySelector(".birthday-title");

        const name =
            birthdayScreen?.querySelector(".birthday-name");

        const description =
            birthdayScreen?.querySelector(".birthday-description");

        if (title) {
            title.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(18px) scale(.97)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0) scale(1)"
                    }
                ],
                {
                    duration: 450,
                    easing: "cubic-bezier(.16,1,.3,1)",
                    fill: "both"
                }
            );
        }

        if (name) {
            name.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(12px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 420,
                    delay: 80,
                    easing: "cubic-bezier(.16,1,.3,1)",
                    fill: "both"
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
                    duration: 350,
                    delay: 150,
                    easing: "ease-out",
                    fill: "both"
                }
            );
        }
    }


    /* =====================================================
       QUESTION ENTRANCE
    ===================================================== */

    function questionEntrance() {

        const card =
            questionScreen?.querySelector(".question-card");

        if (!card) return;

        card.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(18px) scale(.97)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0) scale(1)"
                }
            ],
            {
                duration: 360,
                easing: "cubic-bezier(.16,1,.3,1)",
                fill: "both"
            }
        );
    }


    /* =====================================================
       YES SCREEN ENTRANCE
    ===================================================== */

    function yesEntrance() {

        const orbit =
            yesScreen?.querySelector(".yes-orbit");

        const content =
            yesScreen?.querySelector(".yes-content");

        if (orbit) {
            orbit.animate(
                [
                    {
                        opacity: 0,
                        transform: "scale(.72)"
                    },
                    {
                        opacity: 1,
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 500,
                    easing: "cubic-bezier(.16,1,.3,1)",
                    fill: "both"
                }
            );
        }

        if (content) {
            content.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(14px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 400,
                    delay: 80,
                    easing: "cubic-bezier(.16,1,.3,1)",
                    fill: "both"
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

        const heart =
            document.createElement("span");

        heart.className = "floating-heart";

        const symbols = [
            "♡",
            "♥",
            "♡",
            "✦"
        ];

        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.fontSize =
            `${10 + Math.random() * 9}px`;

        heart.style.opacity =
            `${0.25 + Math.random() * 0.4}`;

        heart.style.setProperty(
            "--drift",
            `${-50 + Math.random() * 100}px`
        );

        const duration =
            8 + Math.random() * 5;

        heart.style.animationDuration =
            `${duration}s`;

        floatingHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, (duration + 1) * 1000);
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
                i % 4 === 0
                    ? "♡"
                    : "♥";

            heart.style.position = "fixed";
            heart.style.left = "50%";
            heart.style.top = "50%";
            heart.style.zIndex = "1000";
            heart.style.pointerEvents = "none";

            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                70 +
                Math.random() * 180;

            heart.style.setProperty(
                "--burst-x",
                `${Math.cos(angle) * distance}px`
            );

            heart.style.setProperty(
                "--burst-y",
                `${Math.sin(angle) * distance}px`
            );

            heart.style.fontSize =
                `${10 + Math.random() * 12}px`;

            heart.style.animation =
                "heartBurst .8s cubic-bezier(.16,1,.3,1) forwards";

            floatingHearts.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 900);
        }
    }


    /* =====================================================
       BIRTHDAY PARTICLES
    ===================================================== */

    let birthdayParticlesCreated = false;

    function createBirthdayParticles() {

        if (birthdayParticlesCreated) return;

        const container =
            document.querySelector(".birthday-particles");

        if (!container) return;

        birthdayParticlesCreated = true;

        for (let i = 0; i < 24; i++) {

            const particle =
                document.createElement("span");

            const size =
                1 + Math.random() * 2;

            particle.style.position = "absolute";
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
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
                        opacity: 0.1,
                        transform: "scale(.5)"
                    },
                    {
                        opacity: 0.8,
                        transform: "scale(1.4)"
                    },
                    {
                        opacity: 0.1,
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
       HEART BURST ANIMATION
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

        .letter-content .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        @media (prefers-reduced-motion: reduce) {
            .letter-content .revealed {
                transition: none !important;
            }
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    showScreen(introScreen);

});
