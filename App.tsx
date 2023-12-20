import React from 'react';
import {LogBox} from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return <StackNavigation />;
};

export default App;

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import ButtonComp from './src/components/ButtonComp';
// import InputTextComp from './src/components/InputTextComp';

// const App = () => {
//   return (
//     <View style={styles.constiner}>
//       <ButtonComp ButtontestID="Testing_Button" title="Testing Button" />
//       <InputTextComp inputTestID="InputText_Test_ID" />
//       <Text>App</Text>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   constiner: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });
