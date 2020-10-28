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

  const showOnlyHaveOfferField = (data) => {
    let withOffersAds = [];
    let filteredData = [];
    data.forEach(function (item) {
      if (item.offer) {
        withOffersAds.push(item);
      }
    });

    filteredData = withOffersAds.slice();

    return filteredData;
  };

  const filterData = function (data) {
    return data.filter(function (item) {
      return filterElements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  window.filter = {
    showOnlyHaveOfferField: showOnlyHaveOfferField,
    data: filterData
  }
})();
