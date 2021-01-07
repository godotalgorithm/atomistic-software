import citations from '../data/citations.json'
import codes_metadata from '../data/codes_metadata.json'

function yearToRange(year) {
  return year.toString() + '-' + year.toString();
}

function rangeToYear(range) {
  return range.split('-')[0];
}

// For whatever reason, one cannot simply use `citations.keys()`
let YEARS = [];
for (const citation in citations){
  YEARS.push(rangeToYear(citation));
}
YEARS = [...new Set(YEARS)];
YEARS.sort();


let CODES = [];
for (const codename in codes_metadata){
    CODES.push(codename);
}

function getData(year) {
  let range_key = yearToRange(year);
  let citations_data = citations[range_key]['citations'];
  let data = codes_metadata; //.slice();

  for (const codename in data) {
    data[codename]['citations'] = citations_data[codename]['citations'];
  }

  let dataArray = [];
  for (const codename in data) {
    dataArray.push(data[codename]);
  }
  return dataArray;
}

function getDataChart(){
    let lines = [];
    for(const codeName of CODES.slice(0,50)){
        let line_data = []
        for (const year of YEARS) {
            let data = {};
            let range_key = yearToRange(year);

            data['x'] = parseInt(year);
            data['y'] = parseInt(citations[range_key]['citations'][codeName]['citations']);
            if (isNaN(data['y']) || data['y'] <= 0) { 
                data['y']=0.1;
            }
            line_data.push(data);
        
        }
        lines.push({ 'id': codeName, 'data': line_data});
    }

    console.log(lines);
    return lines;
}

export {yearToRange, rangeToYear, YEARS, getData, getDataChart};