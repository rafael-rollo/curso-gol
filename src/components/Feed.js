import React, { Component } from 'react';
import {
  Platform,
  View,
  StyleSheet,
  FlatList
} from 'react-native';

import Post from './Post';

const margin = Platform.select({
  ios: 20,
  android: 0
})

export default class Feed extends Component {
  
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount = () => {
    const uri = 'http://localhost:8080/api/public/fotos/rafael';
    fetch(uri)
      .then(response => response.json())
      .then(json => this.setState({fotos: json}))  
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.fotos}
            keyExtractor={ (item) => String(item.id) }
            renderItem={ ({item}) => <Post foto={item} /> }
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    marginTop: margin
  },
})
