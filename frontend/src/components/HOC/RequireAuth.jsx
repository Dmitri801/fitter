import React, { Component } from "react";
import Spinner from "../UI/Spinner";
import { getAuthedUser } from "../../store/actions/userActions";
import { connect } from "react-redux";

export default ChildComponent => {
  class ComposedComponent extends Component {
    state = {
      loading: true
    };
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway(() => {
        this.props
          .dispatch(getAuthedUser(this.props.auth, this.props.id))
          .then(() => this.setState({ loading: false }));
      });
    }
    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway(callback) {
      if (!this.props.auth) {
        this.props.history.push("/");
      } else {
        if (callback) {
          callback();
        }
      }
    }
    render() {
      return this.state.loading ? (
        <Spinner />
      ) : (
        <ChildComponent {...this.props} />
      );
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth.authenticated, id: state.auth.id };
  }
  return connect(mapStateToProps)(ComposedComponent);
};
