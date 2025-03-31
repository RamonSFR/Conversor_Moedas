const de = document.querySelector(".de select");
const para = document.querySelector(".para select");
const exchangeBtn = document.querySelector(".exchange");
const Icon = document.querySelector(".reverse");
const quantidade = document.querySelector(".quantidade");
const returnTxt = document.querySelector(".return");

[de, para].forEach((select, i) => {
    for (let code in Country_List) {
        const selected = (i === 0 && code === "BRL") || (i === 1 && code === "USD") ? "selected" : " ";
        select.insertAdjacentHTML("beforeend", `<option value="${code}" ${selected}>${code}</option>`);
    }
    select.addEventListener("change", () => { 
        const kode = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[kode].toLowerCase()}.png`;
    });
})

async function getExchangeRate() {
    const quantidadeVal = quantidade.value;
    returnTxt.innerText = "Convertendo valor...";
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/ba48daf4184bb10c6a8a4b3c/latest/${de.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[para.value];
        const totalExRate = (quantidadeVal * exchangeRate).toFixed(2);
        returnTxt.innerText = `${quantidadeVal} ${de.value} = ${totalExRate} ${para.value}`;
    } catch (error) {
        returnTxt.innerText = "Não foi possível realizar a conversão";
    }
}

window.addEventListener("load", getExchangeRate);
exchangeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
})

Icon.addEventListener("click", (e) => {
    [de.value, para.value] = [para.value, de.value];
    [de, para].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    })
    getExchangeRate()
})