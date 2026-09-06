/* =========================================================
   DAKSHU BIRTHDAY WEBSITE
   COMPLETE INTERACTIVE SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     SCREEN ELEMENTS
  ======================================================= */

  const introScreen = document.getElementById("intro-screen");
  const birthdayScreen = document.getElementById("birthday-screen");
  const questionScreen = document.getElementById("question-screen");
  const yesScreen = document.getElementById("yes-screen");
  const mainSite = document.getElementById("main-site");

  const openSurprise = document.getElementById("open-surprise");
  const birthdayContinue = document.getElementById("birthday-continue");
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");
  const continueToSite = document.getElementById("continue-to-site");


  /* =======================================================
     SCREEN SWITCHING
  ======================================================= */

  function showScreen(screen) {
    const screens = [
      introScreen,
      birthdayScreen,
      questionScreen,
      yesScreen
    ];

    screens.forEach((item) => {
      if (item) {
        item.classList.remove("active");
      }
    });

    if (screen) {
      screen.classList.add("active");
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }


  /* =======================================================
     INTRO → BIRTHDAY
  ======================================================= */

  if (openSurprise) {
    openSurprise.addEventListener("click", () => {

      showScreen(birthdayScreen);

      setTimeout(() => {
        createBirthdayParty();
      }, 150);

    });
  }


  /* =======================================================
     BIRTHDAY → FOREVER QUESTION
  ======================================================= */

  if (birthdayContinue) {
    birthdayContinue.addEventListener("click", () => {
      showScreen(questionScreen);
    });
  }


  /* =======================================================
     NO BUTTON ESCAPE
  ======================================================= */

  if (noButton) {

    function moveNoButton() {

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

      const x =
        Math.floor(
          Math.random() * (maxX - padding + 1)
        ) + padding;

      const y =
        Math.floor(
          Math.random() * (maxY - padding + 1)
        ) + padding;

      noButton.style.position = "fixed";
      noButton.style.left = `${x}px`;
      noButton.style.top = `${y}px`;
      noButton.style.zIndex = "9999";

      noButton.style.transition = "all 0.15s ease";

    }


    noButton.addEventListener("mouseenter", moveNoButton);

    noButton.addEventListener("touchstart", (event) => {
      event.preventDefault();
      moveNoButton();
    }, { passive: false });

    noButton.addEventListener("pointerenter", moveNoButton);

    noButton.addEventListener("click", (event) => {
      event.preventDefault();
      moveNoButton();
    });

  }


  /* =======================================================
     YES BUTTON
  ======================================================= */

  if (yesButton) {

    yesButton.addEventListener("click", () => {

      createLoveExplosion();

      setTimeout(() => {
        showScreen(yesScreen);
      }, 650);

    });

  }


  /* =======================================================
     YES SCREEN → MAIN WEBSITE
  ======================================================= */

  if (continueToSite) {

    continueToSite.addEventListener("click", () => {

      if (mainSite) {

        mainSite.classList.remove("hidden");

        mainSite.style.display = "block";

        document.body.style.overflowX = "hidden";

        setTimeout(() => {
          mainSite.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 100);

      }

      createLoveExplosion();

      setTimeout(() => {
        revealElements();
      }, 300);

    });

  }


  /* =======================================================
     BIRTHDAY PARTY EFFECTS
  ======================================================= */

  function createBirthdayParty() {

    createConfetti(100);
    createBalloons(22);
    createSparkles(35);
    createFireworks(12);

  }


  /* =======================================================
     CONFETTI
  ======================================================= */

  function createConfetti(amount = 80) {

    for (let i = 0; i < amount; i++) {

      const piece = document.createElement("div");

      piece.className = "confetti";

      piece.textContent = Math.random() > 0.5 ? "♥" : "✦";

      piece.style.left =
        Math.random() * 100 + "vw";

      piece.style.fontSize =
        Math.random() * 10 + 7 + "px";

      piece.style.animationDuration =
        Math.random() * 3 + 3 + "s";

      piece.style.animationDelay =
        Math.random() * 2 + "s";

      document.body.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 8000);

    }

  }


  /* =======================================================
     BALLOONS
  ======================================================= */

  function createBalloons(amount = 20) {

    const emojis = [
      "🎈",
      "💗",
      "💕",
      "💖",
      "❤️",
      "🎀"
    ];

    for (let i = 0; i < amount; i++) {

      const balloon = document.createElement("div");

      balloon.className = "balloon";

      balloon.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

      balloon.style.left =
        Math.random() * 100 + "vw";

      balloon.style.fontSize =
        Math.random() * 25 + 28 + "px";

      balloon.style.animationDuration =
        Math.random() * 5 + 6 + "s";

      balloon.style.animationDelay =
        Math.random() * 3 + "s";

      document.body.appendChild(balloon);

      setTimeout(() => {
        balloon.remove();
      }, 12000);

    }

  }


  /* =======================================================
     SPARKLES
  ======================================================= */

  function createSparkles(amount = 30) {

    const symbols = [
      "✨",
      "💫",
      "⭐",
      "✦",
      "♡"
    ];

    for (let i = 0; i < amount; i++) {

      const sparkle = document.createElement("div");

      sparkle.className = "sparkle";

      sparkle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      sparkle.style.left =
        Math.random() * 100 + "vw";

      sparkle.style.top =
        Math.random() * 100 + "vh";

      sparkle.style.animationDelay =
        Math.random() * 1.5 + "s";

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 2500);

    }

  }


  /* =======================================================
     FIREWORKS
  ======================================================= */

  function createFireworks(amount = 10) {

    for (let i = 0; i < amount; i++) {

      setTimeout(() => {

        const firework = document.createElement("div");

        firework.className = "firework";

        firework.textContent =
          Math.random() > 0.5
            ? "🎆"
            : "✨";

        firework.style.left =
          Math.random() * 90 + 5 + "vw";

        firework.style.top =
          Math.random() * 55 + 5 + "vh";

        document.body.appendChild(firework);

        setTimeout(() => {
          firework.remove();
        }, 1500);

      }, i * 180);

    }

  }


  /* =======================================================
     LOVE EXPLOSION
  ======================================================= */

  function createLoveExplosion() {

    const hearts = [
      "❤️",
      "💗",
      "💖",
      "💕",
      "💓",
      "💞",
      "💘"
    ];

    for (let i = 0; i < 35; i++) {

      const heart = document.createElement("div");

      heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "50%";
      heart.style.zIndex = "10000";
      heart.style.pointerEvents = "none";
      heart.style.fontSize =
        Math.random() * 20 + 15 + "px";

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        Math.random() * 280 + 80;

      const x =
        Math.cos(angle) * distance;

      const y =
        Math.sin(angle) * distance;

      heart.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 1
          },
          {
            transform:
              `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.3)`,
            opacity: 0
          }
        ],
        {
          duration: 1000 + Math.random() * 600,
          easing: "cubic-bezier(.2,.8,.3,1)"
        }
      );

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1800);

    }

  }


  /* =======================================================
     LETTER
  ======================================================= */

  const openLetter = document.getElementById("open-letter");
  const letterContent = document.getElementById("letter-content");

  if (openLetter && letterContent) {

    openLetter.addEventListener("click", () => {

      const isHidden =
        letterContent.classList.contains("hidden");

      if (isHidden) {

        letterContent.classList.remove("hidden");

        openLetter.classList.add("letter-opened");

        openLetter.querySelector("span").textContent =
          "For you, Bubu... ❤️";

        setTimeout(() => {

          letterContent.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }, 150);

        createSparkles(20);

      }

    });

  }


  /* =======================================================
     GIFT POPUP
  ======================================================= */

  const giftPopup =
    document.getElementById("gift-popup");

  const giftMessage =
    document.getElementById("gift-message");

  const closeGift =
    document.getElementById("close-gift");

  const giftBoxes =
    document.querySelectorAll(".gift-box");


  const giftMessages = [
    "You are my favourite person in this entire world. ❤️",

    "If I could choose again, I would still choose you. Every single time. 💗",

    "Your childish side is one of the things I secretly love the most about you. 🥹❤️",

    "My favourite place is simply wherever you are. 🌙❤️",

    "One day we will look back at all these memories and smile together. ♾️❤️",

    "No matter how many fights we have, I still want to find my way back to you. 🫶",

    "You made ordinary days feel like memories worth keeping forever. ✨",

    "Happy Birthday, my Dakshu. You are loved more than you know. 🎂❤️"
  ];


  giftBoxes.forEach((box, index) => {

    box.addEventListener("click", () => {

      if (!giftPopup || !giftMessage) {
        return;
      }

      giftMessage.textContent =
        giftMessages[index % giftMessages.length];

      giftPopup.classList.remove("hidden");

      giftPopup.style.display = "flex";

      createSparkles(15);

    });

  });


  function closeGiftPopup() {

    if (!giftPopup) {
      return;
    }

    giftPopup.classList.add("hidden");

    giftPopup.style.display = "none";

  }


  if (closeGift) {
    closeGift.addEventListener(
      "click",
      closeGiftPopup
    );
  }


  if (giftPopup) {

    giftPopup.addEventListener("click", (event) => {

      if (event.target === giftPopup) {
        closeGiftPopup();
      }

    });

  }


  /* =======================================================
     ESC KEY FOR POPUP
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeGiftPopup();
    }

  });


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  function revealElements() {

    const elements =
      document.querySelectorAll(".reveal");

    if (!elements.length) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    elements.forEach((element) => {
      observer.observe(element);
    });

  }


  revealElements();


  /* =======================================================
     RANDOM FLOATING HEARTS
  ======================================================= */

  function createFloatingHeart() {

    if (!mainSite) {
      return;
    }

    if (mainSite.classList.contains("hidden")) {
      return;
    }

    const heart = document.createElement("div");

    heart.textContent =
      Math.random() > 0.5
        ? "♡"
        : "♥";

    heart.style.position = "fixed";
    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
      Math.random() * 18 + 12 + "px";

    heart.style.color = "#ff8fab";

    heart.style.opacity = "0.45";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "1";

    const duration =
      Math.random() * 5 + 7;

    heart.animate(
      [
        {
          transform: "translateY(0) scale(.7)",
          opacity: 0
        },
        {
          transform: "translateY(-30vh) scale(1)",
          opacity: 0.45
        },
        {
          transform: "translateY(-110vh) scale(.5)",
          opacity: 0
        }
      ],
      {
        duration: duration * 1000,
        easing: "linear"
      }
    );

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);

  }


  setInterval(createFloatingHeart, 2200);


  /* =======================================================
     CLICK ANYWHERE → SMALL SPARKLE
  ======================================================= */

  document.addEventListener("click", (event) => {

    if (
      event.target.closest("button") ||
      event.target.closest("a")
    ) {
      return;
    }

    const sparkle = document.createElement("div");

    sparkle.textContent = "✨";

    sparkle.style.position = "fixed";
    sparkle.style.left = event.clientX + "px";
    sparkle.style.top = event.clientY + "px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "9999";
    sparkle.style.fontSize = "16px";

    sparkle.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(.3)",
          opacity: 1
        },
        {
          transform:
            "translate(-50%, -80px) scale(1.4)",
          opacity: 0
        }
      ],
      {
        duration: 700,
        easing: "ease-out"
      }
    );

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 800);

  });


  /* =======================================================
     INITIAL PAGE STATE
  ======================================================= */

  if (mainSite) {
    mainSite.classList.add("hidden");
  }

  if (giftPopup) {
    giftPopup.classList.add("hidden");
    giftPopup.style.display = "none";
  }


  /* =======================================================
     CONSOLE MESSAGE
  ======================================================= */

  console.log(
    "%cFor Dakshu ❤️",
    "font-size:24px;font-weight:bold;"
  );

  console.log(
    "%cMade with love by Mohith ✨",
    "font-size:14px;"
  );

});
