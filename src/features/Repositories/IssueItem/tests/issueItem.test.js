import React from 'react';
import renderer from 'react-test-renderer';

import IssueItem from '../issueItem';

describe('test issueItem component', () => {
    test('should match snapshot', () => {
        const tree = renderer
            .create(<IssueItem number={1} name={'test'}>
            </IssueItem>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
