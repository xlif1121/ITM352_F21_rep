function isNonNegInt (val, returnErrors = false) {
    errors = []; // assume no errors at first
if(Number(val) != val) errors.push('Not a number!'); // Check if string is a number value
if(val < 0) errors.push('Negative value!'); // Check if it is non-negative
if(parseInt(val) != val) errors.push('Not an integer!'); // Check that it is an integer

return returnErrors ? errors : ((errors.length > 0)?false:true)

}