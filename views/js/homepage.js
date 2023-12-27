function rain(){
    let amount=200;
    let body=document.querySelector('body');
    let i=0;
    while (i<amount){
        let drop=document.createElement('i');
        let size=Math.random()*3;
        let posX=Math.floor(Math.random()*(window.innerWidth-40))
        let delay=Math.random()*-10;
        let duration=Math.random()*20;
        drop.style.width=2+size+'px';
        drop.style.left=20+posX+'px';
        drop.style.animationDelay=delay+'s';
        drop.style.animationDuration=4+duration+'s';
        body.appendChild(drop);
        i++;
    }
}
rain();
function showLoginForm(){
    document.getElementById("loginForm").style.display = "flex";
}
function hideLoginForm(){
    document.getElementById("loginForm").style.display = "none";
}
