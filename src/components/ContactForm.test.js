import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render (<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render (<ContactForm/>)
    const header = screen.queryByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByLabelText(/first name/i)
    userEvent.type(firstNameInput, 'sirak')

    const error = await screen.findByTestId(/error/i);
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const button = screen.getByRole(/button/i)
    userEvent.click(button)

    const error = await screen.findByTestId(/error/i)
    expect(error).toBeInTheDocument();
    // or
    // expect(error).toHaveLength(3);
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
    render(<ContactForm/>)

    const name = screen.queryByLabelText(/first name/i);
    userEvent.type(name, 'sirak')

    const email = screen.queryByLabelText(/email/i);
    userEvent.type(email, '')

    const button = screen.queryByRole(/button/i)
    userEvent.click(button);

    const error = await screen.findByTestId(/error/i)
    expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const email = screen.queryByLabelText('Email*')
    userEvent.type(email, 'sirakisa@gmail.com')

    const error = await screen.findByTestId(/error/i)
    expect(error).toHaveTextContent("email must be a valid email address")
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const name = screen.queryByLabelText(/first name/i);
    userEvent.type(name, 'sirak')

    const email = screen.queryByLabelText(/email/i);
    userEvent.type(email, '')

    const button = screen.queryByRole(/button/i)
    userEvent.click(button);

    const error = await screen.findByTestId(/error/i)
    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});