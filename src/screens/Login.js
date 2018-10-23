import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  AsyncStorage
} from 'react-native'

export class Login extends Component {

  constructor() {
    super()
    this.state = {
      usuario: '',
      senha: '',
      mensagem: ''
    }
  }

  efetuaLogin = () => {
    const uri = "http://localhost:8080/api/public/login";

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: this.state.usuario, 
        senha: this.state.senha
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    }

    fetch(uri, requestInfo)
      .then(response => {
        
        if(response.ok)
          return response.text()

        throw new Error('Não foi possível efetuar o login')
      })
      .then(token => {
        AsyncStorage.multiSet([
          ['usuario', this.state.usuario], 
          ['token', token]
        ]);
        
        this.setState({usuario: '', senha: '', mensagem: ''})
      })
      .catch(error => {
        this.setState({mensagem: error.message})
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Instalura</Text>
        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            style={[styles.input, {marginBottom: 10}]} 
            placeholder="Usuário..."
            onChangeText={texto => this.setState({usuario: texto})}
            ref={input => this.inputUsuario = input}/>
          
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry={true} 
            style={[styles.input, {marginBottom: 10}]} 
            placeholder="Senha..."
            onChangeText={texto => this.setState({senha: texto})}
            ref={input => this.inputSenha = input}/>

          <Button title="Login" onPress={this.efetuaLogin}/>
        </View>

        <Text style={styles.mensagem}>
          {this.state.mensagem}
        </Text>
      </View>
    )
  }
}

export default Login

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: width * 0.8,
  },
  input: {
    fontSize: 18,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mensagem: {
    marginTop: 15,
    color: '#e74c3c'
  }
})
