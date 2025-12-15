import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Title from '../components/title';

export default function Tab() {
	const [selectedLibraries, setSelectedLibraries] = useState([]);

	return (
		<View style={styles.container}>
			<View style={{flex: 1}}>
				<Title headerType='main'>Search History</Title>
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
