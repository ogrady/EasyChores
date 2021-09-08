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
    const options = persons.map(p => `<option value="${p.id}" ${true ? "selected" : ""}>${p.name}</option>`).join("\n");
    return `<select multiple="multiple" class="assignees-selector" name="assignees[]">${options}</select>`
}


function taskDialog(name, description, id, assignees, due) {
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
    $( "#tabs" ).tabs({
        active: 0
    });

        $("#open-task-list").on("click", ".open-task-card", e => {
        const $task = $(e.currentTarget);

        taskDialog($task.data("name"), $task.data("description"), $task.data("id"), $task.data("assignees"), $task.data("due"));
    })
    

    const templateTable = new BSTable("task-template-list",{
        onEdit: function() {}, 
        onBeforeDelete: function() {}, 
        onDelete: function() {}, 
        //onAdd: function() {},
        //$addButton: $('#new-row-button')
    });
    templateTable.init();

    const personTable = new BSTable("person-list",{
        onEdit: function() {}, 
        onBeforeDelete: function() {}, 
        onDelete: function() {}, 
        //onAdd: function() {},
        //$addButton: $('#new-row-button')
    });
    personTable.init();


    
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
    
});
