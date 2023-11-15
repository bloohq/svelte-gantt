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
    row: any;
    rowHeight: any;
    y: any;
    rowPadding: number;
    rowContentHeight: number;
}): void;
export declare function updateIntersects(tasks: any): void;
