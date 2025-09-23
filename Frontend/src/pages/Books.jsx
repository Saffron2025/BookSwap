import { useEffect, useState } from "react";
import api from "../services/api";
import "../Styles/Books.css";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then((res) => setBooks(res.data));
  }, []);

  const requestBook = async (id) => {
    try {
      await api.post(`/requests/${id}`);
      alert("📩 Request sent!");
    } catch (err) {
      alert("Failed to send request");
    }
  };

  return (
    <div className="books-container">
      <h2 className="books-title">📚 Available Books</h2>
      <div className="books-grid">
        {books.length === 0 ? (
          <p className="no-books">No books available right now.</p>
        ) : (
          books.map((book) => (
            <div className="book-card" key={book._id}>
              {book.imageURL && (
                <img src={book.imageURL} alt={book.title} className="book-image" />
              )}
              <h3 className="book-name">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-condition">
                <b>Condition:</b> {book.condition || "N/A"}
              </p>
              <button
                className="request-btn"
                onClick={() => requestBook(book._id)}
              >
                Request Book
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Books;
