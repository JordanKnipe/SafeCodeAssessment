
//manipulate dom for hour input
document.getElementById('employment').addEventListener('change', function () {
    var employmentType = document.getElementById('employment').value;
    var hoursContainer = document.getElementById('hours-container');
    if (employmentType === 'partTime') {
        //Display when part-time selected
        hoursContainer.style.display = 'flex';
    } else {
        //Clear
        hoursContainer.style.display = 'none';
        document.getElementById('hoursWorked').value = '';  
        document.getElementById('hoursError').textContent = ''; 
    }
});


//dom manipulation for input fields and submitting
document.getElementById('salaryPackageCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via HTTP/HTML form submission

    // Retrieve values from form
    let salary = document.getElementById('salary').value;
    let industry = document.getElementById('industry').value;
    let employment = document.getElementById('employment').value;
    let education = document.getElementById('education').value;
    let hoursWorked = document.getElementById('hoursWorked').value;
    let hasError = false;
    
    document.getElementById('salaryError').textContent = '';
    document.getElementById('industryError').textContent = '';
    document.getElementById('employmentError').textContent = '';
    document.getElementById('educationError').textContent = '';
    document.getElementById('hoursError').textContent = '';
    document.getElementById('salary-sacrifice-limit').textContent = '';
 

    if(salary === null || salary ===  '' || salary === 0)
        {
            console.log("salary not found");
            document.getElementById('salaryError').textContent = 'Please enter salary.';
            hasError = true;
            return 0 
        }
    else if(industry === null || industry ===  'default')
    {
        console.log("industry not found");
        document.getElementById('industryError').textContent = 'Please select an industry.';
        hasError = true;
        return 0 
    }
    else if(employment === null || employment ===  'default')
    {
        console.log("employment not found");
        document.getElementById('employmentError').textContent = 'Please select an employment status.';
        hasError = true;
        return 0
    }
    else if(education === null || education ===  'default')
    {
        console.log("industry not found");
        document.getElementById('educationError').textContent = 'Please select an education level.';
        hasError = true;
        return 0
    }
    if(employment === 'partTime' && (hoursWorked === '' || hoursWorked <= 0 || hoursWorked > 38)) {
        document.getElementById('hoursError').textContent = 'Please enter valid hours worked (1-38).';
        hasError = true;
    }
    if (!hasError) {
        sendDataToServer(salary, industry, employment, hoursWorked, education);
    }
});


//send to server and expect response | check console for the js object that will be sent
function sendDataToServer(salary, industry, employment, hoursWorked = undefined, education) {
    
    //handle hoursWorked if it is not provided (optional parameter)
    if (typeof hoursWorked === 'undefined') {
        hoursWorked = ''; // Default value if not provided
    }

    // Construct the data object to send
    const data = {
        salary:salary,
        industry: industry,
        employment: employment,
        hoursWorked: hoursWorked,
        education: education
    };

    
    console.log("Sending Data to server", data)


    //send a promise for the results, if found update the front-end state and display the data.
    fetch('http://localhost:3000/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            data
        )
    }).then(response => response.json())
      .then(data => {console.log('Success:', data)
        document.getElementById('salary-sacrifice-limit').textContent = '$'+ data.result;
      })
      .catch((error) => console.error('Error:', error));


}