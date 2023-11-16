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
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },

    mainButtonText: {
        color: '#fff',
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
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    mainHeaders: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        lineHeight: 64,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        textAlign: 'center',
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
      flex: 1,
      marginHorizontal: 20,
    }
})
