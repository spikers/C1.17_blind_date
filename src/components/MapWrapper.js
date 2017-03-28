import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react'
  
export class Container extends React.Component {}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyA0SjTOkOJpFoznfd2vVdyunLJ2-Pi8kGo'
})(Container)