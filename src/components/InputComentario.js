import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

export class InputComentario extends Component {
  
  constructor() {
    super()
    this.state = {
      valorComentario: ''
    }
  }

  onComment = () => {
    this.props.comentarioCallback(this.props.idFoto, 
        this.state.valorComentario, this.inputComentario)
    this.setState({valorComentario: ''})
  }

  render() {
    return (
      <View style={styles.novoComentario}>
        <TextInput style={styles.input}
            onSubmitEditing={this.onComment}
            placeholder="Digite um comentário..."
            onChangeText={texto => this.setState({valorComentario: texto})}
            ref={input => this.inputComentario = input} 
            />

        <TouchableOpacity onPress={this.onComment}>
          <Image source={require('../../resources/img/send.png')}
              style={styles.icone}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default InputComentario

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    flex: 1,
    height: 40
  },
  novoComentario: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icone: {
    width: 30,
    height: 30
  }
})
