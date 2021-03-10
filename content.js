var class2 = document.getElementsByTagName("tr");
var cl = [];
var counter = 0;
var subreqcounter = 0;
// Find td wrappers, remove commas
for (let i = 0; i < class2.length; i++) {
    if (class2[i].outerHTML.startsWith("<tr><td><span")) {
        if (class2[i].previousSibling == null)
            subreqcounter++;
        class2[i].classList.add("subreq");
        class2[i].classList.add(subreqcounter);
        class2[i].innerHTML = class2[i].innerHTML.replace(/,/g, " ");
        class2[i].innerHTML = class2[i].innerHTML.replace(/ &amp; /g, `<span class="course draggable and">&</span>`);
        class2[i].innerHTML = class2[i].innerHTML.replace(/ or; /g, `<span class="course draggable and">or</span>`);
    }
}
var prev = "";
var classes = document.getElementsByClassName("course draggable");
// Find start and end, format
for (let i = 0; i < classes.length; i++) {
    classes[i].style.display = "inline-block";
    let pres = (classes[i].textContent != '&' && classes[i].textContent != 'or') ? classes[i].attributes.department.nodeValue : "op"
    if ((classes[i].previousSibling == null || classes[i].previousSibling.data == "  ") && (prev == "" || pres != prev)) {
        console.log(classes[i]);
        counter++;
        classes[i].classList.add("first");
        classes[i].innerText = classes[i].attributes.number.nodeValue;
    }
    if (pres == prev)
        classes[i].innerText = classes[i].attributes.number.nodeValue;
    if (classes[i].nextSibling == null || classes[i].nextSibling.data == "  ") {
        classes[i].classList.add("last");
        prev = "";
    }
    else
        prev = pres
    classes[i].classList.add(counter);
}

// Create class blocks
for (let i = 1; i <= counter; i++) {
    $(".course." + i).wrapAll(`<div class="classblock"><div class="classitems"></div></div>`);
}
$(".classitems").each(function () {
    $(this).before(`<h5 class="dept">` + $(this)[0].childNodes[0].attributes.department.nodeValue + `</h5>`);
});