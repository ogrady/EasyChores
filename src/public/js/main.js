function taskDialog(name, description, id, assignees, due) {
    const modal = $(`<div class="task-modal" <p>${description}</p></div>`);
    modal.dialog({
        modal: true,
        title: name,
        buttons: [
            {
                text: "okay",
                icon: "ui-icon-check",
                click: e => modal.dialog("close")
            }
        ]
        /*{
          Ok: () => modal.dialog( "close" ),
          Done: () => modal.dialog( "close" )
        }*/
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
