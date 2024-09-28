<script lang="ts">
    import { AuthController } from "../../../shared/auth/AuthController";

    let loading = false;
    
    let email: string;
    let password: string;

    const handleSubmit = async () => {
        if (!(email && password)) return;

        loading = true;
        await AuthController.signup(email, password)
            .catch(_ => null);
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
        <input type="submit" value="Register" />
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
