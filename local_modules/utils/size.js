export default obj => obj ? (obj.length !== undefined ? obj.length : Object.keys(obj).length) : 0;