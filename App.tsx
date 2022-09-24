import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Home } from './src/components/Home';
import { theme } from './src/styles/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        style="light"
        backgroundColor='transparent'
        translucent 
      />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[700],
  }
});
