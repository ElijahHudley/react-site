import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Repositories from './repositories';
import { repositories } from './actions';
import { clear } from "../Login/actions";

const mapStateToProps = (state) => {
    return {
        repo: state.repo,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRepositories: (url) => dispatch(repositories(url)),
        clearLogin: () => dispatch(clear()),
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Repositories));
