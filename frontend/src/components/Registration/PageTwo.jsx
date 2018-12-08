import React from "react";
import FormField from "../UI/Forms/FormField";
import BackSVG from "../UI/Icons/BackSVG";
import { reduxForm } from "redux-form";
function PageTwoRegister(props) {
  return (
    <form>
      <div style={{ marginTop: "75px", zIndex: "99" }} className="form_team">
        <label className="label_password" htmlFor="password">
          Create a password
        </label>
        <FormField
          type="password"
          placeholder="Create a password"
          name="password"
          ariaLabel={"Create a password"}
        />
      </div>
      <div className="form_team">
        <label className="label_confirmPassword" htmlFor="confirmPassword">
          Confirm password
        </label>
        <FormField
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          ariaLabel={"Confirm your password"}
        />
      </div>
      <div className="form_team">
        <label className="label_goals" htmlFor="goals">
          Tell us about your goals
        </label>
        <FormField
          className="login_input"
          type="text"
          placeholder="Tell us about your goals"
          name="goals"
          ariaLabel={"Tell us about your goals"}
        />
      </div>

      <div
        style={{ display: "flex" }}
        aria-label="Go back a page"
        role="button"
        className="next_back_btn_container two"
      >
        <span
          aria-label="Go back a page"
          role="button"
          tabIndex="0"
          onKeyDown={e => (e.keyCode === 13 ? props.changePage(1) : null)}
          onClick={() => props.changePage(1)}
        >
          <BackSVG />
          Back
        </span>
        <div
          aria-label="Submit registration"
          role="button"
          tabIndex="0"
          className="register_btn"
          onClick={props.handleSubmit(props.onFormSubmit)}
          onKeyDown={e =>
            e.keyCode === 13 ? props.handleSubmit(props.onFormSubmit) : null
          }
        >
          Register
        </div>
      </div>
    </form>
  );
}

export default reduxForm({
  form: "Register",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(PageTwoRegister);
