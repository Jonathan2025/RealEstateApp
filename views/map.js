// Here will be the code for our Open Layers Map API

export async function initializeMap() {
    const coordinates = await geocodeAddress('<%= house.address %>', '<%= house.city %>', '<%= house.state %>', '<%= house.zip %>');
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat(coordinates),
        zoom: 14,
      })
    });
  }

  async function geocodeAddress(address, city, state, zip) {
    const query = `${address}, ${city}, ${state}, ${zip}`;
    const url = `https://nominatim.openstreetmap.org/search/${encodeURIComponent(query)}?format=json&addressdetails=1&limit=1`;
    const response = await fetch(url);
    const json = await response.json();
    if (json && json.length > 0) {
      const result = json[0];
      return [parseFloat(result.lon), parseFloat(result.lat)];
    }
    return null;
  }

