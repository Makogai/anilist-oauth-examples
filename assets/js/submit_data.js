// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible

$(".search").click(function (event) {
  event.preventDefault();
  let searchVar = $(".query").val();
  console.log(searchVar);

  var query = `
                            query ($search: String) { # Define which variables will be used in the query (id)
                            Media (search: $search, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
                            id
                            type
                            episodes
                            status
                            description
                            bannerImage
                            source
                            coverImage{medium large extraLarge}
                                    title {
                                    romaji
                                    english
                                    native
                                    }
                                   
                            }
                        }
                            `;
  var variables = {
    search: searchVar,
  };

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  // HEre I display the data on screen so we know it's the correct data. We can always do another api call to see
  // if this entry is present on anilist.
  function handleData(data) {
    console.log(data);
    $("#id").val(data.data.Media.id);
    $("#name").val(data.data.Media.title.romaji);
    $("#image").attr("src", data.data.Media.coverImage.extraLarge);

    // Revealing the buttons for adding
    $(".buttons").removeClass("hidden");
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }
});

function save_data(id, status) {
  console.log(id, status);
  //Writing a query to submit data to anilist api
  let query = `
        mutation ($mediaId: Int, $status: MediaListStatus) {
            SaveMediaListEntry (mediaId: $mediaId, status: $status) {
                id
                status
            }
        }
        `;

  //Variables used in the query
  let variables = {
    mediaId: id,
    status: status,
  };

  //Retreiving the access token from the local storage
  let accessToken = window.localStorage.getItem("access_token");

  //Making a POST request to Anilist api, using the token.
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken, //Using the token here
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  fetch(url, options).then(handleResponse, handleError);

  function handleResponse(response) {
    console.log(response);
  }
  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }
}
