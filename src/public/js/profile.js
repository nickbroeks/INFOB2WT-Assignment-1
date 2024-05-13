import { user, isLoggedIn } from './user.js';

async function fillProfile() {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
        console.log('not logged in');
        return;
    }
    console.log(user);
}

fillProfile();
