import "bulma";
import "./Authentication.css";
import { useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    securityQuestion: "",
  });
  const [loginState, setLoginState] = useState(false);
  const [isValid, setIsVaild] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const securityQuestions = [
    "Name of your favorite dog?",
    "Name of your favorite teacher?",
    "Name of your favorite place?",
  ];
  // Referred from https://www.geeksforgeeks.org/how-to-select-a-random-element-from-array-in-javascript/
  if (!localStorage.getItem("question")) {
    const selectedSecurityQuestion =
      securityQuestions[Math.floor(Math.random() * securityQuestions.length)];
    localStorage.setItem("question", selectedSecurityQuestion);
  }

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (values.email && values.password) {
      axios
        .post(
          "https://15rtho2ts3.execute-api.us-east-1.amazonaws.com/auth/login",
          {
            email: values.email,
            password: values.password,
          }
        )
        .then((response) => {
          if (response.data.message === "successful") {
            localStorage.setItem("user", JSON.stringify(response.data.data));
            setLoginError("");
            setIsVaild(true);
          } else {
            setLoginError(response.data.message);
          }
        });
    } else {
      window.alert("All fields are required");
    }
  }
  function handleCancel(event) {
    event.preventDefault();
    history.push("/");
  }
  function handleLogin(event) {
    event.preventDefault();
    if (values.securityQuestion) {
      axios
        .get(
          "https://us-central1-csci-5410-s21-315116.cloudfunctions.net/serverlessproject/sequrityquestion/" +
            values.email
        )
        .then((response) => {
          if (response.data.message === "success") {
            for (let i = 0; i < securityQuestions.length; i++) {
              if (securityQuestions[i] === localStorage.getItem("question")) {
                if (securityQuestions[i] === "Name of your favorite dog?") {
                  if (response.data.question1 === values.securityQuestion) {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.removeItem("question");
                    setLoginState(true);
                  }
                } else if (
                  securityQuestions[i] === "Name of your favorite teacher?"
                ) {
                  if (response.data.question2 === values.securityQuestion) {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.removeItem("question");
                    setLoginState(true);
                  }
                } else if (
                  securityQuestions[i] === "Name of your favorite place?"
                ) {
                  if (response.data.question3 === values.securityQuestion) {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.removeItem("question");
                    setLoginState(true);
                  }
                } else {
                  setLoginError("Please enter a correct answer");
                }
              }
            }
          } else {
            setLoginError(response.data.message);
          }
        });
    } else {
      window.alert("Please answer Security Question");
    }
  }

  if (isValid) {
    return (
      <div>
        {!loginState ? (
          <div className="backgroundcolor">
            <section className="hero">
              <div className="form" style={{ marginTop: 150 }}>
                <div className="container">
                  <div>
                    <form>
                      <div>
                        <p
                          className="title"
                          style={{ fontSize: 30, textAlign: "center" }}
                        >
                          Please Answer Below Question to Login
                        </p>
                        <h2 className="subtitle" style={{ color: "red" }}>
                          {loginError}
                        </h2>
                        <div className="field ">
                          <div className="control">
                            <label className="label">
                              {" "}
                              {localStorage.getItem("question")}
                            </label>
                          </div>
                          <div className="control">
                            <label>
                              <input
                                className="input"
                                type="text"
                                name="securityQuestion"
                                value={values.securityQuestion}
                                onChange={handleChange}
                              ></input>
                            </label>
                          </div>
                        </div>
                        <div className="buttons">
                          <button
                            className="button is-primary is-centered"
                            type="submit"
                            onClick={handleLogin}
                          >
                            Login
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
        ) : (
          <Redirect
            to={{
              pathname: "/home",
            }}
          ></Redirect>
        )}
      </div>
    );
  } else {
    return (
      <div className="backgroundcolor">
        <section className="hero">
          <div className="form" style={{ marginTop: 150 }}>
            <div className="container">
              <div>
                <form>
                  <div>
                    <p
                      className="title"
                      style={{ fontSize: 30, textAlign: "center" }}
                    >
                      Login Page
                    </p>
                    <h2 className="subtitle" style={{ color: "red" }}>
                      {loginError}
                    </h2>
                    <div className="field ">
                      <div className="control">
                        <label className="label">Email</label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input"
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                    </div>
                    <div className="field ">
                      <div className="control">
                        <label className="label">Password</label>
                      </div>
                      <div className="control">
                        <label>
                          <input
                            className="input"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                          ></input>
                        </label>
                      </div>
                    </div>
                    <div className="buttons">
                      <button
                        className="button is-primary is-centered"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Next
                      </button>
                      <button className="button is-centered " type="reset">
                        Reset
                      </button>
                    </div>
                    <label className="label">
                      Don't have an account? <a href="/register">click here</a>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Login;
