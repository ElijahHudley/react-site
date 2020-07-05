import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({ });

export default (connect(mapStateToProps, mapDispatchToProps)(App));
