import { API_ROOT } from "../../api-config.js";
import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MessageContext, sendMessage } from "../Messaging/MessageContext";

const UserBookings = (props) => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState({});
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [state, dispatch] = useContext(MessageContext);

  const history = useHistory();

  const user = {
    id: localStorage.getItem("_id"),
    token: localStorage.getItem("token"),
  };

  // Get User Bookings
  useEffect(() => {
    axios
      .post(
        `${API_ROOT}/bookings`,
        { user: `${user.id}` },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, [user.token, user.id]);

  const cancel = () => {
    axios
      .post(
        `${API_ROOT}/cancel`,
        {
          bookingId: book._id,
          chargeId: book.chargeId,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        dispatch(sendMessage("Your booking was canceled!"));
        // setShowModal(false);
        history.push({
          pathname: "/message",
          openModal: true,
          head: "Canceled!",
        });
        // setMessage("Your booking was canceled!");
        // setShowModal(false);
        // setCancelAppointment(false);
        // history.push("/redir");
      })
      .catch((err) => {
        dispatch(sendMessage("I'm sorry, something went wrong."));
        // setShowModal(false);
        // setCancelAppointment(false);
        history.push({
          pathname: "/message",
          openModal: true,
          head: "Error!",
        });
        // setMessage("I'm sorry, something went wrong.");
        // setShowModal(false);
        // setCancelAppointment(false);
      });
  };

  // Modal handlers
  const handleOpen = (b) => {
    if (b) {
      setBook(b);
    }

    return setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const canceling = () => {
    setCancelAppointment(true);
  };

  if (cancelAppointment) {
    cancel();
    setCancelAppointment(false);
  }

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

  return (
    <div id="bookings" className="bookings">
      <div className="bookings__container">
        {bookings.length > 0 ? (
          <Table borderless hover responsive variant="dark">
            <thead>
              <tr>
                <th className="bookings__th">Booked On</th>
                <th className="bookings__th">Lesson Date</th>
                <th className="bookings__th">Start Time</th>
                <th className="bookings__th">Cost</th>
                <th className="bookings__th">Cancelled?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bkg) => (
                <tr key={bkg._id}>
                  <td className="bookings__td">
                    {new Date(bkg.createdAt).toDateString()}
                  </td>
                  <td className="bookings__td">{`${new Date(
                    bkg.lessonStart
                  ).toDateString()}`}</td>
                  <td className="bookings__td">
                    {new Date(bkg.lessonStart).getHours() > 12
                      ? new Date(bkg.lessonStart).getHours() - 12
                      : new Date(bkg.lessonStart).getHours()}
                    :
                    {new Date(bkg.lessonStart).getMinutes() > 0
                      ? new Date(bkg.lessonStart).getMinutes()
                      : "00"}
                    {new Date(bkg.lessonStart).getHours() >= 12 ? "pm" : "am"}
                  </td>
                  <td className="bookings__td">{"$" + bkg.lessonCost * 10}</td>
                  <td className="bookings__td">
                    {bkg.cancelled ? "Yes" : "No"}
                  </td>
                  <td className="bookings__td">
                    {!bkg.cancelled ? (
                      <Button
                        className="bookings__btn"
                        variant="danger"
                        type="button"
                        value="Cancel"
                        size="sm"
                        onClick={() => handleOpen(bkg)}
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <>
            <h1 className="bookings__zero">Book an appointment with me!</h1>
          </>
        )}
      </div>
    </div>
  );
};
export default UserBookings;
