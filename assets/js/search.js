var isSearchEnabled = document.getElementById('is-search-enabled').value != 'false';

if (isSearchEnabled) {
    var siteIsSearchRelUrl = document.getElementById('is-search-rel-url').value;

    function initSearch() {
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

        function update() {
            console.log('updated method called')
            currentSearchIndex++;

            var input = searchInput.value;
            if (input === '') {
                hideSearch();
            } else {
                showSearch();
                // scroll search input into view, workaround for iOS Safari
                window.scroll(0, -1);
                setTimeout(function () { window.scroll(0, 0); }, 0);
            }
            if (input === currentInput) {
                return;
            }
            currentInput = input;
            searchResults.innerHTML = '';
            if (input === '') {
                return;
            }

            var results = index.query(function (query) {
                var tokens = lunr.tokenizer(input)
                query.term(tokens, {
                    boost: 10
                });
                query.term(tokens, {
                    wildcard: lunr.Query.wildcard.TRAILING
                });
            });

            if ((results.length == 0) && (input.length > 2)) {
                var tokens = lunr.tokenizer(input).filter(function (token, i) {
                    return token.str.length < 20;
                })
                if (tokens.length > 0) {
                    results = index.query(function (query) {
                        query.term(tokens, {
                            editDistance: Math.round(Math.sqrt(input.length / 2 - 1))
                        });
                    });
                }
            }

            if (results.length == 0) {
                var noResultsDiv = document.createElement('div');
                noResultsDiv.classList.add('search-no-result');
                noResultsDiv.innerText = 'No results found';
                searchResults.appendChild(noResultsDiv);

            } else {
                var resultsList = document.createElement('ul');
                resultsList.classList.add('search-results-list');
                searchResults.appendChild(resultsList);

                addResults(resultsList, results, 0, 10, 100, currentSearchIndex);
            }

            function addResults(resultsList, results, start, batchSize, batchMillis, searchIndex) {
                if (searchIndex != currentSearchIndex) {
                    return;
                }
                for (var i = start; i < (start + batchSize); i++) {
                    if (i == results.length) {
                        return;
                    }
                    addResult(resultsList, results[i]);
                }
                setTimeout(function () {
                    addResults(resultsList, results, start + batchSize, batchSize, batchMillis, searchIndex);
                }, batchMillis);
            }

            function addResult(resultsList, result) {
                var doc = docs[result.ref];

                var resultsListItem = document.createElement('li');
                resultsListItem.classList.add('search-results-list-item');
                resultsList.appendChild(resultsListItem);

                var resultLink = document.createElement('a');
                resultLink.classList.add('search-result');
                resultLink.setAttribute('href', doc.url);
                resultsListItem.appendChild(resultLink);

                var resultTitle = document.createElement('div');
                resultTitle.classList.add('search-result-title');
                resultLink.appendChild(resultTitle);

                // note: the SVG svg-doc is only loaded as a Jekyll include if site.search_enabled is true; see _includes/icons/icons.html
                var resultDoc = document.createElement('div');
                resultDoc.classList.add('search-result-doc');
                resultDoc.innerHTML = '<svg viewBox="0 0 24 24" class="search-result-icon"><use xlink:href="#svg-doc"></use></svg>';
                resultTitle.appendChild(resultDoc);

                var resultDocTitle = document.createElement('div');
                resultDocTitle.classList.add('search-result-doc-title');
                resultDocTitle.innerHTML = doc.doc;
                resultDoc.appendChild(resultDocTitle);
                var resultDocOrSection = resultDocTitle;

                if (doc.doc != doc.title) {
                    resultDoc.classList.add('search-result-doc-parent');
                    var resultSection = document.createElement('div');
                    resultSection.classList.add('search-result-section');
                    resultSection.innerHTML = doc.title;
                    resultTitle.appendChild(resultSection);
                    resultDocOrSection = resultSection;
                }

                var metadata = result.matchData.metadata;
                var titlePositions = [];
                var contentPositions = [];
                for (var j in metadata) {
                    var meta = metadata[j];
                    if (meta.title) {
                        var positions = meta.title.position;
                        for (var k in positions) {
                            titlePositions.push(positions[k]);
                        }
                    }
                    if (meta.content) {
                        var positions = meta.content.position;
                        for (var k in positions) {
                            var position = positions[k];
                            var previewStart = position[0];
                            var previewEnd = position[0] + position[1];
                            var ellipsesBefore = true;
                            var ellipsesAfter = true;

                            var searchPreviewWordsBefore = document.getElementById('search-preview-words-before').value;
                            if (!searchPreviewWordsBefore) {
                                searchPreviewWordsBefore = 5;
                            }
                            for (var k = 0; k < searchPreviewWordsBefore; k++) {
                                var nextSpace = doc.content.lastIndexOf(' ', previewStart - 2);
                                var nextDot = doc.content.lastIndexOf('. ', previewStart - 2);
                                if ((nextDot >= 0) && (nextDot > nextSpace)) {
                                    previewStart = nextDot + 1;
                                    ellipsesBefore = false;
                                    break;
                                }
                                if (nextSpace < 0) {
                                    previewStart = 0;
                                    ellipsesBefore = false;
                                    break;
                                }
                                previewStart = nextSpace + 1;
                            }

                            var searchPreviewWordsAfter = document.getElementById('search-preview-words-after').value;
                            if (!searchPreviewWordsAfter) {
                                searchPreviewWordsAfter = 10;
                            }
                            for (var k = 0; k < searchPreviewWordsAfter; k++) {
                                var nextSpace = doc.content.indexOf(' ', previewEnd + 1);
                                var nextDot = doc.content.indexOf('. ', previewEnd + 1);
                                if ((nextDot >= 0) && (nextDot < nextSpace)) {
                                    previewEnd = nextDot;
                                    ellipsesAfter = false;
                                    break;
                                }
                                if (nextSpace < 0) {
                                    previewEnd = doc.content.length;
                                    ellipsesAfter = false;
                                    break;
                                }
                                previewEnd = nextSpace;
                            }
                            contentPositions.push({
                                highlight: position,
                                previewStart: previewStart, previewEnd: previewEnd,
                                ellipsesBefore: ellipsesBefore, ellipsesAfter: ellipsesAfter
                            });
                        }
                    }
                }

                if (titlePositions.length > 0) {
                    titlePositions.sort(function (p1, p2) { return p1[0] - p2[0] });
                    resultDocOrSection.innerHTML = '';
                    addHighlightedText(resultDocOrSection, doc.title, 0, doc.title.length, titlePositions);
                }

                if (contentPositions.length > 0) {
                    contentPositions.sort(function (p1, p2) { return p1.highlight[0] - p2.highlight[0] });
                    var contentPosition = contentPositions[0];
                    var previewPosition = {
                        highlight: [contentPosition.highlight],
                        previewStart: contentPosition.previewStart, previewEnd: contentPosition.previewEnd,
                        ellipsesBefore: contentPosition.ellipsesBefore, ellipsesAfter: contentPosition.ellipsesAfter
                    };
                    var previewPositions = [previewPosition];
                    for (var j = 1; j < contentPositions.length; j++) {
                        contentPosition = contentPositions[j];
                        if (previewPosition.previewEnd < contentPosition.previewStart) {
                            previewPosition = {
                                highlight: [contentPosition.highlight],
                                previewStart: contentPosition.previewStart, previewEnd: contentPosition.previewEnd,
                                ellipsesBefore: contentPosition.ellipsesBefore, ellipsesAfter: contentPosition.ellipsesAfter
                            }
                            previewPositions.push(previewPosition);
                        } else {
                            previewPosition.highlight.push(contentPosition.highlight);
                            previewPosition.previewEnd = contentPosition.previewEnd;
                            previewPosition.ellipsesAfter = contentPosition.ellipsesAfter;
                        }
                    }

                    var resultPreviews = document.createElement('div');
                    resultPreviews.classList.add('search-result-previews');
                    resultLink.appendChild(resultPreviews);

                    var content = doc.content;
                    var searchPreviews = document.getElementById('search-previews').value;
                    if (!searchPreviews) {
                        searchPreviews = 3;
                    }
                    for (var j = 0; j < Math.min(previewPositions.length, searchPreviews); j++) {
                        var position = previewPositions[j];

                        var resultPreview = document.createElement('div');
                        resultPreview.classList.add('search-result-preview');
                        resultPreviews.appendChild(resultPreview);

                        if (position.ellipsesBefore) {
                            resultPreview.appendChild(document.createTextNode('... '));
                        }
                        addHighlightedText(resultPreview, content, position.previewStart, position.previewEnd, position.highlight);
                        if (position.ellipsesAfter) {
                            resultPreview.appendChild(document.createTextNode(' ...'));
                        }
                    }
                }

                if (siteIsSearchRelUrl != false) {
                    var resultRelUrl = document.createElement('span');
                    resultRelUrl.classList.add('search-result-rel-url');
                    resultRelUrl.innerText = doc.relUrl;
                    resultTitle.appendChild(resultRelUrl);
                }
            }

            function addHighlightedText(parent, text, start, end, positions) {
                var index = start;
                for (var i in positions) {
                    var position = positions[i];
                    var span = document.createElement('span');
                    span.innerHTML = text.substring(index, position[0]);
                    parent.appendChild(span);
                    index = position[0] + position[1];
                    var highlight = document.createElement('span');
                    highlight.classList.add('search-result-highlight');
                    highlight.innerHTML = text.substring(position[0], index);
                    parent.appendChild(highlight);
                }
                var span = document.createElement('span');
                span.innerHTML = text.substring(index, end);
                parent.appendChild(span);
            }
        }

        jtd.addEvent(searchInput, 'focus', function () {
            setTimeout(update, 0);
        });

        jtd.addEvent(searchInput, 'keyup', function (e) {
            switch (e.keyCode) {
                case 27: // When esc key is pressed, hide the results and clear the field
                    searchInput.value = '';
                    break;
                case 38: // arrow up
                case 40: // arrow down
                case 13: // enter
                    e.preventDefault();
                    return;
            }
            update();
        });

        jtd.addEvent(searchInput, 'keydown', function (e) {
            switch (e.keyCode) {
                case 38: // arrow up
                    e.preventDefault();
                    var active = document.querySelector('.search-result.active');
                    if (active) {
                        active.classList.remove('active');
                        if (active.parentElement.previousSibling) {
                            var previous = active.parentElement.previousSibling.querySelector('.search-result');
                            previous.classList.add('active');
                        }
                    }
                    return;
                case 40: // arrow down
                    e.preventDefault();
                    var active = document.querySelector('.search-result.active');
                    if (active) {
                        if (active.parentElement.nextSibling) {
                            var next = active.parentElement.nextSibling.querySelector('.search-result');
                            active.classList.remove('active');
                            next.classList.add('active');
                        }
                    } else {
                        var next = document.querySelector('.search-result');
                        if (next) {
                            next.classList.add('active');
                        }
                    }
                    return;
                case 13: // enter
                    e.preventDefault();
                    var active = document.querySelector('.search-result.active');
                    if (active) {
                        active.click();
                    } else {
                        var first = document.querySelector('.search-result');
                        if (first) {
                            first.click();
                        }
                    }
                    return;
            }
        });

        jtd.addEvent(document, 'click', function (e) {
            if (e.target != searchInput) {
                hideSearch();
            }
        });
    }
}

jtd.onReady(function () {
    if (isSearchEnabled) {
        initSearch();
    }
});