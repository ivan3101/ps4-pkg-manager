const utils = require('./utils');

module.exports = {
    getHomepage: async (req, res) => {
        try {
            const config = await utils.getConfig();
            const games =  utils.getPkgs(config.path, 'Games');
            const updates = utils.getPkgs(config.path, 'Updates');
            const addons = utils.getPkgs(config.path, 'Addons');

            const promisesResolved = await Promise.all([games, updates, addons]);
            const params = {
                games: await utils.getPkgInfo(promisesResolved[0], 'Games'),
                updates: await utils.getPkgInfo(promisesResolved[1], 'Updates'),
                addons: await utils.getPkgInfo(promisesResolved[2], 'Addons')
            };

            res
                .status(200)
                .render('index', params);

        } catch (e) {
            if (e.syscall === 'open') {
                res.redirect('/config');
            } else {
                res
                    .status(500)
                    .json(e)
            }
        }
    },
};