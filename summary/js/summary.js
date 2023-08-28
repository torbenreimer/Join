let tasks = [];
let urgentTasksCount = 0;
let toDoTasksCount = 0;
let doneTasksCount = 0;
let inProgressTasksCount = 0;
let awaitingFeedbackTasksCount = 0;
let user;

/**
 * loads the data from the backend
 */
async function initSummary() {
    await init();
    tasks = await JSON.parse(await backend.getItem('tasks')) || [];
    setContent();
}

/**
 * changes the img when you hover
 * @param {id} id the id from the image
 * @param {src} src the src from the image
 */
function hoverSrcChange(id, src) {
    document.getElementById(id).setAttribute("src", src);
}

/**
 * changes the color when hover
 * @param {id} id the id from the container
 * @param {color} color is the color that is changed
 */
function hoverColorChange(id, color) {
    document.getElementById(id).style.color = color;
}

/**
 * links to the board
 */
function linkToBoard() {
    window.location.href = "../board/board.html";
}

/**
 * calls many help functions
 */
function setContent() {
    setWelcomeText();
    setWelcomeScreen();
    countTasks();
    setTaskCounts();
    getNextDate();
}

/**
 * counts the tasks
 */
function countTasks() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['prio'] == 'urgent') {
            urgentTasksCount ++;
        }
        if (tasks[i]['status'] == 'to do') {
            toDoTasksCount ++;
        }
        if (tasks[i]['status'] == 'done') {
            doneTasksCount ++;
        }
        if (tasks[i]['status'] == 'in progress') {
            inProgressTasksCount ++;
        }
        if (tasks[i]['status'] == 'awaiting feedback') {
            awaitingFeedbackTasksCount ++;
        }
    } 
}

/**
 * sets the counts for the tasks prios
 */
function setTaskCounts() {
    document.getElementById('totalTaskCount').innerHTML = tasks.length;
    document.getElementById('urgentTaskCount').innerHTML = urgentTasksCount;    
    document.getElementById('toDoTaskCount').innerHTML = toDoTasksCount;
    document.getElementById('doneTaskCount').innerHTML = doneTasksCount;
    document.getElementById('inProgressTaskCount').innerHTML = inProgressTasksCount;
    document.getElementById('awaitingFeedbackTaskCount').innerHTML = awaitingFeedbackTasksCount;
}

/**
 * set the current day
 */
function getNextDate() {
    let dates = [];
    var today = new Date().setHours(0, 0, 0, 0);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].date != '') {
            if (new Date(tasks[i].date) - today >= 0){
                dates.push(tasks[i].date);
            }
        }
    }
    setNextDeadline(dates)
}

/**
 * evaluates the next urgent prio deadline
 * @param {dates} dates is the dates from the dates for the next days
 */
function setNextDeadline(dates) {
    if (dates.length > 0) {
        dates.sort();
        document.getElementById('textUrgentDate').innerHTML = formatDate(dates[0]);    
    }
    else {
        document.getElementById('textUrgentDate').innerHTML = 'No upcoming deadline';  
        document.getElementById('textUrgentDescription').innerHTML = '';  
    }
}

/**
 * get the german date format
 * @param {date} date is the current date
 * @returns the german dateformat
 */
function formatDate(date) {
    const dateAsString = new Date(date + 'T00:00:00.000');
    return dateAsString.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * checks the daytime and and gives a greeting
 * @returns greetings 
 */
function getWelcomeText() {
    let date = new Date();
    let hour = date.getHours();
    let greeting;

    switch (true) {
        case (hour < 12):
            greeting = 'Good morning';
            break;
        case ((hour >= 12) && (hour < 18)):
            greeting = 'Good afternoon';
            break;
        case (hour >= 18):
            greeting = 'Good evening';
            break;
    }
    return greeting;
}

/**
 * set the greeting text to the right container
 */
function setWelcomeText() {
    let greeting = getWelcomeText();
    if (localStorage.getItem("guestLogin") == 0)
    {
        greeting += ','
        setWelcomeUser();
    }
    document.getElementById('textGreeting').innerHTML = greeting;
    document.getElementById('welcomeGreeting').innerHTML = greeting;
    
}

/**
 * sets the name from the user
 */
function setWelcomeUser() {
    user = JSON.parse(localStorage.getItem("user")) || [];
    document.getElementById('textUserName').innerHTML = `${user.firstName} ${user.surname}`;
    document.getElementById('welcomeUserName').innerHTML = `${user.firstName} ${user.surname}`;
}

/**
 * set the animation for the welcome stream
 */
function setWelcomeScreen() {
    if (checkWelcomeScreenShouldDisplayed()) {
        displayWelcomeScreen()
    }
    else {
        document.getElementById('summary').classList.remove('invisible');
    }
}

/**
 * displays the welcome screen
 */
function displayWelcomeScreen() {
    let welcomeScreenClassList = document.getElementById('welcomeScreen').classList;
    welcomeScreenClassList.remove('invisible');
    document.getElementById('summary').classList.remove('invisible');
    welcomeScreenClassList.add('fadeOut');
    setTimeout(() => { welcomeScreenClassList.add('invisible') }, 2500);
}

/**
 * checks the screen width for responsiv
 * @returns responsive design
 */
function checkWelcomeScreenShouldDisplayed() {
    if (document.referrer.slice(-5) == 'join/' || document.referrer.slice(-10) == 'index.html') {
        if (window.innerWidth < 900) {
            return true;
        }
    }
    return false;
}