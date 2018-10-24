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

