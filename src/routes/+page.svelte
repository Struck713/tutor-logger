

<script lang="ts">
    import { remult } from "remult";
    import { Course, Request } from "../shared/Request";

    let submitted = false;
    let loading = false;
    let request: Request;

    const repo = remult.repo(Request);
    const onSubmit = async (event: SubmitEvent) => {
        const formData = new FormData(event.target as HTMLFormElement)
        event.preventDefault();
        loading = true;
        request = await repo.insert({
            name: formData.get("name")?.toString(),
            course: formData.get("class")?.toString() as Course,
            issue: formData.get("issue")?.toString()
        });
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
        <form on:submit|preventDefault={onSubmit}>
            <fieldset role="group">
            <input name="name" type="text" placeholder="Enter your name" />
            <select name="class" aria-label="Select your class" required>
                <option selected disabled value="">Select your class</option>
                {#each Object.values(Course) as name}
                    <option value={name}>{name}</option>
                {/each}
            </select>
            <input name="issue" type="text" placeholder="What's your issue?" />
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