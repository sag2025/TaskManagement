const pool = require("../config/postgres");
const getUUID = require("../utils/getuuid");

class Task {
  constructor(user_id, title, description, due_date, status = "pending") {
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.due_date = due_date;
    this.status = status;
  }

  // =========================
  // CREATE TASK (SAVE)
  // =========================
  async save() {
    try {
      const id = getUUID();

      const query = `
        INSERT INTO tasks (
          id,
          user_id,
          title,
          description,
          due_date,
          status,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING *
      `;

      const values = [
        id,
        this.user_id,
        this.title,
        this.description,
        this.due_date,
        this.status,
      ];

      const result = await pool.query(query, values);

      return result.rows[0];
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // =========================
  // GET ALL TASKS (USER SPECIFIC)
  // =========================
  static async getAllTasks(user_id) {
    try {
      const query = `
        SELECT * FROM tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;

      const result = await pool.query(query, [user_id]);

      return result.rows;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // =========================
  // GET TASK BY ID (SECURE)
  // =========================
  static async getTaskById(task_id, user_id) {
    try {
      const query = `
        SELECT * FROM tasks
        WHERE id = $1 AND user_id = $2
      `;

      const result = await pool.query(query, [task_id, user_id]);

      if (result.rows.length === 0) return null;

      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // =========================
  // DELETE TASK (SECURE)
  // =========================
  static async deleteTaskById(task_id, user_id) {
    try {
      const query = `
        DELETE FROM tasks
        WHERE id = $1 AND user_id = $2
        RETURNING *
      `;

      const result = await pool.query(query, [task_id, user_id]);

      if (result.rows.length === 0) return null;

      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // =========================
  // UPDATE TASK (PARTIAL UPDATE)
  // =========================
  static async updateTaskById(task_id, user_id, fields) {
    try {
      const keys = Object.keys(fields);

      if (keys.length === 0) return null;

      const setQuery = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

      const values = Object.values(fields);

      const query = `
        UPDATE tasks
        SET ${setQuery}, updated_at = NOW()
        WHERE id = $${keys.length + 1}
        AND user_id = $${keys.length + 2}
        RETURNING *
      `;

      const result = await pool.query(query, [
        ...values,
        task_id,
        user_id,
      ]);

      if (result.rows.length === 0) return null;

      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Task;