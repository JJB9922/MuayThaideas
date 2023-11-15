import { TouchableOpacity, Text } from "react-native";
import { UIStyle } from "../utils/styles";
import { useNavigation } from '@react-navigation/native';

function MainButton(props) {
    const navigation = useNavigation();
    const { onPress, screenName, title } = props;

    const handlePress = () => {
      navigation.navigate(screenName);

      if (onPress) {
        onPress();
      }
    };

    return (
      <TouchableOpacity style={UIStyle.mainButton} onPress={handlePress}>
        <Text style={UIStyle.mainButtonText}>{title}</Text>
      </TouchableOpacity>
    );
}

function SecondaryButton(props) {
  const navigation = useNavigation();
  const { onPress, screenName, title } = props;

  const handlePress = () => {
    navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity style={UIStyle.secondaryButton} onPress={handlePress}>
      <Text style={UIStyle.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

 export default { MainButton, SecondaryButton }; 
  
  