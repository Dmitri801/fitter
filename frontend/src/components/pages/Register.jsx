import React, { Component } from "react";
import DeadLiftSVG from "../UI/Icons/DeadLiftSVG.jsx";
import PageOneRegister from "../Registration/PageOne";
import PageTwoRegister from "../Registration/PageTwo";
import ErrorHandler from "../HOC/ErrorHandler";
import { checkInputsOnSubmit } from "../../utils/formValidation";
import { connect } from "react-redux";
import { destroy } from "redux-form";
import { registerUser, clearError } from "../../store/actions/authActions";
const registerImg = require("../../images/register.jpg");

class Register extends Component {
  state = {
    page: 1
  };

  componentWillUnmount() {
    this.props.dispatch(destroy("Register"));
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    const { errors } = this.props;
    if (errors && Object.keys(errors).length > 0) {
      checkInputsOnSubmit(errors);
    }
  }

  onFormSubmit = formProps => {
    this.props
      .dispatch(
        registerUser(formProps, () => {
          this.props.history.push("/home");
        })
      )
      .then(() => {
        const { errors } = this.props;
        if (errors && errors !== {}) {
          checkInputsOnSubmit(errors);
        }
      });
  };

  changePage = page => {
    this.setState({ page });
  };

  closeError = () => {
    this.props.dispatch(clearError());
  };

  renderPage = () => {
    switch (this.state.page) {
      case 1:
        return <PageOneRegister changePage={this.changePage} />;
      case 2:
        return (
          <PageTwoRegister
            onFormSubmit={this.onFormSubmit}
            changePage={this.changePage}
          />
        );
      default:
        return;
    }
  };
  render() {
    const { auth } = this.props;
    let onError;
    if (auth.errorMessage !== "") {
      onError = true;
    } else {
      onError = false;
    }

    return (
      <ErrorHandler
        closeError={this.closeError}
        showError={onError}
        errorMsg={auth.errorMessage}
      >
        <div
          style={{
            height: "100%",
            position: "relative",
            width: "100%",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              background: `linear-gradient(223.53deg, rgba(0, 20, 15, 0.12), rgba(0, 26, 0, 0.63), rgba(0, 3, 12, 0.65)), url(${registerImg})`,
              height: "100%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "100%",
              zIndex: "7",
              overflowX: "hidden",
              position: "absolute"
            }}
          >
            <main className="register_container">
              <div className="main_logo">
                <h1>B-Fittr</h1>
                <DeadLiftSVG />
              </div>
              <div className="form_card">
                <h2>Registration</h2>
                {this.renderPage()}
                <p>
                  Already a member?{" "}
                  <span
                    role="button"
                    aria-label="Go to login page"
                    tabIndex="0"
                    onClick={() => this.props.history.push("/login")}
                    onKeyDown={e =>
                      e.keyCode === 13
                        ? this.props.history.push("/login")
                        : null
                    }
                    className="login_link"
                  >
                    Log In
                  </span>
                </p>
              </div>
            </main>
          </div>
        </div>
      </ErrorHandler>
    );
  }
}

const mapStateToProps = ({ form, auth }) => ({
  form,
  auth,
  errors: auth.errors
});

export default connect(mapStateToProps)(Register);
