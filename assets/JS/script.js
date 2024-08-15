const api_Key = "pOBjZOPMWW_SFEetYGUQhJ2pBRo"; 
const api_url = "https://ci-jshint.herokuapp.com/api";

const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e){

    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(api_url, {
                          method: "POST",
                          headers: {
                                      "Authorization": api_Key,
                                  },
                          body: form,
                          });
                          
    const data = await response.json();
            
            if(response.ok){
                console.log (data);
            }else {
                throw new Error(data.error);
            }
    }

async function getStatus(e){

    const queryString = `${api_url}?api_key=${api_Key}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if(response.ok){
        console.log(data.expiry);
        displayStatus(data);
    }
    else{
        throw new Errow(data.error);
    }

    function displayStatus(data){
        let heading = "API Key Status";
        let results = `<div> You Key is valid until </div>`;

        results += `<div class="key-status"> ${data.expiry}</div>`

        document.getElementById("resultsModalTitle").innerText = heading;
        document.getElementById("results-content").innerHTML = results;

        resultsModal.show();
    } 
}