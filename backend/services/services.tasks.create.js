const taskobj=require("../models/tasks");

async function createtask(body, userId) {
  try {
    const new_task = new taskobj(
      userId,
      body.title,
      body.description,
      body.due_date,
      body.status
    );

    const result = await new_task.save();

    return result;

  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = createtask;