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
  fetch(requestUrl,{
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response)=>response.json()).then((json)=>{
    console.log(json);
  })
    .catch(err=>console.log(err));
}

function displayResults(){
  
}

function watchForm(){
  $('form').submit(event=>{
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getParks(searchTerm);
  });
}

$(watchForm);