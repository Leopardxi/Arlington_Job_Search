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