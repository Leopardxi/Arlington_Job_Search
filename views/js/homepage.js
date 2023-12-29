function rain(){
    let amount=50;
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
function showForm(id){
    id.style.display = "flex";
}
function hideForm(id){
    id.style.display = "none";
}
document.getElementById('uploadimage').addEventListener('click', function() {
    document.getElementById('fileinput').click();
});
document.getElementById('fileinput').addEventListener('change', function() {
    var fileName = this.files[0].name;
    document.getElementById('filename').textContent = 'File uploaded: ' + fileName;
});
document.getElementById('removeFile').addEventListener('click', function() {
    var fileInput = document.getElementById('fileinput');
    fileInput.value = '';
    document.getElementById('filename').textContent = '';
});