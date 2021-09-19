import "bulma";
import { useState } from "react";
import "./Authentication.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [securityQuestion1, setSecurityQuestion1] = useState("");
  const [securityQuestion2, setSecurityQuestion2] = useState("");
  const [securityQuestion3, setSecurityQuestion3] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");
  const [securityQuestion1Error, setSecurityQuestion1Error] = useState("");
  const [securityQuestion2Error, setSecurityQuestion2Error] = useState("");
  const [securityQuestion3Error, setSecurityQuestion3Error] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [validUserType, setValidUserType] = useState(false);
  const [validSecurityQuestion1, setValidSecurityQuestion1] = useState(false);
  const [validSecurityQuestion2, setValidSecurityQuestion2] = useState(false);
  const [validSecurityQuestion3, setValidSecurityQuestion3] = useState(false);

  function handleChange(event) {
    event.preventDefault();
    let id = event.target.id;
    let value = event.target.value;
    let errors = "";
    let nameregex = /^[a-zA-Z0-9 .]*$/;
    let emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (id === "name") {
      if (!value.trim()) {
        errors = "name should not be empty";
        setValidName(false);
      } else if (value.trim() < 3) {
        errors = "name is too short";
        setValidName(false);
      } else if (value.trim() > 20) {
        errors = "Name should be less than 20 characters";
        setValidName(false);
      } else if (!nameregex.test(value)) {
        errors = "Name must contain numbers and alphabets";
        setValidName(false);
      } else {
        setValidName(true);
      }
      setName(value);
      setNameError(errors);
    }
    if (id === "email") {
      if (!value.trim()) {
        errors = "email should not be empty";
        setValidEmail(false);
      } else if (!emailregex.test(value)) {
        errors = "enter valid email";
        setValidEmail(false);
      } else {
        setValidEmail(true);
      }
      setEmail(value);
      setEmailError(errors);
    }
    if (id === "password") {
      if (!value.trim()) {
        errors = "enter password";
        setValidPassword(false);
      } else if (!value > 6) {
        errors = "password must contain atleast 6 characters ";
        setValidPassword(false);
      } else {
        setValidPassword(true);
      }
      setPassword(value);
      setPasswordError(errors);
    }
    if (id === "confirmPassword") {
      if (value !== password) {
        errors = "passwords donot match";
        setValidConfirmPassword(false);
      } else {
        setValidConfirmPassword(true);
      }
      setConfirmPassword(value);
      setConfirmPasswordError(errors);
    }
    if (id === "userType") {
      if (!value.trim()) {
        errors = "please select user type";
        setValidUserType(false);
      } else {
        setValidUserType(true);
      }
      setUserType(value);
      setUserTypeError(errors);
    }
    if (id === "securityQuestion1") {
      if (!value.trim()) {
        errors = "security question 1 must not be empty";
        setValidSecurityQuestion1(false);
      } else {
        setValidSecurityQuestion1(true);
      }
      setSecurityQuestion1(value);
      setSecurityQuestion1Error(errors);
    }
    if (id === "securityQuestion2") {
      if (!value.trim()) {
        errors = "security question 2 must not be empty";
        setValidSecurityQuestion2(false);
      } else {
        setValidSecurityQuestion2(true);
      }
      setSecurityQuestion2(value);
      setSecurityQuestion2Error(errors);
    }
    if (id === "securityQuestion3") {
      if (!value.trim()) {
        errors = "security question 3 must not be empty";
        setValidSecurityQuestion3(false);
      } else {
        setValidSecurityQuestion3(true);
      }
      setSecurityQuestion3(value);
      setSecurityQuestion3Error(errors);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (
      validName &&
      validEmail &&
      validPassword &&
      validConfirmPassword &&
      validUserType &&
      validSecurityQuestion1 &&
      validSecurityQuestion2 &&
      validSecurityQuestion3
    ) {
      axios
        .post(
          "https://15rtho2ts3.execute-api.us-east-1.amazonaws.com/auth/register",
          {
            email: email,
            name: name,
            password: password,
            type: userType,
          }
        )
        .then((response) => {
          if (response.data.message === "successful") {
            axios
              .post(
                "https://us-central1-csci-5410-s21-315116.cloudfunctions.net/serverlessproject/sequrityquestions",
                {
                  userId: email,
                  question1: securityQuestion1,
                  question2: securityQuestion2,
                  question3: securityQuestion3,
                }
              )
              .then((response) => {
                if (response.data.message === "success") {
                  window.alert("Successfully Registered Click ok to login");
                  history.push("/");
                } else {
                  setRegisterError(response.data.message);
                }
              });
          } else {
            setRegisterError(response.data.message);
          }
        });
    } else {
      window.alert(" All fields are required");
    }
  }
  function handleCancel(event) {
    event.preventDefault();
    history.push("/");
  }

  return (
    <div className="backgroundcolor">
      <div>
        <section className="hero">
          <div className="form">
            <div className="container">
              <div>
                <form>
                  <div>
                    <p
                      className="title"
                      style={{ fontSize: 30, textAlign: "center" }}
                    >
                      Registration Page
                    </p>
                    <h2 className="subtitle" style={{ color: "red" }}>
                      {registerError}
                    </h2>
                    <div className="field ">
                      <div className="control">
                        <label className="label" required>
                          Name
                        </label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input is-small"
                            type="text"
                            value={name}
                            id="name"
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                      {nameError && <p className="p"> {nameError} </p>}
                    </div>
                    <div className="field ">
                      <div className="control">
                        <label className="label">Email</label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input is-small"
                            type="text"
                            value={email}
                            id="email"
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                      {emailError && <p className="p"> {emailError} </p>}
                    </div>
                    <div className="field ">
                      <div className="control">
                        <label className="label">Password</label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input is-small"
                            type="password"
                            value={password}
                            id="password"
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                      {passwordError && <p className="p"> {passwordError} </p>}
                    </div>
                    <div className="field ">
                      <div className="control">
                        <label className="label"> Confirm Password</label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input is-small"
                            type="password"
                            value={confirmPassword}
                            id="confirmPassword"
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                      {confirmPasswordError && (
                        <p className="p"> {confirmPasswordError} </p>
                      )}
                    </div>
                    <div className="field ">
                      <div className="control">
                        <label className="label">Type of User</label>
                      </div>
                      <div className="control">
                        <label>
                          <select
                            className="select input is-small"
                            value={userType}
                            id="userType"
                            onChange={handleChange}
                          >
                            <option defaultValue>Select</option>
                            <option>Customer</option>
                            <option>Restaurant</option>
                          </select>
                        </label>
                      </div>
                      {userTypeError && <p className="p"> {userTypeError} </p>}
                    </div>
                    <div className="field ">
                      <div className="control">
                        <label className="label">
                          Security Question 1: Name of your favorite dog?
                        </label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input is-small"
                            type="text"
                            value={securityQuestion1}
                            id="securityQuestion1"
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                      {securityQuestion1Error && (
                        <p className="p"> {securityQuestion1Error} </p>
                      )}
                    </div>
                    <div className="field ">
                      <div className="control">
                        <label className="label">
                          Security Question 2: Name of your favorite teacher?
                        </label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input is-small"
                            type="text"
                            value={securityQuestion2}
                            id="securityQuestion2"
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                      {securityQuestion2Error && (
                        <p className="p"> {securityQuestion2Error} </p>
                      )}
                    </div>
                    <div className="field ">
                      <div className="control">
                        <label className="label">
                          Security Question 3: Name of your favorite place?
                        </label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input is-small"
                            type="text"
                            value={securityQuestion3}
                            id="securityQuestion3"
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                      {securityQuestion3Error && (
                        <p className="p"> {securityQuestion3Error} </p>
                      )}
                    </div>
                    <div className="buttons">
                      <button
                        className="button is-primary is-centered"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Register
                      </button>
                      <button
                        className="button is-centered "
                        type="submit"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Registration;
