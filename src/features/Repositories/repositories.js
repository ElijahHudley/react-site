import React, { Component } from 'react';
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ListItem from './ListItem';
import IssueItem from './IssueItem';

import './style.scss';

export default class Repositories extends Component {
  constructor(props) {
    super(props);
    this.state = { issues: { }, currentItem: '', showRepoList: false };
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
    this.setState({ showRepoList: !showRepoList });
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
      currentItem: data.id,
      issues: {[data.id]: repos.selected[data.id] || {}}
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
    const { repos, updateIssues } = this.props;
    const { currentItem, issues } = this.state;
    const dataSet = issues[currentItem];

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
        dataSet,
        result.source.index,
        result.destination.index
    );

    this.setState({ issues: { [currentItem]: items} }, () => {
      updateIssues(currentItem, items)
    });
  }

  leftColumn = () => {
    const { repos } = this.props;

    return Object.keys(repos.items).map((item, index) => {
      return (<ListItem
          key={`repos-left-${index}`}
          name={repos.items[item].name}
          onClick={(items) => this.checkIssues(repos.items[item]) }
      />)
    });
  }

  rightColumn = (currentItem) => {
    const {repos} = this.props;
    const {issues} = this.state;

    const dataSet = issues[currentItem] || {};

    if(currentItem && dataSet) {
      return (<DragDropContext onDragEnd={this.onDragEnd}>
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
                                number={dataSet[item].number}
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
    const {user, clearLogin} = this.props;
    const {currentItem, showRepoList} = this.state;
    return (
        <div>
          <div className={'header'}>{`(${user.login}) Logged In`}</div>
          <div className={'content-left-mobile-button'}>

          </div>

          <div className={'container'}>
            <div className={'content-left'}>
              <div className={'sub-header'}><span>Repositories</span></div>
              {this.leftColumn()}
            </div>

            <div className={'content-right'}>
              <div className={'sub-header'}><span>Issues</span></div>
              {this.rightColumn(currentItem)}
            </div>

            {currentItem !== '' && showRepoList && <div className={'content-right-mobile'}>
              <div className={'sub-header'}><span>Issues</span></div>
              <button
                  className={'button'}
                  onClick={() => this.toggleRepoList()}>
                {'Close Issues'}
              </button>
              {this.rightColumn(currentItem)}
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
