import { API_ROOT } from "../api-config.js";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";

const UserBookings = (props) => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [book, setBook] = useState("");
  const [cancelAppointment, setCancelAppointment] = useState(false);

  const user = {
    id: localStorage.getItem("_id"),
    token: localStorage.getItem("token"),
  };

  // Get User Bookings
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

  // Modal handlers
  const handleOpen = (b) => {
    return setShowModal(true), setBook(b);
  };
  const handleClose = () => setShowModal(false);

  // These might be able to be removed
  const canceling = () => {
    setCancelAppointment(true);
  };

  if (cancelAppointment) {
    cancel();
  }
  //////////////////////////

  const cancel = () => {
    axios
      .post(
        `${API_ROOT}/bookings`,
        { booking: book },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        setMessage("Your booking was canceled");
        setShowModal(false);
        setCancelAppointment(false);
      })
      .catch((err) => {
        setMessage(err);
        setShowModal(false);
        setCancelAppointment(false);
      });
  };

  console.log(message);

  if (showModal) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          If you want to break our meeting, know that this cannot be undone!
          Press OK to continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={canceling}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  /*
  	. I haven't been able to test the cancellation functionality
	. The button is in the secondary table where the user would have no booking info
	strictly just for testing purposes
	. Let me know if it's working or not
	. If you could put in some bookings under a certain user and send me the email and password I can test it more throughly
	. I also tried to move the modal into it's own seperate component but it wasn't playing nice
  */

  return (
    <div id="bookings" className="bookings">
      <div className="bookings__container">
        <Table borderless hover responsive variant="dark">
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
                        onClick={() => handleOpen(bkg)}
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
                <td>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => handleOpen(2)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default UserBookings;
