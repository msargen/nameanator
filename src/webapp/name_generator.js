
function generateNames(numberOfNames) {

    if (!probabilitiesGenerated) {
        alert("No probabilities have been generated.");
        return;
    }

    var nameList = document.getElementById("nameList");
    var uniqueList = [];

    nameList.insertAdjacentHTML("afterbegin", "<hr>");

    // To prevent an infinite loop
    let maxTries = 10;
    let attempt = 0;

    for (let i = 0; i < numberOfNames; i++) {
        let genName;
        do {
            genName = generateSingleName();
            attempt++;
        } while (!checkNameValidity(genName) && attempt <= maxTries || uniqueList.includes(genName))
        uniqueList.push(genName);
            
        nameList.insertAdjacentHTML("afterbegin", "<li>" + genName + "</li>");
    }
}

// Check that the generated name is within the desired length parameters and that the name doesn't already exist in the
// given file of names
function checkNameValidity(generatedName){
    // Check min and max name length
    if (generatedName.length < minNameLength) {
        return false;
    }
    if (generatedName.length > maxNameLength) {
        return false;
    }
    
    // Check if the name already exists in the passed file
    let currentMap = existingNames;
    let letter;
    for (let x = 0; x < generatedName.length; x++) {
        letter = generatedName.charAt(x);
        if (currentMap.has(letter)) {
            currentMap = currentMap.get(letter);
        }
        else {
            return true;
        }
    }

    if (currentMap.has("end")) {
        // The generated name already exists in the base list
        return false;
    }

    return true;
}

function clearList() {
    var nameList = document.getElementById("nameList");
    nameList.innerHTML = "";
}

function generateSingleName() {

    var countingNumber = 0, arraySum = 0;
    var theName = new Array();

    //sum the starting letter array to use for next calculation
    for (var i=0; i<(alphaLength+1); i++) {
        arraySum += firstLetters[i];
    }

    //generate a random number and use the previous sum for mod to get a random number between 1 and the sum
    countingNumber = Math.floor(Math.random() * arraySum) + 1;

    //use mod result to count through the array of values to get letter result
    for (var i=0; countingNumber>firstLetters[i]; i++) {
        countingNumber -= firstLetters[i];
    }

    //convert i index to corresponding letter for first letter of name
    theName[0] = alphabetArray[i];

    //repeat the process of sum, random, and mod
    for (var j=0, arraySum=0; j<(alphaLength+1); j++) {
        arraySum += doubleLetters[i][j];
    }

    countingNumber = Math.floor(Math.random() * arraySum) + 1;

    //use mod result to count through the array of values using i as first index to get second letter result
    for (var j=0; countingNumber>doubleLetters[i][j]; j++) {
        countingNumber -= doubleLetters[i][j];
    }

    //convert j index to corresponding letter for second letter of name
    theName[1] = alphabetArray[j];

    //start a loop to generate letters based on the two previous letters
    var wordEnd=false
    for (var x=2; !wordEnd; x++) {
        //sum, random, and mod as before
        for (var k=0, arraySum=0; k<(alphaLength+1); k++) {
            arraySum += tripleLetters[i][j][k];
        }

        countingNumber = Math.floor(Math.random() * arraySum) + 1;

        //use mod result to count through the array of values using i and j as indices to get third letter result
        for (var k=0; countingNumber>tripleLetters[i][j][k]; k++) {
            countingNumber -= tripleLetters[i][j][k];
        }

        //convert k index to corresponding letter for next letter based on previous two, if terminating character, use " "
        if (k<(alphaLength)) {
            theName[x] = alphabetArray[k];
        } else {
            wordEnd = true;
        }

        //shift second and third letters to first and second to prep for next loop
        i=j;
        j=k;
    }

    // Turn array into string
    let name = theName.toString().replaceAll(',', '');

    return name;
}