<script lang="ts">
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";
  import { goto, invalidateAll } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";

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
  <form action="/login?/logout">
    <button type="submit">Logout</button>
  </form>
{/if}
<slot />
