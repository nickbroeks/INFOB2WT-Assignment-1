function AddMenu() {
    const footer = document.querySelector('footer');
    const selectElement = document.createElement('select');
    const selectElement2 = document.createElement('select');
    const selectElement3 = document.createElement('select');

    footer.appendChild(selectElement); // Initialize the Menu 1 in header
    selectElement.id = 'js-Menu__Select1';
    var elements = [];
    var articlecount = 1;
    var sectioncount = 1;

    var html = document.querySelector('html'); // Transverse through DOM to find all element
    for (let i of html.childNodes) {
        // Find the body exist or not first
        if (i.nodeName == 'BODY') {
            elements.push('body'); // Transverse through body to find the child node
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
                    elements.push('article' + ' ' + articlecount);
                    articlecount++;
                }
                if (j.nodeName == 'SECTION') {
                    elements.push('section' + ' ' + sectioncount);
                    sectioncount++;
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
                            elements.push('article' + ' ' + articlecount);
                            articlecount++;
                        }
                        if (k.nodeName == 'SECTION') {
                            elements.push('section' + ' ' + sectioncount);
                            sectioncount++;
                        }
                    }
                }
            }
        }
    }

    for (let i of elements) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement.add(Option);
    }

    footer.appendChild(selectElement2); // Initialize the Menu 2 (fontsize) in header
    selectElement2.id = 'js-Menu__Select2';
    const size = ['small', 'medium', 'large', 'verylarge'];
    for (let i of size) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement2.add(Option);
    }

    footer.appendChild(selectElement3); // Initialize the Menu 3 (fontcolor) in header
    selectElement3.id = 'js-Menu__Select3';
    const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    for (let i of colors) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement3.add(Option);
    }

    var element_selected = document.getElementById('js-Menu__Select1').value;
    var size_selected = document.getElementById('js-Menu__Select2').value;
    var color_selected = document.getElementById('js-Menu__Select3').value;

    selectElement3.addEventListener('change', (event) => {
        element_selected = document.getElementById('js-Menu__Select1').value;
        size_selected = document.getElementById('js-Menu__Select2').value;
        color_selected = event.target.value;
        var element_query;
        if (element_selected.includes('article') || element_selected.includes('section')) {
            var number = element_selected.split(' ')[1];
            element_selected = element_selected.split(' ')[0];
            element_query = document.querySelectorAll(element_selected);
            changefontcolor(element_query[number - 1], color_selected);
            changefontsize(element_query[number - 1], size_selected);
        } else {
            element_query = document.querySelector(element_selected);
            changefontcolor(element_query, color_selected);
            changefontsize(element_query, size_selected);
        }
    });
}

function changefontcolor(target_node, color_selected) {
    // A function to change the font color using class
    for (let i of target_node.classList) {
        if (i.split('--')[0] == 'font-color') {
            target_node.classList.remove(i);
        }
    }
    target_node.classList.add('font-color' + '--' + color_selected);
}

function changefontsize(target_node, size_selected) {
    // A function to change the text color using class
    for (let i of target_node.classList) {
        if (i.split('--')[0] == 'font-size') {
            target_node.classList.remove(i);
        }
    }
    target_node.classList.add('font-size' + '--' + size_selected);
}

AddMenu();
