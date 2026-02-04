import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  cursor: pointer;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const WhatsAppButton = styled.a`
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
  /* Maximum possible z-index to stay above Footer and Navbar */
  z-index: 2147483647; 
  box-shadow: 2px 4px 12px rgba(0,0,0,0.4);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #128c7e;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
  }
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const phoneNumber = "880123456789"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'service_umyfm7i', 
      'template_lklgtak', 
      form.current, 
      'Zqvb9aKAxB9nJuQKF'
    )
      .then((result) => {
        setOpen(true);
        setLoading(false);
        form.current.reset();
      }, (error) => {
        setLoading(false);
        console.log("EmailJS Error:", error.text);
      });
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Please feel free to reach out if you have any questions!</Desc>
        
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput 
            placeholder="Your Email" 
            name="from_email" 
            type="email" 
            required 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage 
            placeholder="Message" 
            rows="4" 
            name="message" 
            required 
            minLength="20" 
          />
          <ContactButton 
            type="submit" 
            value={loading ? "Sending..." : "Send"} 
            disabled={loading}
          />
        </ContactForm>

        {/* Success Toast in Bottom-Left */}
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
          message="Email sent successfully! ✅"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          ContentProps={{
            style: {
              backgroundColor: '#4caf50',
              color: '#fff',
              fontWeight: '500',
              borderRadius: '8px',
            },
          }}
        />
      </Wrapper>

      {/* Floating WhatsApp Button - Outside Wrapper for better stacking */}
      <WhatsAppButton 
        href={`https://wa.me/${phoneNumber}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <WhatsAppIcon sx={{ fontSize: '35px' }} />
      </WhatsAppButton>
    </Container>
  );
};

export default Contact;