<script lang="ts">
    import { AuthController } from "../../../shared/auth/AuthController";
    import { goto, invalidateAll } from "$app/navigation";

    let loading = false;
    
    let email: string;
    let password: string;

    const handleSubmit = async () => {
        if (!(email && password)) return;

        loading = true;
        const response = await AuthController.signin(email, password)
            .catch(_ => null);

        await invalidateAll();
            
        if (response) await goto("/dashboard")
        loading = false;
    }

</script>

<div class="center">
    <form on:submit|preventDefault={handleSubmit}>
        <fieldset>
            <label>
                Email
                <input bind:value={email} name="email" placeholder="Email" autocomplete="email" />
            </label>
            <label>
                Password
                <input bind:value={password} type="password" name="password" placeholder="Password" />
            </label>
        </fieldset>
        <input type="submit" value="Login" />
    </form>
</div>

<style lang="css">
    .center {
        display: flex;
        min-height: 100%;
        justify-content: center;
        align-items: center;
    }
</style>
