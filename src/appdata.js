import { writable } from 'svelte/store';

// keeps track of the current state of the to-do list
export const appdata = writable([]);

// syncs client data with the JSON data from the server
export const syncClientData = async function () {
    const response = await fetch("/appdata", {
        method: "GET",
    });

    appdata.set(JSON.parse(await response.text()));
};