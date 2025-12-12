import React from 'react';
import BookModal from './book-modal';

export interface BookNotFoundConfig {
	visible: boolean;
	onClose: () => void
}

export default function BookNotFound({ visible, onClose }: BookNotFoundConfig) {
	return (
		<BookModal title={'No results found for the current search'} visible={visible} onClose={onClose}></BookModal>
	);
}