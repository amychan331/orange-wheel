require('dotenv').config();

window.onload = function () {
  // CREATE MAP
  mapboxgl.accessToken = process.env.MAPBOXGL_TOKEN;
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/amychan331/cjimjdvv30b7y2spbz0s4smm4/draft?fresh=true',
    center: [-122.447916, 37.760038],
    zoom: 10
  });

  // Add Search box:
  map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
  }));

  // LOAD MAP DATA
  function buildLocationList(geojson) {
    console.log(geojson)
    for (let i=0; i < features.length; i++) {
      const prop = features[i].properties

      let listings = document.getElementById('listings')
      let listing = listings.appendChild(document.createElement('li'))
      listing.id = 'listing-' + 1;

      let link = listing.appendChild(document.createElement('a'))
      link.href = '#'
      link.className = 'store'
      link.dataPosition = i
      link.innerHTML = prop.address

      let details = listing.appendChild(document.createElement('p'))
      details.innerHTML = prop.city
      if (prop.phone) {
        details.innerHTML += ' &middot; ' + prop.phoneFormatted;
      }
    }

    // Add event listener to links for popup, pointer flyer, & listing highlight
    link.addEventListener('click', function(e) {
      const clickedListing = data.features[this.dataPosition];
      flyToOrg(clickedListing)
      createPopUp(clickedListing)
      const activeItem = document.getElementsByClassName('active')
      if (activeItem[0]) { activeItem[0].className.remove('active') }
      this.parentNode.classList.add('active')
    })
  }

  map.on('load', function() {
    // Retrieve the geoson dataset uploaded in Mapbox Studio
    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.datasets
      .listFeatures({
        datasetId: 'cjimhk5ur00o22vp5hmjg8evz'
      })
      .send()
      .then(
        response => { builLocatioList(response.body) },
        error => console.log(error)
      )
  })

  // ADD INTERACTION
  function flyToOrg(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    })
  }

  function createPopUp(currentFeature) {
    let popUps = document.getElementsByClassName('mapboxgl-popup')
    if (popUps) { popUps[0].remove() }
  }

  // When map pointers are clicked: retrieve popup, fly to pointer, & highlight listing
  map.on('click', function(e) {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['sf-parks']
    });
    if (features.length) {
      let clickedPoint = features[0];
      flyToOrg(clickedPoint)
      createPopUp(clickedPoint)
      let activeItem = document.getElementsByClassName('active')
      if (activeItem[0]) { activeItem[0].className.remove('active') }
      const selectFeature = clickedPoint.properties.address
      for (let i = 0; i < features.length; i++) {
        if (features[i].properties.address === selectFeature) {
          selectFeatureIndex = i;
        }
      }

      // var popup = new mapboxgl.Popup({ offset: [0, -15] })
      //   .setLngLat(feature.geometry.coordinates)
      //   .setHTML('<h3>' + feature.properties.name + '</h3><p>' + feature.properties.description + '</p>')
      //   .setLngLat(feature.geometry.coordinates)
      //   .addTo(map);
    }
  })


}