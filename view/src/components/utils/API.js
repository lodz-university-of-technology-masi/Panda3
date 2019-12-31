import {API} from "aws-amplify";
export const API_NAME = "Panda3API";
export const API_MAIN_EP = "https://y6p1h6b8sh.execute-api.us-east-1.amazonaws.com/dev";
export const REGION = 'us-east-1';

/*
endpoints:
  POST - https://0i2wyfdivk.execute-api.us-east-1.amazonaws.com/dev/participants/create
  DELETE - https://0i2wyfdivk.execute-api.us-east-1.amazonaws.com/dev/participants/delete
  GET - https://0i2wyfdivk.execute-api.us-east-1.amazonaws.com/dev/participant/read
  GET - https://0i2wyfdivk.execute-api.us-east-1.amazonaws.com/dev/participants/read
  PUT - https://0i2wyfdivk.execute-api.us-east-1.amazonaws.com/dev/participants/update
  POST - https://0i2wyfdivk.execute-api.us-east-1.amazonaws.com/dev/tests/create
  GET - https://0i2wyfdivk.execute-api.us-east-1.amazonaws.com/dev/tests/read
  GET - https://0i2wyfdivk.execute-api.us-east-1.amazonaws.com/dev/participants/test
 */

export const ApiHelper = {

    createParticipant: async (participant) => {
        console.log(participant);
       return await API.post(API_NAME, '/participants/create', {body: participant})
    },

    deleteParticipant: async (id) => {
        await API.post(API_NAME, '/participants/delete', {body: id}).then(r => console.log(r))
    },

    getParticipant: async () => {
        await API.get(API_NAME, '/participant/read', {}).then(r => console.log(r))
    },

    getParticipants: async () => {
       return await API.get(API_NAME, '/participants/read', {})
    },

    updateParticipant: async () => {
        await API.put(API_NAME, '/participants/update', {}).then(r => console.log(r))
    },

    createTest: async (test) => {
        return await API.post(API_NAME, '/tests/create', {body: test})
    },

    getTests: async () => {
        return await API.get(API_NAME, '/tests/read', {})
    },

    getByTestId: async (id) => {
        let path = '/tests/' + id;
        return await API.get(API_NAME, path, {})
    },

    deleteTest: async (id) => {
        let path = '/tests/delete/' + id;
        return await API.del(API_NAME, path, {})
    },

    createSubmission: async (body) => {
        let path = '/tests/delete/';
        return await API.post(API_NAME,path,{body:body})
    },

    addUsersToTest: async (body) => {
        let path = '/answers/add/user';
        return await API.post(API_NAME,path,{body:body})
    }
};
export default ApiHelper;