import React, { useEffect } from 'react';

function Slider() {
  useEffect(() => {
    const carousel = document.getElementById('carouselExampleControls');
    const carouselInstance = new window.bootstrap.Carousel(carousel);

    return () => {
      carouselInstance.dispose();
    };
  }, []);

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/84aa99fc1a7b1f63.jpg?q=20" alt="First slide"/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/cc633426b89ad841.png?q=20" alt="Second slide"/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/fa49f38daba65816.jpg?q=20" alt="Third slide"/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;
