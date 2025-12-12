import React, { ReactNode } from 'react';
import {
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

export interface BookModalConfig {
	title: string,
	visible: boolean;
	onClose: () => void,
	children?: ReactNode
}

export default function BookModal({ visible, title, children, onClose }: BookModalConfig) {
	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>
						{title}
					</Text>

					{children}

					<TouchableOpacity
						style={[styles.modalBtn, styles.cancelBtn]}
						onPress={onClose}
					>
						<Text style={styles.cancelBtnText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		alignItems: 'center',
		justifyContent: 'center'
	},

	modalContent: {
		width: '80%',
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 20,
		elevation: 5
	},

	modalTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 20,
		textAlign: 'center'
	},

	modalBtn: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0'
	},
	cancelBtn: {
		marginTop: 10,
		borderBottomWidth: 0
	},

	cancelBtnText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#888'
	}
});