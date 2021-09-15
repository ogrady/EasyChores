function ajaxPatch(url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", url);
    
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    /*
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};
    */
    
    xhr.send(JSON.stringify(data));
}

function assigneeSelector(persons, selected) {
    const options = persons.map(p => `<option value="${p.id}" ${selected.includes(p.id) ? "selected" : ""}>${p.name}</option>`).join("\n");
    return `<select multiple="multiple" class="assignees-selector" name="assignees[]">${options}</select>`
}


function taskDialog(name, description, id, assignees, due) {
    console.log(assignees)
    $.get("/rest/person/all", {}, persons => {
        const modal = $(`<div class="task-modal" <p>${description}</p>${assigneeSelector(persons, assignees)}</div>`);
        modal.dialog({
            modal: true,
            title: name,
            width: $(window).width() - 30,
            height: $(window).height() - 30,
            buttons: [
                {
                    text: "Done",
                    icon: "ui-icon-check",
                    //click: e => modal.dialog("close")
                   click: e => ajaxPatch("rest/task/done", { "task-id": id })
                }
            ]
        });
        $(".assignees-selector").multiSelect({
            afterSelect: elements => elements.map(element => $.post("/rest/task/assign", {"task-id": id, "person-id": element})),
            afterDeselect: elements => elements.map(element => $.ajax({type: "DELETE", url: "/rest/task/unassign", data: {"task-id": id, "person-id": element}}))
        });
    });


}


$(document).ready(() => {
    // tabify and set active tab
    $( "#tabs" ).tabs({
        active: 0
    });

    // set handler for task detail view
    $("#open-task-list").on("click", ".open-task-card", e => {
        const $task = $(e.currentTarget);
        const ids = $task.data("assignee_ids") ? String($task.data("assignee_ids")).split(",").map(s => parseInt(s)) : []  // if only one ID is present, type will be number, else it will be string → cast to string to be safe
        taskDialog($task.data("name"), $task.data("description"), $task.data("id"), ids, $task.data("due"));
    })
    
    // tablify templates
    const templateTable = new BSTable("task-template-list",{
        onEdit: function() {}, 
        onBeforeDelete: function() {}, 
        onDelete: function() {}, 
        //onAdd: function() {},
        //$addButton: $('#new-row-button')
    });
    templateTable.init();

    // tabilify persons
    const personTable = new BSTable("person-list",{
        onEdit: function() {}, 
        onBeforeDelete: function() {}, 
        onDelete: function() {}, 
        //onAdd: function() {},
        //$addButton: $('#new-row-button')
    });
    personTable.init();

    // add autocomplete to task creation dialog    
    $.get("/rest/task/tasknames", {}, data => {
        const tasks = Object.assign({}, ...data.map(([id, name]) => ({[name]: id})));

        $("#task-form #name").autocomplete({

            source: data.map(([id, name]) => name),
            change: (event, ui) => {
                if(ui.item !== null) {
                    const id = tasks[ui.item.label];
                    if(id !== undefined) {
                        $("#task-form #template-id").val(id);
                    } else {
                        $("#task-form #name").val("");
                    }                    
                }
            }
        });
    });

    $("#test-button").click(e => {
        console.log("asdasd")
        $.post("/rest/task/schedule", {"template-id": 1, "cron": "* * * * *"}) // at every minute
    });
    
});
