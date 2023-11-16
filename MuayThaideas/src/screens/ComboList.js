import { View, Image, Text } from 'react-native';
import { homeStyle, UIStyle } from '../utils/styles';
import GetComboList from '../utils/database';


export default function App() {
    return (
      <View style={homeStyle.container}>
        <GetComboList />
      </View>
    );
  }