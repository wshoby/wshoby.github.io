
var confirmElement = document.querySelector(".confirm");

function closePage() {
  clearClassList();
}

function openPage(page) {
  clearClassList();
  var classList = confirmElement.classList;
  classList.add("page_open");
  classList.add("page_" + page + "_open");
}

function clearClassList() {
  var classList = confirmElement.classList;
  classList.remove("page_open");
  classList.remove("page_1_open");
  classList.remove("page_2_open");
  classList.remove("page_3_open");
}

var time = document.getElementById("time");

// Funkcja do formatowania daty z wiodącym zerem
function formatDateWithLeadingZero(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są liczone od 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

if (localStorage.getItem("update") == null) {
  localStorage.setItem("update", "24.12.2024");
}

var date = new Date();

var updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = localStorage.getItem("update");

var update = document.querySelector(".update");
update.addEventListener('click', () => {
  var newDate = formatDateWithLeadingZero(date); // Używamy funkcji do formatowania daty
  localStorage.setItem("update", newDate);
  updateText.innerHTML = newDate;

  scroll(0, 0);
});

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

setClock();
function setClock() {
  date = new Date();
  const formattedDate = formatDateWithLeadingZero(date); // Używamy funkcji do formatowania daty
  time.innerHTML = "Czas: " + date.toLocaleTimeString() + " " + formattedDate;
  delay(1000).then(() => {
    setClock();
  });
}

var unfold = document.querySelector(".info_holder");
unfold.addEventListener('click', () => {
  if (unfold.classList.contains("unfolded")) {
    unfold.classList.remove("unfolded");
  } else {
    unfold.classList.add("unfolded");
  }
});

var data = {};

var params = new URLSearchParams(window.location.search);
for (var key of params.keys()) {
  data[key] = params.get(key);
}

document.querySelector(".id_own_image").style.backgroundImage = `url(${data['image']})`;

var birthday = data['birthday'];
var birthdaySplit = birthday.split(".");
var day = parseInt(birthdaySplit[0]);
var month = parseInt(birthdaySplit[1]);
var year = parseInt(birthdaySplit[2]);

var birthdayDate = new Date();
birthdayDate.setDate(day);
birthdayDate.setMonth(month - 1);
birthdayDate.setFullYear(year);

birthday = formatDateWithLeadingZero(birthdayDate); // Używamy funkcji do formatowania daty

var sex = data['sex'];

if (sex === "m") {
  sex = "MĘŻCZYZNA";
} else if (sex === "k") {
  sex = "KOBIETA";
}

setData("name", data['name'].toUpperCase());
setData("surname", data['surname'].toUpperCase());
setData("nationality", data['nationality'].toUpperCase());
setData("birthday", birthday);
setData("familyName", data['familyName'].toUpperCase());
setData("sex", sex);
setData("fathersFamilyName", data['fathersFamilyName'].toUpperCase());
setData("mothersFamilyName", data['mothersFamilyName'].toUpperCase());
setData("birthPlace", data['birthPlace'].toUpperCase());
setData("countryOfBirth", data['countryOfBirth'].toUpperCase());
setData("adress", "UL. ".toUpperCase() + data['adress1'].toUpperCase() + "<br>" + data['adress2'].toUpperCase() + " " + data['city'].toUpperCase());

if (localStorage.getItem("homeDate") == null) {
  var homeDay = getRandom(12, 25);
  var homeMonth = getRandom(0, 12);
  var homeYear = getRandom(2012, 2019);

  var homeDate = new Date();
  homeDate.setDate(homeDay);
  homeDate.setMonth(homeMonth);
  homeDate.setFullYear(homeYear);

  localStorage.setItem("homeDate", formatDateWithLeadingZero(homeDate)); // Używamy funkcji do formatowania daty
}

document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate");

if (parseInt(year) >= 2000) {
  month = 20 + month;
}

var later;

if (sex.toLowerCase() === "mężczyzna") {
  later = "0295";
} else {
  later = "0382";
}

if (day < 10) {
  day = "0" + day;
}

if (month < 10) {
  month = "0" + month;
}

var pesel = year.toString().substring(2) + month + day + later + "7";
setData("pesel", pesel);

function setData(id, value) {
  document.getElementById(id).innerHTML = value;
}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
