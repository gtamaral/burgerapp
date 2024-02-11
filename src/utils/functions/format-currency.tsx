const FormatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}
 
export default FormatCurrency;