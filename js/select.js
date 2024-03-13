function AddMenu() {
    const header = document.querySelector('header');
    const selectElement = document.createElement('select');
    const selectElement2 = document.createElement('select');
    const selectElement3 = document.createElement('select');

    header.appendChild(selectElement); // Initialize the Menu 1 in header
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
            }
        }
    }

    for (let i of elements) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement.add(Option);
    }

    header.appendChild(selectElement2); // Initialize the Menu 2 (fontsize) in header
    selectElement2.id = 'js-Menu__Select2';
    const size = ['small', 'medium', 'large', 'verylarge'];
    for (let i of size) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement2.add(Option);
    }

    header.appendChild(selectElement3); // Initialize the Menu 3 (fontcolor) in header
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
            changefontcolor(element_query[number - 1], color_selected, colors);
            changefontsize(element_query[number - 1], size_selected, size);
        } else {
            element_query = document.querySelector(element_selected);
            changefontcolor(element_query, color_selected, colors);
            changefontsize(element_query, size_selected, size);
        }
    });
}

function changefontcolor(target_node, color_selected, colors) {
    // A function to change the font color using class
    for (let i of target_node.classList) {
        for (let j of colors) {
            if (i.split('__')[1] == j) {
                target_node.classList.remove(i);
            }
        }
    }
    target_node.classList.add('textcolor' + '__' + color_selected);
}

function changefontsize(target_node, size_selected, size) {
    // A function to change the text color using class
    for (let i of target_node.classList) {
        for (let j of size) {
            if (i.split('__')[1] == j) {
                target_node.classList.remove(i);
            }
        }
    }
    target_node.classList.add('textsize' + '__' + size_selected);
}

AddMenu();
