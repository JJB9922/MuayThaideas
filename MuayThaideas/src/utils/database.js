import * as SQLite from 'expo-sqlite';
import { Text, View, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { homeStyle, UIStyle } from './styles';
import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset";
import Buttons from '../components/Button';

async function openDatabase() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require("../../assets/sqlite.db")).uri,
    FileSystem.documentDirectory + "SQLite/sqlite.db"
  );
  return SQLite.openDatabase("sqlite.db","1.0");
}

function GetDefaultComboList(){
  const db = openDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    openDatabase()
    .then(db => 
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS defaultcombos (id INTEGER PRIMARY KEY AUTOINCREMENT, combo TEXT, level TEXT)');
    }));

    openDatabase()
    .then(db => 
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM defaultcombos', null,
        (txObj, resultSet) => {setCombos(resultSet.rows._array)
                              console.log(resultSet)},
        (txObj, error) => console.log(error)
      );
    }));

    setIsLoading(false);
    
  }, [])

  if(isLoading) {
    return(
      <View style={homeStyle.container}>
        <Text style={UIStyle.mainHeaders}> Loading Default Combos... </Text>
      </View>
    )
  }

  const showCombos = () => {
    return combos.map((combo, index) => {
      return(
        <View key={index} style={UIStyle.row}>
          <Text>{combo.combo}</Text>
        </View>
      );
    });
  };

  return(
    <SafeAreaView style = {homeStyle.container}>
      <ScrollView style = {UIStyle.scrollview}>
        {showCombos()}
      </ScrollView>
    </SafeAreaView>
  )
}

function GetUserComboList(){
  const db = SQLite.openDatabase('UserCombos.db');
  const [isLoading, setIsLoading] = useState(true);
  const [combos, setCombos] = useState([]);
  const [currentCombo, setCurrentCombo] = useState(undefined);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS combos (id INTEGER PRIMARY KEY AUTOINCREMENT, combo TEXT, level TEXT)');
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM combos', null,
        (txObj, resultSet) => setCombos(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
    
  }, [])

  if(isLoading) {
    return(
      <View style={homeStyle.container}>
        <Text style={UIStyle.mainHeaders}> Loading Combos... </Text>
      </View>
    )
  }

  const addCombo = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO combos (combo, level) values (?, ?)', [currentCombo, "User"],
        (txObj, resultSet) => {
          if(currentCombo !== undefined){
            let existingCombos = [...combos];
            existingCombos.push({id: resultSet.insertId, combo: currentCombo, level: "User"})
            setCombos(existingCombos);
            setCurrentCombo(undefined);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  }

  const deleteCombo = (id) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this combination?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => confirmDelete(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  
  const confirmDelete = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM combos WHERE id = ?',
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              let existingCombos = [...combos].filter((combo) => combo.id !== id);
              setCombos(existingCombos);
            }
          },
          (txObj, error) => console.log(error)
        );
      },
      (error) => console.log(error),
      () => console.log('Deleted combo successfully')
    );
  };

  const updateCombo = (id) => {
    if(currentCombo !== undefined){
    db.transaction(tx => {
      tx.executeSql('UPDATE combos SET combo = ? WHERE id = ?', [currentCombo, id],
        (txObj, resultSet) => {
          
            if(resultSet.rowsAffected > 0){
              let existingCombos = [...combos];
              const indexToUpdate = existingCombos.findIndex(combo => combo.id === id);
              existingCombos[indexToUpdate].combo = currentCombo;
              setCombos(existingCombos);
              setCurrentCombo(undefined);
            }
        
        },
        (txObj, error) => console.log(error)
      )
    })
  }}


  const showCombos = () => {
    return combos.map((combo, index) => {
      return(
        <View key={index} style={UIStyle.row}>
          <View style = {UIStyle.grid}>

          <View style = {UIStyle.element}>
            <Text>{combo.combo}</Text>
          </View>
            <Buttons.DeleteButton title='🗑 ' onPress={() => deleteCombo(combo.id)}/>
            <View style={UIStyle.smallSpace}/>
            <Buttons.MiniButton title='✎' onPress={() => updateCombo(combo.id)} />
            
          </View>
        </View>
      );
    });
  };


  return(
      <View>
        <View style={UIStyle.textInputContainer}>
          <TextInput style={UIStyle.textInput} value={currentCombo} placeholder='Input Combo...' onChangeText={setCurrentCombo}/>
        </View>
        <View style={UIStyle.space}/>
        <Buttons.GradientButton title='Add Combo' onPress ={addCombo} colour1={'#BC8034'} colour2={'#8C7A6B'}/>
        {showCombos()}
      </View>
  )
}

function grabRandomUserCombo(callback) {
  const db = SQLite.openDatabase('UserCombos.db');
  
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM combos',
        null,
        (_, resultSet) => {
          // Check if there is at least one row
          console.log(resultSet.rows.length)
          if (resultSet.rows.length > 0) {
            const randomCombo = resultSet.rows.item(Math.floor(Math.random() * ((resultSet.rows.length-1) - 0 + 1)) + 0).combo;        
            callback(null, randomCombo);
          } else {
            callback('No combos found');
          }
        },
        (_, error) => callback(error)
      );
    },
    (error) => callback(error),
    () => console.log('Transaction completed')
  );
}

function grabRandomBuiltinBeginnerCombo(callback, level) {
  const db = openDatabase();
  openDatabase()
    .then(db => 

  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM defaultcombos WHERE level = "Beginner"',
        null,
        (_, resultSet) => {
          // Check if there is at least one row
          console.log(resultSet.rows.length)
          if (resultSet.rows.length > 0) {
            const randomCombo = resultSet.rows.item(Math.floor(Math.random() * ((resultSet.rows.length-1) - 0 + 1)) + 0).combo;        
            callback(null, randomCombo);
          } else {
            callback('No combos found');
          }
        },
        (_, error) => callback(error)
      );
    },
    (error) => callback(error),
    () => console.log('Transaction completed')
  ));
}

function grabRandomBuiltinAdvancedCombo(callback, level) {
  const db = openDatabase();
  openDatabase()
    .then(db => 

  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM defaultcombos WHERE level = "Advanced"',
        null,
        (_, resultSet) => {
          // Check if there is at least one row
          console.log(resultSet.rows.length)
          if (resultSet.rows.length > 0) {
            const randomCombo = resultSet.rows.item(Math.floor(Math.random() * ((resultSet.rows.length-1) - 0 + 1)) + 0).combo;        
            callback(null, randomCombo);
          } else {
            callback('No combos found');
          }
        },
        (_, error) => callback(error)
      );
    },
    (error) => callback(error),
    () => console.log('Transaction completed')
  ));
}


export default { GetDefaultComboList, GetUserComboList, grabRandomUserCombo, grabRandomBuiltinBeginnerCombo, grabRandomBuiltinAdvancedCombo };