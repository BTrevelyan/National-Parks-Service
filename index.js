/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function getParks(code){
  const apiKey = 'nuYv7aPmsarVk3hCAPng9oYiuxNx1sWzA4i2062U';
  const searchURL = 'https://developer.nps.gov/api/v1/parks';

  let stateCodes = code.split(',');
  let stateCodeStr =stateCodes.map(function(str){
    return str.trim().toUpperCase();
  }).join(',');
  
  let maxResults = $('#js-max-results').val();
  let requestUrl = `${searchURL}?stateCode=${stateCodeStr}&api_key=${apiKey}&limit=${maxResults}`;
  
  fetch(requestUrl)
    .then(code => {
      if (code.ok) {
        return code.json();
      }
      throw new Error(code.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
 

function displayResults(responseJson){
  console.log(responseJson);
  $('#results-list').empty();
  for(let i=0; i<responseJson.data.length; i++){
    console.log(responseJson.data[i]);
    $('#results-list').append(`<li><h3>${responseJson.data[i].fullName}</h3>
    <p>${responseJson.data[i].description}</p>
    <a href="${responseJson.data[i].directionsUrl}">Let's go!</a>'
    </li>`);
  }
  $('#results').removeClass('hidden');
}

function watchForm(){
  $('form').submit(event=>{
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getParks(searchTerm);
  });
}

$(watchForm);