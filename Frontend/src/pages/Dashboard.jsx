import { useEffect, useState } from "react";
import api from "../services/api";
import "../Styles/DashBoard.css";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    condition: "",
    imageURL: ""
  });

  // Fetch user books
  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      const userId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;
      setBooks(res.data.filter((b) => b.owner?._id === userId));
    } catch (err) {
      console.error(err);
    }
  };

  // Add new book
  const addBook = async (e) => {
    e.preventDefault();
    try {
      await api.post("/books", form);
      setForm({ title: "", author: "", condition: "", imageURL: "" });
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📚 My Dashboard</h2>

      {/* Add Book Form */}
      <form className="add-book-form" onSubmit={addBook}>
        <input
          className="form-input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="form-input"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          className="form-input"
          placeholder="Condition"
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
          required
        />
        <input
          className="form-input"
          placeholder="Image URL"
          value={form.imageURL}
          onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
        />
        <button className="submit-btn" type="submit">
          ➕ Add Book
        </button>
      </form>

      {/* My Books List */}
      <h3 className="section-title">My Books</h3>
      {books.length === 0 ? (
        <p className="no-books">No books added yet.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div className="book-card" key={book._id}>
              {book.imageURL && (
                <img src={book.imageURL} alt={book.title} className="book-image" />
              )}
              <h4 className="book-title">{book.title}</h4>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-condition">Condition: {book.condition}</p>
              <button
                className="delete-btn"
                onClick={() => deleteBook(book._id)}
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
