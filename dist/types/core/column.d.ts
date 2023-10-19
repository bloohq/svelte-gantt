export interface Column {
    from: any;
    to: any;
    left: number;
    width: number;
    bgHighlightColor?: boolean;
    /**
     * Duration in milliseconds
     */
    duration: number;
}
export declare function findByPosition(columns: Column[], x: number): Column[];
export declare function findByDate(columns: Column[], x: any): Column[];
export interface ColumnService {
    getColumnByDate(date: any): Column;
    getColumnByPosition(x: any): Column;
    getPositionByDate(date: any): number;
    getDateByPosition(x: any): number;
    roundTo(date: any): number;
}
