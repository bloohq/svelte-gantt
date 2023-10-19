import type { Readable } from 'svelte/store';
import type { SvelteTask } from './task';
import type { SvelteRow } from './row';
import type { SvelteTimeRange } from './timeRange';
interface EntityState<T> {
    ids: (string | number)[];
    entities: {
        [key: string]: T;
    };
}
interface EntityType {
    model: {
        id: string | number;
    };
    hidden?: boolean;
}
export interface EntityStore<T extends EntityType> extends Readable<EntityState<T>> {
    _update(updater: (value: EntityState<T>) => EntityState<T>): void;
    add(entity: T): void;
    addAll(entities: T[]): void;
    update(entity: T): void;
    upsert(entity: T): void;
    upsertAll(entities: T[]): void;
    delete(id: number | string): void;
    deleteAll(ids: (number | string)[]): void;
    refresh(): void;
    set(value: EntityState<T>): void;
    entities?: any;
}
export declare const taskStore: EntityStore<SvelteTask>;
export declare const rowStore: EntityStore<SvelteRow>;
export declare const timeRangeStore: EntityStore<SvelteTimeRange>;
export declare const allTasks: Readable<SvelteTask[]>;
export declare const allRows: Readable<SvelteRow[]>;
export declare const allTimeRanges: Readable<SvelteTimeRange[]>;
export declare const rowTaskCache: Readable<{}>;
export declare function all<T extends EntityType>(store: EntityStore<T>): Readable<T[]>;
export declare function where<T extends EntityType>(store: EntityStore<T>, filterFn: (value: T) => any): Readable<T[]>;
export {};
