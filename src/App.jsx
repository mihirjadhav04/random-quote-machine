import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [textColor, setTextColor] = useState('#000000'); // default text color
  const [bgColor, setBgColor] = useState('#000000'); // default background color
  const [isTextVisible, setIsTextVisible] = useState(true); // to control text visibility
  const [isTransitioning, setIsTransitioning] = useState(false); // to control transition effect

  useEffect(() => {
    fetchQuote();
  }, []);
  /* SAMPLE RESPONSE DATA FROM API :
    {
      "_id":"9faWWZ4ITZrr",
      "content":"What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      "author":"Ralph Waldo Emerson",
      "tags":["Famous Quotes"],
      "authorSlug":"ralph-waldo-emerson",
      "length":93,
      "dateAdded":"2020-10-14",
      "dateModified":"2023-04-14"4
    }*/
  const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.content);
        setAuthor(data.author);
        setIsTextVisible(true); // Show text after fetching new quote
        setTimeout(() => setIsTransitioning(false), 500); // Turn off transition after 0.5s
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
    <div id="quote-box" className={`container-fluid d-flex justify-content-center align-items-center ${isTextVisible ? 'transition' : ''} ${isTransitioning ? 'transitioning' : ''}`} style={{ backgroundColor: bgColor, height: '100vh', width: '100vw' }}>
      <div className={`card p-4 comfortaa-quote ${ isTextVisible ? 'transition' : ''} ${isTransitioning ? 'transitioning' : ''}`} style={{ color: textColor, wordWrap: 'break-word', width: "600px",transition: 'color 0.5s, background-color 0.5s' }}>
      <h1 style={{ fontFamily: 'monospace', fontWeight: 'bold', color:"black"}}>Random Quote Machine</h1>
      <div style={{ borderTop: "1px solid black", width: "8%", marginBottom: "20px",marginTop:"10px", marginLeft:"47%" }}></div>
        <div id="text" className="mb-4">{quote}</div>
        <div id="author" className="text-center">- {author}</div>
        <div className="d-flex justify-content-between mt-4">
        <a id="tweet-quote" className="btn btn-secondary" href="#" onClick={tweetQuote}>
            Tweet Quote
          </a>
          <button id="new-quote" className="btn btn-dark" onClick={handleNewQuote}>New Quote</button>
         
        </div>
      </div>
    </div>
  );
}

export default App;
