function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    //console.log(userDatas);
    var alive = livingCharacters(userDatas);
    sortByName(alive);
    console.log(alive);
    createCharacters(alive);
    initSearch(alive);

    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function livingCharacters(characters) {
    var live = [];
    for (var i in characters) {
        if (characters[i].dead === "") { // if(!characters[i].dead)
            live.push(characters[i]);
        }
    }
    return live;
}


function sortByName(characters) {
    var i = characters.length - 1;
    var swap = false;
    do {
        swap = false;
        for (var j = 0; j < i; j++) {
            if (characters[j].name > characters[j + 1].name) {
                [characters[j], characters[j + 1]] = [characters[j + 1], characters[j]];
                //tmp = characters[j];
                //characters[j] = characters[j + 1];
                //characters[j + 1] = tmp;
                swap = true;
            }
        }
        i--;
    } while (i >= 0 && swap)
    return characters;

    /*
    for (let i = 0; i < 10; i++) { // ciklusváltozó = kezdőérték; feltétel; léptetés
        console.log(i);            // ciklusmag - ha a feltétel igaz, lefut
    }

    var i = 0; // ciklusváltozó = kezdőérték;
    while (i<10) { // feltétel;
        console.log(i); // ciklusmag - ha a feltétel igaz, lefut
        i++; //léptetés
    }
    */
}

function searchInCharacters(characters, searchString) {
    for (var i in characters) {
        if (characters[i].name.toLowerCase() === searchString.toLowerCase()) {
            return characters[i];
        }
    }
    return "Nincs találat!";
}

function createCharacters(characters) {
    var divCharacters = document.querySelector(".characters");

    for (var i = 0; i < characters.length; i++) {
        (function () {
            var character = characters[i];
            var divImg = document.createElement("div");
            var divText = document.createElement("div");
            var img = document.createElement("img");

            img.setAttribute("src", characters[i].portrait);
            img.setAttribute("alt", characters[i].name);

            divImg.appendChild(img);
            divText.innerHTML = characters[i].name;
            divImg.classList.add("character");
            divCharacters.appendChild(divImg).appendChild(divText);
            divImg.addEventListener("click", function () {
                showCharacterDetail(character);
            })
        })()
    }
}



function showCharacterDetail(character) {
    var characterImage = document.querySelector(".character-image");
    var name = document.querySelector(".name");
    var bio = document.querySelector(".bio");

    var img = document.createElement("img");
    var span = document.createElement("span");
    var houseImg = document.createElement("img");

    characterImage.innerHTML = "";
    name.innerHTML = "";

    houseImg.setAttribute("src", "/assets/houses/" + (character.house || character.organization) + ".png")
    houseImg.setAttribute("alt", character.house);
    img.setAttribute("src", character.picture);
    img.setAttribute("alt", character.name);
    span.innerHTML = character.name;
    bio.innerHTML = character.bio;

    characterImage.appendChild(img);
    name.appendChild(span);
    name.appendChild(houseImg);
}

function initSearch(characters) {
    var button = document.querySelector("button");
    button.addEventListener("click", function () {
        var input = document.querySelector("input").value;
        var character = searchInCharacters(characters, input);
        showCharacterDetail(character);
    })
}