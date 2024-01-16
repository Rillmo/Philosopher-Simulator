var info;
var philos;

function simulationStart() {

    // get input from user
    var simulInput = document.getElementById("philoSimul").value;
    
    // split string to array
    var lines = simulInput.split("\n");
    info = [];
    lines.forEach(line => {
        var splitLine = parseLine(line);
        if (splitLine == -1)
            return;
        info.push(splitLine);
    });

    // check error
    var before = info[0];
    info.forEach(line => {
        if (isNaN(line[0])){
            alert("syntax error at [" + line[0] + "]");
            return 1;
        }
        else if (isNaN(line[1])){
            alert("syntax error at [" + line[1] + "]");
            return 1;
        }
        else if (parseInt(before[0], 10) > parseInt(line[0], 10)) {
            alert("timestamp is not in ascending order");
            return 1;
        }
        else if (parseInt(line[1]) > philoCount) {
            alert("philo number is too big : " + line[1]);
            return 1;
        }
    });
    
    // logging....
    console.log(info);

    // bring all philos from document
    philos = document.querySelectorAll(".philo");

    // start simulation process
    processLine(0);
}

function processLine(index) {
    if (index >= info.length)
        return;

    var curline = info[index];
    // bring in philosophers of corresponding numbers
    var philoNum = parseInt(curline[1]);
    var currPhilo;
    var count = 1;
    philos.forEach(philo => {
        if (count == philoNum)
            currPhilo = philo;
        count++;
    });

    // activate current philo
    currPhilo.style.backgroundColor = "#09fa05";

    // sleep for a while using setTimeout
    setTimeout(function () {
        // deactivate current philo after a delay (e.g., 3000 milliseconds)
        currPhilo.style.backgroundColor = "white";
        
        // Process the next line after the delay
        processLine(index + 1);
    }, 2000);
}

// parse line into form : [timestamp] [philo_number] [status]
function parseLine(line) {
    var result = [];
    var start = 0;
    var count = 0;

    for (var end = 0; end<line.length; end++){
        if (count == 2)
            break;
        if (line[end] == ' ') {
            result.push(line.substring(start, end))
            start = end + 1;
            count++;
        }
    }
    if (count != 2){
        alert("syntax error at [" + line + "]");
        return -1;
    }
    result.push(line.substring(start, line.length));
    return result;
}

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
