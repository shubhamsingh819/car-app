import React, { useEffect, useState } from "react";
import { garageImage, car, car1, car2 } from "./constant/constant";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Define an array of car options with their names and image URLs
const carOptions = [
  { name: "Mercedes", image: car },
  { name: "Audi", image: car1 },
  { name: "Ferrari", image: car2 },
  // Add more car options as needed
];

const Browse = () => {
  const [selectedCar, setSelectedCar] = useState(car); // Default selected car image
  const [carService, setCarService] = useState([{}]);
  const [review, setReview] = useState([{}]);

  useEffect(() => {
    const carServiceType = async () => {
      const response = await axios.get(
        "https://kv-varlu.vercel.app/api/v1/serviceType"
      );
      setCarService(response.data);
    };

    carServiceType();
  }, []);

  useEffect(() => {
    const customerReview = async () => {
      const response = await axios.get(
        "https://kv-varlu.vercel.app/api/v1/review"
      );
      setReview(response.data);
    };

    customerReview();
  }, []);

  console.log(carService);

  const imageStyle = {
    width: "1500px",
    height: "400px",
    zIndex: -1, // Send the image to the back
  };

  const modalStyle = {
    position: "absolute",
    top: 0,
    zIndex: 1, // Bring the modal to the front
    marginLeft: "1240px",
    backgroundColor: "gray",
    marginTop: "100px",
    width: "250px",
  };

  const textAboveImageStyle = {
    position: "relative",
    zIndex: 1, // Bring the text above the image
  };

  const mainStyle = {
    maxHeight: "100vh", // Adjust the value as needed
    overflowY: "auto",
  };

  // Function to handle car selection
  const handleCarSelect = (event) => {
    const selectedCarName = event.target.value;
    const selectedCarOption = carOptions.find(
      (car) => car.name === selectedCarName
    );
    if (selectedCarOption) {
      setSelectedCar(selectedCarOption.image);
    }
  };

  const scrollToRatingsAndReviews = () => {
    const ratingsAndReviewsSection = document.getElementById(
      "ratingsAndReviewsSection"
    );
    if (ratingsAndReviewsSection) {
      ratingsAndReviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ourServices = () => {
    const ourServices = document.getElementById("ourServices");
    if (ourServices) {
      ourServices.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    console.log("hi");
    toast.success(
      "your response submitted successfully our team will contact your soon!thanks👍"
    );
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            minWidth: "400px",
            minHeight: "60px",
            fontSize: "16px",
          },
        }}
      />
      <div style={mainStyle}>
        <header className="App-header">
          <h1>Experience the best Car Service in Hyderabad</h1>
          <h4>We provide our services to over 100+ major cities as well</h4>
        </header>

        <main>
          <div style={textAboveImageStyle}>
            <Modal show={true} keyboard={false} style={modalStyle}>
              <Modal.Header>
                <Modal.Title>Book Your Car Service Now</Modal.Title>
              </Modal.Header>
              <select
                style={{ width: "250px", height: "40px" }}
                onChange={handleCarSelect}
              >
                {carOptions.map((car, index) => (
                  <option key={index} value={car.name}>
                    {car.name}
                  </option>
                ))}
              </select>
              <img
                src={selectedCar}
                alt="Selected Car"
                style={{ width: "100%", height: "auto" }}
              />
              <input
                style={{ width: "230px", height: "20px" }}
                type="number"
                placeholder="Enter your mobile"
              />
              <Modal.Footer>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <img src={garageImage} alt="sd" style={imageStyle} />
        </main>

        <div>
          <div>
            <div
              style={{
                border: "1px solid black",
                backgroundColor: "#d0d0d0",
                fontWeight: "bold",
              }}
            >
              <a href="#" onClick={ourServices}>
                Our services
              </a>{" "}
              &nbsp;
              <a href="#">curated customer services</a> &nbsp;
              <a href="#" onClick={scrollToRatingsAndReviews}>
                Ratings and Reviews
              </a>{" "}
              &nbsp;
              <a href="#">price</a> &nbsp;
              <a href="#">Prequently asked questions</a> &nbsp;
            </div>
          </div>
          <div>
            <h1>Car Services Availabe in Hyderabad</h1>
            <p>
              Get hassle-free and professional car service car repair , wheel
              care services , cashless isurance claim and much more in Hyderabad
            </p>
          </div>
          <div id="ourServices">
            <h1>Curate Custom Services</h1>
            {carService?.map((item, index) => {
              return (
                <>
                  <ul key={index}>
                    <li>Car Service Name:{item?.name}</li>
                    <li> Car Service Features : {item?.feature}</li>
                    <li>Car price:{item?.price}</li>
                  </ul>
                </>
              );
            })}
          </div>
          <div>
            <div>
              <h1>Ratings and Reviews</h1>
              {review?.map((item, index) => {
                return (
                  <div
                    id="ratingsAndReviewsSection"
                    style={{
                      backgroundColor: "#d0d0d0",
                      width: "200px",
                      height: "100px",
                      borderRadius: "20px",
                      display: "block",
                    }}
                  >
                    <ul key={index}>
                      <li>Rating: {item?.rating}*</li>
                      <li> Review {item?.review}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div>
              <h1>About us</h1>
              <div
                style={{
                  backgroundColor: "gray",
                  width: "1500px",
                  height: "100px",
                  borderRadius: "20px",
                  display: "block",
                }}
              >
                <div style={{ display: "flex" }}>
                  <ul>
                    <li>
                      FAQS: What is your faqs mail me or contact me on given
                      number
                    </li>
                    <li>Contact Us:1234567890</li>
                    <li>Message:Drom me message on @8199</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
