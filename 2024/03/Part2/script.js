document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let result = 0;

            const inputString = fr.result;

            const regexPatternFirstDo = /(.*?)don't\(\)/;
            const firstDoString = regexPatternFirstDo.exec(inputString)[0];

            const regexPatternLastDo = /don't(?!.*don't)(.*)/;
            const lastDoString = /do\(\)(.*)/.exec(regexPatternLastDo.exec(inputString)[1])[1];

            const regexPatternDo = /do\(\)(.*?)don't\(\)/gs;
            const regexPatternMul = /mul\((\d{1,3})\,(\d{1,3})\)/gs;

            console.log(firstDoString);

            let mulF;

            while((mulF = regexPatternMul.exec(firstDoString)) !== null) {
                result += mulF[1] * mulF[2];

                console.log(mulF[1] + " * " + mulF[2] + " = " + (mulF[1] * mulF[2]) + "; Result = " + result);
            }

            let foundDo;

            while((foundDo = regexPatternDo.exec(inputString)) !== null) {
                console.log(foundDo[0]);

                let mul;

                while((mul = regexPatternMul.exec(foundDo[0])) !== null) {
                    result += mul[1] * mul[2];

                    console.log(mul[1] + " * " + mul[2] + " = " + (mul[1] * mul[2]) + "; Result = " + result);
                }
            }

            console.log(lastDoString);

            let mulL;

            while((mulL = regexPatternMul.exec(lastDoString)) !== null) {
                result += mulL[1] * mulL[2];

                console.log(mulL[1] + " * " + mulL[2] + " = " + (mulL[1] * mulL[2]) + "; Result = " + result);
            }

            console.log(result);
        }

        fr.readAsText(this.files[0]);
    })