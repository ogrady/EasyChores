import * as cron from "node-cron";
import * as taskrepo from "./database/repositories/taskrepository";

export function setUpTaskSchedule(templateId: number, cronString: string, taskRepository: taskrepo.TaskRepository) {
    console.log(`scheduling template ${templateId} for ${cronString}`)
    cron.schedule(cronString, () => taskRepository.createTaskFromTemplate(templateId));
}