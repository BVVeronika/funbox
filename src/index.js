import 'normalize.css';
import './index.scss';
import 'jquery';

const name = 'webpack2-pug-scss-boilerplate';

$(document).ready(function() {
  var $btnBuy = $('.btn-buy');
  var $products = $('.product-item:not(.ended)');

  if(!$products.length) {
    return;
  }

  var $productsCard = $products.find('.product-card');

  $productsCard.on('click', function() {
    var $this = $(this);
    var $parentCard = $this.parent();

    $parentCard.toggleClass('selected');
    $parentCard.find('.product-card-pretitle').removeClass('active');
  });

  $productsCard.on('mouseover', function() {
    var $this = $(this);
    $this.on('mouseout', mouseoutHandler);
  });

  $btnBuy.on('click', function(){
    var $this = $(this),
        $parentCard = $this.closest('.product-item');

    $parentCard.addClass('selected');
    $parentCard.find('.product-card-pretitle').addClass('active');
  });

  $btnBuy.on('mouseover', function() {
    var $this = $(this),
        $parentCard = $this.closest('.product-item'),
        $card = $parentCard.find('.product-card');

    $card.addClass('active');
    $this.on('mouseout', mouseoutHandlerBtn($card));
  });

  function mouseoutHandler() {
    var $this = $(this);

    if ($this.parent().hasClass('selected')) {
      $this.find('.product-card-pretitle').addClass('active');
    }

    $this.off('mouseout', mouseoutHandler);
  }

  function mouseoutHandlerBtn($card) {
    return function() {
      $card.removeClass('active');
    }
  }
});
