<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { AuthController } from "../../../shared/auth/AuthController";
    
    (async () => {
        await AuthController.signout().catch(_ => null);
        await invalidateAll();
        await goto("/auth/login");
    })();

</script>
