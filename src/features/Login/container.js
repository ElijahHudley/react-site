import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Login from './login';
import { login, clear } from './actions';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (token) => dispatch(login(token)),
        clearLogin: () => dispatch(clear()),
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));
