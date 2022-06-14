let b = document.body;
let cellule = document.createElement("div");
let iptdrag = document.querySelector("#taille");
let iptspeed = document.querySelector("#vitesse");
let start = document.querySelector("#start");
let newp = document.querySelector("#p");
let stop = document.querySelector("#stop");
let reset = document.querySelector("#reset");


let timer2;
let arr = [];
let nbLignes = 45;
let nbCol = 100;
let blanc = 0;
let noir = 1;
let tps = 0;
let delay = 500;
let allSpeeds = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 50];
newp.innerHTML = tps;




for (let i = 0; i < nbLignes; i++) {
    let newArr = [];    
    for (let x = 0; x < nbCol; x++) {
        newArr.push(blanc);
    }
    arr.push(newArr);
}

function draw() {
    let tab = document.createElement("table");
    let tBody = document.createElement("tBody");


    // creation du tableau 

    for (let i = 0; i < nbLignes; i++) {


        let row = document.createElement("tr");


        for (let j = 0; j < nbCol; j++) {
            let cell = document.createElement("td");





            cell.addEventListener("click", e => {


                // changement de couleur au click sur les cases 

                if (cell.className != 'click') {
                    cell.className = 'click';
                    arr[i][j] = noir;
                } else {
                    cell.className = "";
                    arr[i][j] = blanc;
                }
            });
            row.appendChild(cell);
        }

        tBody.appendChild(row);
    }




    tab.appendChild(tBody);
    b.append(tab);
}

start.addEventListener("click", e => {

    timer2 = setInterval(function () {


        tps++;
        newp.innerHTML = tps;

        let arrTemp = [];
        // Calcule le nombre de voisines sélectionnées
        for (let i = 0; i < nbLignes; i++) {
            let lineTemp = [];
            for (let j = 0; j < nbCol; j++) {
                let numNeighboursForDeath = 0;
                let numNeighboursForBorn = 0;
                for (let k = i - 1; k <= i + 1; k++) {
                    for (let l = j - 1; l <= j + 1; l++) {
                        if (k !== -1 && k !== nbLignes && l !== -1 && l !== nbCol) {
                            if (arr[i][j] === noir) {

                                if (k === i && l === j || arr[k][l] !== noir) {
                                    continue;
                                } else {
                                    numNeighboursForDeath++;
                                }
                            } else if (arr[i][j] === blanc) {
                                if (k === i && l === j || arr[k][l] !== noir) {
                                    continue;
                                } else {
                                    numNeighboursForBorn++;
                                }

                            }
                        }

                    }
                }

                let changed = false;
                // Colore les cases en blanc ou noir 
                if (arr[i][j] === noir && (numNeighboursForDeath < 2 || numNeighboursForDeath > 3)) {
                    document.querySelector("tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")").classList.remove("click");
                    lineTemp.push(blanc);
                    changed = true;
                }
                if (arr[i][j] === blanc && numNeighboursForBorn === 3) {
                    document.querySelector("tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")").className = "click";
                    lineTemp.push(noir);
                    changed = true;
                }
                if (!changed) {
                    lineTemp.push(arr[i][j]);
                }

            }
            
            arrTemp.push(lineTemp);
        }
        arr = arrTemp.slice();
    }, delay);

});

stop.addEventListener("click", e => {
    clearInterval(timer2);
    timer2 = undefined;
});


//  Permet de réinitialiser le timer en cliquant sur le bouton reset

reset.addEventListener("click", e => {
    let tdsClick = document.querySelectorAll(".click");
    arr = [];
    tps = 0;
    iptspeed.value = 5;
    clearInterval(timer2);
    newp.innerHTML = tps;

    for (let i=0 ; i<tdsClick.length; i++){
        tdsClick[i].classList.remove("click");
    }
    for (let i = 0; i < nbLignes; i++) {
        let newArr = [];
        arr.push(newArr);
        for (let x = 0; x < nbCol; x++) {
            newArr.push(blanc);
        }    
    }
});


iptspeed.addEventListener("change", () => {
    delay = allSpeeds[parseInt(iptspeed.value)];
    if (timer2) {
        clearInterval(timer2);        
        start.click();    
    }
});



draw();


