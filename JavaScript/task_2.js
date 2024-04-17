const sales = [
  { amount: 10000, quantity: 10 },
  { amount: 5000, quantity: 5 },
  { amount: 15000, quantity: 3 },
];

function orderSales(inputSales) {
  return inputSales
    .map((i) => ({ ...i, total: i.amount * i.quantity }))
    .sort((a, b) => a.total - b.total);
}

const orderedSales = orderSales(sales);

console.log(orderedSales);
