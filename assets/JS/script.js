const api_Key = "pOBjZOPMWW_SFEetYGUQhJ2pBRo"; 
const api_url = "https://ci-jshint.herokuapp.com/api";

const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

function processOptions(form){
        let optArray = [];
        for (let entry of form.entries()){
            if(entry[0]=== "options"){
                optArray.push(entry[1]);
            }
        }
        form.delete("options");
        form.append("options", optArray.join());

        return form;
}
async function postForm(e){
    const form = processOptions(new FormData(document.getElementById("checksform")));
    
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
                displayErrors(data);
            }else {
                displayExpecption(data);
                throw new Error(data.error);
            }
    }


    function displayErrors(data){
        let heading = ` JSHint Results for ${data.file}`;

        if(data.total_errors === 0){
            results = `<div class="no_errors">No errors reported </div>`;
        }else {
            result = `<div> Total Errors: <span calss="error_count">
                      ${data.totalerros}</span> </div>`;

            for(let error of data.error.list){
                results += `<div>At line <span class="line">${error.line}</span>, `;
                results += `column <span class="column">${error.col}:</span></div>`;
                results += `<div class="error">${error.error}</div>`;
            }
        }
        document.getElementById("resultsModalTitle").innerText = heading;
        document.getElementById("results-content").innerHTML = results;
        resultsModal.show();
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
        displayExpecption(data);
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
    
    function displayExpecption(data){
        let heading = `An Exception Occurred`;

        result = `<div> The API returnd status code ${data.status_code}</div>`;
        result += `<div> Error number: <strong>${data.error.no}<strong></div>`;
         results += `<div>Error text: <strong>${data.error}</strong></div>`;

            document.getElementById("resultsModalTitle").innerText = heading;
            document.getElementById("results-content").innerHTML = results;
            resultsModal.show();

    }
}