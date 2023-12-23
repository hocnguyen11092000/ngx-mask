import * as _ from 'lodash';

/**
 *
 * @param input expect 1000 or 100.001
 * @param thousandSeparator show input with separator
 * @param decimalMarker show input with separator and decimal
 * @param separatorCount is thousand(*,xxx)
 * @returns
 */
export function convertThousands<I extends string | number>(
  input: I,
  thousandSeparator: string = '.',
  decimalMarker: string = ',',
  separatorCount: number = 3
): string {
  console.log(input);

  const decimalIdx = (input + '').indexOf('.');
  const decimal = decimalIdx > -1 ? (input + '').slice(decimalIdx + 1) : null;
  const transformInput =
    decimalIdx > -1 ? (input + '').slice(0, decimalIdx) : input;
  const countSeparator = (_.size(transformInput + '') - 1) / separatorCount;

  const result = (transformInput + '').split('').reverse();
  let count = 1;

  // same with Array.from(new Array(countSeparator).fill(null)).forEach ...
  _.forEach(_.times(countSeparator, _.constant(null)), () => {
    result[count * separatorCount] =
      result[count * separatorCount] + thousandSeparator;
    count++;
  });

  const resultString = result.reverse().join('');

  return `${
    decimalIdx > -1 ? resultString + decimalMarker + decimal : resultString
  }`;
}
