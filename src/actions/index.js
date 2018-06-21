import axios from 'axios';
import geolib from 'geolib';

const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
const API_PATH = process.env.REACT_APP_API_PATH;
const GLOBAL_FILTER = 'community services card';

let filters = category => category ? `&filters={"LEVEL_1_CATEGORY":"${category}"}` : '';
const STATICFIELDS = 'FSD_ID,PROVIDER_CLASSIFICATION,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,PROVIDER_WEBSITE_1';

export function loadData(page){
  const GLOBAL_FILTER = 'community services card';
  const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
  const API_PATH = process.env.REACT_APP_API_PATH;
  const CATEGORY = getCategory(page);
  let fields = '*';
  let where = `WHERE "SERVICE_DETAIL" LIKE '%${GLOBAL_FILTER}%'
  AND "LEVEL_1_CATEGORY" = '${CATEGORY}'
  `;
  let whereArray = `WHERE "SERVICE_DETAIL" LIKE '%${GLOBAL_FILTER}%'
  &&|| "LEVEL_1_CATEGORY" = '${CATEGORY.split(',')[0]}'
  &&|| "LEVEL_1_CATEGORY" = '${CATEGORY.split(',')[1]}'
  &&|| "LEVEL_1_CATEGORY" = '${CATEGORY.split(',')[2]}'
  `;

  let sql =`SELECT ${fields} FROM "${RESOURCE_ID}" ${CATEGORY.length > 1 ? whereArray : where}`;
  sql =  encodeURI(sql);
  let url = `${API_PATH}datastore_search_sql?sql=${sql}`;
  return axios.get(url).then((response)=>{
    return response.data.result.records;
  });
}

function getCategory(cat) {
  switch(cat) {
  case 'home':
    return '*';
  case 'health':
    return 'Health';
  case 'food':
    return '';
  case 'activities':
    return '';
  case 'wellbeing':
    return 'Basic Needs';
  default:
    return '';
  }
}


// export function loadFilters(){
//   let fields = '*';
//   let where = `WHERE "SERVICE_DETAIL" LIKE '%${GLOBAL_FILTER}%'
//     OR "SERVICE_TARGET_AUDIENCES" LIKE '%${GLOBAL_FILTER}%'
//     OR "COST_DESCRIPTION" LIKE '%${GLOBAL_FILTER}%'
//     OR "DELIVERY_METHODS" LIKE '%${GLOBAL_FILTER}%'`;

//   let sql =`SELECT ${fields} FROM "${RESOURCE_ID}" ${where}`;
//   sql =  encodeURI(sql);
//   let url = `${API_PATH}datastore_search_sql?sql=${sql}`;
//   return (dispatch) => {
//     return axios.get(url).then((response)=>{
//       dispatch(showFilters(response.data.result.records));
//       console.log('in action', response.data.result.records)
//     });
//   };
// }

/* category, keyword, addressLatLng, radius = 50000 */
export function loadResults(searchVars) {
  let addressObj = Object.keys(searchVars.addressLatLng ? searchVars.addressLatLng : {});
  if(!searchVars.category && !searchVars.keyword && (!searchVars.addressLatLng || !searchVars.addressLatLng.latitude)){
    return (dispatch) => {
      dispatch(showResults([], searchVars, 0, true));
    };
  }else{
    return (dispatch) => {
      dispatch(loadingResults(true));
      return axios.get(requestBuilder(searchVars)).then((response)=>{
        if(addressObj.length === 2 && searchVars.addressLatLng !== undefined) {
          //greater than 50000 means 100000 of within 50000
          dispatch(showResults(findNearMe(response.data.result.records, searchVars.addressLatLng, ((searchVars.radius > 50000)?100000:searchVars.radius)), searchVars, response.data.result.total));
        } else {
          dispatch(showResults(response.data.result.records, searchVars, response.data.result.total));
        }
      });
    };
  }
}

