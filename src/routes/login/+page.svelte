<script lang="ts">
  import type { ActionData, Snapshot } from "./$types";
  import { goto, invalidateAll } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data, "datassss");
  $: nouns = data.nouns;

  export let homeroomName = "";
  export let studentNo = "";

  export let form: ActionData;

  export const snapshot: Snapshot<{ homeroomName: string; studentNo: string }> =
    {
      capture: () => {
        return {
          homeroomName,
          studentNo,
        };
      },
      restore: (value) => {
        homeroomName = value.homeroomName;
        studentNo = value.studentNo;
      },
    };

  export const login = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ homeroomName, studentNo }),
    });

    const resJSON = await response.json();

    if (response.ok) {
      invalidateAll();
    } else {
      return resJSON.message;
    }
  };
</script>

{#if form?.success}
  <p style="color: green">Conference will start soon....</p>
{/if}

<h3>Parent-Teacher Login</h3>
<form method="POST">
  <label for="homeroomName">Homeroom Name</label>
  <br />
  <input
    type="text"
    id="homeroomName"
    name="homeroomName"
    placeholder="Homeroom name"
  />
  {#if form?.homeroomNameMissing}
    <p style="color: red; margin-bottom:0%">Homeroom name is required</p>
  {/if}
  <br />
  <br />

  <label for="studentNo">Student Number</label>
  <br />
  <input
    type="text"
    id="studentNo"
    name="studentNo"
    placeholder="Student Number"
  />
  {#if form?.studentNoMissing}
    <p style="color: red; margin-bottom:0%">Student number is required</p>
  {/if}

  <br />

  {#if data.nouns && data.nouns.length > 0}
    <ul>
      {#each nouns as noun}
        <img src={`http://localhost:3000/${noun.imgSrc}`} alt={noun.name} />
      {/each}
    </ul>
  {/if}
  <br />
  <button type="submit">Sign In</button>
</form>

<style>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 30px;
  }
  img {
    width: 100px;
    height: 100px;
  }
</style>
