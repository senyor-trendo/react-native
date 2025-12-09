import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';

export interface Books {
	books: Book[]
}
export interface Book {
	lastSearch: number,
	search: string,
	error: boolean,
	errorMessage?: string,
	rawResponse: string,
	data?: BookInfo
}
export interface BookInfo {
	title: string;
	author: string;
	publication: string;
	edition: string;
	description: string;
	collection: string;
	sinopsis: string;
	uniformTitle: string;
	isbn: string;
}
export default function BookList({ books }: Books) {

	// Render each book item
	const renderBookItem: ListRenderItem<Book> = ({ item }) => {
		const date = new Date(item.lastSearch);

		return (
			<View style={styles.bookItem}>
				<Text style={styles.bookTitle}>{item.search}</Text>
				{item.data?.title && (
					<Text style={styles.bookSubtitle}>{item.data.title}</Text>
				)}
				<Text style={styles.bookDate}>
					{date.toLocaleDateString()} {date.getHours()}:{date.getMinutes().toString().padStart(2, '0')}
				</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList data={books} renderItem={renderBookItem} keyExtractor={(item:Book, index:number) => item.search}></FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		justifyContent: 'space-between',
		margin: 8
	},
	bookItem: {
		backgroundColor: '#fff',
		padding: 16,
		marginVertical: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	bookTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 4,
	},
	bookSubtitle: {
		fontSize: 14,
		color: '#666',
		marginBottom: 8,
	},
	bookDate: {
		fontSize: 12,
		color: '#999',
		fontStyle: 'italic',
	},
	emptyText: {
		textAlign: 'center',
		marginTop: 32,
		fontSize: 16,
		color: '#888',
	},
});
