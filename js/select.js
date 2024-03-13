function AddMenu() {
    const header = document.querySelector('header');
    const selectElement = document.createElement('select');
    const selectElement2 = document.createElement('select');
    const formElement = document.createElement('form');

    header.appendChild(selectElement); // Initialize the Menu 1 in header
    selectElement.id = 'Menu__Select1';
    const elements = ['body', 'header', 'footer', 'aside', 'article', 'section'];
    for (let i of elements) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement.add(Option);
    }

    header.appendChild(selectElement2); // Initialize the Menu 2 in header
    selectElement2.id = 'Menu__Select2';
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    for (let i of colors) {
        const Option = document.createElement('option');
        Option.textContent = i;
        selectElement2.add(Option);
    }

    var element_selected = document.getElementById('Menu__Select1').value;
    var color_selected = document.getElementById('Menu__Select2').value;

    selectElement.addEventListener('change', (event) => {
        element_selected = event.target.value;
        element_query = document.querySelectorAll(element_selected);
        element_query.forEach((elementItem) => {
            elementItem.style.color = color_selected;
        });
    });

    selectElement2.addEventListener('change', (event) => {
        color_selected = event.target.value;
        console.log(element_selected + ' ' + color_selected);
    });
}

AddMenu();
