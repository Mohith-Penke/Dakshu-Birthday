document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SCREEN ELEMENTS
    ========================================== */

    const introScreen = document.getElementById("intro-screen");
    const birthdayScreen = document.getElementById("birthday-screen");
    const questionScreen = document.getElementById("question-screen");
    const yesScreen = document.getElementById("yes-screen");
    const mainWebsite = document.getElementById("main-website");

    const openSurprise = document.getElementById("open-surprise");
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");
    const continueAfterYes = document.getElementById("continue-after-yes");

    const partyContainer = document.getElementById("party-container");
    const yesPartyContainer = document.getElementById("yes-party-container");


    /* =========================================
       SCREEN SWITCHING
    ========================================== */

    function showScreen(screen) {

        document.querySelectorAll(".screen").forEach((item) => {
            item.classList.remove("active");
        });

        if (screen) {
            screen.classList.add("active");
        }
    }


    /* =========================================
       INTRO → BIRTHDAY
    ========================================== */

    if (openSurprise) {

        openSurprise.addEventListener("click", () => {

            showScreen(birthdayScreen);

            createPartyEffects(partyContainer);

            setTimeout(() => {
                showScreen(questionScreen);
                positionNoButton();
            }, 6500);

        });

    }


    /* =========================================
       PARTY EFFECTS
    ========================================== */

    function createPartyEffects(container) {

        if (!container) return;

        container.innerHTML = "";

        createConfetti(container);
        createBalloons(container);
        createSparkles(container);
        createFireworks(container);
    }


    function createConfetti(container) {

        const amount = window.innerWidth < 600 ? 80 : 140;

        for (let i = 0; i < amount; i++) {

            const piece = document.createElement("div");

            piece.className = "party-piece";

            piece.style.left = Math.random() * 100 + "%";
            piece.style.top = (-20 - Math.random() * 30) + "%";

            piece.style.animationDelay =
                Math.random() * 2.5 + "s";

            piece.style.animationDuration =
                (2.5 + Math.random() * 2.5) + "s";

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            container.appendChild(piece);
        }
    }


    function createBalloons(container) {

        const amount = window.innerWidth < 600 ? 10 : 18;

        for (let i = 0; i < amount; i++) {

            const balloon = document.createElement("div");

            balloon.className = "party-balloon";

            balloon.style.left =
                Math.random() * 100 + "%";

            balloon.style.animationDelay =
                Math.random() * 4 + "s";

            balloon.style.animationDuration =
                (5 + Math.random() * 4) + "s";

            balloon.style.transform =
                `scale(${0.7 + Math.random() * 0.7})`;

            container.appendChild(balloon);
        }
    }


    function createSparkles(container) {

        const amount = window.innerWidth < 600 ? 35 : 60;

        for (let i = 0; i < amount; i++) {

            const spark = document.createElement("div");

            spark.className = "party-spark";

            spark.style.left =
                Math.random() * 100 + "%";

            spark.style.top =
                Math.random() * 100 + "%";

            spark.style.animationDelay =
                Math.random() * 2.5 + "s";

            container.appendChild(spark);
        }
    }


    function createFireworks(container) {

        const fireworksCount =
            window.innerWidth < 600 ? 3 : 5;

        for (let i = 0; i < fireworksCount; i++) {

            setTimeout(() => {

                const centerX =
                    15 + Math.random() * 70;

                const centerY =
                    20 + Math.random() * 45;

                for (let j = 0; j < 18; j++) {

                    const spark =
                        document.createElement("div");

                    spark.className = "party-spark";

                    spark.style.left =
                        centerX + "%";

                    spark.style.top =
                        centerY + "%";

                    const angle =
                        (Math.PI * 2 * j) / 18;

                    const distance =
                        40 + Math.random() * 90;

                    spark.style.setProperty(
                        "--spark-x",
                        Math.cos(angle) * distance + "px"
                    );

                    spark.style.setProperty(
                        "--spark-y",
                        Math.sin(angle) * distance + "px"
                    );

                    container.appendChild(spark);

                    setTimeout(() => {
                        spark.remove();
                    }, 1600);
                }

            }, i * 1000);

        }
    }


    /* =========================================
       NO BUTTON ESCAPE
    ========================================== */

    function positionNoButton() {

        if (!noButton) return;

        const padding = 20;

        const maxX =
            Math.max(
                padding,
                window.innerWidth -
                noButton.offsetWidth -
                padding
            );

        const maxY =
            Math.max(
                padding,
                window.innerHeight -
                noButton.offsetHeight -
                padding
            );

        const x =
            padding +
            Math.random() * (maxX - padding);

        const y =
            padding +
            Math.random() * (maxY - padding);

        noButton.style.left = x + "px";
        noButton.style.top = y + "px";
    }


    function escapeNoButton() {

        if (!noButton) return;

        positionNoButton();

        noButton.style.transform =
            `rotate(${(Math.random() * 20) - 10}deg) scale(${0.9 + Math.random() * 0.2})`;
    }


    if (noButton) {

        noButton.addEventListener("mouseenter", escapeNoButton);

        noButton.addEventListener("mouseover", escapeNoButton);

        noButton.addEventListener("touchstart", (event) => {

            event.preventDefault();

            escapeNoButton();

        }, { passive: false });

        noButton.addEventListener("click", (event) => {

            event.preventDefault();

            escapeNoButton();

        });

    }


    document.addEventListener("mousemove", (event) => {

        if (
            !questionScreen ||
            !questionScreen.classList.contains("active") ||
            !noButton
        ) {
            return;
        }

        const rect = noButton.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        const distance =
            Math.hypot(
                event.clientX - centerX,
                event.clientY - centerY
            );

        if (distance < 140) {
            escapeNoButton();
        }

    });


    window.addEventListener("resize", () => {

        if (
            questionScreen &&
            questionScreen.classList.contains("active")
        ) {
            positionNoButton();
        }

    });


    /* =========================================
       YES BUTTON
    ========================================== */

    if (yesButton) {

        yesButton.addEventListener("click", () => {

            showScreen(yesScreen);

            createPartyEffects(yesPartyContainer);

        });

    }


    /* =========================================
       YES → MAIN WEBSITE
    ========================================== */

    if (continueAfterYes) {

        continueAfterYes.addEventListener("click", () => {

            showScreen(null);

            if (mainWebsite) {

                mainWebsite.classList.remove("hidden");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

            startMainWebsiteEffects();

        });

    }


    /* =========================================
       LETTER
    ========================================== */

    const openLetter =
        document.getElementById("open-letter");

    const letterContent =
        document.getElementById("letter-content");

    if (openLetter && letterContent) {

        openLetter.addEventListener("click", () => {

            letterContent.classList.remove("hidden");

            openLetter.textContent =
                "My Letter ❤️";

            setTimeout(() => {

                letterContent.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 150);

        });

    }


    /* =========================================
       GIFT BOXES
    ========================================== */

    const giftBoxes =
        document.querySelectorAll(".gift-box");

    const giftMessage =
        document.getElementById("gift-message");

    giftBoxes.forEach((box) => {

        box.addEventListener("click", () => {

            const message =
                box.dataset.message ||
                "A little surprise just for you. ❤️";

            if (giftMessage) {

                giftMessage.textContent = message;

                giftMessage.classList.remove("hidden");

                giftBoxes.forEach((item) => {
                    item.style.pointerEvents = "none";
                });

                setTimeout(() => {

                    giftBoxes.forEach((item) => {
                        item.style.pointerEvents = "auto";
                    });

                }, 500);

            }

            createSmallCelebration(box);

        });

    });


    function createSmallCelebration(target) {

        const rect =
            target.getBoundingClientRect();

        const container =
            document.createElement("div");

        container.style.position = "fixed";
        container.style.inset = "0";
        container.style.pointerEvents = "none";
        container.style.zIndex = "9999";

        document.body.appendChild(container);

        for (let i = 0; i < 25; i++) {

            const heart =
                document.createElement("div");

            heart.textContent =
                Math.random() > 0.5 ? "❤️" : "✨";

            heart.style.position = "fixed";

            heart.style.left =
                rect.left +
                rect.width / 2 +
                "px";

            heart.style.top =
                rect.top +
                rect.height / 2 +
                "px";

            heart.style.fontSize =
                (12 + Math.random() * 18) + "px";

            heart.style.transition =
                "all 1s ease";

            container.appendChild(heart);

            requestAnimationFrame(() => {

                heart.style.transform =
                    `translate(
                        ${(Math.random() - 0.5) * 250}px,
                        ${-80 - Math.random() * 220}px
                    )
                    rotate(${Math.random() * 360}deg)`;

                heart.style.opacity = "0";

            });

        }

        setTimeout(() => {
            container.remove();
        }, 1200);

    }


    /* =========================================
       CLICK HEART EFFECT
    ========================================== */

    document.addEventListener("click", (event) => {

        if (
            event.target.closest("button") ||
            event.target.closest("a")
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

        heart.textContent =
            Math.random() > 0.5 ? "♡" : "♥";

        heart.style.position = "fixed";
        heart.style.left = x + "px";
        heart.style.top = y + "px";

        heart.style.zIndex = "9999";
        heart.style.pointerEvents = "none";

        heart.style.fontSize =
            (15 + Math.random() * 15) + "px";

        heart.style.color = "#ff86ae";

        heart.style.transition =
            "all 1s ease";

        document.body.appendChild(heart);

        requestAnimationFrame(() => {

            heart.style.transform =
                `translate(
                    ${(Math.random() - 0.5) * 80}px,
                    -90px
                )
                scale(1.4)`;

            heart.style.opacity = "0";

        });

        setTimeout(() => {
            heart.remove();
        }, 1000);

    }


    /* =========================================
       SCROLL REVEAL
    ========================================== */

    function startMainWebsiteEffects() {

        const revealItems =
            document.querySelectorAll(
                ".memory-content, .section-inner, .timeline-item, .reason-card, .gift-box"
            );

        revealItems.forEach((item) => {

            item.style.opacity = "0";
            item.style.transform =
                "translateY(35px)";

            item.style.transition =
                "opacity 0.9s ease, transform 0.9s ease";

        });


        if ("IntersectionObserver" in window) {

            const observer =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach((entry) => {

                            if (entry.isIntersecting) {

                                entry.target.style.opacity = "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.12
                    }
                );


            revealItems.forEach((item) => {
                observer.observe(item);
            });

        } else {

            revealItems.forEach((item) => {

                item.style.opacity = "1";

                item.style.transform =
                    "translateY(0)";

            });

        }

    }


    /* =========================================
       KEYBOARD ACCESS
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" &&
            questionScreen &&
            questionScreen.classList.contains("active")
        ) {

            if (yesButton) {
                yesButton.click();
            }

        }

    });


    /* =========================================
       PREVENT ACCIDENTAL IMAGE DRAG
    ========================================== */

    document.querySelectorAll("img").forEach((img) => {

        img.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });

    });


    /* =========================================
       CONSOLE MESSAGE
    ========================================== */

    console.log(
        "❤️ Dakshu's Birthday Website — Made with love by Mohith ❤️"
    );

});
