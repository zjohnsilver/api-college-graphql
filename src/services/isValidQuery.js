export default (query) => {
  return !query.split(' ').includes('query')
}
