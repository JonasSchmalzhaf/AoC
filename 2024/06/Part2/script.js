document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            inputString = fr.result;

            const loopPositions = findLoopPositions(inputString);
            console.log(`Gefundene Positionen für Endlosschleifen: ${loopPositions.size}`);
            
            const prod = true;
            
            const showPosition = (input, position) => {
                const matrix = input.trim().split('\n').map(line => line.trim().split(''));
                const [y, x] = position.split(',').map(Number);
                matrix[y][x] = 'O';
                return matrix.map(row => row.join('')).join('\n');
            }
            
            if (prod) {
                    for (const pos of loopPositions) {
                    console.log(`\nPosition ${pos}:`);
                    console.log(showPosition(inputString, pos));
                }
            }
        }

        fr.readAsText(this.files[0]);
    })


    const DIRECTIONS = [
        //x,y
        [0, -1],  // top
        [1, 0],  // right
        [0, 1],  // bottom
        [-1, 0]   // left
    ];
    
    const findLoopPositions = (input) => {
        const matrix = input.trim().split('\n').map(line => line.trim().split(''));
        const nY = matrix.length;
        const nX = matrix[0].length;
        const loopPositions = new Set();
    
        const startPos = findGuardStart(matrix);
        if (!startPos) return new Set();
    
        for (let y = 0; y < nY; y++) {
            for (let x = 0; x < nX; x++) {
                if (matrix[y][x] === '#' || (y === startPos.y && x === startPos.x)) {
                    continue;
                }
    
                const tmpMatrix = matrix.map(row => [...row]);
                tmpMatrix[y][x] = '#';
    
                // Prüfe, ob diese Position eine Schleife erzeugt
                if (doesCreateLoop(tmpMatrix, startPos)) {
                    loopPositions.add(`${y},${x}`);
                }
            }
        }
    
        return loopPositions;
    }
    
    function doesCreateLoop(matrix, startPos) {
        const nY = matrix.length;
        const nX = matrix[0].length;
        const visited = new Map();
        let currentPos = { ...startPos };
        let currentDir = 0;
    
        while (true) {
            const stateKey = `${currentPos.y}|${currentPos.x}|${currentDir}`;
    
            if (visited.has(stateKey)) {
                return true;
            }
    
            visited.set(stateKey, true);
    
            const nextX = currentPos.x + DIRECTIONS[currentDir][0];
            const nextY = currentPos.y + DIRECTIONS[currentDir][1];
    
            if (nextY < 0 || nextY >= nY || nextX < 0 || nextX >= nX) {
                return false;
            }
    
            if (matrix[nextY][nextX] === '#') {
                currentDir = (currentDir + 1) % 4;
            } else {
                currentPos.y = nextY;
                currentPos.x = nextX;
            }
        }
    }
    
    function findGuardStart(matrix) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                if (matrix[y][x] === '^') {
                    return { y, x };
                }
            }
        }
        return null;
    }
    
    