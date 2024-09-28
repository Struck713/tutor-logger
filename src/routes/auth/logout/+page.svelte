<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";
    import { AuthController } from "../../../shared/auth/AuthController";
    
    onMount(async () => {
        await AuthController.signout().catch(_ => null);
        await invalidateAll();
        await goto("/auth/login");
    });

</script>
