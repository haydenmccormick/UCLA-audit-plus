// Fix issue of "not from" courses not being given class "draggable"
$("span.course").not(".draggable").addClass("draggable not");

var cl = [];
var counter = 0;
var subreqcounter = 0;
// Remove commas, preserve "&" etc.
$("tr > td.fromcourselist").each(function () {
    if ($(this)[0].previousSibling == null)
        subreqcounter++;
    $(this)[0].classList.add("subreq");
    $(this)[0].classList.add(subreqcounter);
    $(this)[0].innerHTML = $(this)[0].innerHTML.replace(/,/g, " ");
    $(this)[0].innerHTML = $(this)[0].innerHTML.replace(/> *&amp;/g, `><span class="course draggable and"> & </span>`);
    $(this)[0].innerHTML = $(this)[0].innerHTML.replace(/> *OR/g, `><span class="course draggable and"> OR </span>`);
    $(this)[0].innerHTML = $(this)[0].innerHTML.replace(/> *\(OR\)/g, `><span class="course draggable and"> (OR) </span>`);
    $(this)[0].innerHTML = $(this)[0].innerHTML.replace(/> *TO/g, `><span class="course draggable and to"> TO </span>`);
});

// Categorize
$(".fromcourselist.subreq").each(function () {
    var prev = "";
    var classes = [];
    var courses = $(".course.draggable", this);
    var ands = 0;
    var ops = [];
    courses.each(function (i) {
        $(this)[0].style.display = "inline-block";
        let pres = ($(this)[0].classList.contains("and") ?
            "op" : $(this)[0].attributes.department.nodeValue.replace(/[^A-Za-z]/g, ""));
        let next = (i == courses.length - 1 ||
            !courses.eq(i + 1)[0].classList.contains("and") ?
            "notop" : "op");
        if (pres != "op" && prev != "op" && next != "op") {
            $(this)[0].classList.add(pres);
            $(this)[0].classList.add("notop");
            if (!classes.includes(pres))
                classes.push(pres);
        }
        if (next == "op") {
            $(this)[0].classList.add(ands);
            $(this)[0].classList.add(pres);
            courses.eq(i + 1)[0].classList.add(ands);
            if (!ops.includes(ands))
                ops.push(ands);
        }
        if (prev == "op") {
            $(this)[0].classList.add(ands);
            $(this)[0].classList.add(pres);
            if (i != courses.length - 1 && next != "op") {
                ands++;
            }
        }
        if (pres == "op") {
            if (prev == courses.eq(i + 1)[0].attributes.department.nodeValue.replace(/[^A-Za-z]/g, "")) {
                $(this)[0].classList.add(prev);
            }
            else
                $(this)[0].classList.add("bigAnd");
        }
        prev = pres;
    });
    for (let i = 0; i < classes.length; i++) {
        $(".course.draggable.notop." + classes[i], this).wrapAll(`<div class="classblock"><div class="classitems"></div></div>`);
    }
    for (let i = 0; i < ops.length; i++) {
        classes = [];
        $(".course.draggable." + ops[i], this)
            .wrapAll(`<div class="classblock"></div>`)
            .each(function () {
                if (!$(this)[0].classList.contains("and")) {
                    let pres = $(this)[0].attributes.department.nodeValue.replace(/[^A-Za-z]/g, "");
                    if (!classes.includes(pres))
                        classes.push(pres);
                }
            });
        for (let j = 0; j < classes.length; j++) {
            $(".course.draggable." + i + "." + classes[j], this).wrapAll(`<div class="classitems"></div>`);
        }
        console.log("---------");
    }
});

// Create class blocks
$(".classitems").each(function () {
    $(".course", this).each(function () {
        if (!$(this)[0].classList.contains("and"))
            $(this)[0].textContent = $(this)[0].attributes.number.nodeValue;
    });
    $(this).wrap(`<div class=deptblock></div>`);
    $(this).before(`<h5 class="dept">` + $(this)[0].childNodes[0].attributes.department.nodeValue + `</h5>`);
});
$(".classitems2").each(function () {
    $(".course", this).each(function () {
        if (!$(this)[0].classList.contains("and"))
            $(this)[0].textContent = $(this)[0].attributes.department.nodeValue + " " + $(this)[0].attributes.number.nodeValue;
    });
});

$('.subreq').html(function (index, html) {
    return html.replace(/<td>             <\/td>/, '');
});

// Cleaning up
// $(".course.draggable.and.to").each(function () {
//     $(this)[0].nextSibling.textContent = $(this)[0].nextSibling.attributes.number.nodeValue.replace(/#/, '');
// })
// $(".course.draggable").each(function () {
//     $(this)[0].textContent = $(this)[0].textContent.replace(/\*/, '');
// })