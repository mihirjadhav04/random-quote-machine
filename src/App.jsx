import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [textColor, setTextColor] = useState('#000000'); // default text color
  const [bgColor, setBgColor] = useState('#000000'); // default background color
  const [isTextVisible, setIsTextVisible] = useState(true); // to control text visibility

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.content);
        setAuthor(data.author);
        setIsTextVisible(true); // Show text after fetching new quote
      })
      .catch(error => console.error(error));
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(tweetUrl, '_blank');
  };

  const handleNewQuote = () => {
    fetchQuote();
    // Change background color of text and body
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    console.log(randomColor);
    setTextColor(randomColor);
    setBgColor(randomColor);
    setIsTextVisible(false)
    
  };

  return (
    <div id="quote-box" className={`container-fluid d-flex justify-content-center align-items-center ${isTextVisible ? 'transition' : ''}`} style={{ backgroundColor: bgColor, height: '100vh', width: '100vw' }}>
      <div className={`card p-4 comfortaa-quote ${isTextVisible ? 'transition' : ''} }`} style={{ color: textColor, wordWrap: 'break-word', width: "600px" }}>
        <div id="text" className="mb-4">{quote}</div>
        <div id="author" className="text-end">- {author}</div>
        <div className="d-flex justify-content-between mt-4">
        <a id="tweet-quote" className="btn btn-primary" href="#" onClick={tweetQuote}>
            Tweet Quote
          </a>
          <button id="new-quote" className="btn btn-primary" onClick={handleNewQuote}>New Quote</button>
         
        </div>
      </div>
    </div>
  );
}

export default App;
