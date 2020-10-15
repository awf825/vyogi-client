import React, {Component} from 'react'
import axios from 'axios'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      schedule: props.location.state.schedule,
      // will need to expand booking to be all inputs
      // instead of obj
      booking: {}
    }
  }

  componentDidMount() {
    this.getUser()
  }

  // could customize this route to get other things too like:
  //// all of a users bookings
  //// all of their charges
  //// card info etc
  // TODO***COMBINE LESSON AND SCHEUDLE MODELS!!!!!!!!!!***TODO

  getUser = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.setState({
          user: response.data.user
        })
      } else {
        console.log('Alert: Please sign in? How did you get here?...')
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  render() {
    // build form to capture state of booking along lines of Activerecord Model
    //   create_table "bookings", force: :cascade do |t|
    // t.string "status"
    // t.string "title" 
    // t.integer "cost" <= SET (ADD COST TO SCHEDULE MODEL)
    // t.datetime "start" <= SET
    // t.text "cancellation_reason" <= LATER
    // t.boolean "refunded" <= LATER
    // t.integer "schedule_id" <= SET
    // t.integer "lesson_id" <= ?
    // t.integer "account_id" <= SET
    // t.index ["account_id"], name: "index_bookings_on_account_id"
    // t.index ["lesson_id"], name: "index_bookings_on_lesson_id"
    // t.index ["schedule_id"], name: "index_bookings_on_schedule_id"
  
    return (
      <div>
        <h1>This appointment is $X</h1>
        <h1> This appointment has Y spots left</h1>
        <h1>BJ</h1>
      </div>
    )
  }


}

export default Book;