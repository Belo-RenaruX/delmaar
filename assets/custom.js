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
