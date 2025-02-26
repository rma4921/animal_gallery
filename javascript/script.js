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

function openModal(imgIndex){
    currentIndex = imgIndex;
    document.body.style.overflow = 'hidden';
    modalImg.src = imgList[imgIndex].src;
    modalImg.alt = imgList[imgIndex].alt;
    modal.classList.add("show");
}

function closeModal(){
    modal.classList.remove("show");
    document.body.style.overflow = 'auto';
}

function filtering(){
    imgBoxes.forEach(box => {
        let img = box.querySelector("img");
        let altText = img.alt.toLowerCase();
        if (altText.includes(searchContent) && img.alt.includes(currentCategory)){
            box.style.display = "block";
        } else{
            box.style.display = "none";
        }
    });
}

imgList.forEach((img, index) => {
    img.addEventListener("click", function(){
        openModal(index);
    });
});

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function(background){
    if(background.target === modal){
        closeModal();
    }
});

document.addEventListener("keydown", function(esc) {
    if(esc.key === "Escape" && modal.classList.contains("show")){
        closeModal();
    }
});

prevBtn.addEventListener("click", function (){
    if(currentIndex > 0){
        currentIndex--;
    } else{
        currentIndex = imgList.length - 1;
    }
    modalImg.src = imgList[currentIndex].src;
    modalImg.alt = imgList[currentIndex].alt;
});

nextBtn.addEventListener("click", function (){
    if(currentIndex < imgList.length - 1){
        currentIndex++;
    } else{
        currentIndex = 0;
    }
    modalImg.src = imgList[currentIndex].src;
    modalImg.alt = imgList[currentIndex].alt;
});
searchInput.addEventListener("input", function(){
    searchContent = this.value.toLowerCase();
    filtering();
});
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("darkMode");
    if(document.body.classList.contains("darkMode")){
        themeToggle.textContent = "Light Mode";
    } else{
        themeToggle.textContent = "Dark Mode";
    }
});
filterButtons.forEach(button => {
    button.addEventListener("click", function(){
        let activeButton = document.querySelector(".filterBtn.active");
        currentCategory = this.getAttribute("data-category");
        if(activeButton){
            activeButton.classList.remove("active");
        }
        this.classList.add("active");
        filtering();
    });
});