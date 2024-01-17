class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }
    enqueue(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
        return item + ' inserted';
    }
    dequeue() {
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return item;
    }
    peek() {
        return this.items[this.frontIndex];
    }
    get printQueue() {
        return this.items;
    }
}

var info;
var philos;
var forks;
var finishedEat = 0;
var eatingQueue = new Queue();

function simulationStart() {
    // get input from user
    var simulInput = document.getElementById("philoSimul").value;

    // split string to array
    var lines = simulInput.split("\n");
    info = [];
    lines.forEach(line => {
        if (line.length > 0){
            var splitLine = parseLine(line);
            if (splitLine == -1)
                return;
            info.push(splitLine);
        }
    });

    // check error
    if (check_err(info) == 1)
        return;

    // logging....
    console.log(info);

    // bring all philos from document
    philos = document.querySelectorAll(".philo");

    // bring all forks from document
    forks = document.querySelectorAll(".fork");

	forks.forEach(fork => {
        console.log(fork.innerHTML);
    });

	console.log("time: " + timeIntervalInput);

    // start simulation process
    processLine(0);
}

function processLine(index) {
    if (index >= info.length)
        return;

    var curline = info[index];
	var nextline;
	if (index < info.length)
    	nextline = info[index + 1];
    // bring in philosophers of corresponding numbers
    var philoNum = parseInt(curline[1]);
    var currPhilo;
    var count = 1;
    philos.forEach(philo => {
        if (count == philoNum)
            currPhilo = philo;
        count++;
    });

	var currIdx = currPhilo.innerHTML;

    // philo action except eat
    if (curline[2].localeCompare("has taken a fork") == 0) {    // pick a fork
		eatingQueue.enqueue(currIdx);
    } else if (curline[2].localeCompare("is eating") == 0) {
		eating(currPhilo, currIdx);
    } else if (curline[2].localeCompare("is sleeping") == 0) {  // sleep
        sleeping(currPhilo, currIdx);
    } else if (curline[2].localeCompare("is thinking") == 0) {  // think
        thinking(currPhilo, currIdx);
    } else {
        alert("syntax errot at [" + curline[2] + "]");
        return ;
    }

	// calculate timeToSleep
	var timeToSleep = 0;
	var curTime = parseInt(curline[0]);
	var nextTime = 0;
	if (nextline != undefined && nextline.length > 0)
		nextTime = parseInt(nextline[0]);
	if (nextline != undefined && nextline.length > 0)
		timeToSleep = (nextTime - curTime) * timeIntervalInput;

	// print current time
	printTime(curTime);
	console.log("curTime: " + curTime);
	console.log("timetosleep : " + timeToSleep);
	if (timeToSleep > 0)
		doEat();

	setTimeout(function () {
		processLine(index + 1);
	}, timeToSleep);
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
    if (result.length != 3)
        alert("syntax errot at [" + line + "]");
    return result;
}

function check_err(info){
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
        else if (parseInt(line[1]) > philoCount || parseInt(line[1]) <= 0) {
            alert("philo number is out of range : " + line[1]);
            return 1;
        }
    });
    return 0;
}
