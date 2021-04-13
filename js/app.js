function CreatStudent(fName, lName, age) {
  if (fName.trim() === "" && lName.trim() === "") {
    return;
  }
  this.firstName = fName;
  this.lastName = lName;
  this.age = age;
  this.dateList = [];
  this.isHere = function (days = 31) {
    for (let i = 0; i < days; i++) {
      this.dateList.push({
        id: i,
        here: true,
      });
    }
  };
}
const log = {
  group: "Frontend Developer",
  date: "15/02/2021",
  list: [],
  addStudent: function (student) {
    student.id = this.list.length;
    this.list.push(student);
  },
  studentIsNotHere: function (idSt, idDay) {
    const index = this.list.findIndex((stud) => stud.id === idSt);
    if (index === -1) {
      return;
    };
    const index2 = this.list[index].dateList.findIndex(
      (day) => day.id === idDay
    );
    if (index2 === -1) {
      return;
    };
    this.list[index].dateList[index2].here = !this.list[index].dateList[index2]
      .here;
  },
};
const main = () => {
  const div = document.querySelector("#title");
  const h2 = document.createElement("h2");
  h2.innerText = log.group;
  div.appendChild(h2);
  const h3 = document.createElement("h3");
  h3.innerText = log.date;
  div.appendChild(h3);
  document.querySelector("#form").addEventListener("submit", (event) => {
    event.preventDefault();
    const fN = document.querySelector("#first-name");
    const lN = document.querySelector("#last-name");
    const age = document.querySelector("#age");
    const student = new CreatStudent(fN.value, lN.value, age.value);
    student.isHere();
    fN.value = "";
    lN.value = "";
    age.value = "";
    log.addStudent(student);
    renderLog();
  });
};
const renderLog = () => {
  const table = document.querySelector("#table");
  table.innerHTML = "";
  const trFirst = document.createElement("tr");
  const th = document.createElement("th");
  th.innerText = "Name";
  trFirst.appendChild(th);
  for (let i = 1; i <= 31; i++) {
    const thDay = document.createElement("th");
    thDay.innerHTML = i;
    trFirst.appendChild(thDay);
  }
  table.appendChild(trFirst);
  log.list.forEach((student) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.innerText = `${student.firstName} ${student.lastName}`;
    tr.appendChild(tdName);
    for (let i = 1; i <= 31; i++) {
      const td = document.createElement("td");
      td.id = `td_${student.id}_${i - 1}`;
      td.classList = "cursor";
      if (!student.dateList[i - 1].here) {
        td.innerText="H";
      }
      td.addEventListener("click", notHere);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  });
};
const notHere = (event) => {
  event.preventDefault();
  const idSt = +event.target.id.split("_")[1];
  const idDay = +event.target.id.split("_")[2];
  log.studentIsNotHere(idSt, idDay);
  renderLog();
};
main();
