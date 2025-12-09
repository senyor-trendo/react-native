import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BookList, { Book, BookInfo } from '../components/books';
import Search from '../components/search';

export default function HomeScreen() {
	const [items, setItems] = useState<Book[]>([])

	async function handleSearch(text: string) {
		//do not allow dupicates
		if (items.some(book => book.search === text)) {
			return;
		}

		const searchQuery = encodeURIComponent(text.trim());
		const url = `https://aladi.diba.cat/search~S22*cat/?searchtype=X&searcharg=${searchQuery}&searchscope=22&sortdropdown=-&SORT=DZ&extended=0&SUBMIT=Cerca`;

		try {
			console.log(`Fetching: ${url}`);

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const htmlResponse = await response.text();

			// Log the response details
			console.log('=== API Response ===');
			console.log(`URL: ${url}`);
			console.log(`Status: ${response.status}`);
			console.log(`Content length: ${htmlResponse.length} characters`);
			console.log('===================');

			// Parse the HTML to extract useful information
			const parsedData = parseHtmlResponse(htmlResponse);

			setItems(prevItems => [...prevItems, {
				lastSearch: Date.now(),
				search: text,
				error: false,
				rawResponse: htmlResponse,
				data: parsedData
			}]);

		} catch (error: any) {
			console.error('Error in handleSearch:', error);
			// Add item with error indication
			setItems(prevItems => [...prevItems, {
				lastSearch: Date.now(),
				search: text,
				error: true,
				errorMessage: error.message,
				rawResponse: ''
			}]);
		}
	}

	// Helper function to parse HTML response
	function parseHtmlResponse(html: string): BookInfo {
		return {
			title: extractField(html, "Títol"),
			author: extractField(html, "Autor/Artista"),
			publication: extractField(html, "Publicació"),
			edition: extractField(html, "Edició"),
			description: extractField(html, "Descripció"),
			collection: extractField(html, "Col·lecció"),
			sinopsis: extractField(html, "Sinopsi"),
			uniformTitle: extractField(html, "Títol uniforme"),
			isbn: extractField(html, "ISBN"),
		};
	}
	function extractField(html: string, label: string): string {
		const regex = new RegExp(
			`<td[^>]*class="bibInfoLabel"[^>]*>\\s*${label}\\s*</td>\\s*<td[^>]*class="bibInfoData"[^>]*>([\\s\\S]*?)</td>`,
			"i"
		);

		const match = html.match(regex);
		if (!match) return "";

		// Remove HTML tags
		return match[1]
			.replace(/<[^>]+>/g, "")
			.replace(/\s+/g, " ")
			.trim();
	}

	return (
		<View style={styles.container}>
			<Search onSubmit={handleSearch}></Search>
			<BookList books={items}></BookList>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
