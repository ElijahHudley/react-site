import React, { Component } from 'react';
import ListItem from './ListItem';
import IssueItem from './IssueItem';

import './style.scss';

export default class Repositories extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }


  // useEffect(() => {
  //   const { user, repo } = props;
  //
  //   if(!user.isAuthenticated) {
  //     props.history.push('/');
  //   }
  //
  //   console.log('props', props)
  //   console.log('repo', repo);
  // });

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { user, repo } = this.props;
    if(!user.isAuthenticated && prevProps.user.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  checkIssues = (data) => {
    if(data.has_issues) {
      this.props.getIssues(data.url)
    }
  }

  leftColumn = () => {
    const { repos, getIssues } = this.props;

    return Object.keys(repos.items).map((item, index) => {
      return (<ListItem
          key={`repos-left-${index}`}
          name={repos.items[item].name}
          onClick={() => this.checkIssues(repos.items[item]) }
      />)
    });
  }

  rightColumn = () => {
    const {repos} = this.props;
    console.log('selected', repos)
    return Object.keys(repos.selected).map((item, index) => {
      return (<IssueItem
          key={`repos-right-${index}`}
          number={repos.selected[item].number}
          name={repos.selected[item].title}
          editMode={this.state.editMode}
          onClick={(num) => this.updateItemOrder(num)}/>)
    });
  }

  updateItemOrder = (num) => {
  console.log('updateItemOrder', num);
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode } )
  }

  render() {
    const {user, clearLogin} = this.props;
    return (
        <div>
          <div className={'header'}>{`(${user.login}) Logged In`}</div>
          <button
              className={'button'}
              onClick={() => this.toggleEditMode()}>
            {`Edit Mode ${this.state.editMode ? 'On' : 'Off'}`}
          </button>

          <div className={'container'}>

            <div className={'content-left'}>
              <div className={'sub-header'}><span>Repositories</span></div>
              {this.leftColumn()}
            </div>

            <div className={'content-right'}>
              <div className={'sub-header'}><span>Issues</span></div>
              {this.rightColumn()}
            </div>


          </div>

            <button
                className={'button'}
                onClick={() => clearLogin()}>
              Log Out
            </button>
          </div>
    );
  }
}
