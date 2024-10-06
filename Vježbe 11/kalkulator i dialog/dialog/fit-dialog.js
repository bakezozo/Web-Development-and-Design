function Ok()
{
    document.getElementById("my-dialog-wrapper").style.display = "none" 
    console.log("dialog: ovo je ok") ;

}
function Cancel()
{
    document.getElementById("my-dialog-wrapper").style.display = "none"
    console.log("dialog: ovo je cancel") ;
}

var fGlobal;
function dialogSuccess(p, f)
{
    fGlobal = f;
    document.getElementById("temp-div").innerHTML += `  <div id="my-dialog-wrapper">
    <div class="my-dialog">
        <div class="my-dialog-header">
            <div class="header-icon">
                <img src="dialog/success.png">
                <span>Success</span>
            </div>
        </div>
        <div id="my-dialog-body">
            ${p}
        </div>
        <div class="my-dialog-footer">
            <div class="dugme dugmeOk" onclick="fGlobal();Ok()">
                MAJMUNEEE EEEEEEEE EEEEEEE EEEEEE
            </div>
            <div class="dugme dugmeCancel" onclick="Cancel()">
                Nemoj Boga ti tvoga
            </div>
        </div>
    </div>
</div>`


document.querySelector("style").innerHTML += ` #my-dialog-wrapper{
    background-color: rgba(0, 0, 0, 20%);
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
    display: none;;
}
.my-dialog{
    background-color: white;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    box-shadow: 4px 10px 26px 0px rgba(0,0,0,0.75);
}

.my-dialog-header{
    background-color: rgb(140,194,73);
    color: white;
    text-align: center;
    padding: 30px;
}
.my-dialog-header span{
    display: block;
}
#my-dialog-body{
    padding: 20px;
    text-align: center;
}

.dugme{
    background-color: rgb(140,194,73);
    color: white;
    width: 50%;
    text-align:center;
    padding: 10px 30px;
    border-radius: 20px;
    margin: 5px;
    cursor: pointer;
}

.my-dialog-footer{
    padding: 10px;
    display:flex;
}`

   // document.getElementById("my-dialog-body").innerHTML = p;
    document.getElementById("my-dialog-wrapper").style.display = "block"
}