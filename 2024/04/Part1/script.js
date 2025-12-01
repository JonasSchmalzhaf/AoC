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

function validateXMAS(positionY, positionX, direction, inputRows) {
    console.log({positionX: positionX, positionY: positionY, direction: direction, inputRows: inputRows});

    let xmas = [];
    xmas.push(inputRows[positionY][positionX]);

    try{
        for(i = 0; i < 3; i++) {
            switch(direction) {
                case 0:
                    positionY--;
                    positionX--;
                    xmas.push(inputRows[positionY][positionX]);
                    break;
                case 1:
                    positionY--;
                    positionX;
                    xmas.push(inputRows[positionY][positionX]);
                    break;
                case 2:
                    positionY--;
                    positionX++;
                    xmas.push(inputRows[positionY][positionX]);
                    break;
                case 3:
                    positionY;
                    positionX++;
                    xmas.push(inputRows[positionY][positionX]);
                    break;
                case 4:
                    positionY++;
                    positionX++;
                    xmas.push(inputRows[positionY][positionX]);
                    break;
                case 5:
                    positionY++;
                    positionX;
                    xmas.push(inputRows[positionY][positionX]);
                    break;
                case 6:
                    positionY++;
                    positionX--;
                    xmas.push(inputRows[positionY][positionX]);
                    break;
                case 7:
                    positionY;
                    positionX--;
                    xmas.push(inputRows[positionY][positionX]);
                    break;
                default:
                    xmas = [];
                    break;
            }
        }
    } catch (error) {
        xmas = [];
    }
    

    return xmas;
}

document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let result = 0;

            inputString = fr.result;

            inputRows = inputString.split("\n");

            inputMatrix = inputRows.forEach((row, indexRow) => {
                for(let i = 0; i < row.length; i++) {
                    if(row[i] == "X") {
                        //* 0 1 2
                        //* 7 X 3
                        //* 6 5 4
                        let charactersAround = getAllCharacters(inputRows, indexRow, i);
                        charactersAround.forEach((character, direction) => {
                            if(character == "M") {
                                let validXMAS = validateXMAS(indexRow, i, direction, inputRows)
                                console.log(validXMAS);
                                if (JSON.stringify(validXMAS) == JSON.stringify(["X", "M", "A", "S"])) {
                                    result += 1;
                                }
                            }
                        });
                    }
                }
            });

            console.log(result);
        }

        fr.readAsText(this.files[0]);
    })