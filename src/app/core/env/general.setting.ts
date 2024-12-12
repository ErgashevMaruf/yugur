/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
export const generalSetting = {
    version: '1.7.4.0',
    authKey: 'authEHospital',
    langKey: 'langEHospital',
    defaultLang: 'ru',
    imgPhotoUrl: '/assets/img/photo.jpg',

    ReceptionTypeRu: [
        'Запись по талону',
        'Живая очередь',
        'Отпуск',
        'Больничный',
        'Командировка',
        'Выходной',
        'Нет приема',
    ],
    ReceptionTypeUzLat: [
        "Ta'lon orqali",
        'Jonli navbat',
        "Ta'til",
        "Kasallik bo'yicha ta'til",
        'Ish safari',
        'Dam olish',
        'Qabul belgilanmagan',
    ],
    ReceptionTypeUzCyr: [
        'Талон бўйича',
        'Жонли навбат',
        'Таътил',
        'Касаллик бўйича таътил',
        'Иш сафари',
        'Дам олиш',
        'Қабул белгиланмаган',
    ],
    calendarRu: {
        firstDayOfWeek: 0,
        dayNames: [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Субота',
        ],
        dayNamesShort: ['Вс', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Су'],
        dayNamesMin: ['Вс', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Су'],
        monthNames: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
        monthNamesShort: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
        today: 'Сегодня',
        clear: 'Очистить',
    },
    calendarEn: {
        firstDayOfWeek: 0,
        dayNames: [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Субота',
        ],
        dayNamesShort: ['Вс', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Су'],
        dayNamesMin: ['Вс', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Су'],
        monthNames: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
        monthNamesShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Avg',
            'Sep',
            'Оkt',
            'Nov',
            'Dec',
        ],
        today: 'Сегодня',
        clear: 'Очистить',
    },
    fullCalendarRu: {
        header: {
            left: 'Назад,Вперед',
            center: 'Календарное представление данных',
            right: 'месяц,неделя,день',
        },
    },
    calendarUzLat: {
        firstDayOfWeek: 0,
        dayNames: [
            'Yakshanba',
            'Dushanba',
            'Sechanba',
            'Chorshanba',
            'Payshanba',
            'Juma',
            'Shanba',
        ],
        dayNamesShort: ['Yak', 'Du', 'Se', 'Ch', 'Pay', 'Ju', 'Sh'],
        dayNamesMin: ['Yak', 'Du', 'Se', 'Ch', 'Pay', 'Ju', 'Sh'],
        monthNames: [
            'Yanvar',
            'Fevral',
            'Mart',
            'Aprel',
            'May',
            'Iyun',
            'Iyul',
            'Avgust',
            'Senyabr',
            'Oktabr',
            'Noyabr',
            'Dekabr',
        ],
        monthNamesShort: [
            'Yan',
            'Fev',
            'Mar',
            'Apr',
            'May',
            'Iyn',
            'Iyl',
            'Avg',
            'Sen',
            'Okt',
            'Noy',
            'Dek',
        ],
        today: 'Bugun',
        clear: 'Tozalash',
    },
    fullCalendarUzLat: {
        headerToolbar: {
            left: 'Ortga,Oldinga bugun',
            center: "Ma'lumotlaring kalendar ko'rinishi",
            right: 'oy,hafta,kun',
        },
    },
    calendarUzCyr: {
        firstDayOfWeek: 0,
        dayNames: [
            'Якшанба',
            'Душанба',
            'Сешанба',
            'Чоршанба',
            'Пайшанба',
            'Жума',
            'Шанба',
        ],
        dayNamesShort: ['Як', 'Ду', 'Се', 'Чор', 'Пай', 'Жу', 'Ша'],
        dayNamesMin: ['Вс', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Су'],
        monthNames: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
        monthNamesShort: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
        today: 'Бугун',
        clear: 'Тозалаш',
    },
    fullCalendarUzCyr: {
        header: {
            left: 'Ортга,Олдинга',
            center: 'Маълумотларинг календарь кўриниши',
            right: 'ой,ҳафта,кун',
        },
    },
    tvRefreshMinut: 30, // 20 sekund
};