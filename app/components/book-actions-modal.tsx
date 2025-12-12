import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';
import { Book } from './book-list';
import BookModal from './book-modal';

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
		<BookModal title={item?.data?.title || item?.search || ''} visible={visible} onClose={onClose}>
			<TouchableOpacity style={styles.modalBtn} onPress={() => onAction(BookActionType.Delete, item)}>
				<Text style={styles.modalBtnText}>🗑️ Delete</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.modalBtn} onPress={() => onAction(BookActionType.RefeshAvailability, item)}>
				<Text style={styles.modalBtnText}>🔄 Reload Availability</Text>
			</TouchableOpacity>
		</BookModal>
	);
}

const styles = StyleSheet.create({
	modalBtn: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0'
	},

	modalBtnText: {
		fontSize: 16,
		textAlign: 'left'
	}
});