let culturalTarget = 0;
let culturalCurrent = 0;
let culturalEase = 0.075;

// Velocity-based settings
let velocity = 0; // current speed
let friction = 0.8; // how quickly the velocity slows
let velocityMultiplier = 0.2; // scales how much deltaY affects velocity

const culturalSlider = document.querySelector(".slider");
const culturalSliderWrapper = document.querySelector(".slider-wrapper");
let slides = Array.from(document.querySelectorAll(".slide"));
let singleSetWidth = 0;
let totalSlides = slides.length;

/* 1) Duplicate slides to create a seamless "double" set */
function duplicateSlides() {
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    culturalSliderWrapper.appendChild(clone);
  });
}

/* 2) Measure the width of one full set of slides */
function measureSingleSetWidth() {
  singleSetWidth = 0;
  for (let i = 0; i < totalSlides; i++) {
    singleSetWidth += slides[i].offsetWidth;
  }
  // Add the gap between slides: (totalSlides - 1) gaps of 100px each
  singleSetWidth += (totalSlides - 1) * 100;
}

/* Simple LERP function for smooth transitions */
function culturalLerp(start, end, factor) {
  return start + (end - start) * factor;
}

/* 3) Scale each slide + add 3D depth */
function culturalUpdateScaleAndPosition() {
  const allSlides = document.querySelectorAll(".slide");
  allSlides.forEach((slide) => {
    const rect = slide.getBoundingClientRect();
    const centerPosition = (rect.left + rect.right) / 2;
    const distanceFromCenter = centerPosition - window.innerWidth / 2;

    // Basic scale logic (unchanged)
    let scale, offsetX;
    if (distanceFromCenter > 0) {
      scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth);
      offsetX = (scale - 1) * 300;
    } else {
      scale = Math.max(
        0.5,
        1 - Math.abs(distanceFromCenter) / window.innerWidth
      );
      offsetX = 0;
    }

    // ====== 3D Depth + optional rotation ======
    // Move slides further back or forward along Z axis
    // as they move away from the center
    const zOffset = -0.1 * Math.abs(distanceFromCenter);

    // Optionally tilt slides a bit
    const rotateY = 0.03 * distanceFromCenter; // e.g. 0.03 deg per px

    gsap.set(slide, {
      scale: scale,
      x: offsetX,
      z: zOffset, // Depth effect
      rotationY: rotateY, // Slight tilt
      transformOrigin: "center center",
    });
  });
}

/* 4) Main animation loop */
function culturalUpdate() {
  // Dampen the velocity for a smoother "inertia" effect
  velocity *= friction;

  // Apply velocity to the target
  culturalTarget += velocity;

  // Smoothly move current towards target
  culturalCurrent = culturalLerp(culturalCurrent, culturalTarget, culturalEase);

  // Wrap-around logic
  if (culturalCurrent > singleSetWidth) {
    culturalCurrent -= singleSetWidth;
    culturalTarget -= singleSetWidth;
  } else if (culturalCurrent < 0) {
    culturalCurrent += singleSetWidth;
    culturalTarget += singleSetWidth;
  }

  // Position the slider
  gsap.set(culturalSliderWrapper, {
    x: -culturalCurrent,
  });

  // Update slides scale/position with 3D effect
  culturalUpdateScaleAndPosition();

  requestAnimationFrame(culturalUpdate);
}

/* 5) Event listeners */
// Recompute set width on resize
window.addEventListener("resize", () => {
  measureSingleSetWidth();
});

// Mouse wheel -> adjust velocity
window.addEventListener("wheel", (e) => {
  velocity += e.deltaY * velocityMultiplier;
});

/* 6) Initialize */
duplicateSlides(); // Duplicate slides
slides = Array.from(document.querySelectorAll(".slide"));
measureSingleSetWidth(); // Measure the original set width

// Optionally set the total wrapper width
culturalSliderWrapper.style.width = 2 * singleSetWidth + 560 * 2 + "px";

// Start animation
culturalUpdate();