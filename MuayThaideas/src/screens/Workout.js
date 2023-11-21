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

  let comboList = [];
  
  const handleSetComboList = (result) => {
    for (let i = 0; i < result.rows.length; i++) {
      const combo = result.rows._array[i].combo;

      if (!comboList.includes(combo)) {
        comboList.push(combo);
      }
    }
      assignRandomCombo(comboList);
  };
  
  useEffect(() => {
    getRandomCombo();
  }, []);

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
      navigation.navigate('WorkoutSetup');
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
      getRandomCombo();
    }
  }, [roundTimeRemaining, restTimeRemaining]);

  useEffect(() => {
    if (overallTimeRemaining === 0) {
      navigation.navigate('WorkoutSetup');
    }
  }, [overallTimeRemaining, navigation]);


  const assignRandomCombo = (comboList) => {
      const rng = RNG(0, comboList.length);
      setRandomCombo(comboList[rng]);
    }
  

  function grabUserCombo(){
    ComboList.grabRandomUserCombo((error, result) => {
      if (error) {
        console.error(error);
      } else {
        handleSetComboList(result);
      }
    });
  }

  function grabBuiltinBeginnerCombo(){
    ComboList.grabRandomBuiltinBeginnerCombo((error, result) => {
      if (error) {
        console.error(error);
      } else {
        handleSetComboList(result);
      }
    });
  }

  function grabBuiltinAdvancedCombo(){
    ComboList.grabRandomBuiltinAdvancedCombo((error, result) => {
      if (error) {
        console.error(error);
      } else {
        handleSetComboList(result);
      }
    });
  }

  function getRandomCombo(){ 
    if(beginner){
      grabBuiltinBeginnerCombo();
    }

    if(advanced){
      grabBuiltinAdvancedCombo();
    }

    if(userToggle){
      grabUserCombo();
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
      setRoundTimeRemaining(0);
    } else {
      setRestTimeRemaining(0);
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
      
      <Text style={UIStyle.subHeaders}>Workout Time Remaining:</Text>
      <Text style={UIStyle.subHeaders}>{formatTime(overallTimeRemaining)} seconds</Text>

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
      <View style={UIStyle.space}/>

      <Buttons.WorkoutButton title={isWorkoutPaused ? "Resume" : "Pause"} onPress={handlePauseResume} colour1={'#2E4057'} colour2={'#495867'} />
      <View style={UIStyle.space}/>
      <Buttons.WorkoutButton title={isRoundActive ? "Skip Round" : "Skip Rest"} onPress={handleSkip} colour1={'#2E4057'} colour2={'#495867'}/>
      <View style={UIStyle.space}/>
      <Buttons.WorkoutButton title="Extend Rest" onPress={handleExtendRest} colour1={'#2E4057'} colour2={'#495867'}/>
      <View style={UIStyle.space}/>
      <Buttons.WorkoutButton title="Cancel Workout" onPress={handleCancelWorkout}  colour1={'#2E4057'} colour2={'#495867'}/>
    </View>
  );
};

export default WorkoutScreen;