export function mergeData(data, results) {
  const resArr = [];
  const services = Array.prototype.slice.call(data);
  const result = services.map((el, i) => {
    const o = Object.assign({}, el);
    o.FSD_ID = `0000${i+1}`;
    return o;
  });

  Array.prototype.push.apply(result, results);
  result.filter(function(item){
    const i = resArr.findIndex(x => x.FSD_ID === item.FSD_ID);
    if(i <= -1){
      resArr.push({COST_TYPE: item.COST_TYPE, PUBLISHED_PHONE_1: item.PUBLISHED_PHONE_1, PHYSICAL_DISTRICT: item.PHYSICAL_DISTRICT, PUBLISHED_CONTACT_EMAIL_1: item.PUBLISHED_CONTACT_EMAIL_1, PROVIDER_WEBSITE_1: item.PROVIDER_WEBSITE_1, SERVICE_NAME: item.SERVICE_NAME, PROVIDER_NAME: item.PROVIDER_NAME, FSD_ID: item.FSD_ID, SERVICE_DETAIL: item.SERVICE_DETAIL});
    }
    return null;
  });

  return resArr;
}

export function changeCategory(searchVars){
  return (dispatch) => {
    dispatch(changeCategories(searchVars));
  };
}

export function loadService(searchVars,serviceId){
  let url = encodeURI(`${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}&q=${serviceId}&distinct=true`);
  if(serviceId){
    return (dispatch) => {
      dispatch(loadingResults(true));
      return axios.get(url).then((response)=>{
        if(response.data.result.records.length > 0){
          dispatch(showService(response.data.result.records));
        }
      });
    };
  }
}

function requestBuilder(searchVars){
  let q = (searchVars.keyword && searchVars.keyword.length > 2) ? searchVars.keyword : '';
  let theq = `&q=${q} ${GLOBAL_FILTER}`;
  let url = encodeURI(`${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${STATICFIELDS}${theq}&distinct=true${filters(searchVars.category)}`);
  if(searchVars.addressLatLng.latitude) url += '&limit=5000';
  return url;
}

function checkLatLng(data) {
  return data.filter(r => r.PHYSICAL_ADDRESS.match(/\d+/g) !== null && r.LATITUDE !== '0' && r.LONGITUDE !== '0' && r.LATITUDE !== null && r.LONGITUDE !== null);
}

function findNearMe(data, addressLatLng, radius) {
  let filteredData = checkLatLng(data);
  for(let i in filteredData) {
    let isInside = geolib.isPointInCircle(
      {latitude: addressLatLng.latitude, longitude: addressLatLng.longitude},
      {latitude: filteredData[i].LATITUDE, longitude: filteredData[i].LONGITUDE},
      radius
    ); // 25km radius
    let distance = geolib.getDistance(
      {latitude: addressLatLng.latitude, longitude: addressLatLng.longitude},
      {latitude: filteredData[i].LATITUDE, longitude: filteredData[i].LONGITUDE}
    );
    filteredData[i].NEARME = isInside;
    filteredData[i].DISTANCE = distance;
  }
  return sortByDistance(filteredData.filter(r => r.NEARME === true));
}

function sortByDistance(data){
  return data.sort(function(a,b){
    if (a.DISTANCE < b.DISTANCE)
      return -1;
    if (a.DISTANCE > b.DISTANCE)
      return 1;
    return 0;
  });
}


export function showFilters(filters){
  return {
    type: 'SHOW_FILTERS',
    filters
  };
}

export function showResults(results, searchVars, totalResults, noSearchVars = false) {
  return {
    type: 'SHOW_RESULTS',
    results,
    searchVars,
    totalResults,
    noSearchVars
  };
}

export function showService(result) {
  return {
    type: 'SHOW_SERVICE',
    result
  };
}

export function showServiceDetails(serviceDetails) {
  return {
    type: 'SHOW_SERVICE_DETAILS',
    serviceDetails
  };
}

export function loadingResults(bool) {
  return {
    type: 'LOAD_RESULTS',
    loading: bool
  };
}

export function changeCategories(searchVars) {
  return {
    type: 'CHANGE_CATEGORIES',
    searchVars
  };

}


