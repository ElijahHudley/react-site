import React from 'react';
import renderer from 'react-test-renderer';

import IssueItem from '../issueItem';

describe('test issueItem component', () => {
    test('should match snapshot', () => {
        const tree = renderer
            .create(
            <IssueItem
                image={null}
                number={1}
                created={'07/11/20'}
                updated={'7/12/20'}
                state={'open'}
                name={'title'}/>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
