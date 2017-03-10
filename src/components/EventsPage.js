import React, {Component} from 'react';
import {Link} from 'react-router';
import EventsCarousel from './eventscarousel';
import EventsButtonGroup from './eventsbuttongroup';
import styles from './styles/eventspage.css';

class EventsPage extends Component {
  constructor(){
    super();
    this.state = {
      data: {},
      index: null
    }
  }
  componentWillMount(){
    this.getEventData();
  }
  getEventData() {
  const data = {
    "activities" :  {
        "id": "phans55-irvine-4",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/hbb7jBeR_MhZfHdLvuwuSg/o.jpg",
        "name": "Phans55",
        "price": "$$",
        "distance": "1065.560268334",
        "review_count": "87",
        "url": "https://www.yelp.com/biz/phans55-irvine-4?adjust_creative=RacSYb9qeA-Ow3Om2\u2026api_v3&utm_medium=api_v3_business_search&utm_source=RacSYb9qeA-Ow3Om2netXA",
        "coordinates": {
            "longitude": "-117.743181797897",
            "latitude": "33.6451163040219"
        },
        "is_closed": "false",
        "categories": [
            {
                "title": "Vietnamese",
                "alias": "vietnamese"
            },
            {
                "title": "Diners",
                "alias": "diners"
            },
            {
                "title": "Seafood",
                "alias": "seafood"
            }
        ],
        "display_phone": "(949) 825-5117",
        "phone": "+19498255117",
        "location": {
            "state": "CA",
            "address2": "",
            "city": "Irvine",
            "address3": "",
            "zip_code": "92618",
            "country": "US",
            "display_address": [
                "8557 Irvine Center Dr",
                "Irvine, CA 92618"
            ],
            "address1": "8557 Irvine Center Dr"
        },
        "rating": "3.5"
},
"outdoors" :  {
        "id": "phans55-irvine-4",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/hbb7jBeR_MhZfHdLvuwuSg/o.jpg",
        "name": "Phans55",
        "price": "$$",
        "distance": "1065.560268334",
        "review_count": "87",
        "url": "https://www.yelp.com/biz/phans55-irvine-4?adjust_creative=RacSYb9qeA-Ow3Om2\u2026api_v3&utm_medium=api_v3_business_search&utm_source=RacSYb9qeA-Ow3Om2netXA",
        "coordinates": {
            "longitude": "-117.743181797897",
            "latitude": "33.6451163040219"
        },
        "is_closed": "false",
        "categories": [
            {
                "title": "Vietnamese",
                "alias": "vietnamese"
            },
            {
                "title": "Diners",
                "alias": "diners"
            },
            {
                "title": "Seafood",
                "alias": "seafood"
            }
        ],
        "display_phone": "(949) 825-5117",
        "phone": "+19498255117",
        "location": {
            "state": "CA",
            "address2": "",
            "city": "Irvine",
            "address3": "",
            "zip_code": "92618",
            "country": "US",
            "display_address": [
                "8557 Irvine Center Dr",
                "Irvine, CA 92618"
            ],
            "address1": "8557 Irvine Center Dr"
        },
        "rating": "3.5"
}, 
"movies" :  {
        "id": "phans55-irvine-4",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/hbb7jBeR_MhZfHdLvuwuSg/o.jpg",
        "name": "Phans55",
        "price": "$$",
        "distance": "1065.560268334",
        "review_count": "87",
        "url": "https://www.yelp.com/biz/phans55-irvine-4?adjust_creative=RacSYb9qeA-Ow3Om2\u2026api_v3&utm_medium=api_v3_business_search&utm_source=RacSYb9qeA-Ow3Om2netXA",
        "coordinates": {
            "longitude": "-117.743181797897",
            "latitude": "33.6451163040219"
        },
        "is_closed": "false",
        "categories": [
            {
                "title": "Vietnamese",
                "alias": "vietnamese"
            },
            {
                "title": "Diners",
                "alias": "diners"
            },
            {
                "title": "Seafood",
                "alias": "seafood"
            }
        ],
        "display_phone": "(949) 825-5117",
        "phone": "+19498255117",
        "location": {
            "state": "CA",
            "address2": "",
            "city": "Irvine",
            "address3": "",
            "zip_code": "92618",
            "country": "US",
            "display_address": [
                "8557 Irvine Center Dr",
                "Irvine, CA 92618"
            ],
            "address1": "8557 Irvine Center Dr"
        },
        "rating": "3.5"
},
"live" :  {
        "id": "phans55-irvine-4",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/hbb7jBeR_MhZfHdLvuwuSg/o.jpg",
        "name": "Phans55",
        "price": "$$",
        "distance": "1065.560268334",
        "review_count": "87",
        "url": "https://www.yelp.com/biz/phans55-irvine-4?adjust_creative=RacSYb9qeA-Ow3Om2\u2026api_v3&utm_medium=api_v3_business_search&utm_source=RacSYb9qeA-Ow3Om2netXA",
        "coordinates": {
            "longitude": "-117.743181797897",
            "latitude": "33.6451163040219"
        },
        "is_closed": "false",
        "categories": [
            {
                "title": "Vietnamese",
                "alias": "vietnamese"
            },
            {
                "title": "Diners",
                "alias": "diners"
            },
            {
                "title": "Seafood",
                "alias": "seafood"
            }
        ],
        "display_phone": "(949) 825-5117",
        "phone": "+19498255117",
        "location": {
            "state": "CA",
            "address2": "",
            "city": "Irvine",
            "address3": "",
            "zip_code": "92618",
            "country": "US",
            "display_address": [
                "8557 Irvine Center Dr",
                "Irvine, CA 92618"
            ],
            "address1": "8557 Irvine Center Dr"
        },
        "rating": "3.5"
    }
  }
  this.setState({data: data});
}

handleButtonPress(e){
  let index = parseInt(e.target.id);
  this.setState({index: index});
}

updateButton(index){
  console.log('hey updateButton called ' + index);
  this.setState({index:index});
}
  render() {
        return(
          <div className={styles.container}>
            <div><h1>Events Page</h1></div>
            <div className={styles.carouselcontainer}>
              <EventsCarousel 
              activities={this.state.data.activities}
              outdoors={this.state.data.outdoors}
              movies={this.state.data.movies}
              live={this.state.data.live}
              indexSelection = {this.state.index}
              updateButton = {(index)=>(this.updateButton(index))}
               />
            </div>
            <EventsButtonGroup 
            handleButtonPress = {(e)=>this.handleButtonPress(e)}
            activeButton = {this.state.index}
            />
            <Link to="/results">Results</Link>
          </div>
        )
    }
  }

export default EventsPage;