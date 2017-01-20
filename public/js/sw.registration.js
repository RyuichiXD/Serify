// register our service-worker

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/serviceworker.js", {
        scope: "/"
    }).then(function (reg) {
        console.log("service-worker register success", reg);
    }, function (err) {
        console.log("service-worker register fail", err);
    });
}