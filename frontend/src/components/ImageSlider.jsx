import React from "react";

const ImageSlider = () => {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide carousel-fade "
        style={{ height: "77vh" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: "77vh" }}>
            <img
              src="http://localhost:8000/Photos/banner3.jpg"
              className="d-block w-100 "
              alt="..."
              style={{
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.7)",
              }}
            />
            <div
              className="carousel-caption d-none d-md-block "
              style={{ top: "45%" }}
            >
              <h2>Welcome to your home away from home</h2>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "77vh" }}>
            <img
              src="http://localhost:8000/Photos/banner2.png"
              className="d-block w-100 "
              alt="..."
              style={{ height: "100%", objectFit: "cover" }}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{ top: "45%" }}
            >
              <h2>Discover serenity by the sea</h2>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "77vh" }}>
            <img
              src="http://localhost:8000/Photos/banner.png"
              className="d-block w-100 "
              alt="..."
              style={{
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{ top: "45%" }}
            >
              <h2>Elegance in every detail</h2>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default ImageSlider;
