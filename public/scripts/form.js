const selector = document.querySelector("#create");
selector.addEventListener("click", async () => {
    try {
        const data = {
            title: document.querySelector("#title").value,
        };
        document.querySelector("#photo").value && (data.photo = document.querySelector("#photo").value);
        document.querySelector("#price").value && (data.price = document.querySelector("#price").value);
        document.querySelector("#stock").value && (data.stock = document.querySelector("#stock").value);
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        let response = await fetch("/api/products", opts);
        response = await response.json();
        //response.statusCode === 201 ? alert("Product created!") : alert("ERROR: " + response.message);

        response.statusCode === 201
            ? Swal.fire({
                  icon: "success",
                  title: "¡Product created!",
                  showConfirmButton: false,
                  timer: 2000,
              })
            : Swal.fire({
                  icon: "error",
                  title: "ERROR: " + response.message,
                  showConfirmButton: false,
                  timer: 2000,
              });
    } catch (error) {
        alert(error.message);
    }
});
