import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LibraryConfig from '../components/library-config';

export default function Tab() {
	const [selectedLibraries, setSelectedLibraries] = useState([]);

	function handleSelection(ids:string[]){
		console.log(ids)
	}

	return (
		<View style={styles.container}>
			<View style={{flex: 1}}>
				<LibraryConfig initialSelectedIds={selectedLibraries} onSelectionChange={handleSelection}></LibraryConfig>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
