const imgList = document.querySelectorAll(".imgBox img");
const modal = document.getElementById("parentModal");
const modalTitle = document.getElementById("modalTitle");
const closeBtn = document.getElementById("closeBtn");
const modalImg = document.getElementById("modalImg");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

function openModel(img){
    modal.classList.add("show");
    document.body.style.overflow = 'hidden';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
}
function closeModel(){
    modal.classList.remove("show");
    document.body.style.overflow = 'auto';
}

imgList.forEach(img => {
    img.addEventListener("click", function(){
        openModel(img);
    });
});
closeBtn.addEventListener("click", function(){
    closeModel();
});
modal.addEventListener("click", function(background){
    if(background.target === modal){
        closeModel();
    }
});
document.addEventListener("keydown", function(esc) {
    if(esc.key === "Escape" && modal.classList.contains("show")){
        closeModel();
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