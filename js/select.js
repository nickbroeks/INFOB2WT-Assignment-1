function renderMenu() {
    const footer = document.querySelector('footer');
    const selectElement = document.createElement('select');
    const selectElement2 = document.createElement('select');
    const selectElement3 = document.createElement('select');

    let elements = [];
    const html = document.querySelector('html');
    elements = findElement(html, elements);
    const size = ['small', 'medium', 'large', 'verylarge'];
    const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange'];

    renderMenu1(selectElement, footer, elements);
    renderMenu2(selectElement2, footer, size);
    renderMenu3(selectElement3, footer, colors);
    let selectedElement = document.getElementById('js-Menu__Select1').value;
    let selectedSize = document.getElementById('js-Menu__Select2').value;
    let selectedColor = document.getElementById('js-Menu__Select3').value;

    selectElement3.addEventListener('change', (event) => {
        selectedElement = document.getElementById('js-Menu__Select1').value;
        selectedSize = document.getElementById('js-Menu__Select2').value;
        selectedColor = event.target.value;
        let elementQuery;
        if (selectedElement.includes('article') || selectedElement.includes('section')) {
            let number = selectedElement.split(' ')[1];
            selectedElement = selectedElement.split(' ')[0];
            elementQuery = document.querySelectorAll(selectedElement);
            changeFontcolor(elementQuery[number - 1], selectedColor);
            changeFontsize(elementQuery[number - 1], selectedSize);
        } else {
            elementQuery = document.querySelector(selectedElement);
            changeFontcolor(elementQuery, selectedColor);
            changeFontsize(elementQuery, selectedSize);
        }
    });
}

/**
 * @param {HTMLSelectElement} selectElement
 * @param {HTMLElement} footer
 * @param {String []} elements
 */
function renderMenu1(selectElement, footer, elements) {
    footer.appendChild(selectElement);
    selectElement.id = 'js-Menu__Select1';
    for (let i of elements) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement.add(Option);
    }
}

/**
 * @param {HTMLSelectElement} selectElement
 * @param {HTMLElement} footer
 * @param {String []} size
 */
function renderMenu2(selectElement, footer, size) {
    footer.appendChild(selectElement);
    selectElement.id = 'js-Menu__Select2';
    for (let i of size) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement.add(Option);
    }
}

/**
 * @param {HTMLSelectElement} selectElement
 * @param {HTMLElement} footer
 * @param {String []} colors
 */
function renderMenu3(selectElement, footer, colors) {
    footer.appendChild(selectElement);
    selectElement.id = 'js-Menu__Select3';
    for (let i of colors) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement.add(Option);
    }
}

/**
 * @param {NodeList} html
 * @param {String []} elements
 * @return {String []}
 */
function findElement(html, elements) {
    let countArticle = 1;
    let countSection = 1;
    for (let i of html.childNodes) {
        if (i.nodeName == 'BODY') {
            elements.push('body');
            for (let j of i.childNodes) {
                if (j.nodeName == 'HEADER') {
                    elements.push('header');
                }
                if (j.nodeName == 'FOOTER') {
                    elements.push('footer');
                }
                if (j.nodeName == 'ASIDE') {
                    elements.push('aside');
                }
                if (j.nodeName == 'ARTICLE') {
                    elements.push('article' + ' ' + countArticle);
                    countArticle++;
                }
                if (j.nodeName == 'SECTION') {
                    elements.push('section' + ' ' + countSection);
                    countSection++;
                }
                if (j.nodeName == 'MAIN') {
                    for (let k of j.childNodes) {
                        if (k.nodeName == 'HEADER') {
                            elements.push('header');
                        }
                        if (k.nodeName == 'FOOTER') {
                            elements.push('footer');
                        }
                        if (k.nodeName == 'ASIDE') {
                            elements.push('aside');
                        }
                        if (k.nodeName == 'ARTICLE') {
                            elements.push('article' + ' ' + countArticle);
                            countArticle++;
                        }
                        if (k.nodeName == 'SECTION') {
                            elements.push('section' + ' ' + countSection);
                            countSection++;
                        }
                    }
                }
            }
        }
    }
    return elements;
}

/**
 * @param {NodeList} targetNode
 * @param {string} selectedColor
 */
function changeFontcolor(targetNode, selectedColor) {
    // A function to change the font color using class
    for (let i of targetNode.classList) {
        if (i.split('--')[0] == 'font-color') {
            targetNode.classList.remove(i);
        }
    }
    targetNode.classList.add('font-color' + '--' + selectedColor);
}

/**
 * @param {NodeList} targetNode
 * @param {string} selectedSize
 */
function changeFontsize(targetNode, selectedSize) {
    // A function to change the text color using class
    for (let i of targetNode.classList) {
        if (i.split('--')[0] == 'font-size') {
            targetNode.classList.remove(i);
        }
    }
    targetNode.classList.add('font-size' + '--' + selectedSize);
}
renderMenu();
