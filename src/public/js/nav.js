const toggle = document.getElementById('js-nav-toggle');
const nav = document.getElementById('js-nav-menu');
const header = document.getElementById('js-nav-bar');

let navIsOpen = false;
// When the user scrolls the page, execute myFunction
window.onscroll = function () {
    if (header) {
        const sticky = header.offsetTop;
        if (window.scrollY > sticky) {
            header.classList.remove('js-nav-bar--transparent');
            header.classList.add('js-nav-bar--solid');
        } else {
            header.classList.add('js-nav-bar--transparent');
            header.classList.remove('js-nav-bar--solid');
        }
    }
};

function showMenu() {
    toggle.classList.toggle('show-icon');
    if (navIsOpen) {
        navIsOpen = false;
        nav.classList.remove('js-fade--visible');
        setTimeout(() => {
            if (!navIsOpen) {
                nav.classList.remove('js-fade--display');
            }
        }, 1000);
        return;
    }
    navIsOpen = true;
    nav.classList.add('js-fade--display');
    setTimeout(() => {
        nav.classList.add('js-fade--visible');
    }, 0);
}

document.getElementById('js-nav-toggle').addEventListener('click', () => {
    showMenu();
});

function updateLogin() {
    const login = document.getElementById('js-login-button');
    fetch('/user')
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            return null;
        })
        .then((data) => {
            if (data && data.user) {
                while (login.firstChild) {
                    login.removeChild(login.firstChild);
                }
                const logout = document.createElement('span');
                logout.textContent = 'Logout';
                logout.classList.add('nav__link', 'flex-container');
                logout.addEventListener('click', () => {
                    fetch('/logout', {
                        method: 'POST',
                    }).then(() => {
                        window.location.href = '/';
                    });
                });
                login.appendChild(logout);
            }
        });
}

updateLogin();
