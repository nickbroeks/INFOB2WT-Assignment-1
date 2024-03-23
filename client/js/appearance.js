const PREFIX = 'appearance__';
const PREFIX_FONT_COLOR = 'font-color--';
const PREFIX_FONT_SIZE = 'font-size--';

const colors = ['default', 'black', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const sizes = ['default', 'small', 'medium', 'large', 'verylarge'];

const JS_ELEMENT_SELECT = PREFIX + 'element-select';
const JS_SIZE_SELECT = PREFIX + 'size-select';
const JS_COLOR_SELECT = PREFIX + 'color-select';

let selectedElement = 'body';
let selectedSize = 'default';
let selectedColor = 'default';

let elementSelect = null;
let sizeSelect = null;
let colorSelect = null;

function renderMenus() {
    elementSelect = document.createElement('select');
    sizeSelect = document.createElement('select');
    colorSelect = document.createElement('select');

    elementSelect.classList.add(JS_ELEMENT_SELECT);
    sizeSelect.classList.add(JS_SIZE_SELECT);
    colorSelect.classList.add(JS_COLOR_SELECT);

    const elements = findElements();

    addOptions(elementSelect, elements);
    addOptions(sizeSelect, sizes);
    addOptions(colorSelect, colors);
    elementSelect.addEventListener('click', (e) => e.stopPropagation());
    sizeSelect.addEventListener('click', (e) => e.stopPropagation());
    colorSelect.addEventListener('click', (e) => e.stopPropagation());

    elementSelect.addEventListener('change', updateElement);
    sizeSelect.addEventListener('change', changeFontsize);
    colorSelect.addEventListener('change', changeFontcolor);

    const appearanceMenu = document.createElement('div');
    appearanceMenu.classList.add('appearance__menu');
    appearanceMenu.appendChild(elementSelect);
    appearanceMenu.appendChild(sizeSelect);
    appearanceMenu.appendChild(colorSelect);
    const text = document.createElement('span');
    text.textContent = 'Click here to close the menu';
    appearanceMenu.appendChild(text);
    const header = document.querySelector('header');
    const menuTrigger = document.createElement('i');
    menuTrigger.classList.add('ri-tools-line', 'appearance__trigger');
    menuTrigger.addEventListener('click', () => {
        appearanceMenu.classList.toggle('appearance__menu--active');
    });
    menuTrigger.appendChild(appearanceMenu);
    header.appendChild(menuTrigger);
}
/**
 * @param {Event} event
 */
function updateElement(event) {
    selectedElement = elementSelect.value;
    const element = findElement(selectedElement);
    const appearanceClasses = [...element.classList]
        .filter((c) => c.startsWith(PREFIX))
        .map((c) => c.slice(PREFIX.length));
    const oldSize = appearanceClasses.find((c) => c.startsWith());
    selectedSize = oldSize ? oldSize.slice(PREFIX_FONT_COLOR.length) : 'default';
    sizeSelect.value = selectedSize;
    const oldColor = appearanceClasses.find((c) => c.startsWith(PREFIX_FONT_COLOR));
    selectedColor = oldColor ? oldColor.slice(PREFIX_FONT_COLOR.length) : 'default';
    colorSelect.value = selectedColor;
    event.stopPropagation();
}

/**
 * @param {HTMLSelectElement} selectElement
 * @param {String []} options
 */
function addOptions(selectElement, options) {
    for (let text of options) {
        const option = document.createElement('option');
        option.textContent = text;
        selectElement.add(option);
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
            return node + ' ' + counts[node];
        }
        return node;
    });
    return elements;
}

/**
 * @param {string} name
 * @return {HTMLElement}
 */
function findElement(name) {
    if (!name.includes(' ')) {
        return document.querySelector(name);
    }
    const [node, count] = name.split(' ');
    return document.querySelectorAll(node)[count - 1];
}

function changeFontcolor() {
    selectedColor = colorSelect.value;
    const element = findElement(selectedElement);
    const oldColor = [...element.classList].find((c) => c.startsWith(PREFIX + PREFIX_FONT_COLOR));
    console.log(oldColor);
    if (oldColor) {
        element.classList.remove(oldColor);
        element.classList.remove(PREFIX + PREFIX_FONT_COLOR);
    }
    if (selectedColor !== 'default') {
        element.classList.add(PREFIX + PREFIX_FONT_COLOR + selectedColor);
        element.classList.add(PREFIX + PREFIX_FONT_COLOR);
    }
}
function changeFontsize() {
    selectedSize = sizeSelect.value;
    const element = findElement(selectedElement);
    const oldSize = [...element.classList].find((c) => c.startsWith(PREFIX + PREFIX_FONT_SIZE));
    if (oldSize) {
        element.classList.remove(oldSize);
        element.classList.remove(PREFIX + PREFIX_FONT_SIZE);
    }
    if (selectedSize !== 'default') {
        element.classList.add(PREFIX + PREFIX_FONT_SIZE + selectedSize);
        element.classList.add(PREFIX + PREFIX_FONT_SIZE);
    }
}
renderMenus();
