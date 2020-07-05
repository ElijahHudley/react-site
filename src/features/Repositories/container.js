import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Repositories from './repositories';
import { clear } from "../Login/actions";
import { getIssues } from './actions';

const mapStateToProps = (state) => {
    return {
        repos: state.repos,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearLogin: () => dispatch(clear()),
        getIssues: (url) => dispatch(getIssues(url))
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Repositories));
