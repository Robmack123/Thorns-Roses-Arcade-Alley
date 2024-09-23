import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService"; // Using your userService

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    fullName: "",
    businessName: "",
    password: "",
  });
  let navigate = useNavigate();

  const registerNewCustomer = () => {
    const newCustomer = {
      ...customer,
    };

    createUser(newCustomer).then((createdCustomer) => {
      if (createdCustomer.hasOwnProperty("id")) {
        localStorage.setItem(
          "thorn_user",
          JSON.stringify({
            id: createdCustomer.id,
          })
        );

        navigate("/"); // Navigate to homepage after registration
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email found
        window.alert("An account with this email already exists.");
      } else {
        // Email is good, create the customer
        registerNewCustomer();
      }
    });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Wedding Flower Shop</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateCustomer}
              type="text"
              id="fullName"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateCustomer}
              type="text"
              id="businessName"
              className="auth-form-input"
              placeholder="Business Name"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateCustomer}
              type="password"
              id="password"
              className="auth-form-input"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
