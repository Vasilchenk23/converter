async function convertCurrency() {
    const apiKey = '7525fa8510e2984db056ca91';
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === 'success') {
            const rate = data.conversion_rates[toCurrency];
            const convertAmount = amount * rate;
            document.getElementById('convertedAmount').value = convertAmount.toFixed(2);
        } else {
            alert('Error when retrieving exchange rates');
        }
    } catch (error) {
        alert(`Error: ${error}`);
    }
}

async function fetchRates() {
    const apiKey = '7525fa8510e2984db056ca91';
    try {
        const fiatResponse = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const fiatData = await fiatResponse.json();

        const cryptoResponse = await fetch('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH');
        const cryptoData = await cryptoResponse.json();

        document.getElementById('usd-buy-rate').innerText = fiatData.conversion_rates.EUR.toFixed(2);
        document.getElementById('usd-sell-rate').innerText = fiatData.conversion_rates.UAH.toFixed(2);
        document.getElementById('eur-buy-rate').innerText = fiatData.conversion_rates.USD.toFixed(2);
        document.getElementById('eur-sell-rate').innerText = fiatData.conversion_rates.UAH.toFixed(2);
        // document.getElementById('usdt-buy-rate').innerText = cryptoData.BTC.toFixed(2);
        // document.getElementById('usdt-sell-rate').innerText = cryptoData.ETH.toFixed(2);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchRates);
