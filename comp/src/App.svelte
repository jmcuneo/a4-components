<script>
  const getData = function() {
    const p = fetch('/receive', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      return json
    })
    return p
  }

  const addMaterial = function(e){
    e.preventDefault()
    const input = document.querySelectorAll("#add_part, #add_material, #add_quantity, #add_weight"),
        json = {part_name: input.item(0).value, material: input.item(1).value, quantity: input.item(2).value,
        weight_per_unit: input.item(3).value},
        body = JSON.stringify(json)
      promise = fetch('/add', {
        method: 'POST',
        body: body,
        headers: {'Content-Type' : 'application/json'}
      })
      .then(response => response.json())
  }

  const removeMaterial = function(e){
    e.preventDefault()
    const input = document.querySelector("#remove_part"),
        json = {part_name: input.value},
        body = JSON.stringify(json)
      promise = fetch('/remove', {
        method: 'POST',
        body: body,
        headers: {'Content-Type' : 'application/json'}
      })
      .then(response => response.json())
  }

  let promise = getData()
  </script>
  <body><br>
    <div class = "background">
    <div class = "text_background">
    <form>
      <input type="text" id="add_part" placeholder="Name of Part">
      <input type="text" id="add_material" placeholder="Material">
      <input type="text" id="add_quantity" placeholder = "Quantity">
      <input type="text" id="add_weight" placeholder = "Weight per Unit">
      <button on:click = {addMaterial} id = "add_button">Add/Modify Part</button>
    </form><br>
    {#await promise then appdata}
    <table id = "part_table">
      <th>Part Name</th>
      <th>Material</th>
      <th>Quantity</th>
      <th>Weight</th>
    {#each appdata as data}
      <tr><td>{data.Part}</td><td>{data.Material}</td><td>{data.Quantity}</td><td>{data.Weight}</td></tr>
    {/each}
    </table>
    {/await}<br>
    <form>
      <input type="text" id="remove_part" placeholder = "Part name to remove">
      <button on:click = {removeMaterial} id = "remove_button">Remove Part</button>
    </form>
    
  </div>
  <div class = "image_background">
    <img src =  "https://cdn.glitch.global/f28ad010-65c7-4799-96f7-31a28924a31d/thumbnails%2Ftrex.png?1711331052361" alt = "Image of TRex robot CAD">
    <img src =  "https://cdn.glitch.global/f28ad010-65c7-4799-96f7-31a28924a31d/thumbnails%2Ftrex_built.png?1711331046164" alt = "Image of TRex robot built">
  </div>
</div>
  </body>
