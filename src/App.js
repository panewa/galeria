import React, { useState } from "react";
import axios from "axios";
import './App.css';

const PIXABAY_API_KEY = "50230658-676d7f39456b3cf18cd4543a2";

const categories = {
  Zwierzęta: "animals",
  Krajobrazy: "landscape",
  Miasta: "city",
  Inne: "cassettes",
};

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://pixabay.com/api/", {
        params: {
          key: PIXABAY_API_KEY,
          q: query,
          image_type: "photo",
          per_page: 12,
          safesearch: true,
        },
      });

      setImages(res.data.hits);
    } catch (err) {
      setError("Błąd podczas pobierania zdjec.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Galeria Pixabay</h1>
      <div className="buttons">
        {Object.entries(categories).map(([label, query]) => (
          <button key={label} onClick={() => fetchImages(query)}>
            {label}
          </button>
        ))}
      </div>

      {loading && <p>Ladowanie</p>}
      {error && <p className="error">{error}</p>}

      <div className="gallery">
        {images.map((img) => (
          <a key={img.id} href={img.largeImageURL} target="_blank" rel="noopener noreferrer">
            <img src={img.webformatURL} alt={img.tags} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default App;
