jtd.onReady(function () {
    var isSearchEnabled = document.getElementById('is-search-enabled').value != 'false';

    if (isSearchEnabled) {
        var baseurl = document.getElementById('baseurl').value;
        var currentDirectory = '/assets/js/';

        fetch(`${baseurl}${currentDirectory}search-data.json`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(docs => {
                const defaultTokenizerSeparator = /[\s\-/]+/;
                var siteTokenizerSeparator = document.getElementById('search-tokenizer-separator').value;
                if (siteTokenizerSeparator) {
                    lunr.tokenizer.separator = siteTokenizerSeparator;
                }
                else {
                    lunr.tokenizer.separator = defaultTokenizerSeparator;
                }

                var index = lunr(function () {
                    var siteIsSearchRelUrl = document.getElementById('is-search-rel-url').value;

                    this.use(lunr.multiLanguage('en', 'ko'));
                    this.ref('id');
                    this.field('title', { boost: 200 });
                    this.field('content', { boost: 2 });
                    if (siteIsSearchRelUrl != false) {
                        this.field('relUrl');
                    }
                    this.metadataWhitelist = ['position']

                    for (var i in docs) {
                        docs[i].title = getTranslatedTitle(docs[i].title);
                        docs[i].doc = getTranslatedTitle(docs[i].doc);

                        var tempRecord = {
                            id: i,
                            title: docs[i].title,
                            content: docs[i].content,
                        }
                        if (siteIsSearchRelUrl != false) {
                            tempRecord.relUrl = docs[i].relUrl;
                        }
                        this.add(tempRecord);
                    }
                });
                searchLoaded(index, docs);

                console.log('search.js', index);
                console.log('search.js', docs);
            });

        function searchLoaded(index, docs) {
            var index = index;
            var docs = docs;
            var searchInput = document.getElementById('search-input');
            var searchResults = document.getElementById('search-results');
            var mainHeader = document.getElementById('main-header');
            var currentInput;
            var currentSearchIndex = 0;

            function showSearch() {
                document.documentElement.classList.add('search-active');
            }

            function hideSearch() {
                document.documentElement.classList.remove('search-active');
            }
        }

        function getTranslatedTitle(title) {
            switch (title) {
                case 'title.home':
                    return document.getElementById('title-home').value;
                case 'title.faq':
                    return document.getElementById('title-faq').value;
                case 'title.news':
                    return document.getElementById('title-news').value;
                case 'title.contact':
                    return document.getElementById('title-contact').value;

                case 'title.about':
                    return document.getElementById('title-about').value;
                case 'title.motivation':
                    return document.getElementById('title-motivation').value;
                case 'title.charter':
                    return document.getElementById('title-charter').value;
                case 'title.members':
                    return document.getElementById('title-members').value;
                case 'title.logo':
                    return document.getElementById('title-logo').value;

                case 'title.guide':
                    return document.getElementById('title-guide').value;
                case 'title.userTips':
                    return document.getElementById('title-user-tips').value;
                case 'title.apiDoc':
                    return document.getElementById('title-api-doc').value;
                case 'title.contributionGuide':
                    return document.getElementById('title-contribution-guide').value;

                case 'title.license':
                    return document.getElementById('title-license').value;
                case 'title.osoriLicenseAndNotice':
                    return document.getElementById('title-osori-license-and-notice').value;
                case 'title.noticeOnUsageRestrictionByHeavyTraffic':
                    return document.getElementById('title-notice-on-usage-restriction-by-heavy-traffic').value;
                case 'title.noWarranty':
                    return document.getElementById('title-no-warranty').value;
                case 'title.docLicense':
                    return document.getElementById('title-doc-license').value;
                case 'title.codeLicense':
                    return document.getElementById('title-code-license').value;

                default:
                    return title;
            }
        }
    }
});