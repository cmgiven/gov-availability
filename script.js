function update(data) {
    var thisYear = new Date().getFullYear() + '-01-01T00:00:00-05:00'

    setAvailability(
        'this-year',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, thisYear) /
            differenceOfTimeRange({ 'start': thisYear })
    );
    setAvailability(
        'this-administration',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, data.trump.start) /
            differenceOfTimeRange(data.trump)
    );
    setAvailability(
        'all-time',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, data.usa.start) /
            differenceOfTimeRange(data.usa)
    );
    setAvailability(
        'obama-administration',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, data.obama.start) /
            differenceOfTimeRange(data.obama)
    );
    setAvailability(
        'bushjr-administration',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, data.bushjr.start) /
            differenceOfTimeRange(data.bushjr)
    );
    setAvailability(
        'clinton-administration',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, data.clinton.start) /
            differenceOfTimeRange(data.clinton)
    );
    setAvailability(
        'bushsr-administration',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, data.bushsr.start) /
            differenceOfTimeRange(data.bushsr)
    );
    setAvailability(
        'reagan-administration',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, data.reagan.start) /
            differenceOfTimeRange(data.reagan)
    );
    setAvailability(
        'carter-administration',
         1 - aggregateTimeRangesAfterDate(data.shutdowns, data.carter.start) /
            differenceOfTimeRange(data.carter)
    );
}

function setAvailability(id, percentage) {
    var element = document.getElementById(id);
    var string = (percentage * 100).toFixed(10) + '%';
    element.innerHTML = string;
    element.className = percentage < 0.99 ? 'bad' : '';
}

function aggregateTimeRangesAfterDate(ranges, filterDate) {
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
    var end = range.end ? new Date(range.end) : new Date();
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
