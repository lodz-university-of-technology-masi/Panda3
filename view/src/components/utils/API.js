import {API, Storage} from "aws-amplify";
export const API_NAME = "Panda3API";
export const API_MAIN_EP = "https://ir8a6jsjkl.execute-api.us-east-1.amazonaws.com/dev";
export const REGION = 'us-east-1';

export const ApiHelper = {

    createParticipant: async (participant) => {
        console.log(participant);
       return await API.post(API_NAME, '/participants/create', {body: participant})
    },

    deleteParticipant: async (id) => {
        await API.del(API_NAME, '/users/delete', {body: id}).then(r => console.log(r))
    },

    getParticipants: async () => {
       return await API.get(API_NAME, '/participants/read', {})
    },

    createTest: async (test, userId) => {
        let path = '/tests/create/' + userId;
        return await API.post(API_NAME, path , {body: test})
    },

    getTests: async () => {
        return await API.get(API_NAME, '/tests/read', {})
    },

    //Todo: deny access
    getTestById: async (id) => {
        let path = '/tests/' + id;
        return await API.get(API_NAME, path, {})
    },

    deleteTest: async (id) => {
        let path = '/tests/delete/' + id;
        return await API.del(API_NAME, path, {})
    },

    updateTest: async (test) => {
        let path = '/tests/update';
        return await API.put(API_NAME, path, {body:test})
    },

    createSubmission: async (body) => {
        let path = '/answers/commit/answer';
        return await API.post(API_NAME,path,{body:body})
    },

    getUserWithAccess: async(testId) => {
        let path = '/answers/test/users/' + testId;
        return await API.get(API_NAME,path,{})
    },

    getSubmissions: async(testId) => {
        let path = '/answers/test/answers/' + testId;
        return await API.get(API_NAME,path,{})
    },

    addUsersToTest: async (body) => {
        let path = '/answers/add/users';
        return await API.post(API_NAME,path,{body:body})
    },

    getAnswersToCheck: async(testId, userId) => {
        let path ='/answers/read/'+ testId +'/user/' + userId;
        return await API.get(API_NAME,path,{})
    },

    checkTest: async(body) => {
        let path = '/answers/check';
        return await API.post(API_NAME,path,{body:body})
    },

    getResults: async(userId) => {
        let path = '/answers/test/result/' + userId;
        return await API.get(API_NAME,path,{})
    },

    getUsersTests: async(userId) => {
        let path = '/tests/user/' + userId;
        return await API.get(API_NAME,path,{})
    },

    addUser: async (body) => {
        let path = '/users/add';
        return await API.post(API_NAME,path,{body:body})
    },

    addTestToRecruiter: async (userId) => {
        let path = '/recruiter/save/' + userId;
        return await API.get(API_NAME,path,{})
    },

    getRecruiterTests: async (recruiterId) => {
        let path = '/recruiter/read/' + recruiterId;
        return await API.get(API_NAME,path,{})
    },

    downloadCsv: async (testId) => {
        let path = '/csv/export/' + testId;
        API.get(API_NAME, path, {}).then(()=>{
            Storage.get(testId + '.csv').then(r => {console.log(r)})
        }).catch(e => alert(e))
}

};
export default ApiHelper;