$(document).ready(() => {
    $( "#tabs" ).tabs({
        active: 0
    });

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
