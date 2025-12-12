import { checkPageType, extractBookInfo, extractBookStatus } from '@/utils/parser';
import { PageType } from '@/utils/parser.model';
import doSearch from '@/utils/search';
import { useState } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import BookActions, { BookActionType } from './components/book-actions-modal';
import BookList, { Book } from './components/book-list';
import BookNotFound from './components/book-not-found-modal';
import Loading from './components/loading';
import Search from './components/search';

export default function HomeScreen() {
	const [items, setItems] = useState<Book[]>([]);
	const [actionsVisible, setActionsVisible] = useState(false);
	const [noResultsVisible, setNoResultsVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState<Book | undefined>(undefined);
	const [isSearching, setIsSearching] = useState(false); // New state

	async function handleLongPress(item: Book) {
		setSelectedItem(item);
		setActionsVisible(true);
	}
	
	async function reloadStatus(book: Book) {
		setIsSearching(true); // Start loading
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
			} finally {
				setIsSearching(false); // End loading
			}
		}).catch(err => {
			console.error(err);
			setIsSearching(false); // End loading on error too
		})
	}

	async function handleSearch(text: string) {
		// Don't search if already searching or empty text
		if (isSearching || !text.trim()) {
			return;
		}

		// Do not allow duplicates
		if (items.some(book => book.search === text)) {
			return;
		}

		setIsSearching(true); // Start loading
		
		doSearch(text).then(html => {
			const pageType = checkPageType(html, 'ca');

			switch(pageType){
				case PageType.NoResults:
					setNoResultsVisible(true);
					break;

				case PageType.List:
				case PageType.Detail:
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
						// TODO: show error
					}
					break;
			}
		})
		.catch(error => {
			console.error('Search error:', error);
			// TODO: show error
		})
		.finally(() => {
			setIsSearching(false); // End loading
		});
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

		setActionsVisible(false);
		setSelectedItem(undefined);
	}

	return (
		<View style={styles.container}>
			<Search  onSubmit={handleSearch} disabled={isSearching} />
			<Loading visible={isSearching}>Searching...</Loading>
			<BookList books={items} onLongPress={handleLongPress} />
			<BookActions 
				item={selectedItem} 
				visible={actionsVisible} 
				onClose={() => setActionsVisible(false)} 
				onAction={handleAction} 
			/>
			<BookNotFound 
				visible={noResultsVisible} 
				onClose={() => setNoResultsVisible(false)} 
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { 
		flex: 1 
	}
});