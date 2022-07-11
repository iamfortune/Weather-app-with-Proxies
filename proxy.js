function check(id) {
    document.getElementById(id).value = 'checked';

}

let location = {
    name: "",
    lat: "",
    lon: ""
}

const handler = {
    set(target, property, value) {
        let apikey = "0abe276c48b3362cd8a7950b9382ee37";
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let country = document.getElementById("country").value;

        if (city != "" && state != "" && country != "") {
            fetch(
                "https://api.openweathermap.org/geo/1.0/direct?q=" +
                city +
                "," +
                state +
                "," +
                country +
                "&limit=1&appid=" +
                apikey
            )
                .then((response) => response.json())
                .then((data) => {
                    target["name"] = data[0]["name"];
                    target["lat"] = data[0]["lat"];
                    target["lon"] = data[0]["lon"];
                    console.log(target["lat"]);
                });
        } else {
            alert("please enter a valid location ");
        }
    },

    get(target, property) {
        let apikey = "0abe276c48b3362cd8a7950b9382ee37";
        let lat = target["lat"];
        let lon = target["lon"];
        if (lat != "" && lon != "") {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                lat +
                "&lon=" +
                lon +
                "&appid=" +
                apikey
            )
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById("location").innerHTML = data["name"];
                    document.getElementById("description").innerHTML =
                        data["weather"][0]["description"];
                    document.getElementById("status").innerHTML =
                        data["weather"][0]["main"];
                    let icon = data["weather"][0]["icon"];

                    document.getElementById("temperature").innerHTML =
                        data["main"]["temp"];
                    document.getElementById("pressure").innerHTML =
                        data["main"]["pressure"];
                    document.getElementById("humidity").innerHTML =
                        data["main"]["humidity"];
                });
        } else {
            alert("please enter a valid location");
        }
    },
};
const proxyPerson = new Proxy(location, handle);