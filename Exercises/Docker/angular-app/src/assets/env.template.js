(function (window) {
    window.env = window.env || {};

    // Environment variables
    window["env"]["dotnetApiUrl"] = "${DOTNET_API_URL}";
    window["env"]["prod"] = "${PROD}";
})(this);
