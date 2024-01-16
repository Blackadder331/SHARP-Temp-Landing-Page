// SLIDER
// Slider film strip
let slider = document.getElementById("slider");
let leftArrow = document.getElementById("left-arrow");
let rightArrow = document.getElementById("right-arrow");
let scrollAmount = 0;

// SLIDER SWIPE
// Slider touch swipe
let touchStartPos = 0;
let touchEndPos = 0;
let touchDistance = 0;

slider.addEventListener("touchstart", (event) => {
  touchStartPos = event.touches[0].clientX;
});

slider.addEventListener("touchmove", (event) => {
  touchEndPos = event.touches[0].clientX;
  touchDistance = touchStartPos - touchEndPos;
});

slider.addEventListener("touchend", (event) => {
  if (event.cancelable) {
    event.preventDefault();
  }
  if (touchDistance > 100) {
    // swipe left
    slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
  } else if (touchDistance < -100) {
    // swipe right
    slider.scrollBy({ left: -slider.clientWidth, behavior: "smooth" });
  }

  // Reset touch distance
  touchDistance = 0;
});

// AUTOPLAY SLIDER
// Define the autoplay function
// function autoplay() {
//   if (scrollAmount < slider.scrollWidth - slider.clientWidth) {
//     scrollAmount += slider.clientWidth;
//     slider.scrollTo({
//       top: 0,
//       left: scrollAmount,
//       behavior: "smooth",
//     });
//   }
// }

// // Start autoplaying the slider every 3 seconds
// let autoplayInterval = setInterval(autoplay, 4000);

// // Stop autoplay when the slider is touched and restart it when the touch ends
// slider.addEventListener("touchstart", () => {
//   clearInterval(autoplayInterval);
// });

// slider.addEventListener("touchend", () => {
//   autoplayInterval = setInterval(autoplay, 8000);
// });

// Assume the original slider has a class 'slide' for each slide
let originalSlideCount = document.querySelectorAll("#slider .slide").length;

// Duplicate slides (twice for a smoother transition)
let sliderContent = slider.innerHTML;
slider.innerHTML += sliderContent + sliderContent;

// Update the number of slides (including duplicates)
let totalSlides = slider.childElementCount;

// Create dots and make the first one active
for (let i = 0; i < originalSlideCount; i++) {
  let dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active"); // Set the first dot as active
  document.getElementById("dots-container").appendChild(dot);
}

let dots = document.querySelectorAll(".dot");

// Modify the updateDots function to end on dot 8 before it repeats
function updateDots() {
  let currentIndex =
    Math.floor(
      (slider.scrollLeft + slider.clientWidth / 2) / slider.clientWidth
    ) % originalSlideCount;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Call updateDots on page load to set the correct initial dot
document.addEventListener("DOMContentLoaded", updateDots);

// Modify arrow event listeners
rightArrow.addEventListener("click", () => {
  moveSlider(slider.clientWidth);
});

leftArrow.addEventListener("click", () => {
  moveSlider(-slider.clientWidth);
});

// Function to handle slider movement
function moveSlider(offset) {
  let newScrollPosition = slider.scrollLeft + offset;

  if (newScrollPosition < 0) {
    // If moving left past the first slide, jump to the last slide
    slider.scrollLeft += slider.clientWidth * originalSlideCount;
  } else if (newScrollPosition >= slider.clientWidth * 2 * originalSlideCount) {
    // If moving right past the last duplicated slide, jump to the first slide
    slider.scrollLeft -= slider.clientWidth * originalSlideCount;
  } else {
    slider.scrollLeft = newScrollPosition;
  }

  updateDots();
}

// Update dots when the slider is scrolled
slider.addEventListener("scroll", updateDots);

// Function to check and reset slider position
function checkAndResetSlider() {
  // The point at which we reset to the beginning - might need adjusting
  let resetPoint = slider.clientWidth * originalSlideCount;

  // Add a small buffer to ensure the reset is not visible
  if (slider.scrollLeft >= resetPoint) {
    // Instantly reset to the beginning
    slider.scrollLeft = 0;
  }
}
// Improved moveSlider function
function moveSlider(offset) {
  let newScrollPosition = slider.scrollLeft + offset;

  // Ensure we wrap around properly if we are at the beginning or end
  if (newScrollPosition < 0) {
    newScrollPosition = slider.scrollWidth - Math.abs(offset);
  } else if (newScrollPosition > slider.scrollWidth - slider.clientWidth) {
    newScrollPosition = 0;
  }

  slider.scrollLeft = newScrollPosition;
  updateDots();
}

// Adjusted event listener for the scroll event
slider.addEventListener("scroll", () => {
  // Throttle the reset check to avoid performance issues
  setTimeout(() => {
    checkAndResetSlider();
  }, 100);
  updateDots();
});
