import React from 'react'
import { render, screen} from '@testing-library/react'
import { ContactForm } from './ContactForm'
import userEvent from '@testing-library/user-event';

test('tests work', () => {
    expect(true).toBe(true);
});

describe('rendering tests', ()=>{
    test('renders without errors', ()=>{
        render(<ContactForm />);
    });

    test('renders the contact form header', ()=> {
        render(<ContactForm />);
        const header = screen.getByText("Contact Form");
        expect(header).toBeTruthy();
        expect(header).toBeInTheDocument();
    });
});


test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const aString = "a";
    const firstName = screen.findByLabelText("First Name");
    userEvent.type(firstName, aString);
    const errors = screen.findAllByTestId("error");
    expect(errors.length).toBe(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstName = screen.findByLabelText("First Name");
    const lastName = screen.findByLabelText("Last Name");
    const email = screen.findByLabelText("Email");
    const message = screen.findByLabelText("Message");

    userEvent.type(firstName, "");
    userEvent.type(lastName, "");
    userEvent.type(email, "");
    userEvent.type(message, "");

    const errors = screen.findAllByTestId("error");
    expect(errors.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.findByLabelText("First Name");
    const lastName = screen.findByLabelText("Last Name");
    const email = screen.findByLabelText("Email");
  
    userEvent.type(firstName, "Warren");
    userEvent.type(lastName, "Longmire");
    userEvent.type(email, "");

    const errors = screen.findAllByTestId("error");
    expect(errors.length).toBe(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.findByLabelText("Email");

    userEvent.type(email, "jaguar");

    const errors = screen.findAllByTestId("error");
    expect(errors.length).toBe(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submit = screen.getByRole("button");
    expect(submit).toBeInTheDocument();

    userEvent.click(submit);
    
    const error = screen.getByText("lastName is a required field");
    expect(error).toBeVisible();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.findByLabelText("First Name");
    const lastName = screen.findByLabelText("Last Name");
    const email = screen.findByLabelText("Email");
    const message = screen.findByLabelText("Message");
    const submit = screen.getByRole("button");
    expect(submit).toBeInTheDocument();

    userEvent.type(firstName, "Warren");
    userEvent.type(lastName, "Longmire");
    userEvent.type(email, "itsme@warren-longmire.com");
    userEvent.type(message, "");

    userEvent.click(submit);
    let checkFor = screen.getByText("First Name:");
    checkFor = screen.getByText("Last Name: ");
    checkFor = screen.getByText("Email: ");
    checkFor = screen.queryByText("Message: ");
    expect(checkFor).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.findByLabelText("First Name");
    const lastName = screen.findByLabelText("Last Name");
    const email = screen.findByLabelText("Email");
    const message = screen.findByLabelText("Message");
    const submit = screen.getByRole("button");
    expect(submit).toBeInTheDocument();

    userEvent.type(firstName, "Warren");
    userEvent.type(lastName, "Longmire");
    userEvent.type(email, "itsme@warren-longmire.com");
    userEvent.type(message, "nope");

    userEvent.click(submit);
    let checkFor = screen.getByText("First Name:");
    checkFor = screen.getByText("Last Name: ");
    checkFor = screen.getByText("Email: ");
    checkFor = screen.queryByText("Message: ");
    expect(checkFor).toBeInTheDocument();
});