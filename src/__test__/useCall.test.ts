/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import useCall from '../hooks/useCall';

test('Returns undefined when no id is passed', () => {
    const { result } = renderHook(() => useCall());
    console.log(result.current);
    const [call, loading] = result.current;

    expect(call).toBeUndefined();
    expect(loading).toBe(false);
});

test('Returns call when id is passed', () => {
    const { result } = renderHook(() => useCall('123'));
    console.log(result.current);
    const [, loading] = result.current;

    expect(loading).toBe(true);
});
