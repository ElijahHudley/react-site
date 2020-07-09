import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ListItem from './ListItem';
import IssueItem from './IssueItem';

import './style.scss';

export default class Repositories extends Component {
  constructor(props) {
    super(props);
    this.state = { currentRepo: '', showRepoList: false };
  }

  componentDidMount() {
    const { user } = this.props;
    if(!user.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { user } = this.props;
    if(!user.isAuthenticated && prevProps.user.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  toggleRepoList = () => {
    const { showRepoList } = this.state;
    this.setState({ currentRepo: null, showRepoList: !showRepoList });
  }

  refreshIssues = (data) => {
    const { getIssues } = this.props;

    if(data) {
      getIssues(data.id, data.url);
    }
  }

  checkIssues = (data) => {
    const { repos } = this.props;

    this.setState({
      showRepoList: true,
      currentRepo: data.id,
    });

    if(repos.selected[data.id] === undefined) {
      this.refreshIssues(data);
    }
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = (result) => {
    const { updateIssues, selected } = this.props;
    const { currentRepo } = this.state;
    const dataSet = selected[currentRepo];
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
        dataSet,
        result.source.index,
        result.destination.index
    );

    updateIssues(currentRepo, items)
  }

  leftColumn = () => {
    const { repos } = this.props;
    const { currentRepo } = this.state;

    if(repos.items === null || !Object.keys(repos.items).length) {
      return (<span className={'sub-header'}> No repositories retrieved </span>)
    }

    return Object.keys(repos.items).map((item, index) => {
      return (
            <ListItem
              key={`repos-left-${index}`}
              selected={repos.items[item].id === currentRepo}
              name={repos.items[item].name}
              onClick={(items) => this.checkIssues(repos.items[item]) }
            />)
    });
  }

  rightColumn = (currentRepo) => {
    const { user, selected } = this.props;

    if(currentRepo === '') {
      return (<span className={'sub-header'}> Please select a repository </span>)
    }

    if(selected[currentRepo] === undefined) {
      return (<span className={'sub-header'}> Getting issues... </span>)
    }

    if(!selected[currentRepo].length) {
      return (<span className={'sub-header'}> No issues in repository </span>)
    }

    const dataSet = selected[currentRepo] || {};

    if(currentRepo && dataSet) {
      return (<DragDropContext onDragEnd={this.onDragEnd}>
        <div className={'header header-right'}>{`Drag to reorder`}</div>

        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
              <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
              >
                {Object.keys(dataSet).map((item, index) => (
                    <Draggable key={dataSet[item].number} draggableId={`${dataSet[item].id.toString()}-${dataSet[item].number.toString()}`} index={index}>
                      {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                          >
                            <IssueItem
                                key={`repos-right-${index}`}
                                image={user.avatar_url}
                                number={index + 1}
                                created={dataSet[item].created_at}
                                updated={dataSet[item].updated_at}
                                state={dataSet[item].state}
                                name={dataSet[item].title}/>
                          </div>
                      )}
                    </Draggable>
                ))}
                {provided.placeholder}
              </div>
          )}
        </Droppable>
      </DragDropContext>)
    }
  }

  render() {
    const {user, clearLogin } = this.props;
    const {currentRepo, showRepoList} = this.state;

    window.scrollTo(0, 0)

    return (
        <div>
          <div className={'header'}>{`(${user.login}) Logged In`}</div>

          <div className={'container'}>
            <div className={showRepoList ? 'content-left content-left-mobile-disabled' : 'content-left'}>
              <div className={'sub-header'}>
                <span>Repositories</span>
              </div>

              {this.leftColumn()}
            </div>

            <div className={'content-right'}>
              <div className={'sub-header'}><span>Issues</span></div>
              {this.rightColumn(currentRepo)}
            </div>

            {currentRepo !== '' && showRepoList && <div className={'content-right-mobile'}>
              <div className={'sub-header'}>
                <span>Issues</span>
              </div>
              {this.rightColumn(currentRepo)}

              <button
                  className={'button'}
                  onClick={() => this.toggleRepoList()}>
                {'Close Issues'}
              </button>
            </div>}
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
