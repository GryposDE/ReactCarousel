import './App.css';

import Carousel from "./Carousel/Carousel"

function App() {

  const slides = [
    require("./Carousel/slides/bild1.JPG"),
    require("./Carousel/slides/bild2.JPG"),
    require("./Carousel/slides/bild3.JPG"),
    require("./Carousel/slides/bild4.JPG"),
    require("./Carousel/slides/bild5.JPG")
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
