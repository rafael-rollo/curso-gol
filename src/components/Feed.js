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

  like = (idFoto) => {
    const foto = this.state.fotos
        .find(foto => foto.id === idFoto);

    let novaLista = [];

    //novaLista = this.state.foto.likers.concat({login: 'meuUsuario'}) 
    if (!foto.likeada) {
      novaLista = [
        ...foto.likers,
        {login: 'meuUsuario'}
      ]
    } else {
      novaLista = foto.likers
          .filter(liker => liker.login !== 'meuUsuario')
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }
    //Object.assign({}, this.state.foto, {likeada: !this.state.foto.likeada})

    const fotos = this.state.fotos
        .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
    this.setState({fotos})
  }

  adicionaComentario = (idFoto, valorComentario, inputRef) => {
    if (valorComentario === '') return;
    
    const foto = this.state.fotos
        .find(foto => foto.id === idFoto);
  
    const novaLista = [
      ...foto.comentarios,
      {login: 'meuUsuario', texto: valorComentario}
    ]

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }

    const fotos = this.state.fotos
    .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
    this.setState({fotos})
    
    inputRef.clear();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.fotos}
            keyExtractor={ (item) => String(item.id) }
            renderItem={ ({item}) => 
                <Post foto={item} 
                    likeCallback={this.like}
                    comentarioCallback={this.adicionaComentario}/> }
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
