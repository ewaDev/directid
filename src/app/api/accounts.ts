
export async function getAccountData (){
   const response = fetch("./data/apollo-carter.json")
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    return response
}
