import { TouchableOpacity, Text } from "react-native";
import { UIStyle } from "../utils/styles";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient }  from 'expo-linear-gradient';

function MainNavButton(props) {
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

function SecondaryNavButton(props) {
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

function DeleteButton(props) {
  const { onPress, title } = props;

  return (
    <TouchableOpacity style={UIStyle.deleteButton} onPress={onPress}>
      <Text style={UIStyle.deleteButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function GradientButton({ title, onPress, colour1, colour2 }){
  return (
    <TouchableOpacity style={UIStyle.addComboButton} onPress={onPress}>
      <LinearGradient
        colors={[colour1, colour2]}
        style={UIStyle.buttonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={UIStyle.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

function BasicButton({ title, onPress }){
  return (
    <TouchableOpacity style={UIStyle.basicButton} onPress={onPress}>
        <Text style={UIStyle.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

 export default { MainNavButton, SecondaryNavButton, DeleteButton, GradientButton, BasicButton }; 
  
  