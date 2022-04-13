const boxs = document.querySelectorAll(".box");

boxs.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.classList.contains("clicked")) {
            box.classList.remove("clicked");
        } else {
            box.classList.add("clicked");
        }
    });
});
