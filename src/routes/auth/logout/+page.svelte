
<script>
    import { signOut } from "@auth/sveltekit/client";
    import { onMount } from "svelte";

    onMount(async () => await signOut({ callbackUrl: "/auth/login" }));
</script>