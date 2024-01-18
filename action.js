function takeFork(idx) {
    var forkIdx;
    var left;
    var right;

	// find left fork
    leftForks.forEach(fork => {
        forkIdx = parseInt(fork.innerHTML);
        if (forkIdx == idx)
            left = fork;
    });
	// find right fork
    rightForks.forEach(fork => {
        forkIdx = parseInt(fork.innerHTML);
        if (forkIdx == idx)
            right = fork;
    });

    if (left.style.backgroundColor == "" || left.style.backgroundColor == "white") {
        left.style.backgroundColor = "#09fa05";
		// console.log("left: "+left.innerHTML); 
        return 0;
    }
    if (right.style.backgroundColor == "" || right.style.backgroundColor == "white"){
        right.style.backgroundColor = "#09fa05";
		// console.log("right: "+right.innerHTML);
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
	
}

function die(currPhilo, idx){
    // coloring current philo
    currPhilo.style.backgroundColor = "#9e9e9e";
	clearTimeout(timeId);
	simuationStatus.innerHTML = "DIED";
}

function putDownFork(idx) {
    var forkIdx;
    var left;
    var right;

	// find left fork
    leftForks.forEach(fork => {
        forkIdx = parseInt(fork.innerHTML);
        if (forkIdx == idx)
            left = fork;
    });
	// find right fork
    rightForks.forEach(fork => {
        forkIdx = parseInt(fork.innerHTML);
        if (forkIdx == idx)
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
	var dequeuedValue = 1;

	for(var i=0; i<10; i++) {
		dequeuedValue = eatingQueue.dequeue();
		if (dequeuedValue != undefined && dequeuedValue != null) {
			takeFork(dequeuedValue.data);
		}
	}
}

