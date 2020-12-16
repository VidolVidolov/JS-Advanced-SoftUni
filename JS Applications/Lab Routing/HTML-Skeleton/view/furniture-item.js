const furnitureItemTemplate = (id, data) => `
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
            <blockquote class="card-blockquote">
                <img src="${data.image}" id="img-container" />
                <p>${data.description}</p>
                <footer>Someone famous in
                <cite title="Source Title">${data.make}</cite>
                </footer>
                <div class="pull-right">
                <a href="/details/${id}" class="btn btn-info">Details</a>
                </div>
            </blockquote>
            </div>
        </div>
    </div>
</div>`;


const detailsTemplate = (data, id) => `<div class="row space-top">
<div class="col-md-12" >
  <h1>Furniture Details</h1>
</div>
</div>
<div class="row space-top">
<div class="col-md-4">
  <div class="card text-white bg-primary">
    <div class="card-body">
        <img src="${data.image}" id="img-container"/>
    </div>
  </div>
</div>
<div class="col-md-4">
  <p>Make: ${data.make}</p>
  <p>Model: ${data.model}</p>
  <p>Year: ${data.year}</p>
  <p>Description: ${data.description}</p>
  <p>Price: ${data.description}</p>
  <p>Material: ${data.material}</p>
  <button class="delete-button btn-info" id="${id}">Delete</button>
</div>
</div>`