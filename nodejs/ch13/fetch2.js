// 更接近现实的版本

fetch("/api/user/profile")
    .then(response => {
        if (!response.ok) {
            return null;
        }

        let type = response.headers.get("content-type");
        if (type !== "application/json") {
            throw  new TypeError(`Expected JSON, got ${type}`);
        }

        return response.json();
    })
    .then(profile => {
        if (profile) {
            displayProfile(profile);
        } else {
            displayLoggedOutProfile(); // 404
        }
    }).catch(e => {

        if (e instanceof NetworkError) {
            displayErrorMessage("Check your internet connection");
        } else if (e instanceof TypeError) {
            displayErrorMessage("Something is wrong with our server!");
        } else {
            console.log(e);
        }
    });

function displayProfile(profile) {

}

function displayLoggedOutProfile() {

}

function displayErrorMessage(errMsg) {

}

