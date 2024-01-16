function simulationStart() {

    // get input from user
    var simulInput = document.getElementById("philoSimul").value;
    
    // split string to array
    var lines = simulInput.split("\n");
    var info = [];
    lines.forEach(line => {
        var splitLine = parseLine(line);
        info.push(splitLine);
    });

    // check error
    info.forEach(line => {
        if (isNaN(line[0]))
        {
            alert("syntx error at [" + line[0] + "]");
            return;
        }
        else if (isNaN(line[1]))
        {
            alert("syntx error at [" + line[1] + "]");
            return;
        }
        
    });

    info.forEach
    console.log(info);
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
    result.push(line.substring(start, line.length));
    return result;
}