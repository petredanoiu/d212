export function isNumeric(value: string): boolean {
  return /^[0-9]+$/.test(value);
}

/**
 * Inversează un șir de caractere.
 */
export function strReverse(str: string): string {
  return str.split('').reverse().join('');
}

export type ValidCui = {
  isValid: boolean;
  message: string;
};
/**
 * Validează un Cod de Identificare Fiscală (CIF).
 */
export function isCUI(p_cui: string): ValidCui {
  if (!isNumeric(p_cui)) {
    return {
      isValid: false,
      message: 'Codul Unic de Identificare trebuie să conțină doar cifre!',
    };
  }
  if (p_cui.charAt(0) === '0') {
    return {
      isValid: false,
      message: 'Primul caracter nu poate fi 0 (zero)!',
    };
  }

  const key = strReverse('753217532');
  const cuirev = strReverse(p_cui);
  const control = cuirev.charAt(0);
  const rest = cuirev.substring(1);

  let suma = 0;
  for (let i = 0; i < rest.length; i++) {
    suma += parseInt(rest.charAt(i), 10) * parseInt(key.charAt(i), 10);
  }

  suma *= 10;
  const isValid =
    (suma % 11 === 10 && control === '0') ||
    (suma % 11 !== 10 && suma % 11 === parseInt(control, 10));
  let message = '';
  if (!isValid) {
    message = 'Codul de identificare fiscală este invalid!';
  }
  return {
    isValid,
    message,
  };
}
