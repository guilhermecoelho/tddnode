import setupApp from './src/app';


setupApp()
    .then(app =>
        app.listen(3000, () => {
            console.log('running on port 3000');
        }))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
