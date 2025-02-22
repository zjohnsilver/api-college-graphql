import { Pool as PgPool } from 'pg'
import env from '@/config/env'

class ConnectionDB {
  constructor (connectionInfo) {
    this.pool = this.connect(connectionInfo)
  }

  connect (connectionInfo) {
    if (!this.pool) {
      this.pool = new PgPool(connectionInfo)
    }
    return this.pool
  }

  getPool () {
    return this.pool
  }
}

export default new ConnectionDB(env.db)
