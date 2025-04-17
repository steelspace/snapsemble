document.addEventListener("DOMContentLoaded", () => {
   const lazyImages = document.querySelectorAll(".lazy-load");

   lazyImages.forEach((img) => {
      const lowResSrc = img.getAttribute("src");
      const highResSrc = lowResSrc.replace(".webp", ".png");

      const highResImage = new Image();
      highResImage.src = highResSrc;

      highResImage.onload = () => {
         img.src = highResImage.src;
      };
   });
});