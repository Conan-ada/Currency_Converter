const BASE_URL = "https://v6.exchangerate-api.com/v6/035c5e9ef7a00e6e0495f912/latest/"; // Replace YOUR_API_KEY with your actual key

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const freeCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    
    let amount = document.querySelector(".amount input").value;
    let fromCurrency = freeCurr.value;
    let toCurrency = toCurr.value;

    if (amount === "" || isNaN(amount)) {
        msg.innerText = "Please enter a valid amount.";
        return;
    }

    // Fetching exchange rate from the API
    fetch(`${BASE_URL}${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            msg.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(() => {
            msg.innerText = "Error fetching exchange rate. Please try again.";
        });
});
