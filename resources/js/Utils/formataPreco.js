export function formataPreco(valor) {
    if (valor == null || isNaN(valor)) return 'R$ 0,00';

    return 'R$ ' + parseFloat(valor)
        .toFixed(2)
        .replace('.', ',');
}