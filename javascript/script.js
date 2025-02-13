const imgList = document.querySelectorAll(".imgBox img");
const closeBtn = document.getElementById("closeBtn");
const popupImg = document.getElementById("popupImg");
const popup = document.getElementById("popup");

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
/*popup.addEventListener("click", function(){
    popup.style.display = "none";
});*/
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.style.display === 'block') {
        popup.style.display = 'none';
    }
});