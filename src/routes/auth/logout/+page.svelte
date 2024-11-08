<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";
    import { signOut } from "@auth/sveltekit/client";

    onMount(async () => {
        await signOut();
        await invalidateAll();
        await goto("/auth/login");
    });

</script>
