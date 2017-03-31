import React from 'react'

class GMap extends React.Component {
  state = { zoom: 10 };

  static propTypes() {
  	initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  }

	render() {
    return <div className="GMap">
      <div className='GMap-canvas' ref="mapCanvas">
      </div>
    </div>
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()
    this.marker = this.createMarker()
    this.markerActivity=this.createOtherMarkers(this.props.activityLocation.coordinates)
    this.markerRestaurant=this.createOtherMarkers(this.props.restaurantLocation.coordinates)
    
    this.infoWindow = this.createInfoWindow(this.marker, "You!")
    this.infoWindowActivity = this.createInfoWindow(this.markerActivity, this.props.activityLocation.name)
    this.infoWindowRestaurant = this.createInfoWindow(this.markerRestaurant, this.props.restaurantLocation.name)
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    )
  }

  createLatLng(position){
    return new google.maps.LatLng(
      position.latitude,
      position.longitude
    )
  }

  createOtherMarkers(position){
    return new google.maps.Marker({
      position: this.createLatLng(position),
      map: this.map
    })
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    })
	}

  createInfoWindow(marker, content) {
    let contentString = "<div class='InfoWindow'>" + content + "</div>"
    
    
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: marker,
      content: contentString
    })
  }
  
  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }
}

export default GMap

