import 'react-native-reanimated';

import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './(tabs)';

export default function RootLayout() {

  return (
	<SafeAreaView style={styles.container}>
		<View style={styles.container}>
			<HomeScreen/>
		</View>
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container:{
		flex: 1
	},
	text: {
		fontWeight: 800
	}
})
