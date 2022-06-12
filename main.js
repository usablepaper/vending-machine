const colaList = [
    {
        name: "Original_Cola",
        price: 1000,
        image: "./images/Original_Cola.svg",
        stock: 5,
        selectedCount: 0,
        totalSelectedCount: 0,
    },
    {
        name: "Violet_Cola",
        price: 1000,
        image: "./images/Violet_Cola.svg",
        stock: 0,
        selected: false,
        selectedCount: 0,
        totalSelectedCount: 0,
    },
    {
        name: "Yellow_Cola",
        price: 1000,
        image: "./images/Yellow_Cola.svg",
        stock: 5,
        selected: false,
        selectedCount: 0,
        totalSelectedCount: 0,
    },
    {
        name: "Cool_Cola",
        price: 1000,
        image: "./images/Cool_Cola.svg",
        stock: 5,
        selected: false,
        selectedCount: 0,
        totalSelectedCount: 0,
    },
    {
        name: "Green_Cola",
        price: 1000,
        image: "./images/Green_Cola.svg",
        stock: 5,
        selected: false,
        selectedCount: 0,
        totalSelectedCount: 0,
    },
    {
        name: "Orange_Cola",
        price: 1000,
        image: "./images/Orange_Cola.svg",
        stock: 5,
        selected: false,
        selectedCount: 0,
        totalSelectedCount: 0,
    },
];

const listCardCola = document.querySelector(".list-card-cola");
const listCart = document.querySelector(".list-cart");

// 처음 DOM요소를 만드는 기능
colaList.forEach((cola) => {
    const addLi = document.createElement("li");
    addLi.setAttribute("class", `card-cola ${cola.name}`);
    addLi.setAttribute("data-name", cola.name);
    const addImg = document.createElement("img");
    addImg.setAttribute("class", "img-cola");
    addImg.setAttribute("alt", cola.name);
    addImg.setAttribute("src", cola.image);
    const addTextCola = document.createElement("strong");
    addTextCola.setAttribute("class", "text-cola");
    addTextCola.textContent = cola.name;
    const addTextColaPrice = document.createElement("strong");
    addTextColaPrice.setAttribute("class", "text-cola-price");
    addTextColaPrice.textContent = cola.price + "원";
    listCardCola.appendChild(addLi);
    addLi.appendChild(addImg);
    addLi.appendChild(addTextCola);
    addLi.appendChild(addTextColaPrice);
    if (cola.stock === 0) {
        addLi.classList.add("soldout");
        let addSoldout = document.createElement("h3");
        addSoldout.textContent = "품절된 상품입니다.";
        addSoldout.classList.add("hidden");
        addLi.appendChild(addSoldout);
    }
});

const possessMoney = document.querySelector(".possess");
const changes = document.querySelector(".changes");
let myMoney = 25000;
let myChanges = 5000;

possessMoney.textContent = `${myMoney.toLocaleString()}원`;
changes.textContent = `${myChanges.toLocaleString()}원`;

// 입금
const submitDeposit = document.querySelector(".wrapper-deposit");
const depositAmount = document.querySelector(".deposit-amount");

submitDeposit.addEventListener("submit", (e) => {
    e.preventDefault();
    if (depositAmount.value > myMoney) {
        alert("금액이 모자랍니다.");
    } else if (depositAmount.value < 0) {
        alert("입력할 수 없는 금액입니다.");
    } else {
        myMoney -= Number(depositAmount.value);
        myChanges += Number(depositAmount.value);
        possessMoney.textContent = `${myMoney.toLocaleString()}원`;
        changes.textContent = `${myChanges.toLocaleString()}원`;
    }
    depositAmount.value = "";
});

// 돈 줄어드는 함수
function moneyChange(price) {
    const colaPrice = price;
    myChanges -= colaPrice;
    changes.textContent = `${myChanges.toLocaleString()}원`;
}
const buuttonGet = document.querySelector(".button-get");
const listMyStatus = document.querySelector(".list-my-status");
const totalMoney = document.querySelector(".text-total-num");

// 음료 추가
const domColas = document.querySelectorAll(".card-cola");
let selectColaList = [];

