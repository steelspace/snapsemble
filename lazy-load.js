document.addEventListener("DOMContentLoaded", () => {
   const lazyImages = document.querySelectorAll(".lazy-load");

   const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            const img = entry.target;
            const lowResSrc = img.getAttribute("src");
            const highResSrc = lowResSrc.replace(".webp", ".png");

            const highResImage = new Image();
            highResImage.src = highResSrc;

            highResImage.onload = () => {
               img.src = highResImage.src;
            };

            observer.unobserve(img); // Stop observing once the image is loaded
         }
      });
   });

   lazyImages.forEach((img) => {
      imageObserver.observe(img);
   });
});