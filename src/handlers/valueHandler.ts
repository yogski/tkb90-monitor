/**
 * This file contains functions to help handling values, especially in parsing and conversion.
 * 
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
 * @param originalDecimal flag of to return original decimal number instead of percentage value
 * @returns percentage value
 */
export const parsePercentageValue = (value: string, originalDecimal = false): number => {
	value = value.replace(/,/g, '.').replace(/%/g,'').trim();
	return originalDecimal ? Number(value)/100 : Number(value);
}

/**
 * only removes thousand separators. does not handle decimals (use parseMonetaryValue iinstead)
 * @param value 
 * @returns numeric values as number
 */
export const removeThousandSeparators = (value: string): number => {
	value = value.trim().replace(/\,/g, '').replace(/\./g,'');
	return Number(value);
}