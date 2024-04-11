<script>
    import Task from "./Task.svelte";
    import {appdata} from './appdata.js'
</script>

<div class="panel">
    <h1>Things to do</h1>
    <table>
        <thead>
            <tr>
                <th> Task </th>
                <th> Due Date </th>
                <th> Priority </th>
                <th> Actions </th>
            </tr>
        </thead>
        <tbody id="table-items"> 
            {#each $appdata as task, index}
                <Task task={task} index={index}/>
            {/each}
        </tbody>
    </table>
</div>