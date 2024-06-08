import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import BookSearch from './frontend/components/BookSearch';
import SearchResult from './frontend/components/SearchResult';
import ReadingList from './frontend/components/ReadingList';
import Toast from './frontend/components/Toast'; 
const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [searchResults, setSearchResults] = useState([]);
  const [readingList, setReadingList] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (query) => {
    const filteredBooks = data.books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  const handleAddBook = (book) => {
    if (!readingList.find((b) => b.title === book.title)) {
      setReadingList([...readingList, book]);
      <Toast message="Item added" type="success" />;
    }
  };

  const handleRemoveBook = (title) => {
    setReadingList(readingList.filter((book) => book.title !== title));
    <Toast message="Item removed" type="success" />;
  };

  return (
    <Container>
      <Typography variant="h4" color="#335C64" fontWeight="bold" fontStyle="Mulish" fontSize={24} gutterBottom>
        Book Assignment View
      </Typography>
      <BookSearch onSearch={handleSearch} />
      <SearchResult books={searchResults} onAdd={handleAddBook} />
      <Typography variant="h5" color="#335C64" fontWeight="bold" gutterBottom>
        Reading List
      </Typography>
      <ReadingList readingList={readingList} onRemove={handleRemoveBook} />
    </Container>
  );
};

export default App;
