import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { homeStyle, UIStyle } from '../utils/styles';
import Buttons from '../components/Button';


export default function App() {
    return (
      <View style={homeStyle.container}>
  
        <Image
          style={UIStyle.logo}
          source={require('../../assets/logo.png')}
        />
  
        <Buttons.MainButton title = "Start Workout" screenName = "Workout"/>
  
        <View style = {UIStyle.space}/>
  
        <Buttons.SecondaryButton title = "Combo List" screenName = "ComboList"/>
  
        <View style = {UIStyle.space}/>
  
        <Buttons.SecondaryButton title = "Fighter Details" screenName = "FighterDetails"/>
  
        <View style = {UIStyle.space}/>
  
        <StatusBar style="auto" />
      </View>
    );
  }