<script>
  import * as client from "./client.js";

  let variables = undefined;
  let modify = false;
  let readme = false;
  client.variableStore.subscribe((x) => (variables = x));
  client.modifyStore.subscribe((x) => (modify = x));

  $: login_text = variables === null ? "Login" : "Logout";

  function change_readme() {
    readme = !readme;
  }
</script>

<svelte:head>
  <title>CS4241 Assignment 4</title>
  <link
    rel="preload"
    href="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2"
    crossorigin="anonymous"
    as="font"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <meta name="description" content="Free Code Runner" />
  <meta name="keywords" content="HTML, CSS, JavaScript, Eval" />
</svelte:head>

<div class="base">
  {#if readme}
    <h1>Code Runner</h1>
    <p>
      {`This project runs user submitted code in a isolated JavaScript instance and then shows that result to the user.
  Simply put your variable name and code in the form and press add. If the variable already exists, the button will
  change to modify. You can also hit the buttons to recalculate, modify, or delete variables. You can also refresh the
  data with the refresh button.`}
      <br /><br />
      ONLY NUMBERS ARE ALLLOWED IN VARIBLES DUE TO TIME CONTRAINTS
      <br /><br />
      {`When a variable name is not allowed, it is replaced with noname# where # starts at 1 and increases as to not
  override other nonames. Variables are cloned when passed to other calculations so variables can't be modified,
  though their clones can be returned. The code entered is run in eval, so code can be interpreted weirdly. Most
  notably objects are interpreted as a block with labels inside, so: {name:value} => {name: return value;} This can be
  fixed by putting the object in parentheses: ({name:value}) putting the object in parentheses: ({name:value})`}
    </p>
    <span
      class="refresh"
      role="button"
      tabindex="0"
      on:click={change_readme}
      on:keydown={change_readme}
    >
      Back
    </span>
  {:else}
    {#if variables !== undefined}
      <div class="readme">
        <form method="post" action={"/auth/" + login_text.toLowerCase()}>
          <input class="refresh" type="submit" value={login_text} />
        </form>
        <span
          class="refresh"
          role="button"
          tabindex="0"
          on:click={change_readme}
          on:keydown={change_readme}
        >
          Read Me
        </span>
      </div>
    {/if}
    {#if variables === null}
      <h2>Login with the righthand button to add and run code</h2>
    {:else if variables !== undefined}
      <form id="input">
        <table>
          <thead>
            <tr>
              <th><label for="name">Variable Name</label></th>
              <th><label for="value">Variable Code</label></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  class="name"
                  id="name"
                  placeholder={client.defaultName}
                  on:input={client.checkVarName}
                />
              </td>
              <td>
                <textarea placeholder={client.defaultCode} id="value"
                ></textarea>
              </td>
              <td>
                {#if modify}
                  <span
                    id="submit"
                    class="modify"
                    role="button"
                    tabindex="0"
                    on:click={client.addCode}
                    on:keydown={client.addCode}
                    >Modify
                  </span>
                {:else}
                  <span
                    id="submit"
                    class="add"
                    role="button"
                    tabindex="0"
                    on:click={client.addCode}
                    on:keydown={client.addCode}
                    >Add
                  </span>
                {/if}
              </td>
              <td>
                <span
                  class="refresh"
                  id="refresh"
                  role="button"
                  tabindex="0"
                  on:click={client.refreshCode}
                  on:keydown={client.refreshCode}
                  >Refresh
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {#if variables.length == 0}
        <h2>Add a variable name and some code to get started</h2>
      {:else}
        <table>
          <thead>
            <tr>
              <th>Recalculate</th>
              <th>Modify</th>
              <th>Delete</th>
              <th>Name</th>
              <th>Equation</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody id="table">
            {#each variables as { name, code, result }, j}
              <tr>
                <td
                  ><span
                    class="recalc"
                    role="button"
                    tabindex="0"
                    on:click={() => client.recalcCode(j)}
                    on:keydown={() => client.recalcCode(j)}>Recalculate</span
                  >
                </td>
                <td
                  ><span
                    class="modify"
                    role="button"
                    tabindex="0"
                    on:click={() => client.modifyCode(j)}
                    on:keydown={() => client.modifyCode(j)}>Modify</span
                  >
                </td>
                <td
                  ><span
                    class="delete"
                    role="button"
                    tabindex="0"
                    on:click={() => client.deleteCode(j)}
                    on:keydown={() => client.deleteCode(j)}>Delete</span
                  >
                </td>
                <td>{name}</td>
                <td>{code}</td>
                <td>{result}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    {/if}
  {/if}
</div>
