import dispatcher from "../dispatcher";

export function createGreet(text){
  dispatcher.dispatch({
    type: "CREATE_GREET",
    text,
  });
}

export function getCountries(id){
  dispatcher.dispatch({
    type: "GET_COUNTRIES",
    id,
  });
}
