import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Fade from 'react-reveal/Fade'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule: []
    }
    console.log(props)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/lessons', {withCredentials: true})
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
        <Fade left>
          <h1>Book Here</h1>
            <table>
              <tbody>
                { 
                  schedule.map(function(s, i) {
                    return (
                      <tr key={i}>
                        <td>{s["title"]}</td>
                        <td>DESC ===</td>
                        <td>{s["description"]}</td>
                        <td>START ===</td>
                        <td>{s["start"]}</td>
                        <td>DUR ===</td>
                        <td>{s["duration"]}</td>
                        <td>COST ===</td>
                        <td>{s["cost"]}</td>
                        <td>
                          {/* <Link to="/book", state: {schedule={s}}>Book</Link> */}
                          <Link to={{
                            pathname: "/book",
                            state: {
                              lesson: s
                            }
                          }}>Book</Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
        </Fade>
      </div>
    )
  }
}

export default Schedule;