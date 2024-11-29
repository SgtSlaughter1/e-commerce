//Run after window fully loads
document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.querySelector(".main-image");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const images = [
    "/ecommerce-product-page-main/images/image-product-1.jpg",
    "/ecommerce-product-page-main/images/image-product-2.jpg",
    "/ecommerce-product-page-main/images/image-product-3.jpg",
    "/ecommerce-product-page-main/images/image-product-4.jpg",
  ];
  const thumbnailImages = [
    "/ecommerce-product-page-main/images/image-product-1-thumbnail.jpg",
    "/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg",
    "/ecommerce-product-page-main/images/image-product-3-thumbnail.jpg",
    "/ecommerce-product-page-main/images/image-product-4-thumbnail.jpg",
  ];
  let currentImageIndex = 0;

  // Create mobile navigation buttons
  function createMobileNavButtons() {
    const mobileNavContainer = document.createElement("div");
    mobileNavContainer.style.cssText = `
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      transform: translateY(-50%);
      pointer-events: none;
    `;

    const createButton = (svg, position) => {
      const button = document.createElement("button");
      button.innerHTML = svg;
      button.style.cssText = `
        background-color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        pointer-events: auto;
        ${position}
      `;
      return button;
    };

    const prevSvg = `<svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;
    const nextSvg = `<svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;

    const prevBtn = createButton(prevSvg, "left: 0;");
    const nextBtn = createButton(nextSvg, "right: 0;");

    mobileNavContainer.appendChild(prevBtn);
    mobileNavContainer.appendChild(nextBtn);

    return { mobileNavContainer, prevBtn, nextBtn };
  }

  // Add mobile navigation buttons
  const { mobileNavContainer, prevBtn, nextBtn } = createMobileNavButtons();
  mainImage.parentElement.style.position = "relative";
  mainImage.parentElement.appendChild(mobileNavContainer);

  function createLightbox() {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.style.cssText = `
      display: none;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.9);
    `;

    // Add media query to hide lightbox on smaller screens
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    function handleMediaQuery(e) {
      if (e.matches) {
        lightbox.style.display = "none";
        mobileNavContainer.style.display = "flex";
      } else {
        mobileNavContainer.style.display = "none";
      }
    }
    mediaQuery.addListener(handleMediaQuery);
    handleMediaQuery(mediaQuery);

    const lightboxContent = document.createElement("div");
    lightboxContent.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 40%;
      max-height: 80%;
      width: auto;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    const imageContainer = document.createElement("div");
    imageContainer.style.cssText = `
      position: relative;
      display: inline-block;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 20px;
    `;

    const lightboxImage = document.createElement("img");
    lightboxImage.id = "lightboxImage";
    lightboxImage.style.cssText = `
      max-width: 100%;
      max-height: 60vh;
      object-fit: contain;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    `;

    const thumbnailContainer = document.createElement("div");
    thumbnailContainer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
    `;

    const createButton = (svg, position) => {
      const button = document.createElement("button");
      button.innerHTML = svg;
      button.style.cssText = `
        position: absolute;
        background-color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        ${position}
        // z-index: 12;
        transition: background-color 0.3s ease;
      `;
      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#FB7E1E";
      });
      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "white";
      });
      return button;
    };

    const closeSvg = `<svg width="13" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/></svg>`;
    const prevSvg = `<svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;
    const nextSvg = `<svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;

    const closeBtn = createButton(closeSvg, "top: -50px; right: -20px;");
    const lightboxPrevBtn = createButton(
      prevSvg,
      "top: 35%; left: -20px; transform: translateY(-50%);"
    );
    const lightboxNextBtn = createButton(
      nextSvg,
      "top: 35%; right: -20px; transform: translateY(-50%);"
    );

    imageContainer.appendChild(lightboxImage);
    lightboxContent.appendChild(imageContainer);
    lightboxContent.appendChild(lightboxPrevBtn);
    lightboxContent.appendChild(lightboxNextBtn);
    lightboxContent.appendChild(closeBtn);
    lightboxContent.appendChild(thumbnailContainer);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);

    return {
      lightbox,
      lightboxImage,
      closeBtn,
      lightboxPrevBtn,
      lightboxNextBtn,
      thumbnailContainer,
    };
  }

  function createThumbnails(
    thumbnailImages,
    thumbnailContainer,
    lightboxImage
  ) {
    thumbnailImages.forEach((image, index) => {
      const thumbnail = document.createElement("img");
      thumbnail.src = image;
      thumbnail.style.cssText = `
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 5px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s ease;
      `;
      thumbnail.addEventListener("click", () => {
        showImage(index);
      });
      thumbnailContainer.appendChild(thumbnail);
    });
  }

  function updateActiveThumbnail(thumbnailContainer, activeIndex) {
    const thumbnails = thumbnailContainer.getElementsByTagName("img");
    for (let i = 0; i < thumbnails.length; i++) {
      thumbnails[i].style.opacity = i === activeIndex ? "1" : "0.6";
    }
  }

  const {
    lightbox,
    lightboxImage,
    closeBtn,
    lightboxPrevBtn,
    lightboxNextBtn,
    thumbnailContainer,
  } = createLightbox();

  createThumbnails(thumbnailImages, thumbnailContainer, lightboxImage);

  function openLightbox(index) {
    // Check if the screen is larger than 768px before opening the lightbox
    if (window.innerWidth > 768) {
      lightbox.style.display = "block";
      document.body.style.overflow = "hidden";
      showImage(index);
    }
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }

  function showImage(index) {
    currentImageIndex = index;
    mainImage.src = images[index];
    lightboxImage.src = images[index];
    updateActiveThumbnail(thumbnailContainer, index);
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
  }

  mainImage.addEventListener("click", () => openLightbox(currentImageIndex));
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.src = thumbnailImages[index];
    thumbnail.addEventListener("click", () => {
      showImage(index);
      openLightbox(index);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightboxPrevBtn.addEventListener("click", showPrevImage);
  lightboxNextBtn.addEventListener("click", showNextImage);
  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });

  // Initialize the first image
  showImage(0);
});

