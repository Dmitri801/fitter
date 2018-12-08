import React from "react";
import CloseIcon from "../UI/Icons/CloseIcon";
import { Transition } from "react-spring";
import { connect } from "react-redux";
function ErrorHandler({ closeError, children, auth }) {
  let showError;
  if (auth.errorMessage !== "") {
    showError = true;
  } else {
    showError = false;
  }
  return (
    <div style={{ height: "100%" }}>
      <Transition
        items={showError}
        from={{ transform: "translateY(-300px)" }}
        enter={{ transform: "translateY(0)" }}
        leave={{ transform: "translateY(-300px)" }}
      >
        {showError =>
          showError &&
          (props => (
            <div style={props} className="err_container">
              <div className="err_msg">
                {auth.errorMessage}
                <CloseIcon click={closeError} showError={showError} />
              </div>
            </div>
          ))
        }
      </Transition>
      {children}
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(ErrorHandler);
