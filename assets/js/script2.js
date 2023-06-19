let recordList = document.querySelector("#record-list");
let recordCountSpan = document.querySelector("#record-count");

let records = [];

function renderRecords() {

  /*recordList.innerHTML = "";*/
  recordCountSpan.textContent = records.length;
  console.log (recordCountSpan);
  console.log (records.length);
  for (var i = 0; i < records.length; i++) {
    let record = records[i];

    let li = document.createElement("li");
    li.textContent = record.initial + " has scored " + record.score + '.';
    li.setAttribute("data-index", i);

    recordList.appendChild(li);
  }
}

function init() {
  const localRecord = JSON.parse(localStorage.getItem("storedRecord"));
  if (localRecord !== null) {
    records = localRecord;
    console.log(records);
    console.log(records.length);

  }
  renderRecords();
  console.log(renderRecords);
}

init();
