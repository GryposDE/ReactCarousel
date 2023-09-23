import './App.css';

import Carousel from "./Carousel/Carousel"


function App() {

  const slides = [
    { src: require("./Carousel/slides/bild1.JPG"), alt: 'alt_text_1' },
    { src: require("./Carousel/slides/bild2.JPG"), alt: 'alt_text_2' },
    { src: require("./Carousel/slides/bild3.JPG"), alt: 'alt_text_3' },
    { src: require("./Carousel/slides/bild4.JPG"), alt: 'alt_text_4' },
    { src: require("./Carousel/slides/bild5.JPG"), alt: 'alt_text_5' },
  ]
  

  return (
    <div className="App">
      <h1> My Carousel !!! </h1>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Carousel slides={slides} parentWidth={500}/>
      </div>
    </div>
  );
}

export default App;
