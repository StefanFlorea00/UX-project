"use strict";
const DEBUG = true;


const sessionStorage = window.sessionStorage;
function getIsMobile() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }
    
    return false;
}
const isMobile = getIsMobile();


DEBUG && console.log("Is Mobile");

let selectors = {
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
        classItem: ".class-item",
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
        assignment: "[data-assignment]"
    },
    profile: {
        logout: "[data-logout]"
    },
    toggleClosedClass: "closed",
    toggleHiddenClass: "hidden"
}

$(document).ready(() => {
    DEBUG && console.log("INIT");
    DEBUG && console.log(sessionStorage);
    DEBUG && console.log(isMobile);

    initForms();
    checkLoggedIn();
    initHeader();
    initDropdowns();
    initClass();
    initCalendar();
    initModal();
});

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
        return 'student';
    } else if (sessionStorage.getItem('teacherLoggedIn') == "true") {
        return 'teacher';
    }
    return 'not';
}

//Header
function initHeader() {
    $(selectors.header.menuBtn).on("click", (event) => {
        let _this = $(event.target);
        $(_this).closest(selectors.header.linkContainer).toggleClass(selectors.toggleClosedClass);
    });

    let profile = 'profile.html';
    profile = getLogin() + "-" + profile;
    $(selectors.header.profileBtn).attr("href", profile);
}

//Dropdowns
function initDropdowns() {
    $(selectors.toggle.container).each((i, container) => {
        $(container).find(selectors.toggle.toggleBtn).on("click", (event) => {
            let _this = $(event.target);
            $(_this).parent().find(selectors.toggle.insideWrapper)
                .toggleClass(selectors.toggleClosedClass);
        })
    });
}

function initClass() {
    $(selectors.class.classesContainer).find(selectors.class.classItem).each((i, container) => {
        $(container).on("click", () => {
            $(selectors.class.classInfoContainer).toggleClass(selectors.modal.hidden);
        })
    });
}

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
        console.log("aa");
        sessionStorage.removeItem('studentLoggedIn');
        sessionStorage.removeItem('teacherLoggedIn');
        window.location.replace("index.html");
    })
}

function initModal() {
    $(selectors.modal.modal).each((i, modal) => {
        $(modal).find(selectors.modal.closeModal).each((j, closeBtn) => {
            DEBUG && console.log($(closeBtn))
            $(closeBtn).on("click", (e) => {
                DEBUG && console.log(this);
                $(e.target).parents(selectors.modal.modal).toggleClass(selectors.toggleHiddenClass);
                // if(isMobile) {
                //     $(document).find('body').toggleClass(selectors.modal.bodyModalEffect);
                // }
            })
        })
    })
}

function initCalendar() {

    for(let i = 2; i<= 31; i++ ) {
        $(selectors.calendar.calendar).find(selectors.calendar.days).append(`<li>${i}</li>`);
    }
    



    $(selectors.calendar.calendar).find(selectors.calendar.assignment).each((i, assignment) => {
        $(assignment).on("click", () => {
            DEBUG && console.log($(assignment), $(document).find(selectors.modal.modal));
            $(document).find(selectors.modal.modal).toggleClass(selectors.toggleHiddenClass);
            if(isMobile) {
                $(window).scrollTop(0);
                // $(document).find('body').toggleClass(selectors.modal.bodyModalEffect);
            }
        });
    });
}

// $(".schedule.calendar").find(".days").on("click", (event) => {
//     $(event.target).toggleClass("active")
// })