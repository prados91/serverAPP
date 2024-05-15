fetch("/api/sessions/me", { method: "POST" })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        if (res.statusCode === 200) {
            document.querySelector(".navbar-nav").removeChild(document.querySelector("#registerButton"));
            document.querySelector(".navbar-nav").removeChild(document.querySelector("#loginButton"));
            document.querySelector("#signout").addEventListener("click", async () => {
                try {
                    const token = localStorage.getItem("token");
                    const opts = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" /* , token */ },
                    };
                    let response = await fetch("/api/sessions/signout", opts);
                    response = await response.json();
                    if (response.statusCode === 200) {
                        Swal.fire({
                            title: "GOOD BYE!",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "OK",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.removeItem("token");
                                location.replace("/");
                            }
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        } else {
            document.querySelector(".navbar-nav").removeChild(document.querySelector("#formButton"));
            document.querySelector(".navbar-nav").removeChild(document.querySelector("#ordersButton"));
            document.querySelector(".navbar-nav").removeChild(document.querySelector("#signout"));
        }
        if (res.response?.role === "USER") {
            document.querySelector(".navbar-nav").removeChild(document.querySelector("#formButton"));
        } else if (res.response?.role === "ADMIN") {
            document.querySelector(".navbar-nav").removeChild(document.querySelector("#ordersButton"));
        }
    });
