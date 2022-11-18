/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { Call } from '../../api/types';
import useCall from '.';
import { MockedInboundCall } from '../../test-utils';

const mockFetch = (mockData: Call) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockData),
        })
    ) as jest.Mock;
};

const mockFetchError = (error: any) => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

// const mockFetchCleanUp = () => {
//     global.fetch.mockClear();
//     delete global.fetch;
// };

test('Returns call when id is passed', async () => {
    mockFetch(MockedInboundCall);
    const { result, waitForNextUpdate } = renderHook(() => useCall('123'));

    expect(result.current[1]).toBe(true);

    await waitForNextUpdate();

    expect(result.current[0]).toMatchObject(MockedInboundCall);
    // mockFetchCleanUp();
});
