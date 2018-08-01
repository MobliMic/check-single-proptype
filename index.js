/**
 * Copyright Facebook, ratehub, Michael Craddock.
 * All rights reserved.
 *
 * This code is intended to extend the behaviour of checkPropTypes() from
 * facebook/prop-types. The license for that code can be found here:
 * https://github.com/facebook/prop-types/blob/01634d92e4e4cb5ffaf7de96ea8cb5da9b65e4f0/LICENSE
 *
 * That function's source:
 * https://github.com/facebook/prop-types/blob/01634d92e4e4cb5ffaf7de96ea8cb5da9b65e4f0/checkPropTypes.js
 *
 * This code is a derivative of ratehub check-prop-types function its licence and code can be found here:
 * https://github.com/ratehub/check-prop-types/blob/cadef131e502bd04cc363c4bdb84f5a10ca61605/LICENSE
 * https://github.com/ratehub/check-prop-types/blob/cadef131e502bd04cc363c4bdb84f5a10ca61605/index.js
 */

/**
 * Check if the values match with the type specs
 * Return a type error message or null
 *
 * @param {object} propType ReactPropType
 * @param {string} propTypeName Name of the prop being checked
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 */
function checkSinglePropType(propType, propTypeName, values, location, componentName, getStack) {
    if (process.env.NODE_ENV !== 'production') {
        const ReactPropTypesSecret = require('prop-types/lib/ReactPropTypesSecret');
        const name = componentName || 'React class';
        let error;

        if (typeof propType !== 'function') {
            return (name + ': ' + location + ' type `' + typeSpecName + '` is ' +
                'invalid; it must be a function, usually from React.PropTypes.');
        } else {
            // Prop type validation may throw. In case they do, catch and save the
            // exception as the error.
            try {
                error = propType(values, propTypeName, componentName,
                    location, null, ReactPropTypesSecret);
            } catch (ex) {
                error = ex;
            }
        }

        if (error && !(error instanceof Error)) {
            return (name + ': type specification of ' + location + ' `' +
                propTypeName + '` is invalid; the type checker function must ' +
                'return `null` or an `Error` but returned a ' + typeof error + '. ' +
                'You may have forgotten to pass an argument to the type checker ' +
                'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                'shape all require an argument).');
        }

        if (error instanceof Error) {
            const stack = getStack && getStack() || '';
            return 'Failed ' + location + ' type: ' + error.message + stack;
        }

        return null;
    }

    return null;
}

module.exports = checkSinglePropType;