/**
 * @jest-environment jsdom
 */

import { test } from '@jest/globals';
import { screen } from '@testing-library/react';
import CallHeader from '../CallHeader';
import {
    MockedInboundCall,
    MockedOutboundCall,
    render,
} from '../../test-utils';

test('Render outbound Call CallHeader with "to" in it', () => {
    render(<CallHeader call={MockedOutboundCall} />);

    screen.getByText(MockedOutboundCall.to);
});

test('Render inbound Call CallHeader with "from" in it', () => {
    render(<CallHeader call={MockedInboundCall} />);

    screen.getByText(MockedInboundCall.from);
});

test('Render call without buttons', () => {
    render(<CallHeader call={MockedInboundCall} />);

    expect(screen.queryByText('Detail')).toBeNull();
    expect(screen.queryByText('Archive')).toBeNull();
});

test('Render call with Detail button', () => {
    render(
        <CallHeader call={MockedInboundCall} goToDetail={(_: string) => {}} />
    );

    expect(screen.getByText('Detail')).not.toBeNull();
    expect(screen.queryByText('Archive')).toBeNull();
});

test('Render call with Archive button', () => {
    render(<CallHeader call={MockedInboundCall} archive={(_: string) => {}} />);

    expect(screen.getByText('Archive')).not.toBeNull();
    expect(screen.queryByText('Detail')).toBeNull();
});
