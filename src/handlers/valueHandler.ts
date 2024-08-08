/**
 * This file contains functions to help handling values, especially in parsing and conversion.
 * 
 */

/**
 * Convert common monetary value (has currency, thousand separators, and decimals) to JS number. Can handle multiple conventions.
 * @param value monetary value string
 * @example
 * parseMonetaryValue('19,990.90') = 19990.90
 * parseMonetaryValue('IDR500.000,00') = 500000
 * @returns number
 */
export const parseMonetaryValue = (value: string): number => {
  value = value.replace(/^[A-Za-z]{1,3}\.?|\s?[A-Za-z]{1,3}$|[^\d.,]/g, '').trim();

  const hasComma = value.includes(',');
  const hasDot = value.includes('.');

  if (hasComma && hasDot) {
    const lastComma = value.lastIndexOf(',');
    const lastDot = value.lastIndexOf('.');
    
    if (lastComma > lastDot) {
      value = value.replace(/\./g, '').replace(',', '.');
    } else {
      value = value.replace(/,/g, '');
    }
  } else if (hasComma) {
    if (value.split(',').length - 1 === 1) {
      value = value.replace(',', '.');
    } else {
      value = value.replace(/,/g, '');
    }
  } else if (hasDot) {
    if (value.split('.').length - 1 === 1) {
      value = value.replace('.', '.');
    } else {
      value = value.replace(/\./g, '');
    }
  }

  return parseFloat(value);
};

/**
 * convert percentage sign to number
 * @param value percentage string, may come with % sign
 * @param originalDecimal flag of to return original decimal number, defaults to `false`
 * @example
 * parsePercentageValue('91.7%') = 91.7
 * parsePercentageValue('91.7%', true) = 0.917
 * @returns percentage value
 */
export const parsePercentageValue = (value: string, originalDecimal = false): number => {
	value = value.replace(/,/g, '.').replace(/%/g,'').trim();
	return originalDecimal ? Number(value)/100 : Number(value);
}

/**
 * only removes thousand separators. does not handle decimals (use `parseMonetaryValue` iinstead)
 * @example 
 * removeThousandSeparators('3.500') = 3500
 * removeThousandSeparators('1,999,000') = 1999000
 * @param value string
 * @returns numeric values as number
 */
export const removeThousandSeparators = (value: string): number => {
	value = value.trim().replace(/\,/g, '').replace(/\./g,'');
	return Number(value);
}

/**
 * Convert abbreviated value to JS number. Has locale to handle common abbreviation based on language. Throws NaN for invalid abbreviated value.
 * @param value abbreviated value string
 * @param locale abbreviation language. Supports: `EN`, `ID`
 * @example 
 * @returns numeric value as number
 */
export const parseAbbrValue = (value: string, locale: Locale = 'EN'): number => {
  let fixedValue = value.replace(/,/g, '.');
  let match = fixedValue.match(/^(\d+\.?\d*)\s*([a-zA-Z]+)?$/);

  if (!match)return NaN;

  const [, numPart, abbrPart] = match;
  const num = parseFloat(numPart);
  if (!abbrPart) return num;

  const factor = abbrValueLocale[locale][abbrPart.toLowerCase()];
  if (factor === undefined) return NaN;

  return num * factor;
};

type Locale = 'ID' | 'EN';
type AbbrValueLocale = {
  [key in Locale]: {
    [key: string]: number;
  };
};

const abbrValueLocale: AbbrValueLocale = {
  "ID": {
    "rb": 1000, // ribu
    "ribu": 1000,
    "k": 1000, // kilo, equal to ribu
    "jt": 1_000_000, // juta
    "juta": 1_000_000,
    "m": 1_000_000_000, // milyar
    "t": 1_000_000_000_000, // trilyun
  },
  "EN": {
    "k": 1000, // thousands
    "m": 1_000_000, // millions
    "b": 1_000_000_000, // billions
    "t": 1_000_000_000_000, // trillions
  }
}