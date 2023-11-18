import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import Buttons from '../components/Button';
import { UIStyle, homeStyle } from '../utils/styles';


const WorkoutSettingsScreen = () => {
  const [workoutTime, setWorkoutTime] = useState(60);
  const [roundTime, setRoundTime] = useState(1);
  const [restTime, setRestTime] = useState(20);
  const [beginner, setBeginner] = useState(true);
  const [advanced, setAdvanced] = useState(false);
  const [userToggle, setUserToggle] = useState(false);

  const handleWorkoutTimeChange = (text) => {
    const enteredValue = parseInt(text);
    console.log(enteredValue)
    if (!isNaN(enteredValue) && enteredValue >= 10 && enteredValue <= 120) {
      console.log(enteredValue)
      setWorkoutTime(enteredValue.toString());
    } else {
      Alert.alert(
        'Invalid Workout Time',
        'Must be a time between 10 minutes and 120 minutes',
        [{ text: 'OK' }]
      );
      setWorkoutTime(60);
    }
  };

  const handleRoundTimeChange = (text) => {
    const enteredValue = parseInt(text, 10);
  
    if (!isNaN(enteredValue) && enteredValue >= 0.5 && enteredValue <= 5) {
      setRoundTime(enteredValue.toString());
    } else {
      Alert.alert(
        'Invalid Round Time',
        'Must be a time between 0.5 and 5 minutes',
        [{ text: 'OK' }]
      );
      setRoundTime(1);
    }
  };

  const handleRestTimeChange = (text) => {
    const enteredValue = parseInt(text, 10);
  
    if (enteredValue >= 0 && enteredValue <= 120) {
      setRestTime(enteredValue.toString());
    } else {
      Alert.alert(
        'Invalid Rest Time',
        'Must be a time between 0 and 120 seconds',
        [{ text: 'OK' }]
      );
      setRestTime(20);
    }
  };

  const handleIncrement = (param, maxValue) => {
    switch (param) {
      case 'workoutTime':
        setWorkoutTime((prev) => (prev + 10 <= maxValue ? prev + 10 : maxValue));
        break;
      case 'roundTime':
        setRoundTime((prev) => (prev + 0.5 <= maxValue ? prev + 0.5 : maxValue));
        break;
      case 'restTime':
        setRestTime((prev) => (prev + 10 <= maxValue ? prev + 10 : maxValue));
        break;
      default:
        break;
    }
  };

  const handleDecrement = (param, minValue) => {
    switch (param) {
      case 'workoutTime':
        setWorkoutTime((prev) => (prev - 10 >= minValue ? prev - 10 : minValue));
        break;
      case 'roundTime':
        setRoundTime((prev) => (prev - 0.5 >= minValue ? prev - 0.5 : minValue));
        break;
      case 'restTime':
        setRestTime((prev) => (prev - 10 >= minValue ? prev - 10 : minValue));
        break;
      default:
        break;
    }
  };

  const handleToggle = (toggleName) => {
    switch (toggleName) {
      case 'beginner':
        setBeginner((prev) => !prev);
        break;
      case 'advanced':
        setAdvanced((prev) => !prev);
        break;
      case 'userToggle':
        setUserToggle((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <View style = {homeStyle.container}>
      <View style={UIStyle.space}/>
      <Text style = {UIStyle.mainHeaders}>CONFIGURE WORKOUT</Text>
      <View style={UIStyle.space}/>
      <View style={UIStyle.smallSpace}/>

      <Text style = {UIStyle.subHeaders}>Workout Time (minutes):</Text>
      <View style = {UIStyle.gridContainer}>
        <Buttons.MiniButton style = {UIStyle.gridItem} title="-" onPress={() => handleDecrement('workoutTime', 10)} />
        <View style={[UIStyle.space]} />
        <TextInput style={[UIStyle.textInput, UIStyle.gridItem]}
                   placeholder='60'
                   keyboardType='numeric'
                   value={workoutTime.toString()}
                   onEndEditing={(event) => handleWorkoutTimeChange(event.nativeEvent.text)}
                   onChangeText={setWorkoutTime} />
        <View style={UIStyle.space} />
        <Buttons.MiniButton style = {UIStyle.gridItem} title="+" onPress={() => handleIncrement('workoutTime', 120)} />
      </View>

      <Text style = {UIStyle.subHeaders}>Round Time (minutes):</Text>
      <View style = {UIStyle.gridContainer}>
        <Buttons.MiniButton style = {UIStyle.gridItem} title="-" onPress={() => handleDecrement('roundTime', 0.5)} />
        <View style={[UIStyle.space]} />
        <TextInput style={[UIStyle.textInput, UIStyle.gridItem]}
                   placeholder='1'
                   value={roundTime.toString()}
                   keyboardType='numeric'
                   onEndEditing={(event) => handleRoundTimeChange(event.nativeEvent.text)}
                   onChangeText={setRoundTime} />
        <View style={UIStyle.space} />
        <Buttons.MiniButton style = {UIStyle.gridItem} title="+" onPress={() => handleIncrement('roundTime', 5)} />
      </View>

      <Text style = {UIStyle.subHeaders}>Rest Time (seconds):</Text>
      <View style = {UIStyle.gridContainer}>
        <Buttons.MiniButton style = {UIStyle.gridItem} title="-" onPress={() => handleDecrement('restTime', 0)} />
        <View style={[UIStyle.space]} />
        <TextInput style={[UIStyle.textInput, UIStyle.gridItem]}
                   placeholder='1'
                   value={restTime.toString()}
                   keyboardType='numeric'
                   onEndEditing={(event) => handleRestTimeChange(event.nativeEvent.text)}
                   onChangeText={setRestTime} />
        <View style={UIStyle.space} />
        <Buttons.MiniButton style = {UIStyle.gridItem} title="+" onPress={() => handleIncrement('restTime', 120)} />
      </View>

      <Text style = {UIStyle.subHeaders}>Toggle Beginner Combinations: {beginner ? 'ON' : 'OFF'}</Text>
      <Switch 
      value={beginner} 
      onValueChange={() => handleToggle('beginner')} 
      trackColor={{true: '#2E4057', false: '#495867'}}
      thumbColor='#D9CAB3'/>

      <Text style = {UIStyle.subHeaders}>Toggle Advanced Combinations: {advanced ? 'ON' : 'OFF'}</Text>
      <Switch 
      value={advanced} 
      onValueChange={() => handleToggle('advanced')} 
      trackColor={{true: '#2E4057', false: '#495867'}}
      thumbColor='#D9CAB3'/>
      
      <Text style = {UIStyle.subHeaders}>Toggle User Combinations: {userToggle ? 'ON' : 'OFF'}</Text>
      <Switch 
      value={userToggle} 
      onValueChange={() => handleToggle('userToggle')} 
      trackColor={{true: '#2E4057', false: '#495867'}}
      thumbColor='#D9CAB3'/>


      <Buttons.StartWorkoutButton
      title="Start Workout" 
      colour1={'#90323D'} 
      colour2={'#5E0B15'}
      screenName="Workout"
      params = {{
        workoutTime: parseFloat(workoutTime, 10),
        roundTime: parseFloat(roundTime, 10),
        restTime: parseFloat(restTime, 10),
        beginner: beginner,
        advanced: advanced,
        userToggle: userToggle,
      }} />
    </View>
  );
};

export default WorkoutSettingsScreen;
