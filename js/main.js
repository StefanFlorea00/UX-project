"use strict";
const DEBUG = true;

//* UTIL *//

const sessionStorage = window.sessionStorage;
function getIsMobile() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }
    return false;
}
const isMobile = getIsMobile();

const selectors = {
    header: {
        class: ".header-container",
        header: "[data-header]",
        menuBtn: "[data-menu-toggle]",
        linkContainer: "[data-header-links]",
        profileBtn: "[data-profile]"
    },
    toggle: {
        container: "[data-toggle]",
        toggleBtn: "[data-toggle-btn]",
        insideWrapper: "[data-toggle-wrapper]"
    },
    class: {
        classInfoContainer: "#class-info-container",
        classItem: "[data-class-item]",
        classesContainer: ".classes-container"
    },
    modal: {
        modal: "[data-modal]",
        bodyModalEffect: "modal-shown",
        closeModal: "[data-modal-close]"
    },
    calendar: {
        calendar: "[data-calendar]",
        days: "[data-days]",
        assignment: "[data-calendar-assignment]",
        nextBtn: "#next",
        prevBtn: "#prev",
        month: "[data-month]"
    },
    assignments: {
        assignment: "[data-assignment]"
    },
    profile: {
        logout: "[data-logout]",
        edit: "[data-edit]",
        toggleable: "[data-form-toggleable]"
    },
    toggleClosedClass: "closed",
    toggleHiddenClass: "hidden",
    loggedAs: "[data-logged-as]",
    studentOnly: "[data-student-only]",
    teacherOnly: "[data-teacher-only]"
}

//* INIT *//

$(document).ready(() => {
    DEBUG && console.log("INIT");
    DEBUG && console.log(sessionStorage);
    DEBUG && console.log(isMobile);
    checkLoggedIn();

    //forms
    initForms();
    initLoggedInDisplay();

    //header
    initHeader();

    //components
    initDropdowns();
    initClassesContainer();
    initAssignments();
    initCalendar();

    //modal
    initModal();
});


//* LOGIN *//

function checkLoggedIn() {
    if (!window.location.href.includes("login")) {
        if (getLogin() != "not") {
            return;
        }
        else {
            window.location.replace("student-login.html");
        }
    }
}

function getLogin() {
    if (sessionStorage.getItem('studentLoggedIn') == "true") {
        $(document).find(selectors.loggedAs).text("Student");
        return 'student';
    } else if (sessionStorage.getItem('teacherLoggedIn') == "true") {
        $(document).find(selectors.loggedAs).text("Teacher");
        return 'teacher';
    }
    return 'not';
}

function initLoggedInDisplay(){
    if(sessionStorage.getItem('studentLoggedIn') == "true") {
        $(document).find(selectors.loggedAs).text("Student");
        $(document).find(selectors.studentOnly).show();
        $(document).find(selectors.teacherOnly).hide();
    } else if (sessionStorage.getItem('teacherLoggedIn') == "true") {
        $(document).find(selectors.loggedAs).text("Teacher");
        $(document).find(selectors.teacherOnly).show();
        $(document).find(selectors.studentOnly).hide();
    }
}


//*****FORMS*****//
function initForms() {
    $("form").on("submit", (e) => {
        e.preventDefault();
    });

    //login
    initLoginForm('#student-login-form');
    initLoginForm('#teacher-login-form');

    //profile
    initProfileForm('#student-profile-form');
    initProfileForm('#teacher-profile-form');

    initEditForm(selectors.modal.modal);
}

function initLoginForm(form) {
    form && $(form).find("input[type='submit']").on("click", () => {
        if(form.includes("student")) {
            sessionStorage.setItem('studentLoggedIn', true);
            sessionStorage.removeItem('teacherLoggedIn');
        } else if (form.includes("teacher")) {
            sessionStorage.setItem('teacherLoggedIn', true);
            sessionStorage.removeItem('studentLoggedIn');
        }
        window.location.replace("index.html");
    })
}

function initProfileForm(form) {
    form && $(selectors.profile.logout).on("click", () => {
        sessionStorage.removeItem('studentLoggedIn');
        sessionStorage.removeItem('teacherLoggedIn');
        window.location.replace("index.html");
    })

    initEditForm(form);
}

function initEditForm(form) {
    let editingForm = false;
    form && $(selectors.profile.edit).on("click", (e) => {
        editingForm = !editingForm;
        $(form).find(selectors.profile.toggleable).each((i,el) => {
            $(el).prop('disabled', !editingForm);
        });
        editingForm && $(e.target).text("Save");
        !editingForm && $(e.target).text("Edit");
    })
}

