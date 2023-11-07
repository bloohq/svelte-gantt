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
export function layout(
    tasks: SvelteTask[],
    params: {
        row: SvelteRow;
        rowHeight: number;
        rowPadding: number;
        rowContentHeight: number;
    }
) {
    if (!tasks.length) {
        return;
    }

    const { row, rowHeight, rowContentHeight, rowPadding } = params;

    if (tasks.length === 1) {
        const task = tasks[0];
        task.yPos = 0;
        task.intersectsWith = [];
        task.height = rowContentHeight;
        task.topDelta = task.yPos * task.height; // + rowPadding which is added by taskfactory;
    }

    tasks.sort(_byStartThenByLongestSortFn);

    for (const left of tasks) {
        left.yPos = 0; // reset y positions
        left.intersectsWith = [];
        for (const right of tasks) {
            if (left !== right && _intersects(left, right)) {
                left.intersectsWith.push(right);
            }
        }
    }

    const maxSlot = tasks.reduce((m, t) => Math.max(m, _getMaxIntersectsWithLength(t)), 0);
    row.height = maxSlot * rowHeight;
    for (const task of tasks) {
        task.numYSlots = _getMaxIntersectsWithLength(task);
        for (let i = 0; i < task.numYSlots!; i++) {
            if (!task.intersectsWith!.some(intersect => intersect.yPos === i)) {
                task.yPos = i;
                task.height = rowContentHeight;
                task.topDelta = task.height * task.yPos + rowPadding * i;
                break;
            }
        }
    }
}

/** string intersection between tasks */
function _intersects(left: SvelteTask, right: SvelteTask) {
    return left.left + left.width > right.left && left.left < right.left + right.width;
}

function _byStartThenByLongestSortFn(a: SvelteTask, b: SvelteTask) {
    return a.left - b.left || b.left + b.width - (a.left + a.width);
}

/**
 * The maximum number of tasks a task, and the tasks task is intersecting with, task is intersecting with.
 * eg. If intersecting with 3, and one of those 3 is intersecting with 4 more, the number returned is 4,
 * because for the layout to look good we need to squeeze the first task in slots of 4.
 * @param task
 * @param seen
 * @returns
 */
function _getMaxIntersectsWithLength(task: SvelteTask, seen = new Map<SvelteTask, boolean>()) {
    seen.set(task, true);
    // if (task.numYSlots != null) {
    //     return task.numYSlots;
    // }
    let len = task.intersectsWith!.length + 1;
    for (const intersect of task.intersectsWith!.filter(i => !seen.has(i))) {
        const innerLen = _getMaxIntersectsWithLength(intersect, seen);
        if (innerLen > len) {
            len = innerLen;
        }
    }
    return len;
}
