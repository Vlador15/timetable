async function getTimeTable(params) {
  let response = await fetch("http://localhost:5001/api/timetable", {
    method: "post",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json",
    },
  });

  let jsonData = await response.json();
  return jsonData;
}

async function api(url, params, method) {
  let response = await fetch(url, {
    method,
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json",
    },
  });

  let jsonData = await response.json();
  return jsonData;
}

export { getTimeTable, api };
