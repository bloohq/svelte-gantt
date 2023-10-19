import { RowModel } from './row';
import { TaskModel } from './task';
export declare class TaskOverlapService {
    tasks: TaskModel[];
    rows: RowModel[];
    rowHeight: number;
    constructor({ tasks, rows, rowHeight }: {
        tasks: TaskModel[];
        rows: RowModel[];
        rowHeight: number;
    });
    getOverlapParent(task: TaskModel): any;
    getLevel(task: any): any;
    calculateRowHeight(rowId: number | string): number;
}
