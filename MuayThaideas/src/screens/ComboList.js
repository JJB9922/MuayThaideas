import { View, Image, Text, ScrollView, SafeAreaView } from 'react-native';
import { homeStyle, UIStyle } from '../utils/styles';
import ComboLists from '../utils/database';


export default function App() {
  return (
    <SafeAreaView style = {homeStyle.container}>
      <ScrollView style = {UIStyle.scrollview}>

        <ComboLists.GetUserComboList />
        <View style={UIStyle.space}/>
        <Text style={UIStyle.mainHeaders}> Default Combinations: </Text>
        <ComboLists.GetDefaultComboList />
        
      </ScrollView>
    </SafeAreaView>
    );
  }