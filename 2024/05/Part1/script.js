function isValidUpdate(page1, page2, rulesString) {
    let isValid = true;
    rulesString.split("\n").forEach(ruleString => {
        let rule = ruleString.split("|");
        if(rule[0] == page2 && rule[1] == page1) {
            isValid = false;
        }
    });

    // console.log("P1: " + page1 + "; P2: " + page2 + "; isValid: " + isValid);

    return isValid;
}

document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let result = 0;

            inputString = fr.result;

            let rulesString = inputString.split("\n\n")[0];
            let updatesString = inputString.split("\n\n")[1];

            let valid = true;

            updatesString.split("\n").forEach(update => {
                let pages = update.split(",");

                for(let index = 0; index < pages.length; index++) {
                    for(let i = index + 1; i < pages.length; i++) {
                        if(!isValidUpdate(pages[index], pages[i], rulesString)) {
                            valid = false;
                            break;
                        } else {
                            valid = true;
                        }
                    }

                    if (!valid)
                        break;
                }

                if(valid) {
                    result += Number(pages[Math.round(pages.length / 2) - 1]);
                    console.log(update);
                    console.log(pages[Math.round(pages.length / 2) - 1]);
                }
            });

            console.log(result);
        }

        fr.readAsText(this.files[0]);
    })