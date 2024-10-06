
let preuzmi = () => {
    //https://restapiexample.wrd.app.fit.ba/ -> Ispit20230624 -> GetPonuda

    let url = `https://restapiexample.wrd.app.fit.ba/Ispit20230624/GetPonuda?travelfirma=${firma.value}`
    destinacije.innerHTML = '';//brisemo destinacije koje su hardkodirane (tj. nalaze se u HTML-u)
    fetch(url)
        .then(r => {
            if (r.status !== 200) {
                //greska
                return;
            }
            r.json().then(t => {

                let b = 0;
                for (const x of t.podaci) {
                    b++;
                    destinacije.innerHTML += `
                    <article class="offer">
                        <div class="akcija">${x.akcijaPoruka}</div>
                        <div  class="offer-image" style="background-image: url('${x.imageUrl}');" ></div>
                        <div class="offer-details">
                            <div class="offer-destination">${x.mjestoDrzava}</div>                                        
                        </div>

                        <div class="offer-footer">
                            <div class="offer-price">$${x.cijenaDolar}</div>
                            <div class="offer-description">${x.opisPonude}</div>
                        
                            <select id="s${b}" class="offer-option">
                            ${generisiOpcije(x)}
                                </select>          
                            <div onclick= "UnesiUPolja('${x.mjestoDrzava}',${x.cijenaDolar},${b})" class="ponuda-dugme" >Odaberi</div>
                        </div>
                    </article>
                `
                }
            })
        })
}

function UnesiUPolja(destination,price,brojac){
    let DestinationInput = document.getElementById("destinacija");
    let RoomInput = document.getElementById("soba");
    let PricePerPersonInput = document.getElementById("cijenaPoGostu");
    let OdabranaOpcija = document.getElementById("s"+brojac);

    DestinationInput.value = destination;
    PricePerPersonInput.value = price;
    RoomInput.value = OdabranaOpcija.value;
}
let generisiOpcije = (x) =>{
    let s = "";
    for (const o of x.sobe) {
        s += `<option>${o.oznakaSobe}+$${o.cijenaDoplate}</option>`
    }
    return s;
}

let ErrorBackgroundColor = "#FE7D7D";
let OkBackgroundColor = "#DFF6D8";

let posalji = () => {
    //https://restapiexample.wrd.app.fit.ba/ -> Ispit20230624 -> Add

    // {
    //     "travelFirma": "string",
    //     "destinacijaDrzava": "string",
    //     "brojIndeksa": "string",
    //     "gosti": [
    //       "string"
    //     ],
    //     "poruka": "string",
    //     "telefon": "string",
    //     "oznakaSoba": "string"
    // }

    let brojgostiju = document.getElementById("brojGostiju").value;

    let Firma = document.getElementById("firma").value;
    let Destination = document.getElementById("destinacija").value;
    let IndexBr = document.getElementById("brojIndeksa").value;

    let broj = 0;

    let GostiNiz = [];
    for(let i=0; i< brojgostiju; i++){
        let GostiClan = document.getElementById("gost"+broj).value;
        GostiNiz.push(GostiClan);
    }

    let MessageInput = document.getElementById("messagetxt").value;
    let PhoneInput = document.getElementById("phone").value;
    let RoomInput = document.getElementById("soba").value;

    let jsObjekat =  {
        travelFirma: Firma,
        destinacijaDrzava: Destination,
        brojIndeksa: IndexBr,
        gosti: GostiNiz,
        poruka: MessageInput,
        telefon: PhoneInput,
        oznakaSoba: RoomInput,
    };

    let jsonString = JSON.stringify(jsObjekat);

    let url = "https://restapiexample.wrd.app.fit.ba/Ispit20230624/Add";

    //fetch tipa "POST" i saljemo "jsonString"
    fetch(url, {
        method: "POST",
        body: jsonString,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(r => {
            if (r.status != 200) {
                alert("Greška")
                return;
            }

            r.json().then(t => {
                alert("Uspješna rezervacija. Broj rezervacije je: ....")

            })

        })
}

let popuniFimeUCombox = () => {
    let urlFirme = "https://restapiexample.wrd.app.fit.ba/Ispit20230624/GetTravelFirme";

    fetch(urlFirme)
        .then(obj => {
            if (obj.status != 200) {
                window.alert("Greska pri komunikaciji sa serverom!");
                return;
            }
            obj.json().then(element => {
                element.forEach(e => {
                    firma.innerHTML += `<option>${e.naziv}</option>`;
                });

                preuzmi();
            })
        })
        .catch(error => {
            window.alert("Greska!" + error);
        })
}
popuniFimeUCombox();


let promjenaBrojaGostiju = () => {
    let GuestNum = document.getElementById("brojGostiju").value;
    let PricePerPerson = document.getElementById("cijenaPoGostu").value;
    let TotalPrice= document.getElementById("ukupnaCijena");
    TotalPrice.value = Number(PricePerPerson) * Number(GuestNum);
    let GostiDiv = document.getElementById("gosti");
    GostiDiv.innerHTML = "";
    let brojac = 0;
    for(var i=0; i<GuestNum; i++){
        brojac++;
    GostiDiv.innerHTML += `
     <label>Ime gosta: ${brojac} </label>
     <input id="gost${brojac}"></input>
    `
    }
        console.log("Novi broj gostiju je " + brojGostiju.value)
}


let RegexTestTelefon =()=> {
    let TelefonInput = document.getElementById("phone");
    let RegexMetoda = /^[+][0-9]{3}[-][0-9]{2}[-][0-9]{3}[-][0-9]{3}$/
    if (RegexMetoda.test(TelefonInput.value)) {
        TelefonInput.style.backgroundColor = OkBackgroundColor;
    }
    else {
        TelefonInput.style.backgroundColor = ErrorBackgroundColor;
    }
}

function RegexBrojIndexa (){
    let IndexInput = document.getElementById("brojIndeksa");
    let RegexMetodaIndexa = /^IB[0-9]{6}$/
    if(RegexMetodaIndexa.test(IndexInput.value)){
        IndexInput.style.backgroundColor = OkBackgroundColor;
    }
    else{
        IndexInput.style.backgroundColor = ErrorBackgroundColor;
    }
} 

