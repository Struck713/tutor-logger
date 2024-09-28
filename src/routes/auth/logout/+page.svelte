<script lang="ts">
    import { AuthController } from "../../../shared/auth/AuthController";
    AuthController.signout().catch(_ => null);
</script>
