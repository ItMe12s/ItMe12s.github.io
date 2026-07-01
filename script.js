function dosearch() {
    var q = document.getElementById('q').value.toLowerCase().trim();
    var rows = document.querySelectorAll('.dir tr');
    for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        if (!q) { r.style.display = ''; continue; }
        var t = r.textContent.toLowerCase();
        r.style.display = t.indexOf(q) >= 0 ? '' : 'none';
    }
}

(function () {
    var poll = {
        base: { p1: 670, p2: 230, p3: 80, p4: 20 },
        labels: { p1: 'ชอบมาก', p2: 'ชอบ', p3: 'ปกติ', p4: 'ไม่ชอบ' }
    };
    var STORE = 'imes_poll_vote';
    var state = JSON.parse(JSON.stringify(poll.base));
    var voted = null;

    function total(o) {
        var s = 0;
        for (var k in o) s += o[k];
        return s;
    }

    function render() {
        var box = document.getElementById('pollres');
        if (!box) return;
        var t = total(state);
        var html = '';
        for (var k in poll.labels) {
            var pct = t ? Math.round(state[k] / t * 100) : 0;
            html += '<div class="pollbar-wrap">'
                + '<div class="pollbar-row">'
                + '<span style="width:75px;display:inline-block;">' + poll.labels[k] + '</span>'
                + '<span class="pollbar-track">'
                + '<span class="pollbar-fill" style="width:' + pct + '%"></span>'
                + '<span class="pollbar-pct">' + pct + '%</span>'
                + '</span>'
                + '</div></div>';
        }
        if (voted) {
            html += '<div class="pollbar-voted">คุณโหวตแล้ว: <b>' + poll.labels[voted] + '</b> (ขอบคุณครับ!)</div>';
        }
        box.innerHTML = html;
    }

    function setLocked(locked) {
        var btn = document.getElementById('pollvote');
        var undo = document.getElementById('pollundo');
        var radios = document.getElementsByName('p');
        for (var i = 0; i < radios.length; i++) radios[i].disabled = locked;
        if (btn) btn.disabled = locked;
        if (undo) undo.style.display = locked ? '' : 'none';
    }

    function init() {
        try { voted = localStorage.getItem(STORE); } catch (e) { }
        if (voted && state.hasOwnProperty(voted)) state[voted] += 1;
        render();
        if (voted) setLocked(true);

        var btn = document.getElementById('pollvote');
        if (btn) {
            btn.addEventListener('click', function () {
                var chosen = null;
                var radios = document.getElementsByName('p');
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) { chosen = radios[i].id; break; }
                }
                if (!chosen) {
                    var note = document.getElementById('pollnote');
                    if (note) note.style.display = 'block';
                    return;
                }
                state[chosen] += 1;
                voted = chosen;
                try { localStorage.setItem(STORE, chosen); } catch (e) { }
                render();
                setLocked(true);
                var note = document.getElementById('pollnote');
                if (note) note.style.display = 'none';
            });
        }

        var undo = document.getElementById('pollundo');
        if (undo) {
            undo.addEventListener('click', function () {
                if (voted && state[voted] > poll.base[voted]) state[voted] -= 1;
                voted = null;
                try { localStorage.removeItem(STORE); } catch (e) { }
                render();
                setLocked(false);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

(function () {
    var TTL = 60 * 60 * 1000;
    var STORE = 'imes_repo_cache';

    var LANG_COLORS = {
        C: '#555555', 'C++': '#f34b7d', CMake: '#ccc388', Lua: '#000080',
        Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
        HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Java: '#b07219',
        Rust: '#dea584', Go: '#00ADD8', Ruby: '#701516', PHP: '#4F5D95'
    };
    function langColor(l) { return l ? (LANG_COLORS[l] || '#6a6a6a') : '#6a6a6a'; }

    function readCache() {
        try { return JSON.parse(localStorage.getItem(STORE)) || {}; }
        catch (e) { return {}; }
    }
    function writeCache(c) {
        try { localStorage.setItem(STORE, JSON.stringify(c)); } catch (e) { }
    }

    function paint(row, d) {
        var s = row.querySelector('.dstars');
        var l = row.querySelector('.dlang');
        var des = row.querySelector('.ds');
        if (s) s.textContent = '\u2605' + (typeof d.s === 'number' ? d.s : '');
        if (l) {
            if (d.l) {
                l.innerHTML = '<span class="dot" style="background:' + langColor(d.l) + '"></span>' + d.l;
            } else {
                l.textContent = '';
            }
        }
        if (des) des.textContent = (typeof d.d === 'string' && d.d.length) ? d.d : '';
    }

    function init() {
        var rows = document.querySelectorAll('tr[data-repo]');
        if (!rows.length) return;
        var now = Date.now();
        var cache = readCache();
        var fresh = true;

        for (var i = 0; i < rows.length; i++) {
            var repo = rows[i].getAttribute('data-repo');
            var entry = cache[repo];
            if (entry && (now - entry.t) < TTL) {
                paint(rows[i], entry);
            } else {
                fresh = false;
            }
        }
        if (fresh) return;

        for (var j = 0; j < rows.length; j++) {
            (function (row) {
                var repo = row.getAttribute('data-repo');
                fetch('https://api.github.com/repos/' + repo, {
                    headers: {
                        'Accept': 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2026-03-10'
                    }
                }).then(function (r) { return r.ok ? r.json() : null; })
                    .then(function (d) {
                        if (!d) return;
                        var data = {
                            t: Date.now(),
                            s: typeof d.stargazers_count === 'number' ? d.stargazers_count : null,
                            l: typeof d.language === 'string' ? d.language : null,
                            d: typeof d.description === 'string' ? d.description : ''
                        };
                        paint(row, data);
                        var c = readCache();
                        c[repo] = data;
                        writeCache(c);
                    }).catch(function () { });
            })(rows[j]);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
