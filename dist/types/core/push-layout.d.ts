import { SvelteRow } from './row';
import { SvelteTask } from './task';
/**
 * Layouts tasks in a 'push' layout:
 *  - expand row height to fit all tasks
 *
 * @param tasks
 * @param params
 *
 * TODO:: tests, optimization: update only rows that have changes, update only overlapping tasks
 */
export declare function layout(tasks: SvelteTask[], params: {
    row: SvelteRow;
    rowHeight: number;
    rowPadding: number;
    rowContentHeight: number;
}): void;
