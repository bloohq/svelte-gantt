import type { SvelteRow } from './row';
import type { ColumnService } from './column';
import { TaskOverlapService } from './taskOverlap';
export interface TaskModel {
    id: number | string;
    resourceId: number | string;
    from: any;
    to: any;
    amountDone?: number;
    classes?: string | string[];
    label?: string;
    html?: string;
    showButton?: boolean;
    buttonClasses?: string | string[];
    buttonHtml?: string;
    enableDragging?: boolean;
    color?: string;
    height?: number;
}
export interface SvelteTask {
    model: TaskModel;
    left: number;
    top: number;
    width: number;
    height: number;
    reflections?: string[];
}
export declare class TaskFactory {
    columnService: ColumnService;
    rowPadding: number;
    rowEntities: {
        [key: number]: SvelteRow;
    };
    taskOverlapService: TaskOverlapService;
    constructor(columnService: ColumnService, taskOverlapService: TaskOverlapService);
    createTask(model: TaskModel): SvelteTask;
    createTasks(tasks: TaskModel[]): SvelteTask[];
    row(resourceId: any): SvelteRow;
    getHeight(model: any): number;
    getPosY(model: any): number;
}
export declare function reflectTask(task: SvelteTask, row: SvelteRow, options: {
    rowPadding: number;
}): {
    model: {
        resourceId: string | number;
        id: string;
        enableDragging: boolean;
        from: any;
        to: any;
        amountDone?: number;
        classes?: string | string[];
        label?: string;
        html?: string;
        showButton?: boolean;
        buttonClasses?: string | string[];
        buttonHtml?: string;
        color?: string;
        height?: number;
    };
    top: number;
    reflected: boolean;
    reflectedOnParent: boolean;
    reflectedOnChild: boolean;
    originalId: string | number;
    left: number;
    width: number;
    height: number;
    reflections?: string[];
};
