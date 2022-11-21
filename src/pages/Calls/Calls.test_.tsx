/**
 * @jest-environment jsdom
 */

import { test } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import Calls from '.';
import { useCallsContext } from '../../contexts/CallsContext';
import { MockedInboundCall, mockFetch, render } from '../../test-utils';

test('Returns call when id is passed', async () => {
    mockFetch({ nodes: [MockedInboundCall] });
    render(<Calls />);
    const { result, waitForNextUpdate } = renderHook(() => useCallsContext());

    console.log('1', result.current);
    await waitForNextUpdate();
    console.log('2', result.current);

    // expect(result.current[1]).toBe(false);
    // expect(result.current[0]).toMatchObject(MockedInboundCall);
});
