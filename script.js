const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventsContainer = document.querySelector(".events")   ;




let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

//default events array
const eventsArr = [
    {
        day: 15,
        month: 12,
        year: 2023,
        events: [
            {
                title: "Event 1",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM",
            },
        ],
    },
];




//function to ad days

function initCalendar() {
    //to get prev month days and current month all days and rem next month days

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //update date top of calendar
    date.innerHTML = months[month] + " " + year;

    //adding days on dom
    let days = "";

    //prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class = "day prev-date">${prevDays - x + 1}</div>`;
    }

    //current month days
    for (let i = 1; i <= lastDate; i++) {
        //check if event is present on that day
        let event = false;
        eventsArr.forEach((eventObj) => {
          if (
            eventObj.day === i &&
            eventObj.month === month + 1 &&
            eventObj.year === year
          ) {
            event = true;
          }
        });



        //if day is today add class today
        if (
            i == new Date().getDate() &&
            year == new Date().getFullYear() &&
            month == new Date().getMonth()
        ) {
            //if event found also add event class
            //add active on today at startup
            if(event){
                days += `<div class = "day today active event">${i}</div>`;
            }else{
                days += `<div class = "day today active">${i}</div>`;
            }
        }
        //add remaing as it is
        else {
            if(event){
                days += `<div class = "day  event">${i}</div>`;
            }else{
                days += `<div class = "day ">${i}</div>`;
            }
        }
    }

    //next month days
    for (let j = 1; j < nextDays; j++) {
        days += `<div class = "day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;

    //add listner after calendar initialized
    addListner();

}

initCalendar();

//prev month
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

//next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

//add eventlistnner on prev and nex
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//our calendar is ready
//lets add goto date and goto today functionally

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    //allow only numbers remove anothing else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        //add a slash if two numbers entered
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        //dont allow more than / character
        dateInput.value = dateInput.value.slice(0, 7);
    }
    //if we remove untill slash its not removing
    //if backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
})


gotoBtn.addEventListener("click", gotoDate);


//function to go to entered date
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    //some date validation
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }

    }

    //if invalid date
    alert("invalid date");

}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");


addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});


document.addEventListener("click", (e) => {
    //if click outside
    if (e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
});


//allow 50 chars in title
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
})

//time format in from and to time
addEventFrom.addEventListener("input", (e) => {
    //remove anything else numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    //if two numbers entered auto add :
    if (addEventFrom.value.length == 2) {
        addEventFrom.value += ":";
    }
    //dont let user enter more than 5 chars
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
})

//same with to time
addEventTo.addEventListener("input", (e) => {
    //remove anything else numbers
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    //if two numbers entered auto add :
    if (addEventTo.value.length == 2) {
        addEventTo.value += ":";
    }
    //dont let user enter more than 5 chars
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
})


// Lets create function to add lostner on days after rendered
function addListner(){
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //set current day as active day
            activeDay = Number(e.target.innerHTML);

            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });

            //if prev month day clicked goto prev month and add active
            if(e.target.classList.contains("prev-date")){
                prevMonth();

                setTimeout(() =>{
                    //select all days of that months
                    const days = document.querySelectorAll(".day");

                    //after going to prev month add active to clicked
                    days.forEach((day) => {
                        if(!day.classList.contains("prev-date") && 
                        day.innerHTML == e.target.innerHTML
                        ){
                            day.classList.add("active");
                        }
                    });
                }, 100);
                //same with next days
            }else if(e.target.classList.contains("next-date")){
                    nextMonth();
    
                    setTimeout(() =>{
                        //select all days of that months
                        const days = document.querySelectorAll(".day");
    
                        //after going to prev month add active to clicked
                        days.forEach((day) => {
                            if(!day.classList.contains("next-date") && 
                            day.innerHTML == e.target.innerHTML
                            ){
                                day.classList.add("active");
                            }
                        });
                    }, 100);
                    
               }else{
                //renaing current month days
                e.target.classList.add("active");
               }


            



        });
    });
}


//lets show active day events and date at top