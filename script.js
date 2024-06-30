const partyContainer = document.querySelector("#party-container");
const partyName = document.querySelector("#party-name");
const partyDescription = document.querySelector("#party-description");
const partyLocation = document.querySelector("#party-location");
const partyDate = document.querySelector("party-date");
const addPartyBtn = document.querySelector("#add-party");

async function getEvents() {
  try {
    const res = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events"
    );

    const json = await res.json();
    console.log(json);
    return json.data;
  } catch (err) {
    console.log(err);
  }
}

function createEventsHTML(events, container) {
  const eventsMap = events.map((event) => {
    const eventContainer = document.createElement("div");
    const eventParagraph = document.createElement("p");
    eventParagraph.innerText = `${event.name} ${event.description} ${event.location} ${event.date}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", async function () {
      try {
        const res = await fetch(
          `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events/${event.id}`,
          {
            method: "Delete",
          }
        );
        if (res.status === 204) {
          alert("deleted successfully");
          render();
        }
      } catch (error) {
        console.log(error);
      }
    });
    eventContainer.appendChild(eventParagraph);
    eventContainer.appendChild(deleteBtn);
    return eventContainer;
  });
  container.replaceChildren(...eventsMap);
}

async function createEvent(event) {
  try {
    const res = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events",
      {
        method: "Post",
        body: JSON.stringify(event),
        headers: {
          "content-type": "appplication/json",
          accept: "application/json",
        },
      }
    );
    const json = await res.json();
    render();
  } catch (error) {
    console.log(error);
  }
}

addPartyBtn.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newParty = {
    name: partyName.value,
    description: partyDescription.value,
    location: partyLocation.value,
    date: new Date(partyDate.value).toISOString(),
  };
  const result = await createEvent(newParty);
  console.log(result);
});

async function render() {
  const events = await getEvents();
  createEventsHTML(events, partyContainer);
}
render();
