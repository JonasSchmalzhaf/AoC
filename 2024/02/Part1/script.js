document.getElementById('inputfile')
            .addEventListener('change', function () {
                let fr = new FileReader();
                fr.onload = function () {
                    let result = 0;

                    reportString = fr.result.split("\n").forEach(report => {
                        report = report.split(" ").map(level => parseInt(level));

                        let isSave = true;
                        let lastDir = Math.sign(report[0] - report[1]);

                        for(i = 0; i < report.length - 1; i++) {
                            let dir = Math.sign(report[i] - report[i + 1])
                            if(dir != lastDir || (dir * (report[i] - report[i + 1])) > 3  || (dir * (report[i] - report[i + 1])) == 0) {
                                isSave = false;
                                break;
                            } else {
                                lastDir = dir;
                            }
                        }

                        if(isSave) {
                            result += 1;
                        }

                        console.log(report+ "; isSave: "+ isSave);
                        
                    });

                    console.log(result);
                }

                fr.readAsText(this.files[0]);
            })