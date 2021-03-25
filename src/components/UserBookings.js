import { API_ROOT } from "../api-config.js";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const TableHeaderRow = () => {
	return (
		<tr>
			<th>ID</th>
			<th>Booked At</th>
			<th>Start Time</th>
			<th>Cost</th>
			<th>Payment Made?</th>
			<th>Cancelled?</th>
		</tr>
	)
}

const TableRow = ({bookings}) => {
	return bookings.map((bkg) =>
	    <tr>
	    	<td>{bkg._id.slice(-7)}</td>
	    	<td>{new Date(bkg.createdAt).toLocaleDateString("en-US")}</td>
	    	<td>{new Date(bkg.lessonStart).toLocaleDateString("en-US")}</td>
	    	<td>{bkg.lessonCost}</td>
	    	<td>{bkg.payment_made ? 'Yes' : 'No'}</td>
	    	<td>{bkg.cancelled ? 'Yes' : 'No'}</td>
	    	<td>
	    		{
	    			!bkg.cancelled 
	    			?
	    			<input type="button" value="Cancel" onClick={() => cancel(bkg)}></input>
	    			:
	    			null
	    		}
	    	</td>
	    </tr>
	);
}

const cancel = (bkg) => {
	var cncl = window.confirm(
		"If you want to break our meeting, know that this cannot be undone! Press OK to continue."
	);
	if (cncl) {
		console.log('CORRECT!')
		const url = `${API_ROOT}/cancel`;
		const token = localStorage.getItem('token');
  		const booking = bkg._id;
  		const data = {
  			'booking': booking
  		}
  		const headers = { 'Authorization': `Bearer ${token}` }
		axios.post(url, data, {
			headers: headers
		}).then((resp) => {
			alert('Your booking has been cancelled.')
		}).catch((err) => {
			console.log(err)
		})
	}
}

const UserBookings = (props) => {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
	  	const url = `${API_ROOT}/bookings`;
  		const token = localStorage.getItem('token');
  		const user = localStorage.getItem('_id');
  		const data = {
  			'user': user
  		}
  		const headers = { 'Authorization': `Bearer ${token}` }
	    axios.post(url, data, {
	        headers: headers
	    }).then((resp) => {
	      setBookings(resp.data);
	    }).catch((err) => {
	      console.log(err);
	    });
	}, []);
	console.log(bookings)
	return (
	    <table>
	      <TableHeaderRow />
	      <TableRow bookings={bookings} />
	    </table>
	);
}

export default UserBookings;