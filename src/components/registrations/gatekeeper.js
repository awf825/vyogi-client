/* 
	SIMPLE LIBRARY TO CLEAN UP SOME
	OF THE AUTH CODE IN LOGIN.JS THAT 
	CHECKS FOR SUCCESS/FAILURE.
*/
function serverErrorHandler(err) {
	switch (err.response.status) {
      case 422:
        alert('EMAIL IS ALREADY IN USE');
        return
      case 400:
      	alert('PASSWORD AND PASSWORD CONF DON\'T MATCH)')
      	return
      case 401:
        alert('UNAUTHORIZED')
        return
      default:
        throw new Error();
  	}
};

function clientErrorHandler(input) {
  for (const prop in input) {
  	if (input[prop].length < 1) {
  		alert(`Please provide a ${prop}.`)
  		return
  	}
  }	 
};

export {
	serverErrorHandler,
	clientErrorHandler
};