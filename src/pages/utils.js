var user = {};
var callback;

export default function SetPerson(person, callbackFn) {
    if (person) user = person;

    if (callbackFn) callback = callbackFn;

    if (callback && user) callback(user)
}