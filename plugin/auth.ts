// generate some form of auth to be added to requests.

/*

async function getToken(){
    let token = await user.getIdToken(false)
    return token
}

// add token to req
let token = await getToken()
const headers = new Headers();
headers.set("Authorization", "Bearer " + token);

consider https://github.com/fireship-io/fireship.io/blob/385d672babe03d4581bef8202f054369dcc143d3/app/stores/user.ts
*/

// Gateway, gen something like this for 

/* 
<script>
import {GoogleAuthProvider, signInWithPopup , onAuthStateChanged} from "firebase/auth";
import { getUser, provider, auth } from "../pkg/firebase";
import Trial from "./trial.svelte";

// todo figure out how to import stuff

let user = getUser()
// * onAuthStateChanged
// * auth.currentUser


// there is a way of doing this better 
onAuthStateChanged(auth, (changedUser) => {
    user = changedUser
})


async function login(){
 user = getUser()
 if (user == null) {
    signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
    }).catch((error) => {
        // todo handle error
    });
 }
}

</script>

{#if user != null} 
    <Trial client:load path="" user={user}></Trial>
{:else}
<button on:click={login}>
	sign in
</button>
{/if}

*/

/* 
    have component which will check if a user can do / view certain feature / component.
    eg if 
        List / Get you can read but not create (or some combo of both.)
*/