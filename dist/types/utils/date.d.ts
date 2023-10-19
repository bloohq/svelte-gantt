export interface SvelteGanttDateAdapter {
    format(date: number, format: string): string;
}
export declare class MomentSvelteGanttDateAdapter implements SvelteGanttDateAdapter {
    moment: any;
    constructor(moment: any);
    format(date: number, format: string): string;
}
export declare class NoopSvelteGanttDateAdapter implements SvelteGanttDateAdapter {
    format(date: number, format: string): string;
}
export declare function startOf(date: number, unit: string): number;
export declare function getDuration(unit: string, offset?: number): number;
export declare function getDurationV2(unit: string, offset?: number, date?: any): number;
export declare function getAllPeriods(from: number, to: number, unit: string, offset?: number, highlightedDurations?: any): any[];
export declare function getPeriodDuration(from: number, to: number, unit: string, offset: number): number;
