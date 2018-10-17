import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';

export class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto,
      valorComentario: ''
    }
  }

  like = () => {
    let novaLista = [];

    //novaLista = this.state.foto.likers.concat({login: 'meuUsuario'}) 
    if (!this.state.foto.likeada) {
      novaLista = [
        ...this.state.foto.likers,
        {login: 'meuUsuario'}
      ]
    } else {
      novaLista = this.state.foto.likers
          .filter(liker => liker.login !== 'meuUsuario')
    }

    const fotoAtualizada = {
      ...this.state.foto,
      likeada: !this.state.foto.likeada,
      likers: novaLista
    }
    //Object.assign({}, this.state.foto, {likeada: !this.state.foto.likeada})

    this.setState({foto: fotoAtualizada})
  }

  adicionaComentario = () => {
    const { foto, valorComentario } = this.state

    if (valorComentario === '') return;
  
    // adicionar na lista
    const novaLista = [
      ...foto.comentarios,
      {login: 'meuUsuario', texto: valorComentario}
    ]

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    }

    this.setState({foto: fotoAtualizada})
    this.inputComentario.clear();
  }

  render() {
    const { foto } = this.state;

    return (
      <View>
        <View style={styles.header}>
          <Image source={{uri: foto.urlPerfil}}
            style={styles.fotoDePerfil}/>
          <Text>{foto.loginUsuario}</Text>
        </View>
        
        <Image source={{uri: foto.urlFoto}}
          style={styles.fotoDoPost}/>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.like}>
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
          
          <Text style={styles.comentario}>
            <Text style={styles.titulo}>{foto.loginUsuario}</Text> {foto.comentario}
          </Text>

          {
            foto.comentarios.map((comentario, index) => 
              <Text key={index} style={styles.comentario}>
                <Text style={styles.titulo}>{comentario.login}</Text> {comentario.texto}
              </Text>
            )
          }

          <View style={styles.novoComentario}>
            <TextInput style={styles.input}
                placeholder="Digite um comentário..."
                onChangeText={texto => this.setState({valorComentario: texto})}
                ref={input => this.inputComentario = input} />

            <TouchableOpacity onPress={this.adicionaComentario}>
              <Image source={require('../../resources/img/send.png')}
                  style={styles.botaoDeLike}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default Post;

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  header: {
    margin: 10, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  fotoDePerfil: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 10
  }, 
  fotoDoPost: {
    width,
    height: width
  },
  footer: {
    margin: 10
  },
  botaoDeLike: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  likes: {
    fontWeight: 'bold'
  },
  comentario: {
    flexDirection: 'row'
  },
  titulo: {
    fontWeight: 'bold',
    marginRight: 5
  },
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
  }
})
