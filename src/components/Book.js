import React, {Component} from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      lesson: props.location.state.lesson,
      // will need to expand booking to be all inputs
      // instead of obj
      booking: {}
    }
    this.handleRejection = this.handleRejection.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  // could customize this route to get other things too like:
  //// all of a users bookings
  //// all of their charges
  //// card info etc

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

  handleConfirmation = () => {
    console.log('confirm')
  }

  handleRejection = () => {
    this.props.history.push('/schedule')
  }

  render() {
    const {user, lesson, booking} = this.state
    // class CreateBookings < ActiveRecord::Migration[5.1]
    // def change
    //   create_table :bookings do |t|
    //     t.string :status
    //     t.string :title
    //     t.integer :payment
    //     t.text :cancellation_reason
    //     t.boolean :refunded  
    //   end
    //   add_index :lesson_id
    //   add_index :account_id
    // end

  // cost: 7.5
  // created_at: "2020-10-17T03:09:53.854Z"
  // description: "Test Lesson Desc"
  // duration: "1 hour"
  // id: 19
  // image: null
  // level: "Beginner"
  // start: "2020-10-23T03:09:53.852Z"
  // title: "Test Lesson 18"
    return (
      <div>
        <Fade bottom>
          <div> 
            <h2> {user["email"]}, </h2>
            <p>This is {lesson["title"]}. This is a {lesson["level"]} level lesson, 
            it starts at {lesson["start"]} and will last {lesson["duration"]}. </p>
            <p>Can you confirm this?</p>
            <input type="button" value="Yes" onClick={this.handleConfirmation}></input>
            <input type="button" value="No" onClick={this.handleRejection}></input>
          </div>
        </Fade>
      </div>
    )
  }


}

export default Book;