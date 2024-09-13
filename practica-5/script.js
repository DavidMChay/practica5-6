document.getElementById('change-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const paidAmount = parseFloat(document.getElementById('paid-amount').value);
    const totalAmount = parseFloat(document.getElementById('total-amount').value);

    const change = parseFloat((paidAmount - totalAmount).toFixed(2));
    const resultDiv = document.getElementById('change-result');

    if (change < 0) {
        resultDiv.innerHTML = '<p>¡La cantidad pagada es menor que el total de la compra!</p>';
        return;
    }

    const denominations = [100, 50, 20, 10, 5, 1, 0.50, 0.20, 0.01];
    const changeDetails = calculateChange(change, denominations);

    let resultHtml = `<p>El cambio es: $${change.toFixed(2)} pesos</p>`;
    resultHtml += '<ul class="list-group">';
    denominations.forEach((denomination, index) => {
        resultHtml += `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${denomination >= 1 ? `Monedas de $${denomination} pesos` : `Monedas de ¢${denomination * 100} centavos`}
            <span class="badge badge-primary badge-pill">${changeDetails[index]}</span>
        </li>`;
    });
    resultHtml += '</ul>';

    resultDiv.innerHTML = resultHtml;
});

function calculateChange(change, denominations, index = 0) {
    if (index >= denominations.length) return Array(denominations.length).fill(0);
    
    const denomination = denominations[index];
    const quantity = Math.floor(change / denomination);
    const remainingChange = parseFloat((change - quantity * denomination).toFixed(2));

    const result = calculateChange(remainingChange, denominations, index + 1);
    result[index] = quantity;

    return result;
}
