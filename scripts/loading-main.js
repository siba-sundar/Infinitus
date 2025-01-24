document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingVideo = document.querySelector("#index-loading-laptop");
  const indexVideo = document.querySelector(".index-vid");
  const indexVideo2 = document.querySelector(".index-vid-2");
  const indexVideo3 = document.querySelector(".index-vid-3");
  const navbar = document.querySelector(".navbar");
  const bottomText = document.querySelector(".bottom-text");
  const evOne = document.querySelector(".ev-one");
  const hScroll = document.querySelector(".h-scroll");

  const timeline = gsap.timeline();

  loadingVideo.addEventListener("contextmenu", (e) => e.preventDefault());

  const handleLoadedAnimations = () => {
    timeline
      .to([evOne, hScroll], { display: "none", delay: 2.5, opacity: 0, duration: 1 })
      .to([evOne, hScroll], { display: "block", opacity: 1, duration: 1, ease: "power3.out" })
      .to([evOne, hScroll], { opacity: 0, duration: 1, ease: "power3.inOut", delay: 1 })
      .to(loadingScreen, { opacity: 0, duration: 1, ease: "power3.inOut", onComplete: () => {
        loadingScreen.style.display = "none";
        window.scrollTo(0, 0);
      }})

      // index-vid-2 animation with clip-path and opacity
      .fromTo(indexVideo2, 
        { scale:1,clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: 0.5, display: "none" }, 
        { clipPath: "circle(75% at 50% 50%)", opacity: 1, display: "block", duration: 1, ease: "power3.out" }
      )
      .to(indexVideo2, 
        {clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: 0.8, ease: "power3.inOut", display: "none" }
      )

      // index-vid-3 animation with mask-like effect
      .fromTo(indexVideo3, 
        { scale:1,clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: 0.5, display: "none" }, 
        { clipPath: "circle(75% at 50% 50%)", opacity: 1, display: "block", duration: 1, ease: "power3.out" }
      )
      .to(indexVideo2, 
        {clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: 0.8, ease: "power3.inOut", display: "none" }
      )

      // index-vid animation with smooth slide and opacity
      .fromTo(indexVideo, 
        { scale:1,clipPath: "circle(0% at 50% 50%)", opacity: 0, duration: 0.5, display: "none" }, 
        { clipPath: "circle(75% at 50% 50%)", opacity: 1, display: "block", duration: 1, ease: "power3.out" }
      )
     
      
      // Navbar and bottomText animation
      .fromTo([navbar, bottomText], 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.3 }
      );
  };

  const fallbackTimer = setTimeout(() => {
    handleLoadedAnimations();
  }, 2000);

  loadingVideo.addEventListener("loadeddata", () => {
    clearTimeout(fallbackTimer);
    setTimeout(() => {
      handleLoadedAnimations();
    }, 1000);
  });
});
