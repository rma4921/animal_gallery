const modal = document.getElementById("parentModal");
const modalTitle = document.getElementById("modalTitle");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");
const imgBoxes = document.querySelectorAll(".imgContainer .imgBox");
const imgList = document.querySelectorAll(".imgBox img");
const filterButtons = document.querySelectorAll(".filterBtn");

let currentIndex = 0;
let currentCategory = "all";
let searchContent = "";
let visibleImages = [];

function updateVisibleImages() {
    visibleImages = [];
    imgBoxes.forEach((box, index) => {
        if (box.style.display !== "none") {
            visibleImages.push(index);
        }
    });
}

function openModal(imgIndex) {
    currentIndex = visibleImages.indexOf(imgIndex);
    document.body.style.overflow = 'hidden';
    modalImg.src = imgList[imgIndex].src;
    modalImg.alt = imgList[imgIndex].alt;
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = 'auto';
}

function filtering() {
    imgBoxes.forEach(box => {
        let img = box.querySelector("img");
        let altText = img.alt.toLowerCase();
        if (currentCategory === "all") {
            box.style.display = altText.includes(searchContent) ? "block" : "none";
        } else {
            if (altText.includes(searchContent) && altText.includes(currentCategory)) {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }
        }
    });
}

imgList.forEach((img, index) => {
    img.addEventListener("click", function() {
        updateVisibleImages();
        openModal(index);
    });
});

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function(background) {
    if (background.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", function(esc) {
    if (esc.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});

prevBtn.addEventListener("click", function() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = visibleImages.length - 1;
    }
    let imgIndex = visibleImages[currentIndex]; // 추가
    modalImg.src = imgList[imgIndex].src;
    modalImg.alt = imgList[imgIndex].alt;
});

nextBtn.addEventListener("click", function() {
    if (currentIndex < visibleImages.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    let imgIndex = visibleImages[currentIndex];
    modalImg.src = imgList[imgIndex].src;
    modalImg.alt = imgList[imgIndex].alt;
});

searchInput.addEventListener("input", function() {
    searchContent = this.value.toLowerCase();
    filtering();
});

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("darkMode");
    if (document.body.classList.contains("darkMode")) {
        themeToggle.textContent = "Light Mode";
    } else {
        themeToggle.textContent = "Dark Mode";
    }
});

filterButtons.forEach(button => {
    button.addEventListener("click", function() {
        let activeButton = document.querySelector(".filterBtn.active");
        currentCategory = this.getAttribute("data-category");
        if (activeButton) {
            activeButton.classList.remove("active");
        }
        this.classList.add("active");
        filtering();
    });
});
