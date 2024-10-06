function odaberiVilu(vilaImg)
{
    //alert("Cijena je " + cijena)
    //alert("Vila broje je " + vilaBroj)
    /*for (let index = 0; index < 3 ; index++) {
        document.getElementById("vila-"+(index+1)).style.border="5px solid white"
    }*/
    document.querySelectorAll(".VilaKolonaOkvir").forEach(f=>{
        f.style.border="3px solid white"
    })
    vilaImg.style.border="3px solid yellow"
    document.getElementById("CijenaPoDanu").value = parseInt(vilaImg.parentElement.querySelector("h4").innerHTML)
    document.getElementById("Slika").value = vilaImg.parentElement.querySelector("h3").innerHTML
}
function racunaj_cijenu()
{
    let cijenaPoDanu = Number(document.getElementById("CijenaPoDanu").value);
    let brojDana = Number(document.getElementById("BrojDana").value);

    document.getElementById("IznosUkupno").value = cijenaPoDanu * brojDana
}