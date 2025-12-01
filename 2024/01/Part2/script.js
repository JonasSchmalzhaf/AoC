document.getElementById('inputfile')
            .addEventListener('change', function () {
                var result = 0;

                let fr = new FileReader();
                fr.onload = function () {
                    var list1 = [], list2 = [];

                    numberStrings = fr.result.replace(/\s+/g, '').match(/.{1,10}/g).forEach(element => {
                        element = element.match(/.{1,5}/g);

                        list1.push(element[0]);
                        list2.push(element[1]);
                    });

                    for(i = 0; i < list1.length; i++) {
                        result += list2.filter(number => number == list1[i]).length * list1[i];
                    }

                    console.log("Gesamt Ergebnis: " + result);
                }

                fr.readAsText(this.files[0]);
            })