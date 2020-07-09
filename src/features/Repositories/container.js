import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Repositories from './repositories';
import { clear } from "../Login/actions";
import { getIssues, updateIssues } from './actions';

const mapStateToProps = (state) => {
    return {
        repos: state.repos,
        user: state.user,
        selected: state.repos.selected || {},
        currentRepo: state.repos.currentRepo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearLogin: () => dispatch(clear()),
        getIssues: (id, url) => dispatch(getIssues(id, url)),
        updateIssues: (id, value) => dispatch(updateIssues(id, value))
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Repositories));
