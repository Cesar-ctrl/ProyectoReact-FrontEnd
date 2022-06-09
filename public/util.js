    
document.addEventListener("load",function() {
    var container = document.getElementById("containermain")
    if(container.className == "container backunder"){
        var fotos = document.querySelectorAll(".fotoestandar")

        fotos.forEach(element => {
            console.log(element)
        });

    }
})
    