document.addEventListener("DOMContentLoaded", () => {
    const evOne = document.querySelector(".ev-one");
    const evTwo = document.querySelector(".ev-two");
    const eventsLoader = document.querySelector(".events-loader");
    
    const evTimeline = gsap.timeline();
  
    evTimeline
      .fromTo(
        evOne, // Animation for ev-one
        { x: "-500%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(
        evTwo, // Animation for ev-two
        { x: "500%", y: 35, opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=1.5" // Overlap with ev-one animation
      )
      .to(
        ".ev-one, .ev-two, .h-scroll", // Apply to all elements with class .ev-one, .ev-two, .h-scroll
        { opacity: 0, duration: 0.5, ease: "power3.out", delay: 1 }
      )
      // Fade out the entire events-loader by applying a y:-100px transformation
      .to(
        eventsLoader,
        { opacity: 0, y: "-100", duration: 1, ease: "power3.out" }
      )
      // Set the events-loader display to none after the animations
      .set(eventsLoader, { display: "none" });
});
