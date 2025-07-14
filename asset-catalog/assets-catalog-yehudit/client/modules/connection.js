const axios = require('axios')

function uploadFileToServer(path) {
    axios.post('http://localhost:7070/', { 'path': path },)

        .then((res) => {
            console.log(res.data)
        })
}

module.exports = { uploadFileToServer }
