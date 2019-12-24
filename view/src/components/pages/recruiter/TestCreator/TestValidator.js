/**
 * @return {boolean}
 */
function ValidateTest(test) {
if(test.title == null || test.title === '' || test.title === undefined) return false;
else if(test.language == null || test.language === '' || test.language === undefined) return false;
else if(test.questions == null || test.questions.length === 0) return false;
else{
if(test.questions.includes(undefined) || test.questions.includes(null)) return false;
else{
    for(let i=0; i<test.questions.length;i++){
       let q = test.questions[i];
        if(!(q.type === 'O'|| q.type === 'W'|| q.type === 'L')) return false;
        else if(q.question === null || q.question === '' || q.question === undefined) return false;
        if(q.type === 'W'){
            if(q.answers.includes(undefined) || q.answers.includes(null)) return false;
            else{
                for(let j=0; j<q.answers.length;j++){
                    if(q.answers[j] === '' || q.answers[j] == null || q.answers[j] === undefined) return false;
                }
            }
        }
    }
}
}
return true;
}

export default ValidateTest