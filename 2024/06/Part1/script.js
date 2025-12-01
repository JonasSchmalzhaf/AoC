var map;

function walkToObject(guardPosition, dir) {
    try {
        while(map[guardPosition[1] + dir[1]][guardPosition[0] + dir[0]] != "#") {
            guardPosition[1] += dir[1];
            guardPosition[0] += dir[0];

            map[guardPosition[1]] = map[guardPosition[1]].substring(0, guardPosition[0])+"X"+map[guardPosition[1]].substring(guardPosition[0] + 1, map[guardPosition[1]].length);
        }

        return guardPosition;
    } catch (error) {
        console.log("Guard leaves map");

        return [-1, -1];
    }
}

function turnRight(guardDirection) {
    switch (JSON.stringify(guardDirection)) {
        case JSON.stringify([0, -1]):
            return guardDirection = [1, 0];
        case JSON.stringify([1, 0]):
            return guardDirection = [0, 1];
        case JSON.stringify([-1, 0]):
            return guardDirection = [0, -1];
        case JSON.stringify([0, 1]):
            return guardDirection = [-1, 0];
    }
}

document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let result = 0;

            inputString = fr.result;

            let guardPosition = [0, 0];
            let guardDirection = 0;
            map = inputString.split("\n");
            
            // Get Start Position
            map.forEach((row, Y) => {
                row.split('').forEach((element, X) => {
                    switch (element) {
                        case "^":
                            guardPosition = [X, Y];
                            guardDirection = [0, -1];
                            break;
                        case ">":
                            guardPosition = [X, Y];
                            guardDirection = [1, 0];
                            break;
                        case "<":
                            guardPosition = [X, Y];
                            guardDirection = [-1, 0];
                            break;
                        case "v":
                            guardPosition = [X, Y];
                            guardDirection = [1, 0];
                            break;
                    }
                });
                
            });

            while (JSON.stringify(guardPosition) != JSON.stringify([-1 , -1])) {
                guardPosition = walkToObject(guardPosition, guardDirection);
                guardDirection = turnRight(guardDirection);
            }

            map.forEach(row => document.getElementById("output").innerHTML += row + "\n");

            map.forEach(row => {
                row.split('').forEach(character => character == 'X' ? result += 1 : result);
            })

            console.log(result);
        }

        fr.readAsText(this.files[0]);
    })