// WorkoutScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UIStyle, homeStyle } from '../utils/styles';
import Buttons from '../components/Button'
import ComboList from '../utils/database'

const WorkoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    workoutTime,
    roundTime,
    restTime,
    beginner,
    advanced,
    userToggle,
  } = route.params;

  const [isWorkoutPaused, setIsWorkoutPaused] = useState(false);
  const [overallTimeRemaining, setOverallTimeRemaining] = useState(workoutTime * 60);
  const [isRoundActive, setIsRoundActive] = useState(true);
  const [roundTimeRemaining, setRoundTimeRemaining] = useState(roundTime * 60 + 5);
  const [restTimeRemaining, setRestTimeRemaining] = useState(restTime);
  const [randomCombo, setRandomCombo] = useState(null);
  const restTimerRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} minutes, ${seconds} seconds`;
  };

  useEffect(() => {
    if (!isWorkoutPaused) {
      getRandomCombo();
      const workoutTimer = setInterval(() => {
        setOverallTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(workoutTimer);
    }
  }, [isWorkoutPaused]);

  useEffect(() => {
    if (overallTimeRemaining === 0) {
      navigation.navigate('WorkoutEndScreen');
    }
  }, [overallTimeRemaining, navigation]);

  useEffect(() => {
    if (overallTimeRemaining === 0) {
      navigation.navigate('WorkoutEndScreen');
    }
  }, [overallTimeRemaining, navigation]);

  useEffect(() => {
    if (!userToggle && !advanced && !beginner) {
      Alert.alert(
        'Please select at least one combo category to continue',
        '',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
      navigation.navigate('WorkoutSetup');
    }
  }, [userToggle, advanced, beginner, navigation]);

  useEffect(() => {

    if (isRoundActive && !isWorkoutPaused) {
      getRandomCombo();
      const roundTimer = setInterval(() => {
        setRoundTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(roundTimer);

      }else if (!isRoundActive && !isWorkoutPaused && restTimeRemaining > 0 && restTimerRef.current === null) {
        restTimerRef.current = setInterval(() => {
          setRestTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
    
        return () => {
          clearInterval(restTimerRef.current);
          restTimerRef.current = null;
        };
      }
  }, [isRoundActive, isWorkoutPaused, restTimeRemaining]);
  
  useEffect(() => {
    // Switch between round and rest timers
    if (roundTimeRemaining === 0) {
      setRestTimeRemaining(restTime);
      setIsRoundActive(false);
    } else if (restTimeRemaining === 0) {
      setRoundTimeRemaining(roundTime * 60);
      setIsRoundActive(true);
      getRandomCombo();
    }
  }, [roundTimeRemaining, restTimeRemaining]);

  useEffect(() => {
    // Handle workout end
    if (overallTimeRemaining === 0) {
      // Navigate to a screen indicating the workout is over
      navigation.navigate('WorkoutEndScreen');
    }
  }, [overallTimeRemaining, navigation]);

  function grabUserCombo(){
    ComboList.grabRandomUserCombo((error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result)
        setRandomCombo(result);
      }
    });
  }

  function grabBuiltinBeginnerCombo(){
    ComboList.grabRandomBuiltinBeginnerCombo((error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result)
        setRandomCombo(result);
      }
    });
  }

  function grabBuiltinAdvancedCombo(){
    ComboList.grabRandomBuiltinAdvancedCombo((error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result)
        setRandomCombo(result);
      }
    });
  }

  function getRandomCombo(){ 
    //if you see this, I am very tired and my brain won't think of a better way
    if(beginner && !advanced && !userToggle){
      grabBuiltinBeginnerCombo();
    } else if (advanced && !beginner && !userToggle) {
      grabBuiltinAdvancedCombo();
    } else if (userToggle && !beginner && !advanced){
      grabUserCombo();
    } else if (beginner && advanced && !userToggle){
      let rn = RNG(0, 1);
      if(rn === 0){
        grabBuiltinBeginnerCombo();
      } else if (rn === 1){
        grabBuiltinAdvancedCombo();
      }
    } else if (!beginner && advanced && userToggle){
      let rn = RNG(0, 1);
      if(rn === 0){
        grabUserCombo();
      } else if (rn === 1){
        grabBuiltinAdvancedCombo();
      }
    } else if (beginner && advanced && userToggle){
      let rn = RNG(0, 2);
      if(rn === 0){
        grabBuiltinBeginnerCombo();
      } else if (rn === 1){
        grabBuiltinAdvancedCombo();
      } else if (rn === 2){
        grabUserCombo();
      }
    } else if (beginner && !advanced && userToggle){
      let rn = RNG(0, 1);
      if(rn === 0){
        grabBuiltinBeginnerCombo();
      } else if (rn === 1){
        grabUserCombo();
      }
    }
  }

  function RNG(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Other logic for round, rest, and combo display

  const handlePauseResume = () => {
    setIsWorkoutPaused((prev) => !prev);
  };

  const handleSkip = () => {
    if(isRoundActive){
      setIsRoundActive(false);
      setRoundTimeRemaining(roundTime * 60);
      setRandomCombo(null)
    } else {
      setIsRoundActive(true);
      setRestTimeRemaining(restTime);
    }
  };

  const handleExtendRest = () => {
    // Logic to extend the rest time
  };

  const handleCancelWorkout = () => {
    // Logic to navigate back to the home screen or any other desired action
    navigation.goBack();
  };

  return (
    <View style={homeStyle.container}>
      <Text>Workout Time Remaining: {formatTime(overallTimeRemaining)} seconds</Text>

      <Text style = {UIStyle.comboText}>
        {randomCombo !== null ? randomCombo : 'REST'}
      </Text>

      {isRoundActive && <Text>Round Time Remaining: {formatTime(roundTimeRemaining)}</Text>}
      {!isRoundActive && <Text>Rest Time Remaining: {formatTime(restTimeRemaining)}</Text>}

      <View style={UIStyle.space}/>
      <Buttons.GradientButton title={isWorkoutPaused ? "Resume" : "Pause"} onPress={handlePauseResume} colour1={'#BC8034'} colour2={'#8C7A6B'}/>
      <View style={UIStyle.space}/>
      <Buttons.GradientButton title={isRoundActive ? "Skip Round" : "Skip Rest"} onPress={handleSkip} colour1={'#BC8034'} colour2={'#8C7A6B'}/>
      <View style={UIStyle.space}/>
      <Buttons.GradientButton title="Extend Rest" onPress={handleExtendRest} colour1={'#BC8034'} colour2={'#8C7A6B'}/>
      <View style={UIStyle.space}/>
      <Buttons.GradientButton title="Cancel Workout" onPress={handleCancelWorkout} colour1={'#BC8034'} colour2={'#8C7A6B'}/>
    </View>
  );
};

export default WorkoutScreen;
