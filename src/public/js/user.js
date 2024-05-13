class User {
    #name;
    #registered;

    constructor(name = '', registered = false) {
        this.#name = name;
        this.#registered = registered;
    }

    get registered() {
        return this.#registered;
    }
}
let isUpdated = false;

let globalUser = new User();

async function getUser() {
    const user = await updateUser();
    return user;
}
async function updateUser() {
    if (isUpdated) {
        return globalUser;
    }
    await fetch('/user')
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            if (!data || !data.user) return;
            globalUser = new User(data.user.name, true);
            isUpdated = true;
        });
    return globalUser;
}
async function updateLogin() {
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
        showLogout();
    }
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

async function isLoggedIn() {
    const user = await getUser();
    return user.registered;
}
updateLogin();

export { getUser, User, isLoggedIn };
