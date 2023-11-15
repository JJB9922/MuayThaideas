import { StatusBar } from 'expo-status-bar';
import { View, Image, Text } from 'react-native';
import { homeStyle, UIStyle } from '../utils/styles';
import Buttons from '../components/Button';


export default function App() {
    return (
      <View style={homeStyle.container}>
        <Text> Workout </Text>
      </View>
    );
  }