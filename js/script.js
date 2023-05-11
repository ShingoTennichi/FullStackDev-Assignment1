// ***** Execute code ***** //
let users;
pageInit();

// ***** Functions ***** //
function createUserContacts(usersArray, startIndex, endIndex) {
  const ul = document.querySelector(".contact-list");
  ul.innerHTML = ''; // * to reset, remove all child element from ul tag

  for (let userIndex = startIndex; userIndex < endIndex && userIndex < usersArray.length; userIndex++) {
    const user = usersArray[userIndex];

    const li = ul.appendChild(document.createElement("li"));
    li.classList.add("contact-item", "cf");

    const contactDetail = li.appendChild(document.createElement("div"));
    contactDetail.classList.add("contact-details");

    const img = contactDetail.appendChild(document.createElement("img"));
    img.classList.add("avatar");
    img.src = user.image;

    const h3 = contactDetail.appendChild(document.createElement("h3"));
    h3.innerText = user.name;

    const email = contactDetail.appendChild(document.createElement("span"));
    email.classList.add("email");
    email.innerText = user.email;

    const joinedDetails = li.appendChild(document.createElement("div"));
    joinedDetails.classList.add("joined-details");

    const joinedDate = joinedDetails.appendChild(document.createElement("span"));
    joinedDate.classList.add("date");
    joinedDate.innerText = "Joined " + user.joined;
  }
}

async function fetchUsers() {
  // * change the number of 'results= N' to get N users
  const data = await fetch("https://randomuser.me/api/?results=98");
  const userData = await data.json();

  const users = [];
  userData.results.map((data) => {
    const joinedDate = data.registered.date.slice(5, 10).replace(/-/g, "/") + "/" + data.registered.date.slice(2, 4)
    const user = {
      name: `${data.name.first} ${data.name.last}`,
      email: data.email,
      image: data.picture.thumbnail,
      joined: joinedDate
    }
    users.push(user);
  })
  return users
}

async function pageInit() {
  // * assign to global users variable
  users = await fetchUsers();

  const total = document.getElementById("total");
  total.innerText = `Total: ${users.length}`;

  // * create pagination button
  const totalPage = Math.ceil(users.length / 10);
  const pagination = document.querySelector(".pagination");
  for (let pageNumber = 1; pageNumber <= totalPage; pageNumber++) {
    const btn = pagination.appendChild(document.createElement("button"));
    btn.type = "button";
    btn.classList.add("btn");
    btn.addEventListener("click", (e) => pageNavigate(e));
    btn.innerHTML = (pageNumber);
  }

  // * as default setting, display 10 users from index 0 to index 9
  const upperBoundaryUserIndex = 10;
  const startIndex = 0;
  createUserContacts(users, startIndex, upperBoundaryUserIndex);
}

function pageNavigate(e) {
  const upperBoundaryUserIndex = e.target.innerText * 10;
  const startIndex = upperBoundaryUserIndex - 10
  createUserContacts(users, startIndex, upperBoundaryUserIndex);
}