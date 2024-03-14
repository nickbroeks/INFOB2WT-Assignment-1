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

    renderMenu(elementSelect, elements);
    renderMenu(sizeSelect, sizes);
    renderMenu(colorSelect, colors);

    elementSelect.addEventListener('change', updateElement);
    sizeSelect.addEventListener('change', changeFontsize);
    colorSelect.addEventListener('change', changeFontcolor);
}

function updateElement() {
    selectedElement = elementSelect.value;
    const element = findElement(selectedElement);
    const appearanceClasses = [...element.classList]
        .filter((c) => c.startsWith(PREFIX))
        .map((c) => c.slice(PREFIX.length));
    const old_size = appearanceClasses.find((c) => c.startsWith());
    selectedSize = old_size ? old_size.slice(PREFIX_FONT_COLOR.length) : 'default';
    sizeSelect.value = selectedSize;
    const old_color = appearanceClasses.find((c) => c.startsWith(PREFIX_FONT_COLOR));
    selectedColor = old_color ? old_color.slice(PREFIX_FONT_COLOR.length) : 'default';
    colorSelect.value = selectedColor;
}

/**
 * @param {HTMLSelectElement} selectElement
 * @param {String []} options
 */
function renderMenu(selectElement, options) {
    const footer = document.querySelector('footer');
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
    const old_color = [...element.classList].find((c) => c.startsWith(PREFIX + PREFIX_FONT_COLOR));
    console.log(old_color);
    if (old_color) {
        element.classList.remove(old_color);
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
    const old_size = [...element.classList].find((c) => c.startsWith(PREFIX + PREFIX_FONT_SIZE));
    if (old_size) {
        element.classList.remove(old_size);
        element.classList.remove(PREFIX + PREFIX_FONT_SIZE);
    }
    if (selectedSize !== 'default') {
        element.classList.add(PREFIX + PREFIX_FONT_SIZE + selectedSize);
        element.classList.add(PREFIX + PREFIX_FONT_SIZE);
    }
}
renderMenus();
