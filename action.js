function takeFork(idx) {
    var forkIdx;
    var left;
    var right;

    forks.forEach(fork => {
        forkIdx = parseInt(fork.innerHTML);
        if (forkIdx == idx)
            left = fork;
        if (idx == 1 && forkIdx == philoCount)
                right = fork;
        else if (forkIdx == idx - 1)
            right = fork;
    });

    if (left.style.backgroundColor == "" || left.style.backgroundColor == "white" || left.style.backgroundColor == "#09fa05"){
        left.style.backgroundColor = "#09fa05";
		console.log("left: "+left.innerHTML);
        return 0;
    }
    if (right.style.backgroundColor == "" || right.style.backgroundColor == "white" || right.style.backgroundColor == "#09fa05"){
        right.style.backgroundColor = "#09fa05";
		console.log("right: "+right.innerHTML);
        return 0;
	}
}

function sleeping(currPhilo, idx){
	putDownFork(idx);
    // coloring current philo
    currPhilo.style.backgroundColor = "#CCEBC5";
}

function thinking(currPhilo, idx){
	putDownFork(idx);
    // coloring current philo
    currPhilo.style.backgroundColor = "#FBB4AE";
}

function eating(currPhilo, idx){
    // coloring current philo
    currPhilo.style.backgroundColor = "#B3CDE3";
    finishedEat = 1;
}

function putDownFork(idx) {
    var forkIdx;
    var left;
    var right;

    if (finishedEat == 0)
        return 0;

    forks.forEach(fork => {
        forkIdx = parseInt(fork.innerHTML);
        if (forkIdx == idx)
            left = fork;
        if (idx == 1 && forkIdx == philoCount)
                right = fork;
        if (forkIdx == idx - 1)
            right = fork;
    });
    
    left.style.backgroundColor = "white";
    right.style.backgroundColor = "white";
}

function printTime(time) {
	var timeInfo = document.getElementById("currentTime");

	timeInfo.innerHTML = time;
}

function doEat(){
	// do eat
	var dequeuedValue;

	do {
		dequeuedValue = eatingQueue.dequeue();
		if (dequeuedValue != undefined) {
			takeFork(dequeuedValue);
			console.log(dequeuedValue + " take fork!");
		}
	} while (dequeuedValue)
}

