function isSafeReport(report) {
    const direction = Math.sign(report[1] - report[0]);

    for (let i = 1; i < report.length; i++) {
        const delta = report[i] - report[i - 1];

        if (Math.abs(delta) < 1 || Math.abs(delta) > 3) {
            return false;
        }

        if (direction * delta <= 0) {
            return false;
        }
    }

    return true;
}

document.getElementById('inputfile')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let result = 0;

            reportString = fr.result.split("\n");
            for(let i = 0; i < reportString.length; i++) {
                report = reportString[i].split(" ").map(level => parseInt(level));

                if (isSafeReport(report)) {
                    result++;
                    continue;
                }
        
                for (let i = 0; i < report.length; i++) {
                    if (isSafeReport(report.toSpliced(i, 1))) {
                        result++;
                        break;
                    }
                }
            }

            console.log(result);
        }

        fr.readAsText(this.files[0]);
    })