// Import necessary libraries and components
import { Box, IconButton, Stack, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import PropTypes from "prop-types";

// SliderControls component for the previous and next buttons
const SliderControls = ({ handlePrev, handleNext }) => {
  return (
    <ControlsContainer>
      <ControlButton onClick={handlePrev}>
        <KeyboardArrowLeft sx={{ fontSize: { xs: 20, sm: 40 } }} />
      </ControlButton>
      <ControlButton onClick={handleNext}>
        <KeyboardArrowRight sx={{ fontSize: { xs: 20, sm: 40 } }} />
      </ControlButton>
    </ControlsContainer>
  );
};

// SliderIndicator component for the dots at the bottom of the slider
const SliderIndicator = ({ activeIndex, setActiveIndex, numOfItems }) => {
  const dots = Array.from({ length: numOfItems });

  // For keyboard accessibility
  const handelKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  return (
    <Stack direction="row" justifyContent="center" gap={1} mt={3}>
      {dots.map((_, index) => (
        <IndicatorDot
          key={index}
          role="button"
          tabIndex={0}
          onClick={() => setActiveIndex(index)}
          onKeyDown={(e) => handelKeyDown(e, index)}
          active={index === activeIndex}
        />
      ))}
    </Stack>
  );
};

// Main ImageSlider component
const ImageSlider = ({ slides = [], autoPlay = false, speed = 3000 }) => {
  // Error handling
  if (!Array.isArray(slides)) slides = []; // Ensure slides is always an array
  if (slides.length === 0) return null; // Return null if there are no slides

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // Active slide index
  const [sliderWidth, setSliderWidth] = useState(0); // Slides container width
  const intervalRef = useRef(null); // Interval reference used to create a new interval every time the active slide changes

  // Interval for auto slider
  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, speed);
  };

  // Slider controls
  const handlePrev = () => {
    clearInterval(intervalRef.current);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    startInterval();
  };

  const handleNext = () => {
    clearInterval(intervalRef.current);
    setActiveIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    startInterval();
  };

  const handleDotSelect = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
    startInterval();
  };

  // Stop auto slider on mouse hover
  const onMouseOver = () => clearInterval(intervalRef.current);

  useEffect(() => {
    if (containerRef.current) {
      setSliderWidth(containerRef.current.clientWidth);
    }
    // Auto slider
    if (!autoPlay) return;
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <Box
      ref={containerRef}
      mb={3}
      sx={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ borderRadius: 1, overflow: "hidden" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          sx={{width: `${sliderWidth * slides.length}px`}} // width calculated based on the number of slides
          onMouseOver={onMouseOver}
          onMouseLeave={startInterval}
        >
          {/* Slides */}
          {slides.map((image) => (
            <ImageContainer key={image.id} activeIndex={activeIndex}>
              <Image src={image.src} alt={image.title} loading="lazy" />
            </ImageContainer>
          ))}
        </Stack>
      </Box>
      {/* If there is only one slide, don't show controls */}
      {slides.length > 1 && (
        <>
          {/* Slider Controls */}
          <SliderControls handlePrev={handlePrev} handleNext={handleNext} />
          {/* Slider Dots */}
          <SliderIndicator
            activeIndex={activeIndex}
            setActiveIndex={handleDotSelect}
            numOfItems={slides.length}
          />
        </>
      )}
    </Box>
  );
};

export default ImageSlider; 

// PropTypes
ImageSlider.propTypes = {
  slides: PropTypes.array.isRequired,
  autoPlay: PropTypes.bool,
  speed: PropTypes.number,
};

// Styled Components
const ImageContainer = styled("figure")(({ theme, activeIndex }) => ({
  margin: 0,
  padding: 0,
  width: `100%`,
  display: "block",
  aspectRatio: "16/9",
  overflow: "hidden",
  blockSize: "100%",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.standard,
  }),
  transform: `translateX(-${activeIndex * 100}%)`,
  inlineSize: "100%",
  writingMode: "horizontal-tb",
  contentVisibility: "auto",
}));

const Image = styled("img")({
  objectFit: "cover",
  verticalAlign: "middle",
  blockSize: "100%",
  inlineSize: "100%",
  display: "block",
});

const ControlsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "absolute",
  top: "calc(50% - 18px)",
  transform: "translateY(-50%)",
  width: "100%",
  padding: theme.spacing(0, 2),
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  padding: theme.breakpoints.down("sm") ? theme.spacing(1) : theme.spacing(0.5),
  backgroundColor: "#ffffffab",
  boxShadow: theme.shadows[1],
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: "#ffffff",
    transition: theme.transitions.create(["color", "background-color"], {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const IndicatorDot = styled("div")(({ theme, active }) => ({
  cursor: "pointer",
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
  "&:hover": {
    backgroundColor: !active && theme.palette.grey[500],
  },
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest,
  }),
}));