import { StyleSheet } from 'react-native';

  // colour pa:
    // #5E0B15 - Dark Red
    // #90323D - Light Red
    // #D9CAB3 - Cream/White 
    // #2E4057 - Bronze
    // #495867 - Brown

    // #2E4057 - Green
    // #495867 - Dark

export const homeStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#D9CAB3',
        alignItems: 'center',
        overflow: "scroll",
    },
  });

export const UIStyle = StyleSheet.create({
    logo: {
        width: 400,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },

    shadow: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 10, 
      shadowOffset: { width: 0, height: 5 }, 
    },

    buttonContainer: {
      margin: 5,
      width: "80%",
      borderRadius: 8,
    },

    buttonContent: {
      backgroundColor: '#495867', 
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttonText: {
      color: '#D9CAB3r', 
      fontSize: 16,
      fontWeight: 'bold',
    },

    mainHeaders: {
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      textAlign: 'center',
      color: '#333', // A dark text color
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },

    comboText: {
      fontSize: 36,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      textAlign: 'center',
      color: '#5E0B15', // A dark text color
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      elevation: 3
    },

    subHeaders: {
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      textAlign: 'center',
      color: '#333',
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      elevation: 3
    },

    space:{
        height: 20,
        width: 20,
    },

    smallSpace:{
      height: 5,
      width: 5
    },

    headerStyle: {
      backgroundColor: '#D9CAB3',
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      margin: 8
    },

    scrollview: {
      marginHorizontal: 20,
      marginVertical: 20,
    },

    deleteButton: {
      backgroundColor: '#90323D',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },

    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },

    addComboButton: {
      borderRadius: 8,
      overflow: 'hidden',
    },

    LargeButton: {
      borderRadius: 8,
      overflow: 'visible',
      width: '60%',
      height: '60%',
      paddingVertical: 10,
      paddingHorizontal: 10,
    },

    buttonGradient: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },

    workoutButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      width: 200,  // Set the width you want for all buttons
      height: 50,  // Set the height you want for all buttons
    },

    smallGradientButton: {
      paddingVertical: 10,
      borderRadius: 8,
      width: "100%",
      alignItems: 'center',
    },

    basicButton: {
      backgroundColor: '#2E4057',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: "80%",
      alignItems: 'center',
    },

    miniButton: {
      backgroundColor: '#2E4057',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },

    buttonText: {
      color: '#D9CAB3',
      fontWeight: 'bold',
    },

    grid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 16,
    },

    gridItem: {
      width: '30%',
      paddingHorizontal: 8,
    },

    element: {
      flex: 1,
    },

    textInput: {
      width: '80%',
      height: 40,
      padding: 10,
      borderColor: '#2E4057',
      borderWidth: 2,
      borderRadius: 8,
      fontSize: 16,
      color: '#333',
    },

    textInputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D9CAB3',
    },

})
