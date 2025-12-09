import 'react-native-reanimated';

import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from './components/search';

export default function RootLayout() {

	function handleSearch(text:string){
		console.log(text)
	}

  return (
	<SafeAreaView style={styles.container}>
		<View style={styles.container}>
			<Search onSubmit={handleSearch}></Search>
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
