$(document).on('click', 'label li', function () {
  let input = $(this).closest('label').find('input');
  input.val($(this).data('id'));
  clear();
});

$(document).on('keyup', '.find', function (e) {
  let val = $(this).val().trim();
  let element = $(this).closest('label').find('ul');

  val = val.replace(/\s+/g, '');

  if (val.length >= 3) {
    setTimeout(() => {
      $.ajax({
        type: 'GET',
        url: `/airports?autocomplete=${val}`,
        success: function (result) {
          if (result) {
            clear();
            renderAirports(result, element);
          }
        },
      });
    }, 500);
  }
  e.stopPropagation();
});

$(document).on('click', '.submit', function () {
  if (!validate()) {
    alert('WARNING [ validation ]: All inputs must be set !');
  } else {
    loading();
    let form = $('.find input').serializeArray();

    $.ajax({
      type: 'POST',
      url: '/flights',
      data: form,
      success: function (result) {
        if (result) {
          clear();
          renderFlights(result);
        }
      },
    });
  }
});

function clear() {
  $('.panel ul').html('');
  $('.list table tbody').html('');
}

function loading() {
  $('.list table tbody').html('Loading . . .');
}

function renderFlights(list) {
  let element = $('.list table tbody');
  if (list.length > 0) {
    list.forEach((item) => {
      element.append(`<tr>
                            <td>${item.id}</td>
                            <td>${item.numberOfBookableSeats}</td>
                            <td>${item.oneWay}</td>
                            <td>${item.price.total} ${item.price.currency}</td>
                          </tr>`);
    });
  } else {
    element.append(`No Flights`);
  }
}

function renderAirports(list, element) {
  if (list.length > 0) {
    list.forEach((item) => {
      element.append(
        `<li data-id="${item.iataCode}">${item.name} - <span>${item.address.cityName}</span> [ ${item.iataCode} ]</li>`,
      );
    });
  } else {
    element.append(`No Airports`);
  }
}

function validate() {
  let inputs = $('.find input').serializeArray();
  let response = true;
  inputs.forEach((input) => {
    if (input.value == '') {
      response = false;
    }
  });
  return response;
}
