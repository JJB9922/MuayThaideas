import { StyleSheet } from 'react-native';

  // colour pa:
    // #5E0B15 - Dark Red
    // #90323D - Light Red
    // #D9CAB3 - Cream/White 
    // #BC8034 - Bronze
    // #8C7A6B - Brown

export const homeStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#D9CAB3',
        alignItems: 'center',
        overflow: "scroll"
    },
  });

export const UIStyle = StyleSheet.create({
    logo: {
        width: 400,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainButton: {
        width: "80%",
        paddingVertical: 32,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#5E0B15',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5E0B15',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
    },

    mainButtonText: {
        color: '#D9CAB3',
        fontSize: 16,
        fontWeight: 'bold',
    },

    secondaryButton: {
        width: "80%",
        paddingVertical: 32,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#90323D',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#90323D',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },

    secondaryButtonText: {
        color: '#D9CAB3',
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

    space:{
        height: 20,
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

    buttonGradient: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },

    basicButton: {
      backgroundColor: '#BC8034',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },

    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },

    grid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    element: {
      flex: 1,
    },

    textInput: {
      width: '80%',
      height: 40,
      padding: 10,
      borderColor: '#BC8034',
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
