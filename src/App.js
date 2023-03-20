import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import Rank  from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '3ab5311ff49e4d199949640c6394d5e5'
 });


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      },
    }
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  };

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      // Clarifai.FACE_DETECT_MODEL
      //'53e1df302c079b3db8a0a36033ed2d15',
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector'
      }
       ,this.state.input)
    .then((response) => {
      if (response) {
        console.log(response);
        fetch('http://localhost:3000/image', {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
    }
      this.displayBox(this.calculateFaceLocation(response))
    })
    .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    };
    this.setState({route});
  };
  
  render()  {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return(
    <div className="App">
      <ParticlesBg color='ffffff' type='cobweb' bg={true} />
      <Navigation isSignedIn = {isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home' ?
          <div> 
            
            <Logo />
            <Rank 
              name = {this.state.user.name} 
              entries = {this.state.user.entries} 
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onImageSubmit={this.onImageSubmit}
            />
            <FaceRecognition box = {box} imageUrl = {imageUrl} /> 
        </div>
        : (
          route === 'signin'
          ?
          <div> 
            <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />  
          </div>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

        )
      
    }
    </div>
    
    )
  };
};


export default App;
