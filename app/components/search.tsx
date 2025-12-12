import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Button from './pressable-button';

interface SearchProps {
	disabled?: boolean,
	onSubmit: (text: string) => void;
}
export default function Search({ disabled, onSubmit }: SearchProps) {
	
	const [text, setText] = useState('');

	function handleText(currentText:string){
		setText(currentText);
	}
	function handleSubmit(){
		onSubmit(text);
	}
	function isDisabled(){
		return !text || disabled;
	}

	return (
		<View style={styles.container}>
			<TextInput style={styles.input} placeholder='Search book...' 
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText={handleText} value={text} 
				onSubmitEditing={handleSubmit}></TextInput>
			<Button title='Search' onPress={handleSubmit} disabled={isDisabled()}></Button>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		flex: 1,
		borderColor: '#ccc',
		borderWidth: 2,
		borderRadius: 0
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		justifyContent: 'space-between',
		margin: 8
	},
	button: {
		backgroundColor: '#007AFF',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		minWidth: 100,
		alignItems: 'center',
	},
	button_disabled: {
		backgroundColor: '#C7C7CC',
	},
	button_pressed: {
		backgroundColor: '#0056CC',
		transform: [{ scale: 0.98 }],
	},
	text: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
	text_disabled: {
		color: '#8E8E93',
	},
	text_pressed: {
		opacity: 0.8,
	},
});
