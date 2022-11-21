/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import useCall from '.';
import { MockedInboundCall, mockCallFetch } from '../../test-utils';

describe('useCall tests', function () {
    test('Returns call when id is passed', async () => {
        mockCallFetch(MockedInboundCall);
        const { result, waitForNextUpdate } = renderHook(() => useCall('123'));

        expect(result.current[1]).toBe(true);

        await waitForNextUpdate();

        expect(result.current[1]).toBe(false);
        expect(result.current[0]).toMatchObject(MockedInboundCall);
    });
});
