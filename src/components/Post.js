import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto
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
                {foto.likers.length} curtidas
              </Text>
          }
          
          <Text style={styles.comentario}>
            <Text>
              <Text style={styles.titulo}>{foto.loginUsuario}</Text> {foto.comentario}
            </Text>
          </Text>
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
    height: 40
  },
  likes: {
    marginTop: 5,
    fontWeight: 'bold'
  },
  comentario: {
    marginTop: 5,
    flexDirection: 'row'
  },
  titulo: {
    fontWeight: 'bold',
    marginRight: 5
  }
})
