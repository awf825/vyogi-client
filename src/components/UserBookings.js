import { API_ROOT } from "../api-config.js";
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

// const TableHeaderRow = () => {
//   return (
//     <tr>
//       <th>ID</th>
//       <th>Booked At</th>
//       <th>Start Time</th>
//       <th>Cost</th>
//       <th>Payment Made?</th>
//       <th>Cancelled?</th>
//     </tr>
//   );
// };

// const TableRow = ({ bookings }) => {
//   return bookings.map((bkg) => (
//     <tr>
//       <td>{bkg._id.slice(-7)}</td>
//       <td>{new Date(bkg.createdAt).toLocaleDateString("en-US")}</td>
//       <td>{new Date(bkg.lessonStart).toLocaleDateString("en-US")}</td>
//       <td>{bkg.lessonCost}</td>
//       <td>{bkg.payment_made ? "Yes" : "No"}</td>
//       <td>{bkg.cancelled ? "Yes" : "No"}</td>
//       <td>
//         {!bkg.cancelled ? (
//           <input
//             type="button"
//             value="Cancel"
//             onClick={() => cancel(bkg)}
//           ></input>
//         ) : null}
//       </td>
//     </tr>
//   ));
// };

// const cancel = (bkg) => {
//   var cncl = window.confirm(
//     "If you want to break our meeting, know that this cannot be undone! Press OK to continue."
//   );
//   if (cncl) {
//     console.log("CORRECT!");
//     const url = `${API_ROOT}/cancel`;
//     const token = localStorage.getItem("token");
//     const booking = bkg._id;
//     const data = {
//       booking: booking,
//     };
//     const headers = { Authorization: `Bearer ${token}` };
//     axios
//       .post(url, data, {
//         headers: headers,
//       })
//       .then((resp) => {
//         alert("Your booking has been cancelled.");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };

// const UserBookings = (props) => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const url = `${API_ROOT}/bookings`;
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("_id");
//     const data = {
//       user: user,
//     };
//     const headers = { Authorization: `Bearer ${token}` };
//     axios
//       .post(url, data, {
//         headers: headers,
//       })
//       .then((resp) => {
//         setBookings(resp.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   console.log(bookings);
//   return (
//     <table id="bookings">
//       <TableHeaderRow />
//       <TableRow bookings={bookings} />
//     </table>
//   );
// };
const UserBookings = (props) => {
  const [bookings, setBookings] = useState([]);

  const user = {
    id: localStorage.getItem("_id"),
    token: localStorage.getItem("token"),
  };

  const cancel = (bkg) => {
    var cncl = window.confirm(
      "If you want to break our meeting, know that this cannot be undone! Press OK to continue."
    );
    if (cncl) {
      console.log("CORRECT!");
      const url = `${API_ROOT}/cancel`;
      const token = localStorage.getItem("token");
      const booking = bkg._id;
      const data = {
        booking: booking,
      };
      const headers = { Authorization: `Bearer ${token}` };
      axios
        .post(url, data, {
          headers: headers,
        })
        .then((resp) => {
          alert("Your booking has been cancelled.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .post(
        `${API_ROOT}/bookings`,
        { user: user.id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token, user.id]);

  console.log("Bookings: ", bookings);
  return (
    <div id="bookings" className="bookings">
      <div className="bookings__container">
        <Table borderless hover variant="dark" className="bookings__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Booked At</th>
              <th>Start Time</th>
              <th>Cost</th>
              <th>Payment Made?</th>
              <th>Cancelled?</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((bkg) => (
                <tr>
                  <td>{bkg._id.slice(-7)}</td>
                  <td>{new Date(bkg.createdAt).toLocaleDateString("en-US")}</td>
                  <td>
                    {new Date(bkg.lessonStart).toLocaleDateString("en-US")}
                  </td>
                  <td>{bkg.lessonCost}</td>
                  <td>{bkg.payment_made ? "Yes" : "No"}</td>
                  <td>{bkg.cancelled ? "Yes" : "No"}</td>
                  <td>
                    {!bkg.cancelled ? (
                      <Button
                        variant="danger"
                        type="button"
                        value="Cancel"
                        onClick={() => cancel(bkg)}
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No info </td>
                <td>No info </td>
                <td>No info </td>
                <td>No info </td>
                <td>No info </td>
                <td>No info </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default UserBookings;
