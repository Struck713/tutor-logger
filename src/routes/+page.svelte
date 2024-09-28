

<script lang="ts">
    import { remult } from "remult";
    import { Course, Request } from "../shared/Request";

    let submitted = false;
    let loading = false;
    let request: Request;

    let name: string;
    let course = Course.CS1A;
    let issue: string;

    const repo = remult.repo(Request);
    const handleSubmit = async () => {
        loading = true;
        request = await repo.insert({ name, course, issue });
        loading = false;
        submitted = true;
    }

</script>

<style lang="css">
    .center {
        display: flex;
        min-height: 100%;
        justify-content: center;
        align-items: center;
    }
</style>

<div class="center">
    {#if !(submitted || loading)}   
        <form on:submit|preventDefault={handleSubmit}>
            <fieldset role="group">
            <input bind:value={name} name="name" type="text" placeholder="Enter your name" />
            <select bind:value={course} name="class" aria-label="Select your class" required>
                <option selected disabled value="">Select your class</option>
                {#each Object.values(Course) as name}
                    <option value={name}>{name}</option>
                {/each}
            </select>
            <input bind:value={issue} name="issue" type="text" placeholder="What's your issue?" />
            <input type="submit" value="Sign in" aria-busy={loading} />
            </fieldset>
        </form>
    {:else}
        <div>
            <h1>Find a seat, {request?.name}!</h1>
            <p>A tutor will be over to help you in just a second.</p>
        </div>
    {/if}
</div>