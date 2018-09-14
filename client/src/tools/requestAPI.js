import superagent from 'superagent';

const SERVER_IP="localhost";
const SERVER_PORT="3000";

export default function requestApi(action) {
    let url = '';
    if (!action) {

    } else if (action.apiMethod) {
        url = `http://${SERVER_IP}:${SERVER_PORT}/`;
    }else if (action.apiUrl) {
        url = action.apiUrl;
    } else {
        console.error("Error in requestApi with action: ", action);
    }
    const method = (action && action.requestMethod) || 'get';
    const agent = superagent[method](url);

    // agent.set('Access-Control-Allow-Origin','*');
    // console.log("agent",agent)

    if (action && action.query) {
        agent.query(action.query);
    }
    if (action && action.data) {
        agent.send(JSON.stringify(action.data));
        console.log("client json",JSON.stringify(action.data))
        agent.set('Content-Type', 'application/json')

        // agent.set('Content-Type', 'application/x-www-form-urlencoded')

        // console.log("action.data",action.data)
        // agent.send(action.data);

    }
    console.log("agent",agent)
    return agent;
}