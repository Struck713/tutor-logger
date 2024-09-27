
<script>
    import "@picocss/pico/css/pico.css";
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
          <li><a href="/auth/login">Login</a></li>
        </ul>
    </nav>
    <div class="full-screen">
      <slot />
    </div>
</main>