const axios = require("axios");


export default {
    getCheckpoints: function() {
        return axios.get("/api/checkpoints")
    },

    getQuestionsByCpNumber: function(number) {
        return axios.get(`/api/checkpoints/${number}`);
    },

    getQuestionsBySubject: function(subject) {
        return axios.get(`/api/checkpoints/sort/${subject}`)
    },

    getQuestionsByCpNumAndSubject: function(number, subject) {
        return axios.get(`/api/checkpoints/${number}/${subject}`)
    },

    getAllSubjects: function() {
        return axios.get("/api/checkpoints/null/null/subjects")
    }
}