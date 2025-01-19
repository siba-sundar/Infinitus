// Loading Screen
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingText = document.querySelector(".loading-screen p");
  const introOne = document.querySelector(".intro-one");
  const introTwo = document.querySelector(".intro-two");
  const navbar = document.querySelector(".navbar");
  const bottomText = document.querySelector(".bottom-text");
  const scrollBanner = document.querySelector(".scroll-banner");
  const loadingVideo = document.querySelector(".loading-video");
  const flicker = document.querySelector("#flicker");
  const registerBtnContainer = document.querySelector(
    ".register-btn-container"
  );
  const defaultDuration = 2000; // 2 seconds

  loadingVideo.addEventListener("contextmenu", (e) => e.preventDefault());

  const timeline = gsap.timeline();

  const handleLoadedAnimations = () => {
    timeline
      .fromTo(
        introOne,
        { x: "-500%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        introTwo,
        { x: "500%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .to(loadingText, { opacity: 1, duration: 0.5 }, "-=0.3")
      .to(
        [loadingText, introOne, introTwo],
        { opacity: 0, duration: 0.3 },
        "+=0.3"
      )
      // Scale out the loading screen
      .to(loadingScreen, {
        scale: 0.55,
        y: -500,
        opacity: 0,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          loadingScreen.style.display = "none";
          window.scrollTo(0, 0);
        },
      })
      // Smooth transition to .index-vid scaling in
      .fromTo(
        ".index-vid",
        { scale: 0.55, opacity: 0, y: 500 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
        },
        "-=0.5" // Overlap with loading screen animation for smoothness
      )
      // Fade in flicker and registerBtnContainer together
      .fromTo(
        [flicker, registerBtnContainer],
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
        "+=0.1" // Slight delay after .index-vid animation
      )
      .fromTo(
        scrollBanner,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        "+=0.1"
      )
      .fromTo(
        [navbar, bottomText],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.3,
        }
      );
  };

  const fallbackTimer = setTimeout(() => {
    handleLoadedAnimations();
  }, defaultDuration);

  loadingVideo.addEventListener("loadeddata", () => {
    clearTimeout(fallbackTimer);
    setTimeout(() => {
      handleLoadedAnimations();
    }, defaultDuration);
  });
});
