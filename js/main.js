"use strict";
const DEBUG = true;

DEBUG && console.log("INIT");

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
    toggleClosedClass: "closed"
}

$(document).ready(() => {
    initHeader();
    initDropdowns();
});

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

// $(".schedule.calendar").find(".days").on("click", (event) => {
//     $(event.target).toggleClass("active")
// })