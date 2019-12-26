const YANDEX_KEY = 'trnsl.1.1.20191226T130611Z.41e3cd5e25e1a208.9bcc0e102ab71e5444b2469fee80fef715e1da55';

export function getLanguages() {
    let request = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=' + YANDEX_KEY;
    let response = fetch(request).then(response => response.json());
    //TODO: wyciagnac jezyki z tego
    console.log(response);
}
