function calculateSalaryPackage(salary, employeeType, employmentType, hoursWorked, educated) {
    let limit = 0;
    let excessSalary = 0;
    let baseRate = 0;
   
    let salaryValue = Number(salary);
    if (isNaN(salaryValue)) {
        throw new Error(`Invalid salary input ${salary}`);
    }


    if (employeeType === 'corporate') {
        if (employmentType === 'casual') {
            return 0;
        }
        if(salaryValue >= 100000){
                excessSalary = salaryValue - 100000; 
                baseRate = 1000; //1% of 100,000
            }
            else{
              baseRate = salaryValue  * 0.01;
            }

        limit = baseRate + (excessSalary * 0.001);
        
        if (employmentType === 'part-time') {
            limit *= (hoursWorked / 38);
        }
    } else if (employeeType === 'hospital') {
        limit = Math.max(10000, salaryValue * 0.2); //highest of the two
        if(limit >= 30000){
            limit = 30000; //cap on the limit at 30k
        }
        if (educated == "higherEducation") {
            limit += 5000;
        }
        if (employmentType === 'full-time') {
            limit += (limit * 0.095) + (salaryValue * 0.012);
        }
    } else if (employeeType === 'pbi') {
        
        if(employmentType != 'casual'){
        limit = Math.min(50000, salaryValue * 0.3255); //lesser of the two
        }
        if (educated == "higherEducation") {
            limit += 2000 + salaryValue * 0.01;
        }
        if (employmentType === 'part-time') {
            limit *= 0.8;
        }
        //override if casual
        if (employmentType === 'casual') {
            limit += salaryValue * 0.1;
            if(limit >= 10000){
                limit = 10000 // cap at 10k for casual
            }
            
        }
    }

    return Math.floor(limit);
}

//common js export
module.exports = calculateSalaryPackage;
