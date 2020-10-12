import React, {Component, Image} from 'react'
import quotes from '../data/quotes.json'
import ReactHtmlParser from 'react-html-parser';
//{ processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class QuoteBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textVisible: false,
      randomizer: 0,
      opacity: 0,
      timer: null
    }
    this.fadingIn = this.fadingIn.bind(this)
    this.fadingOut = this.fadingOut.bind(this)
  }

  getQuote = () => {
    if (this.state.textVisible) {
      this.setState({
        textVisible: false,
        randomizer: Math.floor(Math.random() * Math.floor(5))
      })
    } else {
      this.setState({
        textVisible: true
      })
    }
  }

  fadingIn = () => {
    const timer = setInterval(() => {
      if (this.state.opacity >= 1) {
        clearInterval(timer)
      } 
      this.setState({ opacity: this.state.opacity + 0.1}) 
    }, 100);
  }

  fadingOut = () => {
    const timer = setInterval(() => {
      this.setState({ opacity: this.state.opacity - 0.1}) 
    }, 100);
  }
  
  componentDidMount() {
    this.interval = setInterval(() => this.getQuote(), 3500);
    setTimeout(() => this.setState(this.fadingIn), 1000)
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
    setTimeout(() => this.setState(this.fadingOut), 1000)
  }
  
  render() {
    // here add quote span from JSON of famous yogis etc/name and year? DOB?
    const { textVisible, randomizer, opacity } = this.state
    const html = `<div>${quotes[randomizer]["quote"]}</div>
                  <div>${quotes[randomizer]["name"]} ~${quotes[randomizer]["year"]}</div>
                  `;
    return (
      <div className="quote-picture-container">
        <div className="quote-picture-text" style={{opacity: opacity}}>
          <div>{ ReactHtmlParser(html) }</div>
        </div>
        <img
          className="quote-picture-block"
          src={this.props.profile_photo}
          alt={this.props.alt_name}
          width="400"
          height="400"
        />
      </div>
    );
  }
}

export default QuoteBanner;
