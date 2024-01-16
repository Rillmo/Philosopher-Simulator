function generatePhiloElements() {
    // Clear existing philo elements
    var mainImg = document.querySelector(".mainImg");
    mainImg.innerHTML = '<span class="table"></span>';

    // Get the user input
    var philoCountInput = document.getElementById("philoCount");
    var philoCount = parseInt(philoCountInput.value, 10);

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
    var count = philoCount * 2;

    // Calculate the angle between each philo element
    var angle = (2 * Math.PI) / count;

    // Iterate through each philo element and dynamically create them
    for (var i = 0; i < 2 * count; i++) {
        var objectAngle = angle * i;
        var objectRadius = tableRadius + 50; // Adjust this value for the desired distance from the table
        var objectX = Math.cos(objectAngle) * objectRadius;
        var objectY = Math.sin(objectAngle) * objectRadius;
        if (i % 2 == 0){
            // Create a new span element for philo
            var philo = document.createElement("span");
            philo.className = "philo";
            philo.style.left = objectX + tableRect.left + tableWidth / 2 - 11 + "px";
            philo.style.top = objectY + tableRect.top - 40 + "px";
    
            // Append the new philo element to the mainImg container
            mainImg.appendChild(philo);
        }
        else {
            var fork = document.createElement("span");
            fork.className = "fork";
            fork.style.left = objectX + tableRect.left + tableWidth / 2 - 11 + "px";
            fork.style.top = objectY + tableRect.top - 40 + "px";

            mainImg.appendChild(fork);
        }
    }
}