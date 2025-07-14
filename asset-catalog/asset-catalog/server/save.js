const fs = require('fs');

class Save {
    constructor(path) {
        this.path = path
    }

    correctPath() {
        return fs.existsSync(this.path);
    }

}

module.exports = Save;