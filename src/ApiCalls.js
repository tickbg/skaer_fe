function callApi(apiUrl, onSuccess) {
  fetch(apiUrl)
    .then(response => {
      console.log('Fetcing ' + apiUrl);
      console.log('Status: ' + response.status);
      console.log('response text: ' + response.statusText);

      response.json().then(data => {
        if (onSuccess === null) {
            onSuccess(data);
        } else {
            onSuccess(data);
        }
      });
    })
    .then(body => {})
      .catch(err => {
        console.log('Fetch Error: ', err);
      })
}

export function fetchProviders(onSuccess) {
  const apiUrl = `http://localhost:8080/providers_list`;
  callApi(apiUrl, onSuccess);
}

export function fetchProviderEntries(provid, onSuccess = null) {
  const apiUrl = `http://localhost:8080/provider_entries?provid=`;
  callApi(apiUrl + provid, onSuccess);
}

export function fetchTmdbEntries(onSuccess = null) {
  const apiKey = 'f3e9f7d1677c7aa63c9ab526381eeceb';
  const baseUrl = 'https://api.themoviedb.org/3';
  const language = 'en-US';
  const filter = '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
  const apiUrl = `${baseUrl}/discover/movie?api_key=${apiKey}&language=${language}${filter}`;
  callApi(apiUrl, onSuccess);
}
