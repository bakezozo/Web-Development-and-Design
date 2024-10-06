
let preuzmi = () => {
    //https://restapiexample.wrd.app.fit.ba/ -> Ispit20220924 -> GetPonuda
    let url = `https://restapiexample.wrd.app.fit.ba/Ispit20220924/GetPonuda?travelfirma=${firma.value}`
    console.log(url);

    fetch(url)
        .then(r => {
            if (r.status !== 200) {
                alert("neka greska: " + r.status);
                return;
            }

            r.json().then(t => {

                destinacije.innerHTML = '';
                t.podaci.forEach(x => {
                    destinacije.innerHTML += `
                    <article class="offer" onclick='odabraniArticle(this)'>
                    <div class="akcija">${x.akcijaPoruka}</div>
                    <div  class="offer-image" style="background-image: url('${x.imageUrl}');" ></div>
                    <div class="offer-details">
                        <div class="offer-destination">${x.mjestoDrzava}</div>
                        <div class="offer-price">$${x.cijenaDolar}</div>
                        <div class="offer-description">${x.opisPonude}</div>
                        <div class="offer-firma">${x.travelFirma.naziv}</div>
                        <select id='nekiCombobox' class="offer-option">
                           ${generisiOpcije(x.opcije)}
                        </select>
                    </div>
                    <div class="offer-footer">
                        <div class="ponuda-dugme-1" onclick="dugme1(this)">Odaberi za destinaciju 1</div>
                        <div class="ponuda-dugme-2" onclick="dugme2(this)">Odaberi za destinaciju 2</div>
                    </div>
                </article>   
                    `;
                })
               
            })
        })
        .catch(e => {
            alert("greska u komunikaciji sa server: " + e);
        })
}

function dugme1(n)
{
    let d = n.parentElement.parentElement.querySelector(".offer-destination").innerHTML;
    let s = n.parentElement.parentElement.querySelector("select").value;
    let c = n.parentElement.parentElement.querySelector(".offer-price").innerText.substring(1);

    document.getElementById("destinacija-1").value = d+ ", "+ s 
    document.getElementById("cijena-1").value = c; 
    document.getElementById("cijena-ukupno").value = Number(document.getElementById("cijena-2").value) + Number(c);
}

function dugme2(n)
{
    let d = n.parentElement.parentElement.querySelector(".offer-destination").innerHTML;
    let s = n.parentElement.parentElement.querySelector("select").value;
    let c = n.parentElement.parentElement.querySelector(".offer-price").innerText.substring(1);

    document.getElementById("destinacija-2").value = d+ ", "+ s 
    document.getElementById("cijena-2").value = c; 
    document.getElementById("cijena-ukupno").value = Number(document.getElementById("cijena-1").value) + Number(c);
}

function generisiOpcije(x)
{
    let r="";

    for (const opcija of x) {
        r+= `<option>${opcija}</option>`
    }

    return r;
}

function odabraniArticle(x)
{
    document.querySelectorAll("article").forEach(a=>{
        a.style.border="none";
    })
    //x.style.border="5px solid yellow";
}


let ErrorBackgroundColor = "#FE7D7D";
let OkBackgroundColor = "#DFF6D8";

let posalji = () => {
    //https://restapiexample.wrd.app.fit.ba/ -> Ispit20220924 -> Add

    let poruke=""
    let ime = document.getElementById("first-name")
    let prezime = document.getElementById("last-name")

    if (!ime.value.length)
    {
        poruke += "<div>unesite ime</div>";
    }
  
    if (!prezime.value.length)
    {
        poruke += "<div>unesite prezime</div>";
    }

    poruke += test_email();
    poruke += test_phone();

    mjestoPoruke.innerHTML =poruke
    if (!poruke.length)
    {
        alert("podaci su uredu")
        //todo: poslati podatke na server
    }
    else{
        return;
    }

    let d1=document.getElementById("destinacija-1").value;
    let d2=document.getElementById("destinacija-2").value;

    console.log("prezime: " + prezime.value);
    console.log("ime: " + ime.value);
    console.log("email: " + email.value);
    console.log("phone: " + phone.value);
/*
    let s =`{
        "destinacija1Soba": "${d1}",
        "destinacija2Soba": "${d2}",
        "imeGosta": "${ime.value}",
        "prezimeGosta": "${prezime.value}",
        "poruka": "${messagetxt.value}",
        "email": "${email.value}",
        "telefon": "${phone.value}"
      }`*/
      let s = JSON.stringify({
        destinacija1Soba: d1,
        destinacija2Soba: d2,
        imeGosta: ime.value,
        prezimeGosta: prezime.value,
        poruka: messagetxt.value,
        email: email.value,
        telefon: phone.value
      });

      let url ="https://restapiexample.wrd.app.fit.ba/Ispit20220924/Add"

      fetch(url,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: s,
      })
      .then(r=>{
        if (r.status !== 200) {
            alert("neka greska: " + r.status);
            return;
        }
        r.json().then(t => {
            alert("Podaci su ispravni... broj rezervacije je " + t.brojRezervacije)
        });

      })

      console.log(s);

}

function test_email()
{
    if (!/^[\w\.-]+[\w\.-]+@edu\.fit\.ba$/.test(email.value))
    {
        email.style.backgroundColor = ErrorBackgroundColor;
        return "<div>unesite email</div>";
    }
    else{
        email.style.backgroundColor = OkBackgroundColor;
        return "";
    }
}

function test_phone()
{
    //let phone = document.getElementById("phone");//ovo mozemo izostaviti jer u nazivu varijable nema zabranjenih karatkera za varijable
    if (! /^\+\d{3}-\d{2}-\d{3}-\d{3}$/.test(phone.value))
    {
        phone.style.backgroundColor = ErrorBackgroundColor;
        return "<div>unesite phone</div>";
    }
    else{
        phone.style.backgroundColor = OkBackgroundColor;
        return "";
    }
}