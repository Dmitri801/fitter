import React, { Component } from "react";
import { signOutUser } from "../../store/actions/authActions";
import { connect } from "react-redux";

class Home extends Component {
  onSignOut = () => {
    this.props.dispatch(signOutUser());
  };
  render() {
    const { authedUser } = this.props;
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          alignItems: "center"
        }}
      >
        <h1>Welcome, {authedUser.firstName} </h1>
        <button onClick={this.onSignOut}>Sign Out</button>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  authedUser: users.authedUser
});

export default connect(mapStateToProps)(Home);
