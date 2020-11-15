export const getOne = async (clientPool, query, params) => {
  return await clientPool.query(query, params)
    .then(({ rows }) => {
      return rows[0] || {}
    })
    .catch(e => {
      throw new Error(e.message)
    })
}

export const getMultiple = async (clientPool, query, params) => {
  return await clientPool.query(query, params)
    .then(({ rows }) => {
      return rows || []
    })
    .catch(e => {
      throw new Error(e.message)
    })
}
