(function(){
  const originalAddClassMethod = jQuery.fn.addClass;
  const originalRemoveClassMethod = jQuery.fn.removeClass;
  const originalTextChangeMethod = jQuery.fn.text;

  jQuery.fn.addClass = function() {
    const result = originalAddClassMethod.apply( this, arguments );
    jQuery(this).trigger('cssClassChanged');
    return result;
  };
  jQuery.fn.removeClass = function() {
    const result = originalRemoveClassMethod.apply( this, arguments );
    jQuery(this).trigger('cssClassChanged');
    return result;
  };
  jQuery.fn.text = function() {
    const result = originalTextChangeMethod.apply( this, arguments );
    jQuery(this).trigger('textChanged');
    return result;
  };
})();

/* START OF "Remove Pre Selected Variants" */
(function(){
  var button = jQuery('[data-button-status="select"]')[0];
  if(button) jQuery('[data-label-value]').html('');
})();

jQuery('[data-label-value]').on('textChanged', function(e) {
  jQuery('[data-disable-auto-select]').each(function(e) {
    jQuery(this).prev().find('[data-label-value]').html('');
  });
});
/* END OF "Remove Pre Selected Variants" */

/* START OF "Toggle Pre Order Text Function" */
jQuery('.label--pre-order').on('cssClassChanged', function(e){
  var validation = jQuery(this).hasClass('d-none-important');
  var element = jQuery('[data-custom-pre-date]');
  if(validation) {
    element.addClass('d-none-important');
  }
  else {
    element.removeClass('d-none-important');
  }
});
/* END OF "Toggle Pre Order Text Function" */

/* START OF "Size Guide" */
(function(){
  var main = jQuery('#main-selector');
  var firstOption = main.find('button').first();

  main.children().each(function() {
    var element = jQuery(this);
    element.on('click', function(e) {
      refresh(element);
    });
  });

  refresh(firstOption);
})();

function refresh(element) {
  var value = element.data('value');
  var cups = jQuery('#cups');
  var cupsContainer = cups.parent();

  jQuery('.fit-option-fade-active').removeClass('fit-option-fade-active');
  element.addClass('fit-option-fade-active');

  switch(value){
    case 'top':
      cupsContainer.removeClass('fit-hide');
      var selectedRegion = fill(value, 'regions');
      var selectedSizes = fill(value, 'sizes', selectedRegion);
      fill(value, 'cups', selectedRegion + selectedSizes);
      result(value);
      break;
    case 'bottom':  
      cups.empty();
      cupsContainer.addClass('fit-hide');
      var selectedRegion = fill(value, 'regions');
      fill(value, 'sizes', selectedRegion);
      result(value);
      break;
  }
}

function fill(model, selector, prevValue) {
  var defaultValue;
  var elements = (prevValue)
    ? data[model][selector][prevValue]
    : data[model][selector];
  var container = jQuery('#' + selector);
 
  container.empty();

  for(var i = 0; i < elements.length; i++) {
    var options = {
      class: 'fit-option fit-option-line fit-option-label',
      text: elements[i],
      on: {
        click: function(e) {
          e.preventDefault();
          option(this, model, container);
        }
      }
    };

    if(i == 0) {
      options.class = options.class + ' fit-option-line-active fit-option-bold';
      defaultValue = elements[i];
    } 

    container.append(jQuery('<button/>', options));
  }

  if(selector == 'regions'){
    var nameToUse = data[model].names[defaultValue];
    jQuery('#names').text(nameToUse);
  }

  return defaultValue;
};

function result(model) {
  var resultContainer = jQuery('#fit-result');
  var measurementContainer = jQuery('#fit-measurement');
  var currentRegion = jQuery('#regions').find('.fit-option-line-active').text();
  var currentSize = jQuery('#sizes').find('.fit-option-line-active').text();
  var currentCup = jQuery('#cups').find('.fit-option-line-active').text();
  var attrToUse = model == 'top'
    ? currentRegion + currentSize + currentCup
    : currentRegion + currentSize;

  attrToUse = attrToUse.replace(/[^0-9a-zA-Z]+/, '');
  var resultToUse = data[model].results[attrToUse];
  var size = resultToUse.size;
  var measurements = resultToUse.measurements
  
  resultContainer.text(size);
  measurementContainer.empty();
  
  if(measurements.length > 0){
    measurementContainer.removeClass('fit-hide');

    for(var i = 0; i < measurements.length; i++) {
      var measurement = {
        class: 'fit-result-label',
        text: measurements[i]
      };

      measurementContainer.append(jQuery('<span></span>', measurement));
    }
  }
  else measurementContainer.addClass('fit-hide');
};

function option(element, model, container){
  element = jQuery(element);

  var valueToUse = element.text();
  var nameToUse = data[model].names[valueToUse];

  container.find('.fit-option-line-active').removeClass('fit-option-line-active fit-option-bold');
  element.addClass('fit-option-line-active fit-option-bold');

  switch(container.attr('id')) {
    case 'regions':
      jQuery('#names').text(nameToUse);
      fill(model, 'sizes', valueToUse);
      result(model);
      break;
    case 'sizes':
      if(model == 'top'){
        var currentRegion = jQuery('#regions').find('.fit-option-line-active').text();
        fill(model, 'cups', currentRegion + valueToUse);
        result(model);
      }
      else result(model);
      break;
    case 'cups':
      result(model);
      break;
  }
}
/* END OF "Size Guide" */