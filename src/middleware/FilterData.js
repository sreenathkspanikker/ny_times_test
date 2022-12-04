

export const filterData = (filter, arr) => {
    const value = arr.filter(function (item) {
        return item.section.toLowerCase().match(filter);
      });
      return {
          value,
          message: value.length <= 0 ? 'No data found 1'  : ''
      };
}