import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <View>
      <Text style={styles.backgroud}>oi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroud: {
    backgroundColor: '#f3f3f3',
  },
});

export default App;
