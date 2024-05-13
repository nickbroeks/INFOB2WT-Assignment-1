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
let userStatus = 'not_defined';
let user = undefined;

async function getUser() {
    return await user;
}
async function updateUser() {
    if (userStatus == 'done') {
        return user;
    } else if (userStatus == 'updating') {
        return await user;
    }
    userStatus = 'updating';
    user = await fetch('/user')
        .then((res) => {
            if (res.ok) return res.json();
            return null;
        })
        .then((data) => {
            if (!data || !data.user) return;
            userStatus = 'done';
            user = new User(data.user.username);
        });
    return user;
}
async function updateLogin() {
    const loggedIn = await isLoggedIn();
    console.log(loggedIn);
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
    await updateUser();
    return user.registered;
}
updateLogin();

export { user, User, isLoggedIn };
