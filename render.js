var philoCount;
var timeIntervalInput = 30;
var leftForks = [];
var rightForks = [];
var simuationStatus =  document.getElementById("simuationStatus");

function generatePhiloElements() {

    // Clear existing elements
    var mainImg = document.querySelector(".mainImg");
    mainImg.innerHTML = '<span class="table"></span>';

    // Input (num of philo)
    var philoCountInput = document.getElementById("philoCount");
    philoCount = parseInt(philoCountInput.value, 10);

    // Validate the input
    if (isNaN(philoCount) || philoCount < 1) {
        alert("Please enter a valid number greater than 0.");
        return;
    }
    if (philoCount > 16){
        alert("[Warning] number of philo is too big");
    }

    // Get the table element
    var table = document.querySelector(".table");

    // Get the dimensions of the table
    var tableRect = table.getBoundingClientRect();
    var tableWidth = tableRect.width;

    // Calculate the radius of the table
    var tableRadius = tableWidth / 2;

    // PhiloCount + forkCount
    var count = philoCount * 7;

    // Calculate the angle between each philo element
    var angle = (2 * Math.PI) / count;

    // Iterate through each philo element and dynamically create them
    for (var i = 0; i < count; i++) {
        var objectAngle = angle * i;
        var objectRadius = tableRadius + 50; // Adjust this value for the desired distance from the table
        var objectX = Math.cos(objectAngle) * objectRadius - 15 + tableRadius + tableRect.x;
        var objectY = Math.sin(objectAngle) * objectRadius - 15 + tableRadius + tableRect.y - 310;
        if (i % 7 == 0){
            // Create a new span element for philo
            var philo = document.createElement("span");
            philo.className = "philo";
            philo.style.left = objectX + "px";
            philo.style.top = objectY + "px";
            // Append the new philo element to the mainImg container
            mainImg.appendChild(philo);
        }
        else {
			if (i % 7 == 3) {
				var fork = document.createElement("span");
				fork.className = "leftFork";
				fork.style.left = objectX +  "px";
				fork.style.top = objectY +  "px";

				mainImg.appendChild(fork);
			}
			else if(i % 7 == 4){
				var fork = document.createElement("span");
				fork.className = "rightFork";
				fork.style.left = objectX +  "px";
				fork.style.top = objectY + "px";
	
				mainImg.appendChild(fork);
			}
        }
    }

    // bring all philo tags
    var philos = document.querySelectorAll(".philo");
    var idx = 1;
    // set number to philos
    philos.forEach(philo => {
        if (idx <= philoCount)
            philo.innerHTML = idx;
        idx++;
    });

    // bring all fork tags
    var forks = document.querySelectorAll(".leftFork");
    var idx = 1;
    // set leftFork
    forks.forEach(fork => {
        fork.innerHTML = idx;
		leftForks.push(fork);
        idx++;
    })
    forks = document.querySelectorAll(".rightFork");
    idx = 1;
    // set rightFork
    forks.forEach(fork => {
		fork.innerHTML = idx % philoCount + 1;
		rightForks.push(fork);
        idx++;
    })
}

function updateTimeInterval() {
	timeIntervalInput = document.getElementById("timeInterval").value;
	var timeIntervalValue = document.getElementById("timeIntervalValue");
	timeIntervalValue.innerText = timeIntervalInput + "ms";
}
