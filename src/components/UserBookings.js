import { API_ROOT } from "../api-config.js";
import React from "react";
import axios from 'axios';

class UserBookings extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      bookings: [],
	    };
  	}

  	componentDidMount() {
  		const url = `${API_ROOT}/bookings`;
  		const token = localStorage.getItem('token');
  		const user = localStorage.getItem('_id');
  		const data = {
  			'user': user
  		}
  		const headers = { 'Authorization': `Bearer ${token}` }

  		axios.post(url, data, { headers: headers }
  		).then(resp => {
  			console.log('bookings:', resp.data)
  		}).catch(err => {
  			console.log(err)
  		})
  		//this.setState({ bookings: payload })
  	}


	render() {
		return (
			<div>
				<table>
					<tbody>
						<tr>
							<td>a</td>
							<td>b</td>
							<td>c</td>
						</tr>
						<tr>
							<td>d</td>
							<td>e</td>
							<td>f</td>
						</tr>
						<tr>
							<td>JOE</td>
							<td>h</td>
							<td>i</td>
						</tr>
						<tr>
							<td>j</td>
							<td>k</td>
							<td>l</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default UserBookings;