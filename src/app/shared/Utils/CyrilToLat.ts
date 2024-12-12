var letters = {
    Ш: 'SH',
    Ч: 'CH',
    Ё: 'YO',
    Ю: 'YU',
    Я: 'YA',
    Ў: 'O`',
    Ғ: 'G`',
    А: 'A',
    Б: 'B',
    Д: 'D',
    Е: 'E',
    Ф: 'F',
    Г: 'G',
    Ҳ: 'H',
    И: 'I',
    Ж: 'J',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Қ: 'Q',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    В: 'V',
    Х: 'X',
    Й: 'Y',
    З: 'Z',
    Ы: 'I',
    Ь: '',
    Ъ: '`',
    Ц: 'TS',
    Э: 'E',
};
export default function translateToLat(data: string) {
    if (data == '') return data;

    var text = data.toUpperCase();
    if (text[0] == 'Е') text = text.replace('Е', 'YE');
    if (text.indexOf('Е') + 1)
        for (var counter = 1; counter < text.length - 1; counter++)
            if (
                text[counter] == 'Е' &&
                !text[counter - 1].match(/[^УЕАОЭЯИЮЁЫ \-]/g)
            )
                text = str_replace(text, 'Е', 'YE', counter);

    if (text[0] == 'Ц') text = text.replace('Ц', 'S');
    if (text.indexOf('Ц') + 1)
        for (var counter = 1; counter < text.length - 1; counter++)
            if (
                text[counter] == 'Ц' &&
                !text[counter - 1].match(/[^БВГДЖЗЙКЛМНПРСТФХЦЧШЩ \-]/g)
            )
                text = str_replace(text, 'Ц', 'S', counter);

    if (text) {
        Object.entries(letters).forEach(([key, val]) => {
            text = text.replace(RegExp(key, 'g'), val);
        });
        text = text.toUpperCase();
    }
    return text;
}
function str_replace(str, sub, rep, index) {
    str = str.split('');
    str.splice(index, sub.length, rep);
    return str.join('');
}
