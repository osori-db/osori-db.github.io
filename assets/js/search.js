console.log(document.getElementById('is-search-enabled'));
console.log('{{ site.search_enabled }}');

if (window.location.href.includes('/eng/')) {
    console.log(getTranslatedTitle('title.about'));
    console.log('English')
} else {
    console.log(getTranslatedTitle('title.about'));
    console.log('Korean')
}