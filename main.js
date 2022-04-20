const boxs = document.querySelectorAll(".box");
const getButton = document.querySelector(".cart-get-button");
const selectList = document.querySelector(".select-list");
const selectedList = document.querySelector(".selected-list");
const selectedTypeList = document.querySelector(".selected-type-list");

boxs.forEach((box) => {
    box.addEventListener("click", () => {
        const colaName = box.children[0].children[0].textContent;
        if (!box.classList.contains("sold-out")) {
            if (box.classList.contains("clicked")) {
                document
                    .querySelector(`.selected-type-list li.${colaName}`)
                    .remove();
                box.classList.remove("clicked");
            } else {
                box.classList.add("clicked");
                const selectedCola = document.createElement("li");
                const selectedColaName = document.createElement("span");
                const selectedCount = document.createElement("div");

                selectedCola.classList.add(colaName);
                selectedColaName.classList.add("selected-cola");
                selectedColaName.textContent = colaName;
                selectedCount.classList.add("selected-count");
                selectedCount.textContent = 1;
                selectedCola.append(selectedColaName);
                selectedCola.append(selectedCount);
                selectedTypeList.append(selectedCola);
            }
        }
    });
});

getButton.addEventListener("click", () => {
    selectedList.innerHTML = selectList.innerHTML;
});
