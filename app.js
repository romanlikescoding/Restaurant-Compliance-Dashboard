// Renewal Desk demo dashboard logic. Reads window.DASHBOARD_DATA (see data.js).
(function () {
  'use strict';

  var data = window.DASHBOARD_DATA;
  var DAY = 86400000;
  var TODAY = Date.UTC(data.demoDate[0], data.demoDate[1] - 1, data.demoDate[2]);

  var STATUS = {
    expired: { label: 'Expired' },
    soon30: { label: 'Due within 30 days' },
    soon60: { label: 'Due within 60 days' },
    ok: { label: 'On track' }
  };

  var state = { filter: 'all', renewed: {} };

  var catLabel = {};
  data.categories.forEach(function (c) { catLabel[c.id] = c.label; });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function fmt(ms) {
    return new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  }

  function $(id) { return document.getElementById(id); }

  // Work out days left, status and display text for every item.
  function buildRows() {
    return data.items.map(function (it) {
      var base = Date.UTC(it.date[0], it.date[1] - 1, it.date[2]) + (state.renewed[it.id] ? 365 * DAY : 0);
      var days = Math.round((base - TODAY) / DAY);
      var key = days < 0 ? 'expired' : days <= 30 ? 'soon30' : days <= 60 ? 'soon60' : 'ok';
      var dueText;
      if (days < 0) dueText = 'Expired ' + (-days) + (days === -1 ? ' day ago' : ' days ago');
      else if (days === 0) dueText = 'Due today';
      else dueText = 'Due in ' + days + (days === 1 ? ' day' : ' days');
      return {
        id: it.id, cat: it.cat, name: it.name, detail: it.detail, owner: it.owner,
        days: days, key: key, dateText: fmt(base), dueText: dueText
      };
    }).sort(function (a, b) { return a.days - b.days; });
  }

  function chip(key, text) {
    return '<span class="chip chip--' + key + '">' + esc(text) + '</span>';
  }

  function render() {
    var rows = buildRows();

    // Status counts
    var counts = { expired: 0, soon30: 0, soon60: 0, ok: 0 };
    rows.forEach(function (r) { counts[r.key] += 1; });
    Object.keys(counts).forEach(function (k) { $('n-' + k).textContent = counts[k]; });

    // Needs attention
    var attention = rows.filter(function (r) { return r.days <= 30; });
    $('attention').innerHTML = attention.length
      ? attention.map(function (r) {
          return '<div class="attention-row">' +
            '<div class="attention-main"><div class="item-name">' + esc(r.name) + '</div>' +
            '<div class="item-detail">' + esc(r.detail) + '</div></div>' +
            chip(r.key, r.dueText) +
            '<button type="button" class="btn btn-accent" data-renew="' + esc(r.id) + '">Mark renewed</button>' +
            '</div>';
        }).join('')
      : '<div class="all-clear">All clear. Nothing is expired or due in the next 30 days.</div>';

    // Category progress bars
    $('categories').innerHTML = data.categories.map(function (c) {
      var mine = rows.filter(function (r) { return r.cat === c.id; });
      var okN = mine.filter(function (r) { return r.key === 'ok'; }).length;
      var pct = mine.length ? Math.round((okN / mine.length) * 100) : 0;
      return '<div><div class="category-top"><span>' + esc(c.label) + '</span><span>' +
        okN + ' of ' + mine.length + ' on track</span></div>' +
        '<div class="bar"><div class="bar-fill" style="width:' + pct + '%"></div></div></div>';
    }).join('');

    // Filter tabs
    var tabDefs = [{ id: 'all', label: 'All' }].concat(data.categories);
    $('tabs').innerHTML = tabDefs.map(function (t) {
      var n = t.id === 'all' ? rows.length : rows.filter(function (r) { return r.cat === t.id; }).length;
      return '<button type="button" class="tab" data-filter="' + esc(t.id) + '" aria-pressed="' +
        (state.filter === t.id) + '">' + esc(t.label) + '<span class="tab-count">' + n + '</span></button>';
    }).join('');

    // Table
    var visible = state.filter === 'all' ? rows : rows.filter(function (r) { return r.cat === state.filter; });
    $('rows').innerHTML = visible.map(function (r) {
      return '<div class="tr">' +
        '<div><div class="item-name">' + esc(r.name) + '</div><div class="item-detail">' + esc(r.detail) + '</div></div>' +
        '<div>' + esc(catLabel[r.cat]) + '</div>' +
        '<div>' + esc(r.owner) + '</div>' +
        '<div>' + esc(r.dateText) + '</div>' +
        '<div class="days">' + r.days + '</div>' +
        '<div>' + chip(r.key, STATUS[r.key].label) + '</div>' +
        '</div>';
    }).join('');
  }

  // One click handler for the buttons that get re-drawn on every render.
  document.addEventListener('click', function (e) {
    var renew = e.target.closest('[data-renew]');
    if (renew) {
      state.renewed[renew.getAttribute('data-renew')] = true;
      render();
      return;
    }
    var tab = e.target.closest('[data-filter]');
    if (tab) {
      state.filter = tab.getAttribute('data-filter');
      render();
    }
  });

  $('reset').addEventListener('click', function () {
    state = { filter: 'all', renewed: {} };
    render();
  });

  $('demo-date').textContent = new Date(TODAY).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  render();
})();
