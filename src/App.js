import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About"; 
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Snackbar } from '@mui/material';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), 
              linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`

const WhatsAppFloat = styled.a`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999; 
  box-shadow: 2px 4px 12px rgba(0,0,0,0.4);
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover { transform: scale(1.1); background-color: #128c7e; }
  @media (max-width: 768px) { width: 50px; height: 50px; bottom: 20px; right: 20px; }
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const phoneNumber = "8801955482600"; 

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router >
        <Navbar />
        <Body>
          <HeroSection />
          <About /> 
          <Wrapper>
            <Skills />
            <Experience />
          </Wrapper>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Wrapper>
            <Education />
            <Contact setOpen={setSnackbarOpen} />
          </Wrapper>
          <Footer />
          
          {openModal.state &&
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          }
        </Body>

        {/* Global Floating Elements (Fixed Z-Index) */}
        <WhatsAppFloat href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon sx={{ fontSize: '35px' }} />
        </WhatsAppFloat>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={() => setSnackbarOpen(false)}
          message="Email sent successfully! ✅"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          ContentProps={{
            style: {
              backgroundColor: '#4caf50',
              color: '#fff',
              fontWeight: '600',
              borderRadius: '8px',
              zIndex: 999999, 
            },
          }}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;