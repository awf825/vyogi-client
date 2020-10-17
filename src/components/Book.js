import React, {Component} from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import PayForm from './book/PayForm.js'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      showPayForm: false,
      stripeField1: '',
      stripeField2: '',
      stripeField3: ''
    }
    this.handleConfirmation = this.handleConfirmation.bind(this)
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
    this.setState({
      showPayForm: true
    })
  }

  handleRejection = () => {
    this.props.history.push('/schedule')
  }

  handleChange = (ev) => {
    const {name, value} = ev.target
    this.setState({
      [name]: value
    })
  }

  handlePayment = () => {
    // booking will be created here, 
  }

  render() {
    const {user, showPayForm, stripeField1, stripeField2, stripeField3} = this.state
    const lesson = this.props.location.state.lesson
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
          <div className={showPayForm ? 'pay-form show' : 'pay-form'}>
            <form onSubmit={this.handlePayment}>
              <input 
                placeholder="test"
                type="text"
                name="stripeField1"
                value={stripeField1}
                onChange={this.handleChange}
              />
              <input 
                placeholder="test"
                type="text"
                name="stripeField2"
                value={stripeField2}
                onChange={this.handleChange}
              />
              <input 
                placeholder="test"
                type="text"
                name="stripeField3"
                value={stripeField3}
                onChange={this.handleChange}
              />
            </form>
            <button placeholder="Make Payment" type="submit">
              Make Payment
            </button>
          </div>
        </Fade>
        {/* <PayForm show={showPayForm}/> */}
      </div>
    )
  }


}

export default Book;