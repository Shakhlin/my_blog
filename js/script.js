$(function () {
	//script for popups
	$('.popup-btn').click(function () {
		$('div.'+ $(this).attr("rel")).fadeIn(500);
		$("body").append("<div id='overlay'></div>");
		$('#overlay').show().css({'filter' : 'alpha(opacity=80)'});
		return false;
	});

	$('button.header__icon-phone').click(function () {
		$('div.'+ $(this).attr("rel")).fadeIn(500);
		$("body").append("<div id='overlay'></div>");
		$('#overlay').show().css({'filter' : 'alpha(opacity=80)'});
		return false;
	});

	$('a.popup__close').click(function () {
		$(this).parent().fadeOut(100);
		$('#overlay').remove('#overlay');
		return false;
	});

	//Отправка формы
	$('form').submit(function() {
    var $form = $(this);

    // чистим ошибки
    $form.find('.error').remove();

    // проверяем поле с именем пользователя
    if ($form.find('input[name=name]').val() === '') {
        // добавляем текст ошибки
        $form.find('input[name=name]')
          .before('<div class="error">Введите имя</div>');
        // прерываем дальнейшую обработку
        return false;
    }
  	if ($form.find('input[name=email]').val() === '') {
	    $form.find('input[name=email]').before('<div class="error">Введите email</div>');
	    return false;
    }

    if ($form.find('input[name=tel]').val() === '') {
    	$form.find('input[name=tel]').before('<div class="error">Введите номер телефона</div>');
    	return false;
    }

    // всё хорошо – отправляем запрос на сервер
    $.post($form.attr('action'), 
    	$form.serialize(),
    	function () {
  			$(".header__popup" ).html("Запрос успешно отправлен!");
	  		function mask () {
	  			$(".header__popup" ).hide();
				$('#overlay').hide();
	  		}
	  		setTimeout(mask, 2000);
  	});

    // отключаем действие по умолчанию
    return false;
  	});

    //Закрытие элемента по клику за пределами его области
    $(document).mouseup(function (e){ // событие клика по веб-документу
      var div = $(".header__popup"); // тут указываем ID элемента
      if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.hide(); // скрываем его
        $('#overlay').remove('#overlay');//убираем блок наложения
        return false;
      }
    });
});

//маска на телефонный номер
$(function(){
  //2. Получить элемент, к которому необходимо добавить маску
  $(".tel").mask("8(999) 999-9999");
});

//летающие теги
$(window).on("load", function() {
	$('.developer__floatingTags').children().addClass('active');
});

//слайдер
new Swiper('.slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 25
    }
  },
  loop: true,
  wrapperClass: 'slider__list',
  slideClass: 'slider__item',
  pagination: {
    el: '.slider__pagination',
    type: 'bullets',
    bulletClass: 'paginator__item',
    bulletActiveClass: 'paginator__item-active',
    clickable: true,
  },
  navigation: {
    nextEl: '.slider__button-next',
    prevEl: '.slider__button-prev',
  },
});

//якорь
$(function(f) {
    var element = f('.back-top');
    f(window).scroll(function(){
        element['fade'+ (f(this).scrollTop() > 200 ? 'In': 'Out')](500);         
    });
});


//гамбургер меню
$(function(){
  //затемнение
  $('.menu__span').click(function () {
    if( $('#menu__toggle:checked ~ .menu__box').css("visibility") != "visible" && $('.menu__box').css("left") != "0")  {
      $('.menu__box').css({"visibility":"visible", "left":"0"});
      // $("body").append("<div id='overlay'></div>");
      // $('#overlay').show().css({'opacity' : '0.3'});
    } else {
      // $('#overlay').remove('#overlay');//убираем блок наложения
      $('.menu__box').css({"visibility":"hidden", "left":"-100%"});
    }
  });
});

//Закрытие элемента по клику за пределами его области
 $(document).mouseup(function (e){ // событие клика по веб-документу
   var div = $(".menu__box"); // тут указываем ID элемента
   var btn = $("#menu__toggle:checked ~ .menu__btn > span");
   if (!div.is(e.target) // если клик был не по нашему блоку
       && div.has(e.target).length === 0 && !btn.is(e.target)) { // и не по его дочерним элементам
        //  $('#overlay').remove('#overlay');//убираем блок наложения
         $('.menu__box').css({"visibility":"hidden", "left":"-100%"});
		 $('#menu__toggle').prop('checked', false);//убираем иконку гамбургер-меню в исходное состояние
   }
 });

 $(function() {
  $('.menu__item').click(function() {
    // $('#overlay').remove('#overlay');//убираем блок наложения
    $('.menu__box').css({"visibility":"hidden", "left":"-100%"}); //закрываем меню
	$('#menu__toggle').prop('checked', false);
  });
});