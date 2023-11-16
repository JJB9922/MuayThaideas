import * as SQLite from 'expo-sqlite';
import { Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { homeStyle, UIStyle } from './styles';

export default GetComboList = () => {
  const db = SQLite.openDatabase("ComboDatabase.db")
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
    db.transaction(tx => {
      tx.executeSql('DELETE FROM combos WHERE id = ?', [id],
        (txObj, resultSet) => {
          if(resultSet.rowsAffected > 0){
            let existingCombos = [...combos].filter(combo => combo.id !== id);
            setCombos(existingCombos);
          }
        },
        (txObj, error) => console.log(error)
      )
    })
  }

  const updateCombo = (id) => {
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
  }

  const showCombos = () => {
    return combos.map((combo, index) => {
      return(
        <View key={index} style={UIStyle.row}>
          <Text>{combo.combo}</Text>
          <Button title='Delete' onPress={() => deleteCombo(combo.id)} />
          <Button title='Update' onPress={() => updateCombo(combo.id)} />
        </View>
      );
    });
  };

  return(
    <View style = {homeStyle.container}>
      <TextInput value={currentCombo} placeholder='Input Combo...' onChangeText={setCurrentCombo}/>
      <Button title='Add Combo' onPress ={addCombo} />
      {showCombos()}
    </View>
  )
}

