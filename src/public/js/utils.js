/**
 * @param {HTMLElement} element
 * @param {string[]} texts
 */
function addTextsWithBreaks(element, texts) {
    let isFirst = true;
    texts.forEach((text) => {
        if (!isFirst) {
            element.appendChild(document.createElement('br'));
        } else {
            isFirst = false;
        }
        element.appendChild(document.createTextNode(text));
    });
}

/**
 * @param {string} tag
 * @param {string[]} classes
 * @returns {HTMLElement}
 */
function createElementWithClasses(tag, classes) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    return element;
}

export { addTextsWithBreaks, createElementWithClasses };
