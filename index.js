/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function getParks(code){
  const apiKey = 'nuYv7aPmsarVk3hCAPng9oYiuxNx1sWzA4i2062U';
  const searchURL = 'https://developer.nps.gov/api/v1';

  let stateCodes = code.split(',');
  let stateCodeStr ='';
  for(let i =0; i< stateCodes.length; i++){
    stateCodeStr+= `${stateCodes[i].trim().toUpperCase()}`;
  }

  let requestUrl = `${searchURL}?${stateCodeStr}apiKey=${apiKey}`;
  fetch(requestUrl,{
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response)=>response.json()).then((json)=>{
    console.log(json);
  })
    .catch(err=>console.log(err));
}

function watchForm(){
  $('form').submit(event=>{
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getParks(searchTerm);
  });
}

$(watchForm);