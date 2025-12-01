function checkIndex(index, length) {
    if(index <= 0) {
        return 0;
    } else if (index >= length - 1) {
        return length - 1;
    } else {
        return index;
    }
}

function getAllCharacters(inputRows, indexRow, indexColum) {
    let characters = [];

    indexRow = checkIndex(indexRow, inputRows.length);
    indexColum = checkIndex(indexColum, inputRows[indexRow].length);

    characters.push(inputRows[checkIndex(indexRow - 1, inputRows.length)][checkIndex(indexColum - 1, inputRows[indexRow].length)]);
    characters.push(inputRows[checkIndex(indexRow - 1, inputRows.length)][checkIndex(indexColum, inputRows[indexRow].length)]);
    characters.push(inputRows[checkIndex(indexRow - 1, inputRows.length)][checkIndex(indexColum + 1, inputRows[indexRow].length)]);
    characters.push(inputRows[checkIndex(indexRow, inputRows.length)][checkIndex(indexColum + 1, inputRows[indexRow].length)]);
    characters.push(inputRows[checkIndex(indexRow + 1, inputRows.length)][checkIndex(indexColum + 1, inputRows[indexRow].length)]);
    characters.push(inputRows[checkIndex(indexRow + 1, inputRows.length)][checkIndex(indexColum, inputRows[indexRow].length)]);
    characters.push(inputRows[checkIndex(indexRow + 1, inputRows.length)][checkIndex(indexColum - 1, inputRows[indexRow].length)]);
    characters.push(inputRows[checkIndex(indexRow, inputRows.length)][checkIndex(indexColum - 1, inputRows[indexRow].length)]);
    return characters;
}

function isXMAS(positionY, positionX, inputRows) {
    let LT = inputRows[positionY + 1][positionX - 1];
    let RT = inputRows[positionY + 1][positionX + 1];
    let LB = inputRows[positionY - 1][positionX - 1];
    let RB = inputRows[positionY - 1][positionX + 1];

    if(((LT == "M" && RB == "S") && (RT == "M" && LB == "S")) 
        || ((LT == "M" && RB == "S") && (RT == "S" && LB == "M")) 
        || ((LT == "S" && RB == "M") && (RT == "M" && LB == "S"))
        || ((LT == "S" && RB == "M") && (RT == "S" && LB == "M"))) 
    {
        console.log(
            LT + " " + RT + "\n" +
            " " + "A" + " \n" +
            LB + " " + RB
        );
        return true;
    }
}

document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let result = 0;

            inputString = fr.result;

            inputRows = inputString.split("\n");

            for(rowIndex = 1; rowIndex < inputRows.length - 1; rowIndex++) {
                for(columIndex = 1; columIndex < inputRows[rowIndex].length - 1; columIndex++) {
                    if (inputRows[rowIndex][columIndex] == "A") {
                        if(isXMAS(rowIndex, columIndex, inputRows)) {
                            result += 1;
                        }
                    }
                }
            }

            console.log(result);
        }

        fr.readAsText(this.files[0]);
    })