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
/* product-page-buttons.liquid
{%- assign pre_order_date = metafields.pre_order.date -%}
{% if pre_order_date != blank %}
	<p data-custom-pre-date class="custom-pre-date {% unless variant_pre_order %}d-none-important{% endunless %}">
    	Estimated shipping date: {{ pre_order_date | date: "%a, %b %d, %Y" }}
	</p>
{% endif %}
*/
/* END OF "Toggle Pre Order Text Function" */

/* START OF "Size Guide" */
var data = {
  bottom: {
    regions: ['AU', 'US', 'EU', 'UK'],
    names: {
      AU: 'Australia / New Zealand',
      US: 'USA / Latam',
      EU: 'Europe / Japan',
      UK: 'United Kingdom'
    },
    sizes: {
      AU: [6, 8, 10, 12, 14, 16],
      US: [2, 4, 6, 8, 10, 12],
      EU: [34, 36, 38, 40, 42, 44],
      UK: [6, 8, 10, 12, 14, 16]
    },
    results: {
      AU6: 'XS', AU8: 'S', AU10: 'M', AU12: 'L', AU14: 'XL', AU16: 'XXL',
      US2: 'XS', US4: 'S', US6: 'M', US8: 'L', US10: 'XL', US12: 'XXL',
      EU34: 'XS', EU36: 'S', EU38: 'M', EU40: 'L', EU42: 'XL', EU4: 'XXL',
      UK6: 'XS', UK8: 'S', UK10: 'M', UK12: 'L', UK14: 'XL', UK16: 'XXL'
    }
  },
  top: {
    regions: ['AU', 'US', 'EU', 'UK', 'FR', 'CZ'],
    names: {
      AU: 'Australia / New Zealand',
      US: 'USA / Latam',
      EU: 'Europe / Japan',
      UK: 'United Kingdom',
      FR: 'France / Spain / Belgium',
      CZ: 'Czech Republic / Italy'
    },
    sizes: {
      AU: [8, 10, 12, 14, 16],
      US: [30, 32, 34, 36, 38],
      EU: [65, 70, 75, 80, 85],
      UK: [30, 32, 34, 36, 38],
      FR: [80, 85, 90, 95, 100],
      CZ: [0, 1, 2, 3, 4]
    },
    cups: {
      AU8: ['AA', 'A'],
      AU10: ['AA', 'A', 'B', 'C', 'D', 'DD'],
      AU12: ['A', 'B', 'C', 'D'],
      AU14: ['A', 'B', 'C', 'D'],
      AU16: ['AA', 'A', 'B', 'C'],
      US30: ['AA', 'A'],
      US32: ['AA', 'A', 'B', 'C', 'D', 'DD', 'DDD/E'],
      US34: ['A', 'B', 'C', 'D', 'DD'],
      US36: ['A', 'B', 'C', 'D', 'DD'],
      US38: ['A', 'B', 'C', 'D'],
      EU65: ['A', 'B'],
      EU70: ['A', 'B', 'C', 'D', 'E', 'F'],
      EU75: ['A', 'B', 'C', 'D', 'E'],
      EU80: ['A', 'B', 'C', 'D', 'E'],
      EU85: ['A', 'B', 'C', 'D'],
      UK30: ['A', 'B'],
      UK32: ['A', 'B', 'C', 'D', 'DD', 'E'],
      UK34: ['A', 'B', 'C', 'D', 'DD'],
      UK36: ['A', 'B', 'C', 'D', 'DD'],
      UK38: ['A', 'B', 'C', 'D'],
      FR80: ['A', 'B'],
      FR85: ['A', 'B', 'C', 'D', 'E', 'F'],
      FR90: ['A', 'B', 'C', 'D', 'E'],
      FR95: ['A', 'B', 'C', 'D', 'E'],
      FR100: ['A', 'B', 'C', 'D'],
      CZ0: ['A', 'B'],
      CZ1: ['A', 'B', 'C', 'D', 'E', 'F'],
      CZ2: ['A', 'B', 'C', 'D', 'E'],
      CZ3: ['A', 'B', 'C', 'D', 'E'],
      CZ4: ['A', 'B', 'C', 'D']
    },
    results: {
      AU8AA: 'XS', AU8A: 'XS',
      AU10AA: 'XS', AU10A: 'XS/S', AU10B: 'M', AU10C: 'M/L', AU10D: 'L', AU10DD: 'XL',
      AU12A: 'XS/S', AU12B: 'M', AU12C: 'L', AU12D: 'XL',
      AU14A: 'S/M', AU14B: 'L', AU14C: 'XL', AU14D: 'XXL',
      AU16AA: 'M', AU16A: 'L', AU16B: 'XL', AU16C: 'XXL',
      US30AA: 'XS', US30A: 'XS',
      US32AA: 'XS', US32A: 'XS', US32B: 'S', US32C: 'M', US32D: 'M/L', US32DD: 'L', US32DDDE: 'XL',
      US34A: 'XS', US34B: 'S', US34C: 'M', US34D: 'L', US34DD: 'XL',
      US36A: 'S', US36B: 'M', US36C: 'L', US36D: 'XL', US36DD: 'XXL',
      US38A: 'M', US38B: 'L', US38C: 'XL', US38D: 'XXL',
      UK30A: 'XS', UK30B: 'XS',
      UK32A: 'XS', UK32B: 'S', UK32C: 'M', UK32D: 'M/L', UK32DD: 'L', UK32E: 'XL',
      UK34A: 'XS', UK34B: 'S', UK34C: 'M', UK34D: 'L', UK34DD: 'XL',
      UK36A: 'S', UK36B: 'M', UK36C: 'L', UK36D: 'XL', UK36DD: 'XXL',
      UK38A: 'M', UK38B: 'L', UK38C: 'XL', UK38D: 'XXL',
      EU65A: 'XS', EU65B: 'XS',
      EU70A: 'XS', EU70B: 'S', EU70C: 'M', EU70D: 'M/L', EU70E: 'L', EU70F: 'XL',
      EU75A: 'XS', EU75B: 'S', EU75C: 'M', EU75D: 'L', EU75E: 'XL',
      EU80A: 'S', EU80B: 'M', EU80C: 'L', EU80D: 'XL', EU80E: 'XXL',
      EU85A: 'M', EU85B: 'L', EU85C: 'XL', EU85D: 'XXL',
      FR80A: 'XS', FR80B: 'XS',
      FR85A: 'XS', FR85B: 'S', FR85C: 'M', FR85D: 'M/L', FR85E: 'L', FR85F: 'XL',
      FR90A: 'XS', FR90B: 'S', FR90C: 'M', FR90D: 'L', FR90E: 'XL',
      FR95A: 'S', FR95B: 'M', FR95C: 'L', FR95D: 'XL', FR95E: 'XXL',
      FR100A: 'M', FR100B: 'L', FR100C: 'XL', FR100D: 'XXL',
      CZ0A: 'XS', CZ0B: 'XS',
      CZ1A: 'XS', CZ1B: 'S', CZ1C: 'M', CZ1D: 'M/L', CZ1E: 'L', CZ1F: 'XL',
      CZ2A: 'XS', CZ2B: 'S', CZ2C: 'M', CZ2D: 'L', CZ2E: 'XL',
      CZ3A: 'S', CZ3B: 'M', CZ3C: 'L', CZ3D: 'XL', CZ3E: 'XXL',
      CZ4A: 'M', CZ4B: 'L', CZ4C: 'XL', CZ4D: 'XXL',
    }
  }
};

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
      cups.empty('');
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
  var currentRegion = jQuery('#regions').find('.fit-option-line-active').text();
  var currentSize = jQuery('#sizes').find('.fit-option-line-active').text();
  var currentCup = jQuery('#cups').find('.fit-option-line-active').text();
  var attrToUse = model == 'top'
    ? currentRegion + currentSize + currentCup
    : currentRegion + currentSize;

  attrToUse = attrToUse.replace(/[^0-9a-zA-Z]+/, '');
  
  jQuery('#fit-result').text(data[model].results[attrToUse]);
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
};

/* END OF "Size Guide" */