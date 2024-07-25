
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
