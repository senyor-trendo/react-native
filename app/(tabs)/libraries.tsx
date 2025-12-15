// app/(tabs)/libraries-screen.tsx
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LibraryConfig from '../components/library-config';

const LIBRARIES_CONFIG_KEY = '@app_libraries';

export default function LibrariesScreen() { // Changed from "Tab" to "LibrariesScreen"
	const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);

	// Load saved config on mount
	useEffect(() =>{loadConfig()}, []);

	const loadConfig = async () => {
//		await AsyncStorage.getItem(LIBRARIES_CONFIG_KEY)
	// 	try {
	// 		const savedConfig = await AsyncStorage.getItem(LIBRARIES_CONFIG_KEY);
	// 		if (savedConfig) {
	// 			const config: string[] = JSON.parse(savedConfig);
	// 			setSelectedLibraries(config || []);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error loading config:', error);
	// 	}
	};

	// const saveConfig = async (libraries: string[]) => {
	// 	try {
	// 		await AsyncStorage.setItem(LIBRARIES_CONFIG_KEY, JSON.stringify(libraries));
	// 		console.log('Config saved:', libraries);
	// 	} catch (error) {
	// 		console.error('Error saving config:', error);
	// 	}
	// };

	const handleSelectionChange = (libraryIds: string[]) => {
		setSelectedLibraries(libraryIds);
		//saveConfig(libraryIds);
	};

	return (
		<View style={styles.container}>
			<LibraryConfig
				initialSelectedIds={selectedLibraries}
				onSelectionChange={handleSelectionChange}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});