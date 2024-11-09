<script lang="ts">
    import { remult, type Paginator } from "remult";
    import { onMount } from "svelte";
    import { Request } from "../../shared/Request";
    import moment from "moment";
    import { DATE_FORMAT } from "$lib/util";
    import type { PageData } from "../$types";

    export let data: PageData;
    const repo = remult.repo(Request);
    let paginator: Paginator<Request>;

    const createPaginator = async () =>
        (paginator = await repo
            .query({
                pageSize: 10,
                orderBy: { createdAt: "desc" },
                include: { user: true },
            })
            .paginator());

    const nextPage = async () => (paginator = await paginator.nextPage());

    const handleCheckIn = async (id: string) => {
        await repo.update(id, { helpedAt: new Date(), userId: data.user.id });
        await createPaginator();
    };

    const handleOnline = async (id: string, online: boolean) => {
        await repo.update(id, { online });
        await createPaginator();
    };

    onMount(createPaginator);
</script>

<div>
    <table>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Course</th>
                <th scope="col">Issue</th>
                <th scope="col">Time Requested</th>
                <th scope="col">Time Helped</th>
                <th scope="col">Online</th>
            </tr>
        </thead>
        <tbody>
            {#if paginator}
                {#each paginator.items as { id, name, course, helpedAt, createdAt, issue, online, user }}
                    <tr>
                        <th scope="row">{name}</th>
                        <td>{course}</td>
                        <td>{issue}</td>
                        <td>{moment(createdAt).format(DATE_FORMAT)}</td>
                        {#if helpedAt}
                            <td
                                >{moment(helpedAt).format(DATE_FORMAT)} by {user?.email}</td
                            >
                        {:else}
                            <td
                                ><a
                                    href="#checkin"
                                    on:click|preventDefault={() =>
                                        handleCheckIn(id)}>Check in</a
                                ></td
                            >
                        {/if}
                        <td>
                            <input on:change={e => handleOnline(id, !online)} checked={online} type="checkbox" name="online" />
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
    <div>
        {#if paginator && paginator.hasNextPage}
            <button on:click={nextPage}>{">"}</button>
        {/if}
    </div>
</div>
