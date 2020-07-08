import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from './App';

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({ });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
