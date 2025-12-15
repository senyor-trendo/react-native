// components/LibraryConfigSectioned.tsx
import { PublicLibraries, PublicLibrary } from '@/config/libraries';
import Checkbox from 'expo-checkbox';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
	Keyboard,
	SectionList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

interface LibraryConfigProps {
  onSelectionChange: (selectedIds: string[]) => void;
  initialSelectedIds?: string[];
}

interface Section {
  title: string;
  data: PublicLibrary[];
}

interface LibraryItemProps {
  library: PublicLibrary;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const LibraryItem = memo<LibraryItemProps>(({ library, isSelected, onToggle }) => (
  <TouchableOpacity
    style={[
      styles.item,
      isSelected && styles.itemSelected
    ]}
    onPress={() => onToggle(library.id)}
    activeOpacity={0.7}
  >
    <Checkbox
      value={isSelected}
      onValueChange={() => onToggle(library.id)}
      color={isSelected ? '#007AFF' : undefined}
    />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{library.name}</Text>
    </View>
  </TouchableOpacity>
));

LibraryItem.displayName = 'LibraryItem';

const LibraryConfig: React.FC<LibraryConfigProps> = ({
  onSelectionChange,
  initialSelectedIds = []
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    setSelectedIds(initialSelectedIds);
  }, [initialSelectedIds]);

  const toggleLibrary = useCallback((libraryId: string) => {
    setSelectedIds(prev => {
      const newSelectedIds = prev.includes(libraryId)
        ? prev.filter(id => id !== libraryId)
        : [...prev, libraryId];
      
      onSelectionChange(newSelectedIds);
      return newSelectedIds;
    });
  }, [onSelectionChange]);

  const selectedIdsSet = useMemo(() => 
    new Set(selectedIds), 
    [selectedIds]
  );

  // Filter and group libraries based on search
  const { sections, totalVisible } = useMemo(() => {
    if (!searchQuery.trim()) {
      // No search, group all libraries
      const grouped: { [key: string]: PublicLibrary[] } = {};
      
      PublicLibraries.forEach(library => {
        const firstLetter = library.name.charAt(0).toUpperCase();
        if (!grouped[firstLetter]) {
          grouped[firstLetter] = [];
        }
        grouped[firstLetter].push(library);
      });

      const sectionsArray = Object.keys(grouped)
        .sort()
        .map(letter => ({
          title: letter,
          data: grouped[letter]
        }));

      return {
        sections: sectionsArray,
        totalVisible: PublicLibraries.length
      };
    }
    
    // With search filter
    const query = searchQuery.toLowerCase().trim();
    const filteredLibraries = PublicLibraries.filter(library =>
      library.name.toLowerCase().includes(query) ||
      library.searchAlias?.toLowerCase().includes(query)
    );

    if (filteredLibraries.length === 0) {
      return {
        sections: [],
        totalVisible: 0
      };
    }

    // Group filtered results
    const grouped: { [key: string]: PublicLibrary[] } = {};
    
    filteredLibraries.forEach(library => {
      const firstLetter = library.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(library);
    });

    const sectionsArray = Object.keys(grouped)
      .sort()
      .map(letter => ({
        title: letter,
        data: grouped[letter]
      }));

    return {
      sections: sectionsArray,
      totalVisible: filteredLibraries.length
    };
  }, [searchQuery]);

  const renderItem = useCallback(({ item }: { item: PublicLibrary }) => (
    <LibraryItem
      library={item}
      isSelected={selectedIdsSet.has(item.id)}
      onToggle={toggleLibrary}
    />
  ), [selectedIdsSet, toggleLibrary]);

  const renderSectionHeader = useCallback(({ section }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  ), []);

  const keyExtractor = useCallback((item: PublicLibrary) => item.id, []);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    Keyboard.dismiss();
  }, []);

  const toggleSelectAllVisible = useCallback(() => {
    const visibleIds = sections.flatMap(section => 
      section.data.map(lib => lib.id)
    );
    
    if (visibleIds.length === 0) return;

    // If all visible are selected, deselect all visible
    const allVisibleSelected = visibleIds.every(id => selectedIdsSet.has(id));
    
    if (allVisibleSelected) {
      const newSelectedIds = selectedIds.filter(id => !visibleIds.includes(id));
      setSelectedIds(newSelectedIds);
      onSelectionChange(newSelectedIds);
    } else {
      // Select all visible
      const newSelectedIds = Array.from(new Set([...selectedIds, ...visibleIds]));
      setSelectedIds(newSelectedIds);
      onSelectionChange(newSelectedIds);
    }
  }, [sections, selectedIds, selectedIdsSet, onSelectionChange]);

  const ListHeader = useMemo(() => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Select Libraries</Text>
      <Text style={styles.subtitle}>
        {selectedIds.length} of {PublicLibraries.length} selected
        {searchQuery ? ` • Showing ${totalVisible} results` : ''}
      </Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search libraries"
          value={searchQuery}
          onChangeText={handleSearchChange}
          clearButtonMode="while-editing"
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ), [searchQuery, selectedIds.length, totalVisible, sections, selectedIdsSet, handleSearchChange, clearSearch, toggleSelectAllVisible]);

  const ListEmptyComponent = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No libraries found</Text>
      <Text style={styles.emptySubtext}>
        {searchQuery 
          ? `No results for "${searchQuery}"`
          : 'No libraries available'}
      </Text>
      {searchQuery && (
        <TouchableOpacity onPress={clearSearch} style={styles.emptyButton}>
          <Text style={styles.emptyButtonText}>Clear Search</Text>
        </TouchableOpacity>
      )}
    </View>
  ), [searchQuery, clearSearch]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        maxToRenderPerBatch={30}
        windowSize={21}
        removeClippedSubviews={true}
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    flexGrow: 1,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#999',
  },
  selectAllButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectAllButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  itemSelected: {
    backgroundColor: '#e7f3ff',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#212529',
  },
  id: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LibraryConfig;