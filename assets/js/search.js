{%- if site.search_enabled != false %}
if (window.location.href.includes('/eng/')) {
    console.log(getTranslatedTitle('title.about'));
    console.log('English')
} else {
    console.log(getTranslatedTitle('title.about'));
    console.log('Korean')
}
{%- endif %}