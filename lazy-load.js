document.addEventListener("DOMContentLoaded", () => {
   const lazyImages = document.querySelectorAll(".lazy-load");

   const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            const img = entry.target;
            const lowResSrc = img.getAttribute("src");
            const highResPngSrc = lowResSrc.replace(".webp", ".png");
            const highResJpegSrc = lowResSrc.replace(".webp", ".jpeg"); // Or .jpg if you use that

            const pngImage = new Image();
            pngImage.src = highResPngSrc;

            pngImage.onload = () => {
               // PNG loaded successfully
               img.src = highResPngSrc;
               observer.unobserve(img); // Stop observing
            };

            pngImage.onerror = () => {
               // PNG failed to load, try JPEG
               console.warn(`Failed to load PNG: ${highResPngSrc}. Trying JPEG...`);
               const jpegImage = new Image();
               jpegImage.src = highResJpegSrc;

               jpegImage.onload = () => {
                  // JPEG loaded successfully
                  img.src = highResJpegSrc;
                  observer.unobserve(img); // Stop observing
               };

               jpegImage.onerror = () => {
                  // Both PNG and JPEG failed
                  console.error(`Failed to load both PNG and JPEG for: ${lowResSrc}`);
                  observer.unobserve(img); // Stop observing anyway
               };
            };
         }
      });
   });

   lazyImages.forEach((img) => {
      imageObserver.observe(img);
   });
});