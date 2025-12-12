import { extractBookInfo, extractBookStatus } from '@/utils/parser';
import doSearch from '@/utils/search';
import { useState } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import BookActions, { BookActionType } from './components/book-actions';
import BookList, { Book } from './components/book-list';
import Search from './components/search';

export default function HomeScreen() {
	const [items, setItems] = useState<Book[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState<Book | undefined>(undefined);

	async function handleLongPress(item: Book) {
		setSelectedItem(item);
		setModalVisible(true);
	}
	
	async function reloadStatus(book: Book) {
		doSearch(book.search).then(html => {
			try {
				const status = extractBookStatus(html);

				setItems(prev =>
					prev.map(item => {
						if (selectedItem) {
							return {
								...item,
								lastSearch: Date.now(),
								status: status,
								error: false
							}
						}

						return item;
					})
				);
			} catch (err) {
				console.error(err);
			}
		})
	}

	async function handleSearch(text: string) {
		//do not allow dupicates
		if (items.some(book => book.search === text)) {
			return;
		}

		doSearch(text).then(html => {
			try {
				const bookInfo = extractBookInfo(html);
				const bookStatus = extractBookStatus(html);
				setItems(prevItems => [...prevItems, {
					lastSearch: Date.now(),
					search: text,
					error: false,
					responseLength: html.length,
					data: bookInfo,
					status: bookStatus
				}]);

			}
			catch (error: any) {
				console.error('Error in handleSearch:', error);

				//TODO: show error
			}
		})
	}

	function handleAction(action: BookActionType, book: Book|undefined) {
		if(book){
			switch (action) {
				case BookActionType.Delete:
					setItems(prev => prev.filter(item => item !== book));
					break;

				case BookActionType.RefeshAvailability:
					reloadStatus(book);
					break;
			}
		}

		setModalVisible(false);
		setSelectedItem(undefined);
		console.log(action, book);
	}

	return (
		<View style={styles.container}>
			<Search onSubmit={handleSearch} />
			<BookList books={items} onLongPress={handleLongPress} />
			<BookActions item={selectedItem} visible={modalVisible} onClose={() => setModalVisible(false)} onAction={handleAction}></BookActions>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
});
