let jobnameinput = document.querySelector("#Jobname");
let companynameinput = document.querySelector("#CompanyName");
let locationinput = document.querySelector("#LocationName");
let experienceinput = document.querySelector("#Experience");
let div = document.querySelector("#newdivcontainer");
let btninput = document.querySelector("#submitbutton");

let editDiv = null; 
btninput.addEventListener("click", postnewjob);

function postnewjob(e){
    e.preventDefault();

    let postname = jobnameinput.value;
    let compname = companynameinput.value;
    let locname = locationinput.value;
    let expname = experienceinput.value;

    if(editDiv === null){
        let mydiv = document.createElement('div');
        mydiv.style.border = "1px solid black";
        mydiv.style.margin = "10px";
        mydiv.style.padding = "10px";

        mydiv.innerHTML = `
            <h2>Job Title: ${postname}</h2>
            <h2>Company Name: ${compname}</h2>
            <h2>Location: ${locname}</h2>
            <h2>Experience: ${expname}</h2>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        `;

        div.appendChild(mydiv);

        mydiv.querySelector(".delete").addEventListener("click", function(){
            mydiv.remove();
        });

        mydiv.querySelector(".update").addEventListener("click", function(){
            jobnameinput.value = postname;
            companynameinput.value = compname;
            locationinput.value = locname;
            experienceinput.value = expname;

            editDiv = mydiv;
        });

    } else {
        editDiv.innerHTML = `
            <h2>Job Title: ${postname}</h2>
            <h2>Company Name: ${compname}</h2>
            <h2>Location: ${locname}</h2>
            <h2>Experience: ${expname}</h2>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        `;

        editDiv.querySelector(".delete").addEventListener("click", function(){
            editDiv.remove();
        });

        editDiv.querySelector(".update").addEventListener("click", function(){
            jobnameinput.value = postname;
            companynameinput.value = compname;
            locationinput.value = locname;
            experienceinput.value = expname;
        });

        editDiv = null;
    }

    jobnameinput.value = "";
    companynameinput.value = "";
    locationinput.value = "";
    experienceinput.value = "";
}
function searchJob(){
    let searchText = document.querySelector("#searchInput").value.toLowerCase();
    let allJobs = div.children;

    for(let job of allJobs){
        let title = job.querySelector("h2").innerText.toLowerCase();

        if(title.includes(searchText)){
            job.style.display = "block";
        } else {
            job.style.display = "none";
        }
    }
}