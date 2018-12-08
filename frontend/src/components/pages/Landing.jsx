import React from "react";
const landingImg = require("../../images/landing.jpg");
const signInSVG = require("../../images/icons/signin.svg");
function Landing(props) {
  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        width: "100%"
      }}
    >
      <div
        style={{
          background: `url(${landingImg})`,
          minHeight: "100%",
          backgroundSize: "cover",
          boxShadow: "rgba(135, 194, 50, 0.5) 5px 5px 55px inset",
          backgroundPosition: "center",
          width: "100%",
          zIndex: "7",
          overflowX: "hidden",
          position: "absolute",
          top: "0",
          bottom: "0"
        }}
      >
        <main className="landing_container">
          <header>
            <h1>
              <span className="landing_logo">B-Fittr</span>
              <button
                onClick={() => props.history.push("/login")}
                className="login_btn"
              >
                Log In
              </button>
            </h1>
          </header>
          <section className="landing_showcase">
            <p className="headline">Workout Better.</p>
            <button
              onClick={() => props.history.push("/register")}
              className="register_btn"
            >
              <span>Get Started</span>
              <img
                style={{ position: "absolute", right: "10px" }}
                src={signInSVG}
                alt=""
              />
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Landing;
