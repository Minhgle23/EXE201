import { Carousel } from "react-bootstrap";

function Homeheader() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <a href='#'>
          <img
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
            className="d-block w-100"
            src={process.env.PUBLIC_URL + `assets/images/hero/image1.png`}
            alt="Image One"
          />
        </a>
        <Carousel.Caption>
          <h3>Beautiful Scenery</h3>
          <p>Experience the serenity of nature.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
          className="d-block w-100"
          src={process.env.PUBLIC_URL + `assets/images/hero/image2.jpg`}
          alt="Image Two"
        />
        <Carousel.Caption>
          <h3>Urban Exploration</h3>
          <p>Discover the beauty of the cityscape.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
          className="d-block w-100"
          src={process.env.PUBLIC_URL + `assets/images/hero/image3.png`}
          alt="Image Three"
        />
        <Carousel.Caption>
          <h3>Adventure Awaits</h3>
          <p>Get ready for your next big adventure.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Homeheader;
