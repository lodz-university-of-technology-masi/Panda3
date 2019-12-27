import axios from "axios";

const YANDEX_KEY = 'trnsl.1.1.20191226T130611Z.41e3cd5e25e1a208.9bcc0e102ab71e5444b2469fee80fef715e1da55';
const GET_LANGS_URL = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs';
const GET_LANGS_REQUEST = GET_LANGS_URL + '?ui=en&key=' + YANDEX_KEY;
const POST_TRANSLATE_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

export async function getLanguages() {
    const response = await axios.get(GET_LANGS_REQUEST);
    try {
        return response.data.langs;
    } catch (e) {
        console.log('lang fetch error');
        return [];
    }
}

export async function translateText(text, dic) {
    const request = POST_TRANSLATE_URL + '?key=' + YANDEX_KEY + '&text=' + text +'&lang=' + dic;
    const response = await axios.post(request);
    return response.data.text[0];
}

export async function translateTest(test, language) {
    const lang = language.value;
    let translatedTest = test;
    translatedTest.language = language;
    if(translatedTest.title !== '') {
        translatedTest.title = await translateText(translatedTest.title, lang);
    }
    for(let q of translatedTest.questions){
        if(q.question !== '') {
           q.question = await translateText(q.question, lang);
        }
        if('answers' in q) {
            let i=0;
            for (let answer of q.answers) {
                if (answer !== '') {
                    //TODO:parallel await for answers
                    q.answers[i] = await translateText(answer, lang);
                }
                i++;
            }
        }
    }
    return translatedTest;
}
