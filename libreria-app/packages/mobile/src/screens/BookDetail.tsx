import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type Book = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  notes?: string;
};

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any, any>;
};

const BookDetail = ({ navigation, route }: Props) => {
  const bookId = route.params?.bookId;
  const isEditing = !!bookId;

  const [book, setBook] = useState<Book>({
    id: bookId || Date.now().toString(),
    title: '',
    author: '',
    isbn: '',
    notes: '',
  });

  useEffect(() => {
    if (isEditing) {
      // TODO: Fetch book details from your backend/storage
      // For now, we'll just show empty fields
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (!book.title || !book.author) {
      Alert.alert('Error', 'Title and author are required');
      return;
    }

    try {
      // TODO: Save to backend/storage
      // For now, just go back
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save book');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={book.title}
            onChangeText={(text) => setBook({ ...book, title: text })}
            placeholder="Enter book title"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Author *</Text>
          <TextInput
            style={styles.input}
            value={book.author}
            onChangeText={(text) => setBook({ ...book, author: text })}
            placeholder="Enter author name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ISBN</Text>
          <TextInput
            style={styles.input}
            value={book.isbn}
            onChangeText={(text) => setBook({ ...book, isbn: text })}
            placeholder="Enter ISBN"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={book.notes}
            onChangeText={(text) => setBook({ ...book, notes: text })}
            placeholder="Enter notes"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Update Book' : 'Add Book'}
          </Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              Alert.alert(
                'Delete Book',
                'Are you sure you want to delete this book?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                      // TODO: Delete from backend/storage
                      navigation.goBack();
                    },
                  },
                ]
              );
            }}
          >
            <Text style={styles.deleteButtonText}>Delete Book</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  notesInput: {
    height: 100,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookDetail; 