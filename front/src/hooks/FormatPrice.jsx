export const FormatPrice = (
  price,
  locale = "es-AR",
  currency = "ARS"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};