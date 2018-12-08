import React, { Component } from "react";
import DeadLiftSVG from "../UI/Icons/DeadLiftSVG.jsx";
import LoginForm from "../Login/Form";
import ErrorHandler from "../HOC/ErrorHandler";
import { checkInputsOnSubmit } from "../../utils/formValidation";
import { signInUser, clearError } from "../../store/actions/authActions";
import { connect } from "react-redux";

const loginImg = require("../../images/gym-adstock.jpg");

class Login extends Component {
  componentDidUpdate() {
    const { errors } = this.props;
    if (errors && Object.keys(errors).length > 0) {
      checkInputsOnSubmit(errors);
    }
  }
  componentWillUnmount() {
    this.props.dispatch(clearError());
  }
  onFormSubmit = props => {
    this.props.dispatch(
      signInUser(props, () => {
        this.props.history.push("/home");
      })
    );
  };

  closeError = () => {
    this.props.dispatch(clearError());
  };
  render() {
    return (
      <ErrorHandler closeError={this.closeError}>
        <main className="login">
          <div
            style={{
              background: `linear-gradient(223.53deg, rgba(0, 20, 15, 0.12), rgba(0, 26, 0, 0.63), rgba(0, 3, 12, 0.65)), url(${loginImg})`,
              height: "100%",
              backgroundSize: "cover",
              opacity: "1",
              backgroundPosition: "center",
              position: "absolute",
              width: "100%",
              overflowX: "hidden",
              zIndex: "0",
              top: "0"
            }}
            className="login_container"
          >
            <div className="main_logo">
              <h1>B-Fittr</h1>
              <DeadLiftSVG />
            </div>

            <div className="form_card">
              <LoginForm
                onFormSubmit={this.onFormSubmit}
                history={this.props.history}
              />
            </div>
          </div>
        </main>
      </ErrorHandler>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  errors: auth.errors
});

export default connect(mapStateToProps)(Login);
