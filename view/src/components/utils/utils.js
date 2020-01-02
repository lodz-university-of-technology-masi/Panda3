export function removeByKey (myObj, deleteKey) {
    return Object.keys(myObj)
        .filter(key => key !== deleteKey)
        .reduce((result, current) => {
            result[current] = myObj[current];
            return result;
        }, {});
}

export function reverse(array) {
    let i = null;
    let r = null;
    for (i = 0, r = array.length - 1; i < r; i += 1, r -= 1)
    {
        let left = array[i];
        let right = array[r];
        left ^= right;
        right ^= left;
        left ^= right;
        array[i] = left;
        array[r] = right;
    }
}

export function getSelectionText() {
    let text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        // eslint-disable-next-line no-mixed-operators
        (activeElTagName === "textarea") || (activeElTagName === "input" &&
        // eslint-disable-next-line no-mixed-operators
        /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}