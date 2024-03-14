const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const sizes = ['small', 'medium', 'large', 'verylarge'];

const JS_ELEMENT_SELECT = 'appearance__element-select';
const JS_SIZE_SELECT = 'appearance__size-select';
const JS_COLOR_SELECT = 'appearance__color-select';

let selectedElement = null;
let selectedSize = null;
let selectedColor = null;

function renderMenus() {
    const footer = document.querySelector('footer');
    const elementSelect = document.createElement('select');
    const sizeSelect = document.createElement('select');
    const colorSelect = document.createElement('select');

    elementSelect.classList.add(JS_ELEMENT_SELECT);
    sizeSelect.classList.add(JS_SIZE_SELECT);
    colorSelect.classList.add(JS_COLOR_SELECT);

    const elements = findElements();

    renderMenu(elementSelect, footer, elements);
    renderMenu(sizeSelect, footer, sizes);
    renderMenu(colorSelect, footer, colors);

    sizeSelect.addEventListener('change', updateStyle);
    colorSelect.addEventListener('change', updateStyle);
}

function updateStyle() {
    if (selectedElement.includes('article') || selectedElement.includes('section')) {
        let number = selectedElement.split(' ')[1];
        selectedElement = selectedElement.split(' ')[0];
        const elementQuery = document.querySelectorAll(selectedElement);
        changeFontcolor(elementQuery[number - 1], selectedColor);
        changeFontsize(elementQuery[number - 1], selectedSize);
    } else {
        const elementQuery = document.querySelector(selectedElement);
        changeFontcolor(elementQuery, selectedColor);
        changeFontsize(elementQuery, selectedSize);
    }
}
/**
 * @param {HTMLSelectElement} selectElement
 * @param {HTMLElement} footer
 * @param {String []} options
 */
function renderMenu(selectElement, footer, options) {
    footer.appendChild(selectElement);

    for (let i of options) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement.add(Option);
    }
}

/**
 * @return {String []}
 */
function findElements() {
    const counts = {
        article: 0,
        section: 0,
    };
    const elements = [...document.querySelectorAll('body, header, footer, aside, article, section')].map((el) => {
        const node = el.nodeName.toLowerCase();
        if (node in counts) {
            counts[node]++;
            return 'article' + ' ' + counts[node];
        }
        return node;
    });
    console.log(elements);
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
renderMenus();
