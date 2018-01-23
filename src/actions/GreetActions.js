import dispatcher from "../dispatcher";

export function createGreet(value){
  dispatcher.dispatch({
    type: "CREATE_GREET",
    value,
  });
}

export function getCountries(id){
  dispatcher.dispatch({
    type: "GET_COUNTRIES",
    id,
  });
}

export function currentGreet(person){
  dispatcher.dispatch({
    type: "CURRENT_GREET",
    value: person,
  });
}
