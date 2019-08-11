// Listen for form submit event
document.getElementById('retirement-form').addEventListener('submit', function(e){
    // Show Loading gif
    document.getElementById('loading').style.display = 'block';
    // Hide results
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculating the results
function calculateResults() {
    // UI Vars
    const UIcurrentPension = document.getElementById('current-pension');
    const UIcurrentMonthly = document.getElementById('current-monthly');
    const UIvoluntaryMonthly = document.getElementById('voluntary-monthly');
    const UImonthlyOutgoings = document.getElementById('monthly-outgoings');
    const UIyearsToRetire = document.getElementById('years-to-retire');

    // Results vars
    const annualOutgoings = parseFloat(UImonthlyOutgoings.value) * 12;
    const annualRetirementContributions = (parseFloat(UIcurrentMonthly.value) + parseFloat(UIvoluntaryMonthly.value)) * 12;
    let retirementFund = parseFloat(UIcurrentPension.value) + annualRetirementContributions;
    console.log('annual outgoings: ' + annualOutgoings);
    console.log('annual contribs: ' + annualRetirementContributions);
    console.log('retirement fund: ' + retirementFund);
    var yearsToRetire = 0;
    var i = 0;

    // (annualOutgoings/0.04) < retirementFund
    while (i<50) {
        retirementFund += annualRetirementContributions;
        console.log('WHILE retirement fund: ' + retirementFund.toFixed(2));
        yearsToRetire++;
        i++;
        // interest calculated at 2% return annually
        retirementFund += (retirementFund * 0.02); 
        if ((annualOutgoings/0.04) < retirementFund) {
            break
        }
    }

    if ((annualOutgoings/0.04) < retirementFund) {
        // Hide Loading gif
        document.getElementById('loading').style.display = 'none';
        // Show results
        document.getElementById('results').style.display = 'block';
        UIyearsToRetire.value = yearsToRetire;
        console.log('If block ran condition met...')
    } else {
        // Hide Loading gif
        document.getElementById('loading').style.display = 'none';
        // Hide results
        document.getElementById('results').style.display = 'none';
        showError('Check input accuracy.');
        console.log('If block ran condition NOT met...')
    }
}

// show error
function showError(error) {
    // create a div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    // create text node append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// clear error
function clearError() {
    document.querySelector('.alert').remove();
}