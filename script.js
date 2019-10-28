var storage;
var storageName = 'calendar';
var currentDay = moment().format('DDMMYY');

function getDate() {
    var momDate = moment().format("dddd, MMMM Do, YYYY");
    console.log(momDate);
    $("#dateDiv").html(momDate);
}

getDate();

function hourColor() {
    var currentHr = moment().format("h-a");
    console.log(currentHr);

    var calendarTxt = $(".hourCh textarea");
    for (var i = 0; i < calendarTxt.length; i++) {
        var calItem = calendarTxt[i];
        if (moment(calItem.id, "h-a").isBefore(moment(currentHr, "h-a"), 'hour')) {
            $(calItem).addClass("alert-secondary");
        }
        if (moment(calItem.id, "h-a").isAfter(moment(currentHr, "h-a"), 'hour')) {
            $(calItem).addClass("alert-success");
        }
    }
    $(`#${currentHr}`).removeClass("alert-secondary alert-success").addClass("alert-primary");
}

hourColor();

function saveCal() {
    var currentTextArea = $(this).parent().siblings('textarea');
    var currentTime = currentTextArea.attr('id')
    var currentItems = currentTextArea.val();
    console.log(`${currentTime}:${currentItems}`);
    storage[currentDay][currentTime] = currentItems;
    updateStorage();
}

function bindEvents() {
    $(".hourCh button").on("click", saveCal);
}


function updateStorage() {
    localStorage.setItem(storageName, JSON.stringify(storage));
    console.log(localStorage.calendar);
}

function createStorage() {
    var temp = localStorage.getItem(storageName);
    if (temp) {
        storage = JSON.parse(temp);
        if (!storage[currentDay]) {
            storage[currentDay] = {};       
        }
    } else {
        storage = {};
        storage[currentDay] = {};
    }
    console.log(storage);
    localStorage.setItem(storageName, JSON.stringify(storage));
    console.log(localStorage.calendar);

}

function showToday() {
    var today = storage[currentDay];
    console.log(today);
    var hours = Object.keys(today);
    for(var i = 0; i < hours.length; i++) {
        var selectedTime = hours[i];
        var todaysEntry = today[selectedTime];
        $(`#${selectedTime}`).val(todaysEntry);
    }
}


function startApp() {
    createStorage();
    bindEvents();
    showToday();
}

startApp();