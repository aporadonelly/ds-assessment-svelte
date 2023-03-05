<script lang="ts">
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";
  import { invalidateAll } from "$app/navigation";

  export let data: LayoutData;
</script>

<svelte:head>
  <title>Website Name{$page.data.title ? ` - ${$page.data.title}` : ""}</title>
  <meta name="description" content="generic description" />
</svelte:head>

<nav>
  {#if !data.user}
    <a href="/login">Parent Login</a>
  {/if}
</nav>

{#if data.user}
  <a href="/">Home</a>
  <button
    on:click={async () => {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (res.ok) {
        invalidateAll();
      }
    }}>Logout</button
  >
{/if}
<slot />
