
<script lang="ts">
    import "@picocss/pico/css/pico.css";
    import type { PageData } from "./$types";

    export let data: PageData;
    
</script>

<style>
  .full-screen {
    height: 90vh;
  } 
</style>

<main class="container">
    <nav>
        <ul>
          <li><strong>Tutoring</strong></li>
        </ul>
        <ul>
          {#if data.user}
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/auth/logout">Logout</a></li>
          {:else}
            <li><a href="/auth/login">Login</a></li>
          {/if}
        </ul>
    </nav>
    <div class="full-screen">
      <slot />
    </div>
</main>