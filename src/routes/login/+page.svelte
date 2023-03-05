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

<div class="container">
  <div class="form">
    <form method="POST" class="login-form">
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

      <input
        type="text"
        id="studentNo"
        name="studentNo"
        placeholder="Student Number"
      />
      {#if form?.studentNoMissing}
        <p style="color: red; margin-bottom:0%">Student number is required</p>
      {/if}

      {#if data.nouns && data.nouns.length > 0}
        <ul>
          {#each nouns as noun}
            <img src={`http://localhost:3000/${noun.imgSrc}`} alt={noun.name} />
          {/each}
        </ul>
      {/if}
      <br />
      <button type="submit" class="btn">Sign In</button>
    </form>
  </div>
</div>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

  $background-color: #d7ccc8;
  $font-family: "Roboto", sans-serif;

  @mixin btn($fontcolor: #fafafa) {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    outline: 0;
    border: 0;
    width: 100%;
    padding: 15px;
    background: #ff5722;
    color: $fontcolor;
    text-transform: uppercase;
  }

  @mixin message($fontcolor: #90a4ae) {
    color: $fontcolor;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
  }

  @mixin input($bkgnd: #f5f5f5) {
    font-family: $font-family;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    outline: 0;
    font-size: 15px;
    text-align: center;
    box-sizing: border-box;
    background: $bkgnd;
  }

  .container {
    padding: 8% 0 0;
    width: 365px;
    margin: auto;
  }

  .form {
    position: relative;
    z-index: 1;
    max-width: 350px;
    margin: 0 auto 100px;
    padding: 45px;
    background: #ffffff;
  }

  .form {
    input {
      @include input;

      ::placeholder {
        color: #90a4ae;
      }
    }

    .btn {
      @include btn;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1.5fr));
    gap: 10px;
  }
  img {
    width: 100px;
    height: 100px;
  }
</style>
