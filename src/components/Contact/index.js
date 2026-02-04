import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const Container = styled.div`
  display: flex; flex-direction: column; justify-content: center;
  position: relative; z-index: 1; align-items: center;
`;

const Wrapper = styled.div`
  position: relative; display: flex; justify-content: space-between;
  align-items: center; flex-direction: column; width: 100%;
  max-width: 1350px; padding: 0px 0px 80px 0px; gap: 12px;
`;

const Title = styled.div`
  font-size: 42px; text-align: center; font-weight: 600; margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactForm = styled.form`
  width: 95%; max-width: 600px; display: flex; flex-direction: column;
  background-color: ${({ theme }) => theme.card}; padding: 32px;
  border-radius: 16px; box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px; gap: 12px;
`;

const ContactInput = styled.input`
  flex: 1; background-color: transparent; border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none; font-size: 18px; color: ${({ theme }) => theme.text_primary};
  border-radius: 12px; padding: 12px 16px;
  &:focus { border: 1px solid ${({ theme }) => theme.primary}; }
`;

const ContactInputMessage = styled.textarea`
  flex: 1; background-color: transparent; border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none; font-size: 18px; color: ${({ theme }) => theme.text_primary};
  border-radius: 12px; padding: 12px 16px;
  &:focus { border: 1px solid ${({ theme }) => theme.primary}; }
`;

const ContactButton = styled.input`
  width: 100%; cursor: pointer; text-align: center;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px; border-radius: 12px; border: none;
  color: ${({ theme }) => theme.text_primary}; font-size: 18px; font-weight: 600;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Contact = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.sendForm('service_umyfm7i', 'template_lklgtak', form.current, 'Zqvb9aKAxB9nJuQKF')
      .then(() => {
        setOpen(true);
        setLoading(false);
        form.current.reset();
      }, (error) => {
        setLoading(false);
        console.log(error.text);
      });
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactInput placeholder="Your Email" name="from_email" type="email" required />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage placeholder="Message" rows="4" name="message" required minLength="20" />
          <ContactButton type="submit" value={loading ? "Sending..." : "Send"} disabled={loading} />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;