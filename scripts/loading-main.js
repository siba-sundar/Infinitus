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
        "+=0.5"
      )
      .to(loadingScreen, {
        opacity: 0,
        y:-500,
        duration: 1.5,
        scale:0.5,
        filter:"blur(10px)",
        ease: "power3.inOut",
        onComplete: () => {
          loadingScreen.style.display = "none";
          window.scrollTo(0, 0);
        },
      })
      .fromTo(
        ".index-vid",
        {  opacity: 0,scale:0.5, y:500,filter:"blur(10px)"},
        {
          y:0,
          scale:1,
          filter:"blur(1px)",
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
