import { Container, Paper } from "@mui/material";
import ImageSlider from "./components/ImageSlider";
import img1 from "./assets/pexels-apasaric-1285625.jpg";
import img2 from "./assets/pexels-azhar-muhammedu-152002-3021382.jpg";
import img3 from "./assets/pexels-sriharsha-chekuri-249318-755405.jpg";
import img4 from "./assets/pexels-asadphoto-457882.jpg";
import img5 from "./assets/pexels-thorsten-technoman-109353-338515.jpg";

const imagesData = [
  {
    id: 1,
    src: img1,
    title: "Santorini, Greece - Photo by Aleksandar Pasaric from Pexels: https://www.pexels.com/photo/white-concrete-house-near-body-of-water-under-white-and-blue-cloudy-sky-1285625/",
  },
  {
    id: 2,
    src: img2,
    title: "Rome, Italy - Photo by Azhar Muhammedu from Pexels: https://www.pexels.com/photo/photo-of-monument-during-dawn-3021382/",
  },
  {
    id: 3,
    src: img3,
    title: "New York, USA - Photo by Sriharsha Chekuri from Pexels: https://www.pexels.com/photo/high-rise-buildings-at-night-near-sea-755405/",
  },
  {
    id: 4,
    src: img4,
    title: "Maldives - Photo by Asad Photo Maldives: https://www.pexels.com/photo/landscape-photography-of-trees-on-shoreline-457882/",
  },
  {
    id: 5,
    src: img5,
    title: "Paris, France - Photo by Thorsten technoman from Pexels: https://www.pexels.com/photo/picture-of-eiffel-tower-338515/",
  }
];

function App() {
  return (
    <Container
      component={Paper}
      maxWidth="md"
      elevation={3}
      sx={{ bgcolor: "#fff", py: 4, my: 10, mx: "auto" }}
    >
      <ImageSlider slides={imagesData} autoPlay speed={3000} />
    </Container>
  );
}

export default App;
