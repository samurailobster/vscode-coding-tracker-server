//@ts-check

const STORAGE_NAME = 'coding-tracker-i18n';
const DEFAULT_LANG = 'en';
let englishDirectoryIsEmpty = true;
let languages = {
	'zh-cn': require('./zh-cn'),
	'zh-tw': require('./zh-tw'),
	'ru': require('./ru'),
	'en': require('./en')
}, language = '';

updateUI();
// Init Language Selector
let $items = $('#selectI18N').find('.dropdown-item');
updateLanguageSelectorActive();
$items.off('click').on('click', function() {
	setLanguage($(this).attr('data-lang'));
	updateLanguageSelectorActive()
});

function updateLanguageSelectorActive() { 
	$items.removeClass('active');
	$items.filter(`[data-lang="${language}"]`).addClass('active');
}

function updateUI() {
	language = localStorage.getItem(STORAGE_NAME) || DEFAULT_LANG;
	if (!(language in languages))
		language = DEFAULT_LANG;	

	let data = languages[language];
	$('[data-i18n]').map((i, item) => {
		let $item = $(item), name = $item.data('i18n');
		if(englishDirectoryIsEmpty)
			languages.en[name] = $item.text();
		$item.text(data[name]);			
	});

	englishDirectoryIsEmpty = false;
}

function setLanguage(lang) {
	if (!(lang in languages))
		lang = DEFAULT_LANG;	
	localStorage.setItem(STORAGE_NAME, lang);
	updateUI();
}

function get(key) {
	return languages[language][key];
}

module.exports = {
	update: updateUI,
	setLanguage,
	get,
	get language() { return language }
};