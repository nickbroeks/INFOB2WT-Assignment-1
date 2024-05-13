import { getUser, isLoggedIn } from './user.js';

async function fillProfile() {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
        console.log('not logged in');
        return;
    }
    const user = await getUser();
    console.log(user);
}

fillProfile();
