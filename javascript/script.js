const imgList = document.querySelectorAll(".imgBox img");
const closeBtn = document.getElementById("closeBtn");
const popupImg = document.getElementById("popupImg");
const popup = document.getElementById("popup");
const searchInput = document.getElementById("searchInput");

imgList.forEach(img => {
    img.addEventListener("click", function(){
        popup.style.display = "flex";
        popupImg.src = img.src;
        popupImg.alt = img.alt;
    });
});
closeBtn.addEventListener("click", function(){
    popup.style.display = "none";
});
popup.addEventListener("click", function(background){
    if (background.target === popup) {
        popup.style.display = "none";
    }
});
document.addEventListener("keydown", function(esc) {
    if (esc.key === "Escape" && popup.style.display === "flex") {
        popup.style.display = "none";
    }
});
searchInput.addEventListener("input", function(){
    const filter = this.value.toLowerCase();
    imgList.forEach(img => {
        let altText = img.alt;
        img.style.display = altText.includes(filter) ? "inline" : "none";
    });
});