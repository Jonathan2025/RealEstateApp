// The below code will create the map that we will show on the page -->

  // Using async function as the network request will be completed before continuing with execution
  // Function geocodeAddress takes an address, city, state and zip --> convert them into lat and long values 
  export async function geocodeAddress(address, city, state, zip) {
    const query = `${address}, ${city}, ${state}, ${zip}`

    console.log("Query", query)


    // because OpenLayer API by itself cannot directly the 4 parameters above and give a location, we need to use Openstreetmap to take the 4 parameters and 
    // then return us a latitude and longitude, that initializeMap can then use
    const url = `https://nominatim.openstreetmap.org/search/${encodeURIComponent(query)}?format=json&addressdetails=1&limit=1`
    // we use EncodeURI component above so that we can encode the query string (The 4 parameters) into a URL safe format
    // send a request to the URL
    const response = await fetch(url)
    // Waiting for response to complete and then parse it into a JSON object
    const json = await response.json()
    // If a response is returned, return the Lat and Long Values
    if (json && json.length > 0) {
      const result = json[0]
      return [parseFloat(result.lon), parseFloat(result.lat)]
    } else {
      // if a latitude and longitude could not be generated, then an error message will be sent
      throw new Error('The address, city, state, or zip that was inputted into the form was invalid and therefore a map location could not be shown')
    }
    // otherwise return null
    return null
  }


  // the initializeMap function will use the geocodeAddress from above to create a map of the area
  export async function initializeMap(address, city, state, zip) {


    try{
    // coordinates call to the geocodeAddress above
    const coordinates = await geocodeAddress(address, city, state, zip)
    // then we cretae an OpenLayers map object which has the following
    const map = new ol.Map({
      // target - where the map will be displayed (in this case it will be the map div above)
      target: 'map',
      // Displays an OpenStreet tile layer
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        })
      ],
      // Display an initial view of the map, in this case we are displaying a view that is on the coordinates we sent it
      view: new ol.View({
        center: ol.proj.fromLonLat(coordinates),
        // initial zoom level of the map
        zoom: 18,
      })
    })
    // If we could not generate a valid latitide and longitude based on the address, city , state and zip we were given, we can generate an error message
    // in the space where the map would have been
  } catch (error) {
    document.getElementById('map').innerHTML = `<p>${error.message}</p>`
  }
}


// // need to pass in the parameters from show.ejs
