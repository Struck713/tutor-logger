<script lang="ts">
    import { remult } from "remult";
    import { onMount } from "svelte";
    import { Request } from "../../shared/Request";
    import moment from "moment";
    import { DATE_FORMAT } from "$lib/util";

    const repo = remult.repo(Request);
    let requests: Request[] = [];

    const loadRequests = async () => requests = await repo.find({ limit: 20 });
    const handleCheckIn = async (id: string, e: MouseEvent) => {
        await repo.update(id, { helpedAt: new Date() });
        await loadRequests();
    }
    
    onMount(loadRequests);
</script>

<table>
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Course</th>
            <th scope="col">Issue</th>
            <th scope="col">Time Requested</th>
            <th scope="col">Time Helped</th>
        </tr>
    </thead>
    <tbody>
        {#each requests as { id, name, course, helpedAt, createdAt, issue }}
            <tr>
                <th scope="row">{name}</th>
                <td>{course}</td>
                <td>{issue}</td>
                <td>{moment(createdAt).format(DATE_FORMAT)}</td>
                {#if helpedAt}
                    <td>{moment(helpedAt).format(DATE_FORMAT)}</td>
                {:else}
                    <td><a href="#checkin" on:click|preventDefault={(e) => handleCheckIn(id, e)}>Check in</a></td>
                {/if}
            </tr>
        {/each}
    </tbody>
</table>
