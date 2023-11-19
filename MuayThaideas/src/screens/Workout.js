import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UIStyle, homeStyle } from '../utils/styles';
import { useKeepAwake } from "expo-keep-awake";
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
  useKeepAwake();

  const restTimerRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} minutes, ${seconds} seconds`;
  };


  useEffect(() => {
    if (!isWorkoutPaused) {
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
    if (roundTimeRemaining === 0) {
      setIsRoundActive(false);
      setRestTimeRemaining(restTime);
      setRoundTimeRemaining(roundTime * 60);
      setRandomCombo(null)
    } else if (restTimeRemaining === 0) {
      setIsRoundActive(true);
      setRestTimeRemaining(restTime);
      setRoundTimeRemaining(roundTime * 60);
      setRandomCombo();
    }
  }, [roundTimeRemaining, restTimeRemaining]);

  useEffect(() => {
    if (overallTimeRemaining === 0) {
      navigation.navigate('WorkoutSetup');
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
      if(RNG(0, 1) === 0){
        grabBuiltinBeginnerCombo();
      } else if (RNG(0, 1) === 1){
        grabBuiltinAdvancedCombo();
      }
    } else if (!beginner && advanced && userToggle){
      if(RNG(0, 1) === 0){
        grabUserCombo();
      } else if (RNG(0, 1) === 1){
        grabBuiltinAdvancedCombo();
      }
    } else if (beginner && advanced && userToggle){
      if(RNG(0, 1) === 0){
        grabBuiltinBeginnerCombo();
      } else if (RNG(0, 1) === 1){
        grabBuiltinAdvancedCombo();
      } else if (RNG(0, 1) === 2){
        grabUserCombo();
      }
    } else if (beginner && !advanced && userToggle){
      if(RNG(0, 1) === 0){
        grabBuiltinBeginnerCombo();
      } else if (RNG(0, 1) === 1){
        grabUserCombo();
      }
    } else if (beginner && advanced && userToggle) {
      if(RNG(0,2) === 0){
        grabBuiltinAdvancedCombo();
      } else if (RNG(0,2) == 1){
        grabBuiltinBeginnerCombo();
      } else if (RNG(0,2) == 2){
        grabUserCombo();
      }
    }
  }

  function RNG(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
    if(!isRoundActive){
      setRestTimeRemaining((prev) => (prev > 0 ? prev + 10 : 10));
    }
  };

  const handleCancelWorkout = () => {
    navigation.goBack();
  };

  return (
    <View style={homeStyle.container}>
      <View style={UIStyle.space}/>
      <View style={UIStyle.space}/>
      <View style={UIStyle.space}/>
      
      <Text style={UIStyle.subHeaders}>Workout Time Remaining: {formatTime(overallTimeRemaining)} seconds</Text>

      <View style={UIStyle.space}/>
      <View style={UIStyle.space}/>
      <View style={UIStyle.space}/>

      <Text style = {UIStyle.comboText}>
        {randomCombo !== null ? randomCombo : 'REST'}
      </Text>

      <View style={UIStyle.space}/>
      <View style={UIStyle.space}/>
      <View style={UIStyle.space}/>

      {isRoundActive && <Text style={UIStyle.subHeaders}>Round Time Remaining: {formatTime(roundTimeRemaining)}</Text>}
      {!isRoundActive && <Text style={UIStyle.subHeaders}>Rest Time Remaining: {formatTime(restTimeRemaining)}</Text>}

      <View style={UIStyle.space}/>
      <View style={UIStyle.space}/>
      <View style={UIStyle.space}/>
      

      <Buttons.WorkoutButton title={isWorkoutPaused ? "Resume" : "Pause"} onPress={handlePauseResume} colour1={'#2E4057'} colour2={'#495867'} />

      <Buttons.WorkoutButton title={isRoundActive ? "Skip Round" : "Skip Rest"} onPress={handleSkip} colour1={'#2E4057'} colour2={'#495867'}/>

      <Buttons.WorkoutButton title="Extend Rest" onPress={handleExtendRest} colour1={'#2E4057'} colour2={'#495867'}/>

      <Buttons.WorkoutButton title="Cancel Workout" onPress={handleCancelWorkout}  colour1={'#2E4057'} colour2={'#495867'}/>
    </View>
  );
};

export default WorkoutScreen;
