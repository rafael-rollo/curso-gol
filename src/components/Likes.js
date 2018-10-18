import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export class Likes extends Component {
  
  render() {
    const { foto } = this.props

    return (
      <View>
        <TouchableOpacity onPress={this.props.likeCallback}>
          <Image source={foto.likeada ? 
              require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png') }
              style={styles.botaoDeLike}/>
        </TouchableOpacity>

        {
          foto.likers.length > 0 && 
            <Text style={styles.likes}>
              {foto.likers.length} {foto.likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        }
      </View>
    )
  }
}

export default Likes

const styles = StyleSheet.create({
  botaoDeLike: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  likes: {
    fontWeight: 'bold'
  },
})
