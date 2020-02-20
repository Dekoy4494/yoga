window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

//Скрываем контент всех табов убирая класс Show и добавляя класс Hide

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
//начинаем скрывать инфо со второго таба, что бы изначально на странице показывался только первый таб, поэтому в скобках 1
    hideTabContent(1);


//функция с помощью которой показываем определенный таб
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }


//вешаем событие на панель табов
    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) { //если при клике мы попадаем на кнопку таба 
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) { // и если таргет соответствует порядковому номеру таба 
                    hideTabContent(0); // то мы скрываем абсолютно всю инфу на всех табах
                    showTabContent(i); // и показываем только ту, на который таб нажал пользователь
                    break; // и прерываем перебор
                }
            }
        }

    });
});