export enum Roles {
    Admin = 'Администратор',
    Staff = 'Кадры',
    Moderator = "Модератор",
    NormalUser = "Обычный пользователь",
    StudentUser = "Студент-пользователь",
    MilitaryUser = "Военный пользователь"  ,
    Operator = 'Оператор',
    Organizator = 'Организатор',
    Parent = 'Родитель'
}
export var roles = new Map<string, string>([
    ['Организатор', 'oraganizerRole'],
    ['Военный пользователь', 'militaryRole'],
    ['Родитель', 'parentRole'],
    ['Обычный пользователь', 'normalUser'],
    ['Администратор', 'adminRole'],
    ['Студент-пользователь', 'studentRole'],
    ['Модератор', 'moderatorRole'],
    ['Оператор', 'operatorRole'],
]);
