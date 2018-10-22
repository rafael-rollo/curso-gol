import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import InputComentario from './InputComentario';
import Likes from './Likes';

export class Post extends Component {

  

  render() {
    const { foto, likeCallback } = this.props;

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
          <Likes foto={foto} likeCallback={() => likeCallback(foto.id)}/>
          
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

          <InputComentario idFoto={foto.id} 
              comentarioCallback={this.props.comentarioCallback}/>
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
  comentario: {
    flexDirection: 'row'
  },
  titulo: {
    fontWeight: 'bold',
    marginRight: 5
  },
})
