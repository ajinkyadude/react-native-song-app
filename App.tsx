import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SongContainer from './src/App';
import MainView from './src/App/MainView';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={SongContainer} />
        <Stack.Screen name="mainImage" component={MainView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
