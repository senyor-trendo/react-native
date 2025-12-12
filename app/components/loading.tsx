import React, { ReactNode } from 'react';
import {
	ActivityIndicator,
	Modal,
	StyleSheet,
	Text,
	View
} from 'react-native';

export interface LoadingConfig {
	visible: boolean;
	children?: ReactNode
}

export default function Loading({ children, visible }: LoadingConfig) {
	return (
		<Modal visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={() => {}}
		>
			<View style={styles.overlay}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#e7a843" />
					<Text style={styles.loadingText}>{children}</Text>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingContainer: {
		backgroundColor: 'white',
		padding: 30,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	loadingText: {
		marginTop: 15,
		fontSize: 18,
		fontWeight: '500',
		color: '#333',
	}
});