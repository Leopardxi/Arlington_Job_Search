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