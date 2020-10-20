import React, { Component } from "react";
import { BookModalWrapper, BookModalBoxSetup, BookModalBg } from "./BookModalStyles";

export default class BookModal extends Component {
  render() {
  const { visible, dismiss, children, client } = this.props;
    return (
      <React.Fragment>
          {visible ? (
            <BookModalWrapper>
                <BookModalBoxSetup width={client}>{children} </BookModalBoxSetup>
              <BookModalBg onClick={dismiss} />
          </BookModalWrapper>
          ) : null}
      </React.Fragment>
    );
  }
}
