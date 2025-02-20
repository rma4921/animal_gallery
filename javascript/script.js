let currentIndex = 0;
const imgList = document.querySelectorAll(".imgBox img");
const modal = document.getElementById("parentModal");
const modalTitle = document.getElementById("modalTitle");
const closeBtn = document.getElementById("closeBtn");
const modalImg = document.getElementById("modalImg");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const filterButtons = document.querySelectorAll(".filterBtn");

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

imgList.forEach((img, index) => {
    img.addEventListener("click", function(){
        openModal(index);
    });
});

closeBtn.addEventListener("click", function(){
    closeModal();
});

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

searchInput.addEventListener("input", function(){
    const filter = this.value.toLowerCase();
    imgList.forEach(img => {
        let altText = img.alt.toLowerCase();
        img.style.display = altText.includes(filter) ? "inline" : "none";
    });
});

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("darkMode");
    if(document.body.classList.contains("darkMode")){
        themeToggle.textContent = "Light Mode";
    } else{
        themeToggle.textContent = "Dark Mode";
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

filterButtons.forEach(button => {
    button.addEventListener("click", function(){
        const category = this.getAttribute("data-category");
        imgList.forEach(img => {
            if(category === "all"){
                img.style.display = "inline";
            } else{
                img.style.display = img.alt.includes(category) ? "inline" : "none";
            }
        });
    });
});