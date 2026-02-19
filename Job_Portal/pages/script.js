let jobnameinput = document.querySelector("#Jobname");
let companynameinput = document.querySelector("#CompanyName");
let locationinput = document.querySelector("#LocationName");
let experienceinput = document.querySelector("#Experience");
let div = document.querySelector("#newdivcontainer")
let btninput = document.querySelector("#submitbutton");

btninput.addEventListener("click", postnewjob);

function postnewjob(e){
    e.preventDefault();

    let postname = jobnameinput.value;
    let compname = companynameinput.value;
    let locname = locationinput.value;
    let expname = experienceinput.value;
    let mydiv = document.createElement('div');
    mydiv.innerHTML = `
        <h2>Job Title: ${postname}</h2>
        <h2>Company Name: ${compname}</h2>
        <h2>Location: ${locname}</h2>
        <h2>Experience: ${expname}</h2>
    `
    div.appendChild(mydiv);
}

