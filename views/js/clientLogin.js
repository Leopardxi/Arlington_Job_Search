// Sends a request to the server to create an account
async function createAccount() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': document.getElementById('email').value,
            'password': document.getElementById('password').value,
            'jwtToken': jwtToken
        })
    }
    const fetchData = await fetch('/api/createAccount', options);
    var resp = await fetchData.text();

    if (fetchData.status != 200 && fetchData.status != 201) return alert(resp);

    window.location.href = '/dashboard';
}
/*
fetch('/submit',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'email': document.getElementById('email').value, //needs to be by name not id
        'name': document.getElementById('name').value,
        'jwtToken': jwtToken
    })

})
*/
/*
async function adminAccount() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': document.getElementById('emailform').value,
            'name': document.getElementById('nameform').value,
            'jwtToken': jwtToken
        })
    }
    const fetchData = await fetch('/api/sendEmailToAdminForNewAccount', options);
    var resp = await fetchData.text();

    if (fetchData.status != 200 && fetchData.status != 201) return alert(resp);

    window.location.href = '/dashboard';
}
*/
// Sends a request to the server to verify the email
async function verifyEmail (){
    const options = {
        "method": "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": document.getElementById("email").value
        })
    }
    const postReq = await fetch("/api/sendVerificationEmail", options);
    const data = await postReq.text();
    alert(data);
}
// Sends a request to the server to login to the account
async function loginAccount() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': document.getElementById('email').value,
            'password': document.getElementById('password').value
        })
    }
    const fetchData = await fetch('/api/loginAccount', options);
    var resp = await fetchData.text();

    if (fetchData.status != 200 && fetchData.status != 201) return alert(resp);

    window.location.href = '/dashboard';
}
// Sends a request to the server to send an email to approve it
async function sendEmailForApproval(){
    
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': document.querySelector('#signupForm #buisnessEmail').value,
           'name': document.querySelector('#signupForm #buisnessName').value
        })
    }
    const fetchData = await fetch('/api/sendEmailToAdminForNewAccount', options);
    var resp = await fetchData.text();
    
    if (fetchData.status != 200 && fetchData.status != 201){
        return alert("There was an issue for requesting the service.")
    }
    alert(resp);
    //window.location.href = '/dashboard';
}

//we need to change getElementsById to getElementsByName I think since it's part of a form
// nah we can stil use getElemtntById
// sahre me the link for the port
//Let's just deal with name and email and we can worry about the rest later
//alr
///Oh, so we're able to send through options the data we want to send to the server
// yeah