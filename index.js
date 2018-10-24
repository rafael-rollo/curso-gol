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

AppRegistry.registerComponent('InstaluraMobile', () => AppWithNavigation);