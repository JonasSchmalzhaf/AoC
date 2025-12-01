document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let result = 0;

            inputString = fr.result;

            const regexPattern = /mul\((\d{1,3})\,(\d{1,3})\)/g;
            let mul;

            while((mul = regexPattern.exec(inputString)) !== null) {
                result += mul[1] * mul[2];

                console.log(mul[1] + " * " + mul[2] + " = " + (mul[1] * mul[2]) + "; Result = " + result);
            }

            console.log(result);
        }

        fr.readAsText(this.files[0]);
    })