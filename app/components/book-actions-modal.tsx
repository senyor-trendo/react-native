import React from 'react';
import {
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { Book } from './book-list';

export enum BookActionType {
	Delete, RefeshAvailability
}
export interface BookActionsConfig {
	item?: Book,
	visible: boolean;
	onAction: (action: BookActionType, item: Book | undefined) => void,
	onClose: () => void
}

export default function BookActions({ visible, item, onAction, onClose }: BookActionsConfig) {
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
						{item?.data?.title || item?.search}
					</Text>

					<TouchableOpacity style={styles.modalBtn} onPress={() => onAction(BookActionType.Delete, item)}>
						<Text style={styles.modalBtnText}>🗑️ Delete</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.modalBtn} onPress={() => onAction(BookActionType.RefeshAvailability, item)}>
						<Text style={styles.modalBtnText}>🔄 Reload Availability</Text>
					</TouchableOpacity>

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

	modalBtnText: {
		fontSize: 16,
		textAlign: 'left'
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