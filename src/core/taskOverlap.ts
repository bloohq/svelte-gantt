import { RowModel } from './row';
import { TaskModel } from './task';

export class TaskOverlapService {
    tasks: TaskModel[];
    rows: RowModel[];
    rowHeight:number

  constructor({ tasks, rows, rowHeight}:{
    tasks: TaskModel[], rows: RowModel[],rowHeight: number
  }) {
    this.tasks = tasks;
    this.rows = rows;
    this.rowHeight = rowHeight;
    }

    getOverlapParent(task : TaskModel) {
        const rowTasks = this.tasks.filter(t => t.resourceId === task.resourceId);
        const sortedRowTasks = (rowTasks as any).toSorted((a, b) => a.from - b.from);
        const otherTasks = sortedRowTasks.filter(ot => ot.id !== task.id);
        const taskIndex = sortedRowTasks.findIndex(t => t.id === task.id);
        return otherTasks
            .slice(0, taskIndex)
            .toReversed()
            .find(
                ot =>
                    (ot.from >= task.from && ot.from <= task.to) ||
                    (ot.to <= task.to && ot.to >= task.from) ||
                    (ot.from <= task.from && ot.to >= task.to)
            );
    }

    getLevel(task) {
        const overlapParent = this.getOverlapParent(task);
        if (!overlapParent) return 0;
        return this.getLevel(overlapParent) + 1;
    }

    calculateRowHeight(rowId: number | string) {
        const row = this.rows.find(r => r.id === rowId);
        if (!row) return null;

        let rowHeight = this.rowHeight;

        const rowTasks = this.tasks.filter(t => t.resourceId === rowId);
        const maxOverlapLevel = rowTasks.reduce((max, task) => {
            const overlapLevel = this.getLevel(task);
            return Math.max(max, overlapLevel);
        }, 0);
        rowHeight = rowHeight * (maxOverlapLevel + 1);
        return rowHeight;
    }
};
