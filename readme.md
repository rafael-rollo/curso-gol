## Exercícios: Navegando entre telas do Instalura
1. Clone o projeto base, já configurado para contar com a lib de navegação, no Desktop.
    
    ``` shell
    git clone https://github.com/rafael-rollo/curso-gol.git
    ```

1. Renomeie a pasta criada para `InstaluraMobile` e copie para dentro dela as pastas `src/` e `resources/` 
    do projeto anterior. Em seguida, abra a pasta do projeto no terminal, rode o comando `rm -rf node_modules/` e depois `yarn install` para reconstruir a pasta com as dependências do projeto.

1. Altere seu `index.js` para registrar os componentes do Instalura como telas na lib de navegação e iniciar a app.

    ``` javascript
    import { AppRegistry, YellowBox } from 'react-native';
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 
        'Module RCTImageLoader']);

    import { createStackNavigator } from 'react-navigation';

    import Feed from './src/components/Feed';
    import Login from './src/screens/Login';

    const AppWithNavigation = createStackNavigator({
        Login: Login,
        Feed: Feed
    });

    AppRegistry.registerComponent('InstaluraMobile', 
            () => AppWithNavigation);
    ```

1. Adicione a chamada à navegação ao final do fluxo das promisses da função `efetuaLogin`.
    
    ``` javascript
    // código anterior omitido ...

    .then(token => {
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('usuario', this.state.usuario);

        // navegue para o feed

        this.props.navigation.reset(
            [NavigationActions.navigate({ routeName: 'Feed' })], 0);
    })
    .catch(error => this.setState({mensagem: e.message}));
    ```

______________


## Exercícios: Visitando perfil dos amigos
1. No `index.js`, registre um novo componente de tela junto à API Navigation.

    ``` javascript
    // imports omitidos ...

    const AppWithNavigation = createStackNavigator(
        {
            Login: Login,
            Feed: Feed,
            PerfilUsuario: Feed // nova tela
        },
        {
            initialRouteName: 'Login',
        }
    );

    // código posterior omitido ...
    ```

1. No componente `Post`, altere a marcação do header da foto passando a utilizar um _TouchableOpacity_ 
    ao invés de uma _View_ simples. Aqui também se prepare para receber mais um callback via `props` e 
    repassá-lo ao mesmo _TouchableOpacity_.

    ``` js
    render() {
        const { foto, likeCallback, comentarioCallback, 
            verPerfilCallback } = this.props;

        return (
            <View>
                <TouchableOpacity style={styles.cabecalho} 
                        onPress={() => verPerfilCallback(foto.id)}>
                    <Image source={{uri: foto.urlPerfil}}
                        style={styles.fotoDePerfil}/>
                    <Text>{foto.loginUsuario}</Text>
                </TouchableOpacity>

                {/* código posterior omitido ... */} 
            </View>
        );
    }
    ```

1. Adicione a implementação da função `verPerfilUsuario` no componente superior `Feed`.

    ``` js
    verPerfilUsuario = (idFoto) => {
        const foto = this.buscaPorId(idFoto);

        this.props.navigator.navigate('PerfilUsuario', {
            usuario: foto.loginUsuario,
            fotoDePerfil: foto.urlPerfil,
        });
    }
    ```

    Lembre-se também de passar sua referência ao componente `Post`.

    ``` js
    <Post foto={item}
        likeCallback={this.like}
        comentarioCallback={this.adicionaComentario}
        verPerfilCallback={this.verPerfilUsuario} />
        {/* repassamos a referência ao Post */}
    ```

1. No componente `Feed`, altere seu código para carregar as fotos a partir de diferentes endereços, 
    levando em conta se estamos carregando o _feed_ principal ou o de um perfil de amigo. 

    ``` javascript
    componentDidMount() {
        let uri = '/fotos';
        
        const usuario = this.props.navigation
                .getParam('usuario', null);

        if(usuario)
            uri = `/public/fotos/${usuario}`;

        InstaluraFetchService.get(uri)
            .then(json => this.setState({fotos: json}));
    }
    ```

1. Crie o arquivo `src/components/HeaderUsuario.js`. Defina a seguinte classe internamente.

    ``` javascript
    import React, { Component } from 'react';
    import {
        StyleSheet,
        Text,
        View,
        Image,
    } from 'react-native';

    export default class HeaderUsuario extends Component {

        render() {
            return (
                <View style={styles.container}>
                    <View style={styles.painelFoto}>
                        <Image style={styles.fotoDoPerfil}
                                source={{uri: this.props.fotoDePerfil}} />

                        <View style={styles.usuarioInfo}>
                            <Text style={styles.posts}>{this.props.posts}</Text>
                            <Text style={styles.texto}>publicações</Text>
                        </View>
                    </View>
                    <Text style={styles.nomeDeUsuario}>{this.props.usuario}</Text>
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            alignItems: 'flex-start',
            backgroundColor: '#fff',
            padding: 20,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1
        },
        painelFoto: {
            flexDirection: 'row',
            marginBottom: 20
        },
        fotoDoPerfil: {
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 0.5,
            borderColor: 'grey'
        },
        usuarioInfo: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 30
        },
        posts: {
            marginRight: 10,
            fontSize: 40,
            fontWeight: 'bold',
            color: '#000'
        },
        texto: {
            fontSize: 20
        },
        nomeDeUsuario: {
            fontWeight: 'bold',
            color: '#000'
        }
    });
    ```
    _O código deste componente está disponível neste gist: https://gist.github.com/rafael-rollo/05b2bf0255b6111d6db36f5b8e8e53cf_

1. Importe e reutilize o novo componente no Feed.

    ``` javascript
    // outros imports omitidos ...

    import HeaderUsuario from './HeaderUsuario';

    export default class Feed extends Component {

        // código anterior omitido ...

        renderHeader() {
            const { navigation } = this.props;

            const fotoDePerfil = navigation.getParam('fotoDePerfil')
            const usuario = navigation.getParam('usuario');

            if(usuario)
                return <HeaderUsuario 
                            fotoDePerfil={fotoDePerfil}
                            posts={this.state.fotos.length}
                            usuario={usuario} />;
        }

        render() {
            return (
                <View>
                    {this.renderHeader()}
                    <FlatList
                        {/* código interno omitido ... */}
                    />
                </View>
            );
        }
    }
    ```

1. Altere o componente que serve como container na definição do `render` do componente `Feed`, para 
    dar suporte a scroll. Ao invés de uma simples _View_, utilize uma _ScrollView_. Não se 
    esqueça de importar o novo componente.

1. No componente `Feed`, altere a forma como a app está carregando fotos, para que seja possível 
    reagir a eventos de navegação, ao invés de apenas ouvir aos eventos do ciclo de vida natural 
    de um React Component.

    ``` javascript
    constructor(props) {
        super(props)
        this.state = {
            fotos: []
        }

        this.willFocusSubscription = props.navigation.addListener(
            'willFocus', 
            (payload) => this.carregaFotos()
        );
    }

    componentDidMount() {
        this.carregaFotos()
    }

    carregaFotos() {
        let uri = '/fotos';
        
        const usuario = this.props.navigation
                .getParam('usuario', null);

        if(usuario)
            uri = `/public/fotos/${usuario}`;

        InstaluraFetchService.get(uri)
            .then(json => this.setState({fotos: json}));
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }
    ```
