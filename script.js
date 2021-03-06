var now;

function update(data) {
    now = new Date();

    var thisYear = now.getFullYear() + '-01-01T00:00:00-05:00'

    setAvailability(
        'this-year',
         1 - sumTimeRangesAfterDate(data.shutdowns, thisYear) /
            differenceOfTimeRange({ 'start': thisYear })
    );
    setAvailability(
        'this-administration',
         1 - sumTimeRangesAfterDate(data.shutdowns, data.current.start) /
            differenceOfTimeRange(data.current)
    );
    setAvailability(
        'all-time',
         1 - sumTimeRangesAfterDate(data.shutdowns, data.usa.start) /
            differenceOfTimeRange(data.usa)
    );
}

function setAvailability(id, percentage) {
    var element = document.getElementById(id);
    var string = (percentage * 100).toFixed(10) + '%';
    element.innerHTML = string;
    element.className = percentage < 0.99 ? 'bad' : '';
}

function sumTimeRangesAfterDate(ranges, filterDate) {
    var i, range;
    var time = 0;

    for (i = ranges.length - 1; i >= 0; i--) {
        range = ranges[i];

        if (range.start > filterDate) {
            time += differenceOfTimeRange(range);
        } else if (!range.end || range.end > filterDate) {
            time += differenceOfTimeRange({
                'start': filterDate,
                'end': range.end
            });
        } else {
            break;
        }
    }

    return time;
}

function differenceOfTimeRange(range) {
    var start = new Date(range.start);
    var end = range.end ? new Date(range.end) : now;
    return end.getTime() - start.getTime();
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);

        var loop = function () {
            update(data);
            setTimeout(loop, 1000);
        };

        loop();
    }
};
xhttp.open('GET', 'data.json', true);
xhttp.send();
