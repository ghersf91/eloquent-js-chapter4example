const JOURNAL = require('./data')
//correlation formula

function phi(table) {
  return (table[0] * table[3] - table[1] * table[2]) /
    Math.sqrt((table[2] + table[3])
      * (table[0] + table[1])
      * (table[1] + table[3])
      * (table[0] + table[2]))
}



// formula to extract the event table from the journal, needed for correlation calculation

function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let entry of journal) {
    let index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}



// formula to create an array with all the unique events from the journal

function journalEvents(journal) {
  let uniqueEvents = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!uniqueEvents.includes(event)) {
        uniqueEvents.push(event);
      }
    }
  }
  return uniqueEvents;
}



// calculate the correlation of all unique events in the journal

//for(let event of journalEvents(JOURNAL)) {
//    console.log(event + ': ' + phi(tableFor(event, JOURNAL)))
//}



// filter only events with correlation greater than 0.1 or smaller than -0.1

for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ': ' + correlation)
  }
}



// calculate the correlation on days that bothe the 'peanuts' event exists and the 'brushed teeth' event doesn't exist

for (let entry of JOURNAL) {
  if (entry.events.includes('peanuts') && !entry.events.includes('brushed teeth')) {
    entry.events.push('peanuts teeth');
  }
}

console.log(phi(tableFor('peanuts teeth', JOURNAL)))
