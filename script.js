function update(data) {
    var thisYear = { start: new Date().getFullYear() + '-01-01T00:00:00-05:00', end : null}

    setAvailability(
        'this-year',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, thisYear) /
            differenceOfTimeRange(thisYear)
    );
    setAvailability(
        'this-administration',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, data.trump) /
            differenceOfTimeRange(data.trump)
    );
    setAvailability(
        'all-time',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, data.usa) /
            differenceOfTimeRange(data.usa)
    );
    setAvailability(
        'obama-administration',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, data.obama) /
            differenceOfTimeRange(data.obama)
    );
    setAvailability(
        'bushjr-administration',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, data.bushjr) /
            differenceOfTimeRange(data.bushjr)
    );
    setAvailability(
        'clinton-administration',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, data.clinton) /
            differenceOfTimeRange(data.clinton)
    );
    setAvailability(
        'bushsr-administration',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, data.bushsr) /
            differenceOfTimeRange(data.bushsr)
    );
    setAvailability(
        'reagan-administration',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, data.reagan) /
            differenceOfTimeRange(data.reagan)
    );
    setAvailability(
        'carter-administration',
         1 - aggregateTimeRangesWithinRange(data.shutdowns, data.carter) /
            differenceOfTimeRange(data.carter)
    );
}

function setAvailability(id, percentage) {
    var element = document.getElementById(id);
    var string = (percentage * 100).toFixed(10) + '%';
    element.innerHTML = string;
    element.className = percentage < 0.99 ? 'bad' : '';
}

function aggregateTimeRangesWithinRange(ranges, outerRange) {
    var i, range;
    var time = 0;

    for (i = ranges.length - 1; i >= 0; i--) {
        range = ranges[i];

        time += rangeIntersectTime(range, outerRange)
    }

    return time;
}

function timeOrNow(date){
    return date == null ? new Date() : new Date(date);
}

function rangeIntersectTime(range1, range2){
    return Math.max(0,
        Math.min(timeOrNow(range1.end).getTime(), timeOrNow(range2.end).getTime())-Math.max(timeOrNow(range1.start).getTime(), timeOrNow(range2.start).getTime()))
}

function differenceOfTimeRange(range) {
    return timeOrNow(range.end).getTime() - timeOrNow(range.start).getTime();
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
