/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
    const globals= arguments[arguments.length-1];    
    firstname=(firstname==null)?"":firstname;
    lastname=(lastname==null)?"":lastname;
    console.log(globals);
    return firstname.concat(' ').concat(lastname);
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @return {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
 * Makes a REST call
 * @name submitToRestEndpoint Submits the request to REST endpoint
 * @param {scope} globals
 * @return {string}
 */
function submitToRestEndpoint(globals){
    console.log("hola!");
    let result = "";
    $.ajax({
        url: '/content/dkvm-sign-endpoint',
        type: 'POST',
        //data: JSON.stringify({"actionNr": "8504"}),
        success: function(response) {
            alert("Thank you for submitting the form. We'll get back to you soon!");
            console.log("success from post call");
            result = "success";
        },
        error: function(xhr, status, error) {
            alert("Thank you for submitting the form. We'll get back to you soon!");
            console.error("Error: " + error);
            result = "error";
        }
    });
    return result;
}

/**
 * Set the Serial Number to its repeatable panel's instance index (1-based).
 * @param {Object} field - The field object inside the repeatable panel.
 * @param {scope} globals
 */
function setRepeatablePanelIndex(field, globals) {
    // Traverse upward to locate the parent repeatable panel that contains the instance manager.
    var parentNode = field;
    while (parentNode && !parentNode.instanceManager) {
        parentNode = parentNode.parent;
    }
    // If found, get the index of the instance that contains the field.
    if (parentNode && parentNode.instanceManager) {
        // Loop through the instances to find the matching one
        var instances = parentNode.instanceManager.instances;
        for (var i = 0; i < instances.length; i++) {
            // We assume the field's immediate parent node corresponds to the instance.
            if (instances[i].somExpression === field.parent.somExpression) {
                // Set the field value to the 1-based index.
                field.value = i + 1;
                break;
            }
        }
    } else {
        console.warn("Repeatable panel not found for field: " + field.somExpression);
    }
}



// eslint-disable-next-line import/prefer-default-export
export { getFullName, days, submitToRestEndpoint, setRepeatablePanelIndex };
