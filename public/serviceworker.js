importScripts('/sw-toolbox.js');
import toolbox from '/sw-toolbox.js';


toolbox.precache(['/css/style.css']);
toolbox.router.get('/css*', toolbox.networkFirst);
toolbox.router.get('/img*', toolbox.networkFirst);
toolbox.router.get('/js*', toolbox.networkFirst);
toolbox.router.get('https://image.tmdb.org/t/p/w500/*', toolbox.networkFirst);


toolbox.router.any('/', toolbox.networkFirst, {
    cache: {
        name: 'pages'
    }
});

// toolbox.router.get('/serie/:id', toolbox.networkFirst, {
//     cache: {
//         name: 'pages'
//     }
// });

