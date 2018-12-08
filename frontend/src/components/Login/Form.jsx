import React from "react";
import FormField from "../UI/Forms/FormField";
import { reduxForm } from "redux-form";
function Form(props) {
  return (
    <form onSubmit={props.handleSubmit(props.onFormSubmit)}>
      <div className="form_team">
        <label className="label_email" htmlFor="email">
          Email
        </label>
        <FormField
          type="email"
          placeholder="Email"
          name="email"
          ariaLabel={"Enter your email"}
        />
      </div>
      <div className="form_team">
        <label className="label_password" htmlFor="password">
          Password
        </label>
        <FormField
          type="password"
          placeholder="Password"
          name="password"
          ariaLabel={"Enter your password"}
        />
      </div>
      <input className="login_btn" type="submit" value="Log In" />
      <p>
        Not a member yet?{" "}
        <span
          onClick={() => props.history.push("/register")}
          onKeyDown={e =>
            e.keyCode === 13 ? props.history.push("/register") : null
          }
          className="signup_link"
          role="button"
          aria-label="Go to register page"
          tabIndex="0"
        >
          Sign up
        </span>
      </p>
    </form>
  );
}

export default reduxForm({ form: "Login" })(Form);
