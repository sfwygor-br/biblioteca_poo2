class MySqlRepository {
  constructor(pool, table, primaryKey = 'id') {
    this.pool = pool;
    this.table = table;
    this.primaryKey = primaryKey;
  }

  async list() {
    const [rows] = await this.pool.query(`SELECT * FROM ${this.table}`);
    return rows.map((row) => this._normalizeRow(row));
  }

  async findById(id) {
    const [rows] = await this.pool.query(`SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ?`, [id]);
    if (!rows.length) return null;
    return this._normalizeRow(rows[0]);
  }

  async create(data) {
    const insertData = { ...data };
    delete insertData.id;
    const columns = Object.keys(insertData);
    if (!columns.length) return null;
    const placeholders = columns.map(() => '?').join(', ');
    const sql = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${placeholders})`;
    const values = columns.map((column) => insertData[column]);
    const [result] = await this.pool.execute(sql, values);
    return this.findById(result.insertId);
  }

  async update(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) return null;
    const assignments = fields.map((field) => `${field} = ?`).join(', ');
    const sql = `UPDATE ${this.table} SET ${assignments} WHERE ${this.primaryKey} = ?`;
    const values = [...fields.map((field) => data[field]), id];
    const [result] = await this.pool.execute(sql, values);
    if (!result.affectedRows) return null;
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await this.pool.execute(`DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`, [id]);
    return result.affectedRows > 0;
  }

  _normalizeRow(row) {
    const normalized = { ...row };
    if (this.primaryKey !== 'id' && row[this.primaryKey] !== undefined) {
      normalized.id = row[this.primaryKey];
      delete normalized[this.primaryKey];
    }
    return normalized;
  }
}

module.exports = MySqlRepository;
