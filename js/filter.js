'use strict';
(function () {
  const priceMap = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  const filterElements = Array.from(document.querySelector('.map__filters').children);

  const filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },

    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },

    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },

    'housing-features': function (data, filter) {
      let checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

      return checkListElements.every(function (checkbox) {
        return data.offer.features.some(function (feature) {
          return feature === checkbox.value;
        });
      });
    }
  };

  const filterData = function(data) {
    let ads = [];
    let i = 0;
    let result;

    while (i < data.length && ads.length < window.pins.MAX_PINS) {
      result = filterElements.every(function (filter) { return (filter.value === 'any') ? true : filterRules[filter.id](data[i], filter); });
      if (result) {
        ads.push(data[i]);
      }
      i++;
    };

    return ads;
  };

  window.filter = {
    data: filterData
  }
})();
