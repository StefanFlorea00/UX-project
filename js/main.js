"use strict";
const DEBUG = true;

DEBUG && console.log("INIT");

let sessionStorage = window.sessionStorage;

let selectors = {
    header: {
        class: ".header-container",
        header: "[data-header]",
        menuBtn: "[data-menu-toggle]",
        linkContainer: "[data-header-links]"
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
    toggleClosedClass: "closed",
}

$(document).ready(() => {
    DEBUG && console.log(sessionStorage);

    initForm();
    checkLoggedIn();
    initHeader();
    initDropdowns();
    initClass();
});

function checkLoggedIn() {
    if(!window.location.href.includes("login")) {
        if(sessionStorage.getItem('teacherLoggedIn') == "true" || sessionStorage.getItem('teacherLoggedIn') == "true") {
            return;
        }
        else {
            window.location.replace("student-login.html");
        }
    }
}

//Header
function initHeader() {
    $(selectors.header.menuBtn).on("click", (event) => {
        let _this = $(event.target);
        $(_this).closest(selectors.header.linkContainer).toggleClass(selectors.toggleClosedClass);
    });
}

//Dropdowns
function initDropdowns() {
    $(selectors.toggle.container).each((i,container)=> {
        $(container).find(selectors.toggle.toggleBtn).on("click", (event) => {
            let _this = $(event.target);
            $(_this).parent().find(selectors.toggle.insideWrapper)
                    .toggleClass(selectors.toggleClosedClass);
        })
    });
}

function initClass() {
    $(selectors.class.classesContainer).find(selectors.class.classItem).each((i,container)=> {
        $(container).on("click", ()=> {
            $(selectors.class.classInfoContainer).removeClass("hidden");
        })
    });
}

function initForm() {
    initStudentForm();
    initTeacherForm();

    $("form").find("[type='submit']").each((e) => {
        e.preventDefault();
    }
    )
}

function initStudentForm() {
    $('#student-login-form').find("[type='submit']").on("click", () => {
        sessionStorage.setItem('studentLoggedIn', true);
    })
}

function initTeacherForm() {
    $('#teacher-login-form').find("[type='submit']").on("click", () => {
        sessionStorage.setItem('teacherLoggedIn', true);
    })
}

// $(".schedule.calendar").find(".days").on("click", (event) => {
//     $(event.target).toggleClass("active")
// })