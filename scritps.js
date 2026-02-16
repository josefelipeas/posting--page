const startLoader = elemento => {
    elemento.innerHTML = `<div class="loading-spinner"></div>`;
}

const stopLoader = (elemento, value) => {
    elemento.textContent = value;
}

class PacoteBuscador {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const form = document.querySelector(".post-form");
const postTitle = document.querySelector("#post-title");
const postContent = document.querySelector("#post-content");
const postButton = document.querySelector("#post-button");

const renderTitle = document.querySelector("#render-title");
const renderContent = document.querySelector("#render-content");

const API = new PacoteBuscador("https://jsonplaceholder.typicode.com");


form.addEventListener("submit", event => {
    event.preventDefault();

    if (postTitle.value && postContent.value) {
        startLoader(postButton);
        const data = {
            title: postTitle.value,
            body: postContent.value,
            userId: 1
        };
        API.post("/posts", data)
            .then(data => {
                console.log(data);
                renderTitle.innerHTML = data.title;
                renderContent.innerHTML = data.body;
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                stopLoader(postButton, "Postar")
            })
    } else {
        throw new Error("Sem informações para enviar");
    }
})