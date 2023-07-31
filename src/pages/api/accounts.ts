export async function getAccountData (){
   const baseUrl = process.env["BASE_URL"]
   return fetch(`${baseUrl}/apollo-carter.json`)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}
