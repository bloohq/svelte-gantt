export declare let draggableTasks: object;
export declare let currentSelection: Map<number, HTMLElement>;
export declare class SelectionManager {
    selectSingle(taskId: any, node: any): void;
    toggleSelection(taskId: any, node: any): void;
    unSelectTasks(): void;
    dispatchTaskEvent(taskId: any, event: any): void;
}
