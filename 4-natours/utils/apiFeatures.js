class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1a filtering ?duration=5&page=2
    const queryObj = { ...this.queryString }; //creats hard copy of req.query
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    //1b adv filtering duration[gte]=5
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte)|(gt)|(lte)|(lt)\b/g,
      match => `$${match}`
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    //2.sorting ?sort=price ?sort=-price,ratingsAverage
    if (this.queryString.sort) {
      //multiple sort opt
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    //3. Field Limiting ?fields=name,duration,difficulty,price
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    //4. pagination  ?page=2&limit=10
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
