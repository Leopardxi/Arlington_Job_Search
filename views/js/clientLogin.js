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