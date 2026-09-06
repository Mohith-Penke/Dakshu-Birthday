/* =========================================
   BIRTHDAY WEBSITE - MAIN SCRIPT
   Dakshayini / Dakshu ❤️
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const introScreen = document.getElementById("intro-screen");
    const birthdayScreen = document.getElementById("birthday-screen");
    const questionScreen = document.getElementById("question-screen");
    const yesScreen = document.getElementById("yes-screen");

    const mainWebsite = document.getElementById("main-website");

    const openSurprise = document.getElementById("open-surprise");
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");
    const continueAfterYes = document.getElementById("continue-after-yes");

    const partyContainer =
        document.getElementById("party-container");

    const yesPartyContainer =
        document.getElementById("yes-party-container");


    /* =========================================
       SCREEN SWITCHING
    ========================================= */

    function showScreen(screen) {

        document.querySelectorAll(".screen").forEach(item => {
            item.classList.remove("active");
        });

        setTimeout(() => {
            screen.classList.add("active");
        }, 80);
    }


    /* =========================================
       OPEN SURPRISE
    ========================================= */

    openSurprise.addEventListener("click", () => {

        showScreen(birthdayScreen);

        startBirthdayParty();

        /*
            Birthday reveal stays for a few seconds.
            Then automatically moves to the question.
        */

        setTimeout(() => {

            showScreen(questionScreen);

            positionNoButton();

        }, 6500);

    });


    /* =========================================
       BIRTHDAY PARTY EFFECTS
    ========================================= */

    function startBirthdayParty() {

        createConfetti(partyContainer, 180);

        createBalloons(partyContainer, 22);

        createSparkles(partyContainer, 90);

        createFireworkBursts(partyContainer);

    }


    /* =========================================
       YES PARTY EFFECTS
    ========================================= */

    function startYesParty() {

        createConfetti(yesPartyContainer, 220);

        createBalloons(yesPartyContainer, 25);

        createSparkles(yesPartyContainer, 120);

        createFireworkBursts(yesPartyContainer);

    }


    /* =========================================
       CONFETTI
    ========================================= */

    function createConfetti(container, amount) {

        for (let i = 0; i < amount; i++) {

            const piece = document.createElement("div");

            piece.className = "party-piece";

            piece.style.left =
                Math.random() * 100 + "vw";

            piece.style.animationDuration =
                (2.5 + Math.random() * 4) + "s";

            piece.style.animationDelay =
                Math.random() * 1.5 + "s";

            piece.style.background =
                randomPartyColor();

            piece.style.width =
                (5 + Math.random() * 8) + "px";

            piece.style.height =
                (8 + Math.random() * 14) + "px";

            container.appendChild(piece);

            setTimeout(() => {
                piece.remove();
            }, 8500);
        }
    }


    /* =========================================
       BALLOONS
    ========================================= */

    function createBalloons(container, amount) {

        for (let i = 0; i < amount; i++) {

            const balloon = document.createElement("div");

            balloon.className = "party-balloon";

            balloon.style.left =
                Math.random() * 100 + "vw";

            balloon.style.background =
                randomPartyColor();

            balloon.style.animationDuration =
                (5 + Math.random() * 5) + "s";

            balloon.style.animationDelay =
                Math.random() * 2 + "s";

            container.appendChild(balloon);

            setTimeout(() => {
                balloon.remove();
            }, 12000);
        }
    }


    /* =========================================
       SPARKLES
    ========================================= */

    function createSparkles(container, amount) {

        for (let i = 0; i < amount; i++) {

            setTimeout(() => {

                const spark =
                    document.createElement("div");

                spark.className = "party-spark";

                spark.style.left =
                    Math.random() * 100 + "vw";

                spark.style.top =
                    Math.random() * 100 + "vh";

                spark.style.animationDelay =
                    Math.random() * 0.4 + "s";

                container.appendChild(spark);

                setTimeout(() => {
                    spark.remove();
                }, 2000);

            }, i * 35);
        }
    }


    /* =========================================
       FIREWORK BURSTS
    ========================================= */

    function createFireworkBursts(container) {

        const burstCount = 8;

        for (let i = 0; i < burstCount; i++) {

            setTimeout(() => {

                const centerX =
                    15 + Math.random() * 70;

                const centerY =
                    15 + Math.random() * 55;

                for (let j = 0; j < 18; j++) {

                    const spark =
                        document.createElement("div");

                    spark.className = "party-spark";

                    spark.style.left =
                        centerX + "vw";

                    spark.style.top =
                        centerY + "vh";

                    const angle =
                        (Math.PI * 2 * j) / 18;

                    const distance =
                        35 + Math.random() * 80;

                    spark.animate(
                        [
                            {
                                transform:
                                    "translate(0, 0) scale(1)",
                                opacity: 1
                            },
                            {
                                transform:
                                    `translate(
                                        ${Math.cos(angle) * distance}px,
                                        ${Math.sin(angle) * distance}px
                                    ) scale(0)`,
                                opacity: 0
                            }
                        ],
                        {
                            duration:
                                1000 + Math.random() * 700,
                            easing: "ease-out",
                            fill: "forwards"
                        }
                    );

                    container.appendChild(spark);

                    setTimeout(() => {
                        spark.remove();
                    }, 2000);
                }

            }, i * 650);
        }
    }


    /* =========================================
       RANDOM PARTY COLORS
    ========================================= */

    function randomPartyColor() {

        const colors = [
            "#ff4fa3",
            "#ff8ac5",
            "#ffd166",
            "#7dd3fc",
            "#c084fc",
            "#ffffff",
            "#ff6b6b",
            "#a7f3d0"
        ];

        return colors[
            Math.floor(Math.random() * colors.length)
        ];
    }


    /* =========================================
       NO BUTTON
       ESCAPING BEHAVIOUR
    ========================================= */

    function positionNoButton() {

        const padding = 20;

        const buttonWidth =
            noButton.offsetWidth || 120;

        const buttonHeight =
            noButton.offsetHeight || 55;

        const maxX =
            window.innerWidth -
            buttonWidth -
            padding;

        const maxY =
            window.innerHeight -
            buttonHeight -
            padding;

        const randomX =
            padding +
            Math.random() *
            Math.max(maxX - padding, 1);

        const randomY =
            padding +
            Math.random() *
            Math.max(maxY - padding, 1);

        noButton.style.left =
            randomX + "px";

        noButton.style.top =
            randomY + "px";

        noButton.style.transform =
            `rotate(${Math.random() * 16 - 8}deg)`;
    }


    /* =========================================
       DETECT CURSOR NEAR NO BUTTON
    ========================================= */

    document.addEventListener("mousemove", (event) => {

        if (!questionScreen.classList.contains("active")) {
            return;
        }

        const rect =
            noButton.getBoundingClientRect();

        const buttonCenterX =
            rect.left + rect.width / 2;

        const buttonCenterY =
            rect.top + rect.height / 2;

        const distance =
            Math.sqrt(
                Math.pow(event.clientX - buttonCenterX, 2) +
                Math.pow(event.clientY - buttonCenterY, 2)
            );

        /*
            The closer the cursor gets,
            the faster the button escapes.
        */

        if (distance < 130) {

            positionNoButton();

        }

    });


    /* =========================================
       EXTRA NO BUTTON PROTECTION
    ========================================= */

    noButton.addEventListener("mouseenter", () => {

        positionNoButton();

    });


    noButton.addEventListener("mouseover", () => {

        positionNoButton();

    });


    noButton.addEventListener("click", (event) => {

        event.preventDefault();

        positionNoButton();

    });


    /* =========================================
       MOBILE TOUCH
    ========================================= */

    noButton.addEventListener(
        "touchstart",
        (event) => {

            event.preventDefault();

            positionNoButton();

        },
        {
            passive: false
        }
    );


    /* =========================================
       YES BUTTON
    ========================================= */

    yesButton.addEventListener("click", () => {

        showScreen(yesScreen);

        startYesParty();

    });


    /* =========================================
       CONTINUE AFTER YES
    ========================================= */

    continueAfterYes.addEventListener("click", () => {

        /*
            For now the main website is revealed.
            Memories, timeline, letter, gifts,
            secret section etc. will be added next.
        */

        yesScreen.classList.remove("active");

        setTimeout(() => {

            mainWebsite.classList.remove("hidden");

            document.body.style.overflow = "auto";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 900);

    });


    /* =========================================
       INITIAL NO BUTTON POSITION
    ========================================= */

    window.addEventListener("resize", () => {

        if (questionScreen.classList.contains("active")) {

            positionNoButton();

        }

    });


    /* =========================================
       RANDOM HEARTS WHEN CLICKING
    ========================================= */

    document.addEventListener("click", (event) => {

        if (
            event.target === noButton ||
            event.target === yesButton
        ) {
            return;
        }

        createClickHeart(
            event.clientX,
            event.clientY
        );

    });


    function createClickHeart(x, y) {

        const heart =
            document.createElement("div");

        heart.innerHTML = "♥";

        heart.style.position = "fixed";

        heart.style.left = x + "px";

        heart.style.top = y + "px";

        heart.style.zIndex = "2000";

        heart.style.pointerEvents = "none";

        heart.style.fontSize =
            (12 + Math.random() * 12) + "px";

        heart.style.color =
            "#ff79bd";

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0.5)",
                    opacity: 1
                },
                {
                    transform:
                        "translate(-50%, -120px) scale(1.3)",
                    opacity: 0
                }
            ],
            {
                duration: 900,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }


    /* =========================================
       KEYBOARD ACCESSIBILITY
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            questionScreen.classList.contains("active")
        ) {

            positionNoButton();

        }

    });


    /* =========================================
       CONSOLE MESSAGE
    ========================================= */

    console.log(
        "❤️ Made specially for Dakshu."
    );

});
