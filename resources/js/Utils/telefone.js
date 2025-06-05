export function formataTelefone(value) {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length === 0) return '';

  const ddd = numbers.slice(0, 2);
  const primeiraParte = numbers.length > 2 ? numbers.slice(2, numbers.length <= 10 ? 6 : 7) : '';
  const segundaParte = numbers.length > 6 ? numbers.slice(numbers.length <= 10 ? 6 : 7, 11) : '';

  if (numbers.length <= 2) {
    return `(${ddd}`;
  }

  if (numbers.length <= (numbers.length <= 10 ? 6 : 7)) {
    return `(${ddd}) ${primeiraParte}`;
  }

  return `(${ddd}) ${primeiraParte}-${segundaParte}`;
}

export function desformataTelefone(value) {
  return value.replace(/\D/g, '');
}

export function isTelefoneValido(value) {
  const numeros = desformataTelefone(value);
  return /^(\d{10}|\d{11})$/.test(numeros);
}
