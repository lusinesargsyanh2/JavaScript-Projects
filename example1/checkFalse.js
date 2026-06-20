
function checkFalseValue(val) {
    if (Number.isNaN(val)) {
        return true;
    }

    switch (val) {
        case 0:
        case "":
        case null:
        case undefined:
        case false:
            return true;
            break;

        default:
            return false;
            break;
    }
}

console.log(`value(0) ${checkFalseValue(0)}`);
console.log(`value("") ${checkFalseValue("")}`);
console.log(`value(null) ${checkFalseValue(null)}`);
console.log(`value(undefined) ${checkFalseValue(undefined)}`);
console.log(`value(NaN) ${checkFalseValue(NaN)}`);
console.log(`value(false) ${checkFalseValue(false)}`);
console.log(`value(number) ${checkFalseValue(15)}`);
console.log(`value(string) ${checkFalseValue("test")}`);