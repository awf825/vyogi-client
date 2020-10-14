import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/schedules', {withCredentials: true})
    .then(resp => {
      this.setState({
        schedule: resp.data
      })
    })
    .catch(er => console.error(er))
  }

  // SOME POINT IN THIS COMPONENT

  //// ONLY COMMIT CHARGE, BOOKING AND SCHEDULE ONCE USER SUBMITS
  //// FORM IN BOOK COMPONENT!!! !!!BUT NEED TO FIND A WAY TO HOLD ON TO SCHEDULE OBJ
  //// ONCE BOOK LINK IS SELECTED SO FULL BOOKING CAN BE BUILT IN
  //// THE BACK END 

  render() {
    const { schedule } = this.state
    return (
      <div>
        <h1>Book Here</h1>
          <table>
            <tbody>
              { 
                schedule.map(function(s, i) {
                  return (
                    <tr>
                      <td>{s["title"]}</td>
                      <td>START ===</td>
                      <td>{s["start"]}</td>
                      <td>END ===</td>
                      <td>{s["end"]}</td>
                      <td>
                        <Link to="/book">Book</Link>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
      </div>
    )
  }
}

export default Schedule;