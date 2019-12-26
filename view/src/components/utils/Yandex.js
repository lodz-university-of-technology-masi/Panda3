import axios from "axios";
const YANDEX_KEY = 'trnsl.1.1.20191226T130611Z.41e3cd5e25e1a208.9bcc0e102ab71e5444b2469fee80fef715e1da55';
const GET_LANGS_URL = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs';
const GET_LANGS_REQUEST = GET_LANGS_URL + '?ui=en&key=' + YANDEX_KEY;



export async function getLanguages() {
    const response = await axios.get(GET_LANGS_REQUEST);
    try {
        return response.data.langs;
    } catch (e) {
        console.log('lang fetch error');
        return [];
    }
}
