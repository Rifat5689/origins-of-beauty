 const getPagination = (query) => {
  const limit = Number(query.limit) || 20;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * limit;

  return { limit, page, skip };
};
























export {getPagination} ; 