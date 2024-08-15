const api_Key = "pOBjZOPMWW_SFEetYGUQhJ2pBRo"; 
const api_url = "https://ci-jshint.herokuapp.com/api";

const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status".addEventListener("click", e=> getStatus(e)));

async function getStatus(e){

    const queryString = `${api_url}?api_key=${api_Key}`;

    const response = await fetch(queryString);

    const data = await response.json;

    if(response.ok){
        console.log(data.expiry);
    }
    else{

    }
}