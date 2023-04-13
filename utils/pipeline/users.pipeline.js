exports.searchUserPipeline = (search) => {
    let $match;

    if (search) {
        const searchKeys = Object.keys(search);
        if (searchKeys.length > 0) {
          searchKeys.forEach((key) => {
            if (typeof search[key] === 'string') {
              const regExp = new RegExp(`^${search[key]}`, 'i');
              $match[key] = regExp;
            } else if (Array.isArray(search[key])) {
              $match[key] = { $in: search[key] };
            } else {
              $match[key] = search[key];
            }
          });
        }
      }
    
    return [
        $match,
    ]
}