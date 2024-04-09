class User {
    #name;
    #registered;

    constructor(name, registered) {
        this.#name = name || '';
        this.#registered = registered || false;
    }
}
let user = new User();
function updateLogin() {
    fetch('/user')
        .then((res) => {
            if (res.status === 200) return res.json();
            return null;
        })
        .then((data) => {
            if (!data || !data.user) return;
            user = new User();
            showLogout();
        });
}

function showLogout() {
    const login = document.getElementById('js-login-button');
    const logout = document.getElementById('js-logout-button');
    const profile = document.getElementById('js-profile-button');
    login.classList.add('hidden');
    logout.classList.remove('hidden');
    profile.classList.remove('hidden');
    logout.addEventListener('click', logOut);
}

function logOut() {
    const fetchOptions = { method: 'POST' };
    fetch('/logout', fetchOptions).then(() => {
        window.location.href = '/';
    });
}
updateLogin();

export { user, User };
