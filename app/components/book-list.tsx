import { BookInfo, BookStatus } from '@/utils/parser.model';
import React, { useState } from 'react';
import {
	FlatList,
	Image,
	ListRenderItem,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

export interface BookConfig {
	books: Book[];
	onLongPress: (item:Book) => void
}

export interface Book {
	lastSearch: number;
	search: string;
	error: boolean;
	responseLength: number;
	errorMessage?: string;
	data?: BookInfo;
	status?: BookStatus[];
}

export default function BookList({ books, onLongPress }: BookConfig) {
	const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

	const longPress = (item: Book) => {
		onLongPress(item)
	}

	const toggleExpand = (index: number) => {
		const newExpanded = new Set(expandedItems);
		if (newExpanded.has(index)) {
			newExpanded.delete(index);
		} else {
			newExpanded.add(index);
		}
		setExpandedItems(newExpanded);
	};

	const renderStatusBadge = (status: string) => {
		let backgroundColor = '#f1f3f5';
		let textColor = '#495057';

		if (status.includes('Disponible') || status.includes('Available')) {
			backgroundColor = '#d4edda';
			textColor = '#155724';
		} else if (status.includes('VENÇ') || status.includes('DUE') || status.includes('VENCE')) {
			backgroundColor = '#f8d7da';
			textColor = '#721c24';
		} else if (status.includes('trànsit') || status.includes('transit') || status.includes('tránsito')) {
			backgroundColor = '#fff3cd';
			textColor = '#856404';
		}

		return { backgroundColor, textColor };
	};

	const renderBookError = (item: Book) => {
		const date = new Date(item.lastSearch);

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

	const renderBookItem: ListRenderItem<Book> = ({ item, index }) => {
		const date = new Date(item.lastSearch);
		const isExpanded = expandedItems.has(index);
		const hasStatus = item.status && item.status.length > 0;

		if (item.error) {
			return renderBookError(item);
		}

		return (
			<TouchableOpacity
				style={styles.bookItem}
				onPress={() => toggleExpand(index)}
				onLongPress={() => longPress(item)}
				activeOpacity={0.7}
			>
				<View style={styles.header}>
					<View style={styles.headerContent}>
						<Image style={{width: 300}} source={{uri: `file://book_cover.jpg`}}></Image>
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

				{/* ALWAYS VISIBLE: Book Status Section */}
				{hasStatus && (
					<View style={styles.statusSection}>
						<Text style={styles.statusSectionLabel}>
							📚 Availability ({item.status!.length} locations)
						</Text>
						<View style={styles.statusGrid}>
							{item.status!.slice(0, 3).map((status, statusIndex) => {
								const badgeStyle = renderStatusBadge(status.status);
								return (
									<View key={statusIndex} style={[styles.statusBadge, { backgroundColor: badgeStyle.backgroundColor }]}>
										<Text style={[styles.statusBadgeText, { color: badgeStyle.textColor }]} numberOfLines={1}>
											📍 {status.location.split('.')[0]} • {status.status}
										</Text>
									</View>
								);
							})}
							{item.status!.length > 3 && (
								<View style={styles.moreStatusBadge}>
									<Text style={styles.moreStatusText}>
										+{item.status!.length - 3} more
									</Text>
								</View>
							)}
						</View>
					</View>
				)}

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
							{!hasStatus && (
								<Text style={[styles.infoBadge, styles.noStatusBadge]}>
									⚠️ No status available
								</Text>
							)}
						</View>

						{/* Expanded Status Details (only shown when expanded) */}
						{hasStatus && isExpanded && (
							<View style={styles.expandedStatusSection}>
								<Text style={styles.expandedStatusLabel}>
									📋 Detailed Availability
								</Text>
								{item.status!.map((status, statusIndex) => {
									const badgeStyle = renderStatusBadge(status.status);
									return (
										<View key={statusIndex} style={styles.detailedStatusItem}>
											<View style={styles.detailedStatusHeader}>
												<Text style={styles.detailedStatusLocation} numberOfLines={1}>
													📍 {status.location}
												</Text>
												<View style={[styles.detailedStatusBadge, { backgroundColor: badgeStyle.backgroundColor }]}>
													<Text style={[styles.detailedStatusBadgeText, { color: badgeStyle.textColor }]}>
														{status.status}
													</Text>
												</View>
											</View>
											<View style={styles.detailedStatusDetails}>
												{status.signature && (
													<Text style={styles.detailedStatusDetail}>
														<Text style={styles.detailLabel}>Signature:</Text> {status.signature}
													</Text>
												)}
												{status.notes && (
													<Text style={styles.detailedStatusDetail}>
														<Text style={styles.detailLabel}>Notes:</Text> {status.notes}
													</Text>
												)}
												{status.locationLink && (
													<Text style={styles.detailedStatusLink} numberOfLines={1}>
														🔗 {status.locationLink}
													</Text>
												)}
											</View>
										</View>
									);
								})}
							</View>
						)}

						{item.data.uniformTitle && (
							<View style={styles.section}>
								<Text style={styles.sectionLabel}>Uniform Title</Text>
								<Text style={styles.sectionText}>{item.data.uniformTitle}</Text>
							</View>
						)}

						{item.data.description && (
							<View style={styles.section}>
								<Text style={styles.sectionLabel}>Description</Text>
								<Text style={styles.sectionText}>{item.data.description}</Text>
							</View>
						)}

						{item.data.summary && (
							<View style={styles.section}>
								<Text style={styles.sectionLabel}>Summary</Text>
								<Text style={styles.summaryText}>{item.data.summary}</Text>
							</View>
						)}

						<Text style={styles.debugInfo}>
							"{item.search}" • {item.responseLength} chars
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
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
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
	// ALWAYS VISIBLE: Status Section
	statusSection: {
		marginTop: 8,
		marginBottom: 8,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: '#e9ecef',
	},
	statusSectionLabel: {
		fontSize: 13,
		fontWeight: '600',
		color: '#495057',
		marginBottom: 6,
	},
	statusGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 6,
	},
	statusBadge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#dee2e6',
		maxWidth: '48%',
	},
	statusBadgeText: {
		fontSize: 11,
		fontWeight: '500',
	},
	moreStatusBadge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
		backgroundColor: '#e9ecef',
		borderWidth: 1,
		borderColor: '#dee2e6',
	},
	moreStatusText: {
		fontSize: 11,
		color: '#6c757d',
		fontStyle: 'italic',
	},
	// Expanded Content
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
	noStatusBadge: {
		backgroundColor: '#fff3cd',
		borderColor: '#ffeaa7',
		color: '#856404',
	},
	// Expanded Status Details
	expandedStatusSection: {
		marginBottom: 12,
		padding: 12,
		backgroundColor: '#f8f9fa',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#e9ecef',
	},
	expandedStatusLabel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#495057',
		marginBottom: 8,
	},
	detailedStatusItem: {
		marginBottom: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#e9ecef',
	},
	detailedStatusHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6,
	},
	detailedStatusLocation: {
		flex: 1,
		fontSize: 13,
		fontWeight: '500',
		color: '#212529',
		marginRight: 8,
	},
	detailedStatusBadge: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#dee2e6',
	},
	detailedStatusBadgeText: {
		fontSize: 11,
		fontWeight: '500',
	},
	detailedStatusDetails: {
		paddingLeft: 4,
	},
	detailedStatusDetail: {
		fontSize: 12,
		color: '#6c757d',
		marginBottom: 2,
	},
	detailLabel: {
		fontWeight: '600',
		color: '#495057',
	},
	detailedStatusLink: {
		fontSize: 11,
		color: '#007bff',
		marginTop: 4,
		fontStyle: 'italic',
	},
	// Other sections
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
	summaryText: {
		fontSize: 14,
		color: '#6c757d',
		lineHeight: 20,
		fontStyle: 'italic',
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