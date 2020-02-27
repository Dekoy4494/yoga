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


    //TIMER
    //устанавливаем необходимую дату окончания
    let deadline = '2030-02-22';
    // вычитаем от 1 янв 1970г  сколько времени прошло от настоящего времени, потом переводим в нужные единицы(часы, минуты, секунды)
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        // days = Math.floor((t/1000/60/60) % 24) if u need days
        // возвращаем полученные данные в форме объекта
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //получаем из верстки поля в которые будем выводить данные и подставляем данные с объекта,
    //записываем интервал 1 секунду для динамического изменения времени на таймере,
    //если значение даты уже прошло вставляем в поля нули
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            if (hours.textContent.length < 2) { //условие для того что бы вывести нули перед числами, по формату
                hours.textContent = '0' + t.hours;
            }
            minutes.textContent = t.minutes;
            if (minutes.textContent.length < 2) {
                minutes.textContent = '0' + t.minutes;
            }
            seconds.textContent = t.seconds;
            if (seconds.textContent.length < 2) {
                seconds.textContent = '0' + t.seconds;
            }


            if (t.total <= 0) {
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                clearInterval(timeInterval);
            }
        }

    }

    setClock('timer', deadline);

    //modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        tabBtn = document.querySelectorAll('.description-btn');


    for (let i = 0; i < tabBtn.length; i++) {
        tabBtn[i].addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';

        });
    }



    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    //Form

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        //contactForm
        contactForm = document.querySelector('#form'),
        contactInput = contactForm.querySelector('input');
        

    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            
            if (request.readyState < 4 ) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

            for (let i = 0; i < input.length; i++) {
                contactInput[i].value = '';
            }
    });

    contactForm.addEventListener('submit', function (event) {
       event.preventDefault();
       contactForm.appendChild(statusMessage);
       
       let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(contactForm);
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            
            if (request.readyState < 4 ) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
    });
});