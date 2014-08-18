// back to top
window.onscroll = function(){
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    var div_up = document.getElementById("uptop");
    t > 300 ? div_up.style.display="block" : div_up.style.display="none";
}

function scroTop(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
