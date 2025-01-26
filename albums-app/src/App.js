import React from "react";
import AlbumList from "./components/AlbumList";
import AlbumForm from "./components/AlbumForm";

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Albums Management</h1>
        <p style={styles.subtitle}>Effortlessly manage your music collection</p>
      </header>
      <main style={styles.main}>
        <div style={styles.formContainer}>
          <h2 style={styles.sectionTitle}>Add a New Album</h2>
          <AlbumForm />
        </div>
        <div style={styles.listContainer}>
          <h2 style={styles.sectionTitle}>Your Albums</h2>
          <AlbumList />
        </div>
      </main>
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 Album Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    margin: "0 auto",
    maxWidth: "1000px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "lightblue",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#777",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formContainer: {
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  listContainer: {
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "15px",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    paddingTop: "10px",
    borderTop: "1px solid #ddd",
  },
  footerText: {
    color: "#888",
    fontSize: "0.9rem",
  },
};

export default App;
