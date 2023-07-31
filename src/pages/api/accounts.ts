
export async function getAccountData (){
    console.log("getAccountData")
   return fetch("https://directid.vercel.app/apollo-carter.json")
        .then(response => response.json())
        .catch(error => console.log('error', error));
}
