import React, { Component } from "react";
import {
  checkIfEmpty,
  inputChange,
  validateEmail
} from "../../../utils/formValidation";
import { clearError } from "../../../store/actions/authActions";
import { connect } from "react-redux";
import { Field } from "redux-form";
class FormField extends Component {
  componentDidMount() {
    const input = document.querySelector(`.input_${this.props.name}`);
    const label = document.querySelector(`.label_${this.props.name}`);
    if (label.getAttribute("for") === input.getAttribute("name")) {
      if (input.value !== "") {
        label.classList.add("focused");
        label.style.display = "block";
      }
    }
  }
  componentWillUnmount() {}
  onInputFocus = (e, inputName) => {
    e.preventDefault();
    const input = document.querySelector(`.label_${inputName}`);
    inputChange(e.target);
    setTimeout(() => {
      input.setAttribute("id", "focused_input");
    }, 50);

    input.style.display = "block";

    setTimeout(() => {
      input.classList.add("focused");
    }, 50);
  };
  onInputBlur = (e, inputName) => {
    if (inputName !== "goals") {
      if (inputName === "email") {
        if (validateEmail(e.target.value)) {
          e.target.classList.remove("invalid");
        }
        checkIfEmpty(e.target, e.target.value);
      }
      checkIfEmpty(e.target, e.target.value);
    }

    if (e.target.value === "") {
      document.querySelector(`.input_${inputName}`).removeAttribute("id");
      document.querySelector(`.label_${inputName}`).classList.remove("focused");
      if (document.querySelector(`.label_${inputName}`) !== null) {
        document.querySelector(`.label_${inputName}`).style.display = "none";
      }
    }
  };

  onInputChange = e => {
    if (this.props.errors && Object.keys(this.props.errors).length > 0) {
      this.props.dispatch(clearError());
    }
    inputChange(e.target);
  };
  render() {
    const { props } = this;
    return (
      <Field
        component="input"
        autoComplete="none"
        aria-label={props.ariaLabel}
        type={props.type}
        className={`input_${props.name}`}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onFocus={e => this.onInputFocus(e, props.name)}
        onBlur={e => this.onInputBlur(e, props.name)}
        onChange={this.onInputChange}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  errors: auth.errors
});

export default connect(mapStateToProps)(FormField);
