import React, { useState } from 'react';
import {
	FlatList,
	ListRenderItem,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

export interface Books {
	books: Book[];
}
export interface Book {
	lastSearch: number;
	search: string;
	error: boolean;
	errorMessage?: string;
	rawResponse: string;
	data?: BookInfo;
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
	const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

	const toggleExpand = (index: number) => {
		const newExpanded = new Set(expandedItems);
		if (newExpanded.has(index)) {
			newExpanded.delete(index);
		} else {
			newExpanded.add(index);
		}
		setExpandedItems(newExpanded);
	};

	const renderField = (label: string, value?: string, compact = false) => {
		if (!value || value.trim() === '') return null;
		return (
			<View style={compact ? styles.compactFieldContainer : styles.fieldContainer}>
				<Text style={compact ? styles.compactFieldLabel : styles.fieldLabel}>
					{label}:
				</Text>
				<Text style={compact ? styles.compactFieldValue : styles.fieldValue}>
					{value}
				</Text>
			</View>
		);
	};

	const renderBookItem: ListRenderItem<Book> = ({ item, index }) => {
		const date = new Date(item.lastSearch);
		const isExpanded = expandedItems.has(index);

		if (item.error) {
			return (
				<View style={[styles.bookItem, styles.errorItem]}>
					<Text style={styles.errorTitle}>❌ {item.search}</Text>
					<Text style={styles.errorMessage}>
						{item.errorMessage || 'Unknown error'}
					</Text>
					<Text style={styles.bookDate}>
						{date.toLocaleDateString()} {date.getHours()}:{date.getMinutes().toString().padStart(2, '0')}
					</Text>
				</View>
			);
		}

		return (
			<TouchableOpacity
				style={styles.bookItem}
				onPress={() => toggleExpand(index)}
				activeOpacity={0.7}
			>
				<View style={styles.header}>
					<View style={styles.headerContent}>
						<Text style={styles.bookTitle} numberOfLines={1}>
							{item.data?.title || item.search}
						</Text>
						<Text style={styles.bookAuthor} numberOfLines={1}>
							{item.data?.author || 'Unknown author'}
						</Text>
					</View>
					<Text style={styles.expandIcon}>
						{isExpanded ? '▲' : '▼'}
					</Text>
				</View>

				<View style={styles.metadataRow}>
					<Text style={styles.bookDate}>
						📅 {date.toLocaleDateString()} {date.getHours()}:{date.getMinutes().toString().padStart(2, '0')}
					</Text>
					{item.data?.publication && (
						<Text style={styles.publicationText}>
							{item.data.publication}
						</Text>
					)}
				</View>

				{isExpanded && item.data && (
					<View style={styles.expandedContent}>
						{/* Basic Info */}
						<View style={styles.infoGrid}>
							{item.data.edition && (
								<Text style={styles.infoBadge}>📖 {item.data.edition}</Text>
							)}
							{item.data.isbn && (
								<Text style={styles.infoBadge}>🏷️ ISBN: {item.data.isbn}</Text>
							)}
							{item.data.collection && (
								<Text style={styles.infoBadge}>📚 {item.data.collection}</Text>
							)}
						</View>

						{/* Uniform Title */}
						{item.data.uniformTitle && (
							<View style={styles.section}>
								<Text style={styles.sectionLabel}>Uniform Title</Text>
								<Text style={styles.sectionText}>{item.data.uniformTitle}</Text>
							</View>
						)}

						{/* Description */}
						{item.data.description && (
							<View style={styles.section}>
								<Text style={styles.sectionLabel}>Description</Text>
								<Text style={styles.sectionText}>{item.data.description}</Text>
							</View>
						)}

						{/* Sinopsis */}
						{item.data.sinopsis && (
							<View style={styles.section}>
								<Text style={styles.sectionLabel}>Sinopsis</Text>
								<Text style={styles.sinopsisText}>{item.data.sinopsis}</Text>
							</View>
						)}

						{/* Debug info */}
						<Text style={styles.debugInfo}>
							"{item.search}" • {item.rawResponse.length} chars
						</Text>
					</View>
				)}
			</TouchableOpacity>
		);
	};

	const keyExtractor = (item: Book, index: number) => {
		return `${item.search}-${item.lastSearch}-${index}`;
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={books}
				renderItem={renderBookItem}
				keyExtractor={keyExtractor}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyIcon}>📚</Text>
						<Text style={styles.emptyText}>No books found</Text>
						<Text style={styles.emptySubtext}>Your search history will appear here</Text>
					</View>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: '#f8f9fa',
	},
	listContent: {
		paddingBottom: 20,
		paddingTop: 8,
	},
	bookItem: {
		backgroundColor: '#fff',
		marginVertical: 6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2,
		padding: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 8,
	},
	headerContent: {
		flex: 1,
		marginRight: 12,
	},
	bookTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#212529',
		marginBottom: 2,
	},
	bookAuthor: {
		fontSize: 14,
		color: '#495057',
	},
	expandIcon: {
		fontSize: 16,
		color: '#6c757d',
		fontWeight: 'bold',
		paddingHorizontal: 8,
	},
	metadataRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
		flexWrap: 'wrap',
	},
	bookDate: {
		fontSize: 12,
		color: '#868e96',
	},
	publicationText: {
		fontSize: 12,
		color: '#868e96',
		fontStyle: 'italic',
	},
	expandedContent: {
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: '#e9ecef',
	},
	infoGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginBottom: 12,
	},
	infoBadge: {
		fontSize: 12,
		backgroundColor: '#f1f3f5',
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
		color: '#495057',
		borderWidth: 1,
		borderColor: '#e9ecef',
	},
	section: {
		marginBottom: 12,
	},
	sectionLabel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#495057',
		marginBottom: 4,
	},
	sectionText: {
		fontSize: 14,
		color: '#6c757d',
		lineHeight: 20,
	},
	sinopsisText: {
		fontSize: 14,
		color: '#6c757d',
		lineHeight: 20,
		fontStyle: 'italic',
	},
	fieldContainer: {
		marginBottom: 8,
	},
	fieldLabel: {
		fontSize: 13,
		fontWeight: '600',
		color: '#6c757d',
		marginBottom: 2,
	},
	fieldValue: {
		fontSize: 14,
		color: '#212529',
	},
	compactFieldContainer: {
		flexDirection: 'row',
		marginBottom: 4,
	},
	compactFieldLabel: {
		fontSize: 12,
		fontWeight: '600',
		color: '#6c757d',
		marginRight: 6,
	},
	compactFieldValue: {
		fontSize: 12,
		color: '#212529',
		flex: 1,
	},
	errorItem: {
		backgroundColor: '#FFF5F5',
		borderColor: '#FED7D7',
	},
	errorTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#C53030',
		marginBottom: 4,
	},
	errorMessage: {
		fontSize: 14,
		color: '#E53E3E',
		marginBottom: 8,
		fontStyle: 'italic',
	},
	debugInfo: {
		fontSize: 11,
		color: '#adb5bd',
		marginTop: 8,
		fontFamily: 'monospace',
		textAlign: 'center',
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: '#e9ecef',
	},
	emptyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 80,
	},
	emptyIcon: {
		fontSize: 64,
		marginBottom: 16,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: '600',
		color: '#6c757d',
		marginBottom: 8,
	},
	emptySubtext: {
		fontSize: 14,
		color: '#adb5bd',
		textAlign: 'center',
	},
});