//******HEADER*****//
function initHeader() {
    $(selectors.header.menuBtn).on("click", (event) => {
        let _this = $(event.target);
        $(_this).closest(selectors.header.linkContainer).toggleClass(selectors.toggleClosedClass);
    });

    let profile = 'profile.html';
    profile = getLogin() + "-" + profile;
    $(selectors.header.profileBtn).attr("href", profile);
}

//******ASSIGNMENTS*****//
function initAssignments() {
    $(selectors.assignments.assignment).each((i,assignment) => {
        $(assignment).on("click", (e) => {
            e.preventDefault();
            DEBUG && console.log($(assignment), $(document).find(selectors.modal.modal));
            $(document).find(selectors.modal.modal).toggleClass(selectors.toggleHiddenClass);
            $(document).find('body').toggleClass(selectors.modal.bodyModalEffect);
        });
    })
}


//*****DROPDOWNS*****//
function initDropdowns() {
    $(selectors.toggle.container).each((i, container) => {
        $(container).find(selectors.toggle.toggleBtn).on("click", (event) => {
            let _this = $(event.target);
            $(_this).parent().toggleClass(selectors.toggleClosedClass);
            $(_this).parent().find(selectors.toggle.insideWrapper).toggleClass(selectors.toggleClosedClass);
        })
    });
}

//*****CLASS CONTAINER*****//
function initClassesContainer() {
    $(selectors.class.classesContainer).find(selectors.class.classItem).each((i, container) => {
        $(container).on("click", () => {
            $(selectors.class.classInfoContainer).toggleClass(selectors.toggleHiddenClass);
        })
    });
}

//*****MODAL*****//
function initModal() {
    $(selectors.modal.modal).each((i, modal) => {
        $(modal).find(selectors.modal.closeModal).each((j, closeBtn) => {
            DEBUG && console.log($(closeBtn));
            $(closeBtn).on("click", (e) => {
                DEBUG && console.log(this);
                $(e.target).parents(selectors.modal.modal).toggleClass(selectors.toggleHiddenClass);
                $(document).find('body').toggleClass(selectors.modal.bodyModalEffect);
            })
        })
    })
}



//*****CALENDAR*****//
const months = ["January","February","March","April","May","June","July","August","September","November","December"]; // for display
function initCalendar() {

    let today = new Date(new Date().getFullYear(), 0, 1);
    let newDate = today;
    $(selectors.calendar.calendar).find(selectors.calendar.month).text(months[0]);

    //initial days fill
    for(let i = 2; i<= 31; i++ ) {
        if(getLogin() == "teacher") {
            $(selectors.calendar.calendar).find(selectors.calendar.days).append(`<li class="can-add" data-calendar-assignment><p><b>${i}</b> [Add new]</p></li>`);
        } else {
            $(selectors.calendar.calendar).find(selectors.calendar.days).append(`<li><p><b>${i}</b></p></li>`);
        }
    }

    function addNewMonth(reverse) {
        if(reverse) { 
            newDate = new Date(newDate.getFullYear(), newDate.getMonth()-1, 1);
        }
        else {
            newDate = new Date(newDate.getFullYear(), newDate.getMonth()+1, 1);
        }
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        let daysInMonth = new Date(year, month, 0).getDate();
   
        $(selectors.calendar.calendar).find(selectors.calendar.month).text(months[month]);

        $(selectors.calendar.calendar).find(selectors.calendar.days).empty();
        for(let i = 2; i<= daysInMonth; i++ ) {
            if(getLogin() == "teacher") {
                $(selectors.calendar.calendar).find(selectors.calendar.days).append(`<li class="can-add" data-calendar-assignment><p><b>${i}</b> [Add new]</p></li>`);
            } else {
                $(selectors.calendar.calendar).find(selectors.calendar.days).append(`<li><p><b>${i}</b></p></li>`);
            }
        }
    }

    //events
    $(selectors.calendar.nextBtn).on("click", () => {
        addNewMonth(false);
        addCalendarDayEvents();
    });
    $(selectors.calendar.prevBtn).on("click", () => {
        addNewMonth(true);
        addCalendarDayEvents();
    });

    //calendar assignments
    function addCalendarDayEvents(){
        $(selectors.calendar.calendar).find(selectors.calendar.assignment).each((i, assignment) => {
            $(assignment).on("click", () => {
                DEBUG && console.log($(assignment), $(document).find(selectors.modal.modal));
                $(document).find(selectors.modal.modal).toggleClass(selectors.toggleHiddenClass);
                $(document).find('body').toggleClass(selectors.modal.bodyModalEffect);
            });
        });
    }
}
