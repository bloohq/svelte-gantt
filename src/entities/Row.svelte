<script lang="ts">
    import { GanttContext } from 'src/gantt';
    import { getContext } from 'svelte';
    import type { SvelteRow } from '../core/row';
    export let row: SvelteRow;
    const { hoveredRow, selectedRow } = getContext<GanttContext>('gantt');
</script>

<div class="sg-row {row.model.classes}" data-row-id="{row.model.id}" class:sg-hover={$hoveredRow == row.model.id} class:sg-selected={$selectedRow == row.model.id} style="height:{row.height}px">
    {#if row.model.contentHtml}
        {@html row.model.contentHtml}
    {/if}
</div>    
<style>
    .sg-row {
        position: relative;
        width: 100%;
        box-sizing: border-box;
    }
</style>