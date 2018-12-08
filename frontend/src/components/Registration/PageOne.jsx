import React from "react";
import FormField from "../UI/Forms/FormField";
import NextSVG from "../UI/Icons/NextSVG";
import { reduxForm } from "redux-form";
function PageOneRegister(props) {
  return (
    <form>
      <div style={{ marginTop: "75px", zIndex: "99" }} className="form_team">
        <label className="label_firstName" htmlFor="firstName">
          First Name
        </label>
        <FormField
          type="text"
          placeholder="First Name"
          name="firstName"
          ariaLabel={"Enter your first name"}
        />
      </div>
      <div className="form_team">
        <label className="label_lastName" htmlFor="lastName">
          Last Name
        </label>
        <FormField
          type="text"
          placeholder="Last Name"
          name="lastName"
          ariaLabel={"Enter your last name"}
        />
      </div>
      <div className="form_team">
        <label className="label_email" htmlFor="email">
          Email
        </label>
        <FormField
          className="login_input"
          type="email"
          placeholder="Email"
          name="email"
          ariaLabel={"Enter your email"}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="next_back_btn_container one"
      >
        <span
          aria-label="Go to next page"
          role="button"
          tabIndex="0"
          onClick={() => props.changePage(2)}
          onKeyDown={e => (e.keyCode === 13 ? props.changePage(2) : null)}
        >
          Next <NextSVG />
        </span>
      </div>
    </form>
  );
}

export default reduxForm({
  form: "Register",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(PageOneRegister);
