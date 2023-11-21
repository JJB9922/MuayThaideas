import { StatusBar } from 'expo-status-bar';
import { View, Image, Text } from 'react-native';
import { homeStyle, UIStyle } from '../utils/styles';
import Buttons from '../components/Button';


export default function App() {
    return (
      <View style={homeStyle.container}>
  
        <Image
          style={UIStyle.logo}
          source={require('../../assets/logo.png')}
        />
  
        <Buttons.MainNavButton title = "Start Workout" screenName = "WorkoutSetup"/>
  
        <View style = {UIStyle.space}/>
  
        <Buttons.MainNavButton title = "Combo List" screenName = "ComboList"/>
  
        <View style = {UIStyle.space}/>

        <View>
          <Text style={{flex: .2}}>Version 0.2.0 (Beta)</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }