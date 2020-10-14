import React, {Component} from 'react';

const VDO = () => {
    return (
        <div>
            <video src="https://css-tricks-post-videos.s3.us-east-1.amazonaws.com/blurry-trees.mov" autoplay loop playsinline muted></video>

            <header class="viewport-header">
            <h1>
                Explore
                <span>Montana</span>
            </h1>
            </header>
        </div>
    )
};

export default VDO;

// class PitchBanner extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { show: false };
//     this.handleClick = this.handleClick.bind(this)
//   }

//   handleClick = () => {
//     this.setState({ show: !this.state.show });
//   }

//   render() {
//     return (
//       <div>
//         <Fade left when={this.state.show}>
//           <h2>Content like quotes, reviews, etc</h2>
//           <br></br>
//           <h3>Need to create space though</h3>
//           <br></br>
//           <h4>Pitch? Do you feel like x y z</h4>
//           <br></br>
//           <h5>TRY</h5>
//           <br></br>
//         </Fade>
//         <button
//           className="btn btn-success my-5"
//           type="button"
//           onClick={this.handleClick}
//         >
//           { this.state.show ? "Hide" : "Show" }
//         </button>
//       </div>
//     )
//   } 
// }

// export default PitchBanner;