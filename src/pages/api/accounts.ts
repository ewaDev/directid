
export async function getAccountData (){
    console.log("getAccountData")
   return fetch("http://localhost:3000/apollo-carter.json")
        .then(response => response.json())
        .catch(error => console.log('error', error));
}