function makeDOMList(target, i, selectedCount, name) {
    target.classList.add("clicked");
    const addLi = document.createElement("li");
    addLi.setAttribute("class", "item-list-cola");
    addLi.classList.add(name);
    const addImg = document.createElement("img");
    addImg.setAttribute("class", "img-cola");
    addImg.setAttribute("alt", colaList[i].name);
    addImg.setAttribute("src", colaList[i].image);
    const addTextCola = document.createElement("strong");
    addTextCola.setAttribute("class", "text-cola");
    addTextCola.textContent = colaList[i].name;
    addTextColaNum = document.createElement("strong");
    addTextColaNum.setAttribute("class", "text-cola-num");
    addTextColaNum.textContent = selectedCount;

    listCart.appendChild(addLi);
    addLi.appendChild(addImg);
    addLi.appendChild(addTextCola);
    addLi.appendChild(addTextColaNum);
}

// 음료 선택 기능
domColas.forEach((domCola, i) => {
    domCola.addEventListener("click", (e) => {
        const name = e.currentTarget.dataset.name;
        let price;
        let stock;
        let selectedCount;
        colaList.forEach((cola) => {
            if (cola.name == name) {
                price = cola.price;
                stock = cola.stock;
            }
        });

        if (myChanges < price) {
            alert(" 금액이 모자랍니다. ");
        } else {
            colaList.forEach((cola) => {
                if (cola.name == name) {
                    cola.selected = true;
                    cola.selectedCount++;
                    cola.stock--;
                    selectedCount = cola.selectedCount;
                    if (!e.currentTarget.classList.contains("clicked")) {
                        makeDOMList(e.currentTarget, i, selectedCount, name);
                    }

                    document.querySelector(
                        `.list-cart .${name} .text-cola-num`
                    ).textContent = selectedCount;
                    moneyChange(price, selectedCount);
                }
            });

            // 솔드아웃처리
            if (colaList[i].stock < 1) {
                domCola.classList.add("soldout");
                let addSoldout = document.createElement("h3");
                addSoldout.textContent = "품절된 상품입니다.";
                addSoldout.classList.add("hidden");
                domCola.appendChild(addSoldout);
            }
        }
    });
});
function makeStatusList(list) {
    let addLi = document.createElement("li");
    addLi.setAttribute("class", "item-list-cola");
    addLi.classList.add(`my-status-${list.name}`);
    let addImg = document.createElement("img");
    addImg.setAttribute("class", "img-cola");
    addImg.setAttribute("alt", list.name);
    addImg.setAttribute("src", list.image);
    let addTextCola = document.createElement("strong");
    addTextCola.setAttribute("class", "text-cola");
    addTextCola.textContent = list.name;
    addTextColaNum = document.createElement("strong");
    addTextColaNum.setAttribute("class", "text-cola-num");
    addTextColaNum.textContent = list.totalSelectedCount;
    listMyStatus.appendChild(addLi);
    addLi.appendChild(addImg);
    addLi.appendChild(addTextCola);
    addLi.appendChild(addTextColaNum);

    // 반복문 설명의 2.에 해당하는 일을 하는 함수
    // list의 price값을 누적해 data-total에 할당한다.
    totalMoney.dataset.total =
        Number(totalMoney.dataset.total) + list.price * list.totalSelectedCount;
}
// My-status-list에 선택한 음료들을 옮겨준다.
buuttonGet.addEventListener("click", () => {
    listMyStatus.innerHTML = "";

    // 획득 버튼을 눌렀을 떄, data-total 을 초기화해준다.
    totalMoney.dataset.total = 0;
    colaList.forEach((cola) => {
        cola.totalSelectedCount += cola.selectedCount;
        cola.selectedCount = 0;
    });
    const selectedList = colaList.filter((cola) => cola.totalSelectedCount > 0);

    // 1. 반복문을 돌면서 my-status-list에 들어갈 list들을 만들어준다.
    // 2. 반복문을 돌면서 list의 price값을 누적해준다. (data-total 에 할당할 값을 만드는 것.)
    selectedList.forEach(makeStatusList);

    // 3. data-total에 할당된 값을 불러와 숫자로 바꾼 뒤, toLocaleString()해서 totalMoney.textContent 에 할당한다.
    totalMoney.textContent = Number(totalMoney.dataset.total).toLocaleString();
    listCart.innerHTML = "";
    domColas.forEach((v) => {
        domColas.totalSelectedCount += domColas.selectedCount;
        v.classList.remove("clicked");
    });
});

// 거스름돈 반환
const buttonChanges = document.querySelector(".button-changes");

buttonChanges.addEventListener("click", () => {
    myMoney += myChanges;
    myChanges = 0;
    possessMoney.textContent = `${myMoney.toLocaleString()}원`;
    changes.textContent = `${myChanges.toLocaleString()}원`;
});
