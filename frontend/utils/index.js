import checkPropTypes from "check-prop-types";

/**
 * Searches the element by the test attribute inside the wrapper
 * @param {Element} wrapper Shallow copy of element to search within
 * @param {String} attr Test attribute
 */
export const findByTestAttribute = (wrapper, attr) =>
  wrapper.find(`[data-test='${attr}']`);

/**
 * Checks if there's any error in propss
 * @param {Element} wrapper Shallow copy of element to check
 * @param {Object} expectedProps Props
 */
export const checkProps = (wrapper, expectedProps) => {
  return checkPropTypes(
    wrapper.propTypes,
    expectedProps,
    "props",
    wrapper.name
  );
};
