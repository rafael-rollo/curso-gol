import React, { Component } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'; 

export class DefaultImage extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      loaded: false
    }
  }

  componentDidMount() {
    fetch(this.props.src)
      .then(response => response.blob())
      .then(blob => {
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob); 
        fileReaderInstance.onload = () => {
          base64data = fileReaderInstance.result;                
          
          this.setState({
            image: base64data,
            loaded: true
          })
        }
      })
  }
  
  render() {
    return (
      <Image 
          source={this.state.loaded ? {uri: this.state.image} : 
              require('../../resources/img/post-alura.jpg')}
          style={this.props.style}
      />
    )
  }
}

export default DefaultImage
