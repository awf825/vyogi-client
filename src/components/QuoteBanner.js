import React, {Component, Image} from 'react'

// const QuoteBanner = () => {
//   return (
//     <div className="test">
//       <h1>This is where the banner will go</h1>
//       <br></br>
//       <hr></hr>
//     </div>
//   )
// }
class QuoteBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hovered: false
    }
  }
  
  // toggleHover() {
  //   this.setState({hover: !this.state.hover})
  // }

  render() {
    return (
      <img
        className="quote-block"
        src={this.props.profile_photo}
        alt={this.props.alt_name}
        width="300"
        height="300"
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}
        // style={{transform: `${this.state.hovered ? 'scale(2,2)' : 'scale(1,1)'}`}}
      />
    );
  }
}

export default QuoteBanner;
