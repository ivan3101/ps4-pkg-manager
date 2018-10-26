const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

module.exports = {
    getConfig: async () => {
        const configPath = path.join(__dirname, 'config.json');
        const config = await fsp.readFile(configPath);
        const configJson = JSON.parse(config);

        return configJson;
    },

    getPkgs: async (configPath, folder) => {
        const fullPath = path.join(configPath, folder);
        const folderContent = await fsp.readdir(fullPath);

        const pkgs = folderContent.filter(filename => {
            const name = filename.split('.');
            if (name.length === 2 && name[1] === 'pkg') {
                return filename;
            }
        });

        return pkgs;
    },

    getPkgInfo: async function (pkgs, directory) {
        const basePath = (await this.getConfig()).path;

        const pkgsInfo = await Promise.all(pkgs.map(async pkg => {
            const nameSplited = pkg.split('-');
            const regionCode = nameSplited[1].split('_')[0];
            const fullPath = path.join(basePath, directory, pkg);
            const fileSize = await this.getFileSize(fullPath);

            const newPkg = {
                name: pkg,
                regionCode,
                fileSize
            };

            return await newPkg;
        }));

        return pkgsInfo;
    },

    getFileSize: async file => {
        const stats = await fsp.stat(file);
        const fileSizeInBytes = stats.size;
        return fileSizeInBytes;
    }
};