const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

export function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

export function formatExpenseDate(value) {
  return dateFormatter.format(new Date(value));
}

export function buildMonthlyExpenseData(expenses) {
  const grouped = expenses.reduce((accumulator, expense) => {
    const date = new Date(expense.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("en-IN", {
      month: "short",
      year: "2-digit"
    });

    if (!accumulator[key]) {
      accumulator[key] = { month: label, total: 0 };
    }

    accumulator[key].total += Number(expense.amount);
    return accumulator;
  }, {});

  const values = Object.values(grouped);

  return values.length ? values.reverse() : [{ month: "No Data", total: 0 }];
}
