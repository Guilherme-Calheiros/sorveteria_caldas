const DECIMAL_SIZE = 2;
const MAX_LENGTH = 15;

function formataNumero(valor) {
  if (valor == null || isNaN(Number(valor))) {
    return '0,00';
  }

  return Number(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formataMoeda(valor) {
  return 'R$ ' + formataNumero(valor);
}

export function formataNumeroParaInput(valor) {
  return formataNumero(valor);
}

export function parseInputMoeda(input) {
  let onlyNums = input.replace(/\D/g, '');

  if (onlyNums.length > MAX_LENGTH) {
    onlyNums = onlyNums.slice(0, MAX_LENGTH);
  }

  const padded = onlyNums.padStart(DECIMAL_SIZE + 1, '0');

  const inteiro = padded.slice(0, -DECIMAL_SIZE);
  const decimal = padded.slice(-DECIMAL_SIZE);

  return parseFloat(`${parseInt(inteiro, 10)}.${decimal}`);
}
