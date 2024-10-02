function openTab(spamVersion){
    console.log("ff");
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(spamVersion).style.display = "block";
}


document.getElementById('spamv1').addEventListener('click', () => {
    openTab('v1');
});

document.getElementById('spamv2').addEventListener('click', ()=>{
    openTab('v2');
});
