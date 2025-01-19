const scrollText = document.querySelector(".scroll-text");
const slider = document.querySelector(".slider");

if (scrollText && slider) {
  const texts = ["Scroll", "Scrollll", "scrollllll"];
  let index = 0;
  let textUpdateTimeout = null;

  function isElementInViewport(element, threshold = 0.5) {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.height;
    const visibleHeight = Math.min(
      window.innerHeight - rect.top,
      rect.bottom
    );
    return visibleHeight >= elementHeight * threshold;
  }

  function updateScrollText() {
    if (textUpdateTimeout) return; // Prevent rapid updates
    scrollText.textContent = texts[index];
    index = (index + 1) % texts.length;
    textUpdateTimeout = setTimeout(() => (textUpdateTimeout = null), 2000); // Increased delay for slower updates
  }

  // Add text update to the animation loop
  function culturalUpdate() {
    velocity *= friction;
    culturalTarget += velocity;
    culturalCurrent = culturalLerp(culturalCurrent, culturalTarget, culturalEase);

    // Slow down the movement
    velocity *= 0.98;  // Reduce speed for smoother transition

    // Ensure the movement is smooth and continuous
    if (culturalCurrent > singleSetWidth) {
      culturalCurrent -= singleSetWidth;
      culturalTarget -= singleSetWidth;
    } else if (culturalCurrent < 0) {
      culturalCurrent += singleSetWidth;
      culturalTarget += singleSetWidth;
    }

    // Apply smoother transition using GSAP with easing
    gsap.set(culturalSliderWrapper, {
      x: -culturalCurrent,
      ease: "power2.inOut", // Smooth easing effect
      duration: 1 // Slow down the duration of the transition
    });
    culturalUpdateScaleAndPosition();

    if (isElementInViewport(slider, 0.5)) {
      updateScrollText();
    }

    requestAnimationFrame(culturalUpdate);
  }

  culturalUpdate(); // Start animation
}
