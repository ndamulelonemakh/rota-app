/**
 * Generates a dictionary object from an array, using the array indices as keys.
 *
 * @param {Array} arr - The input array.
 * @returns {Object} The generated dictionary object.
 */
export function generateDictFromArr(arr) {
  return arr.reduce((dict, value, index) => {
    dict[index + 1] = value;
    return dict;
  }, {});
}

/**
 * Checks if a value is null, an empty string, or zero (after conversion to a number).
 *
 * @param {*} val - The value to be checked.
 * @returns {boolean} True if the value is null, an empty string, or zero; otherwise, false.
 */
export function isNullOrEmpty(val) {
  return val == null || val === '' || Number(val) === 0;
}