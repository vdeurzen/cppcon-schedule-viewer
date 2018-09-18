import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import cppcon2018 from './cppcon2018.js';
import sg14 from './sg14.js';
import {min, max, map, uniqueId, compact, flatten, uniqBy, find} from 'lodash';

class App extends Component {

    get_data(schedule) {
        let groups = map(uniqBy(flatten(compact(map(schedule, (item) => {
            return item.tracks;
        }))), (e) => {return e.toLowerCase();}), (i) => {
            return {title: i, id: i};
        });

        groups = [...groups, {title: 'main', id: 'main'}];

        const items = map(schedule, (item) => {
            let track = 'main';
            if (item.tracks) {
                track = item.tracks[0].toLowerCase();
            }

            const group = find(groups, (i) => { return i.title.toLowerCase() === track; });
            const start = moment(item.begin);
            const end = moment(item.begin).add(item.duration, 'minute');

            return {
                id: uniqueId(),
                title: item.duration,
                canMove: false,
                canResizeRight: false,
                canResizeLeft: false,
                group: group.title,
                start_time: start,
                end_time: end
            };
        });

        return {groups, items};
    };

    render() {
        const data_cppcon = this.get_data(cppcon2018);

        const start_cppcon = min(data_cppcon.items).start_time;
        const end_cppcon = max(data_cppcon.items).end_time;

        const data_sg14 = this.get_data(sg14);

        const start_sg14 = min(data_sg14.items).start_time;
        const end_sg14 = max(data_sg14.items).end_time;

        return (
            <div>
                <h1>CppCon 2018</h1>
                <Timeline
                groups={data_cppcon.groups}
                items={data_cppcon.items}
                defaultTimeStart={start_cppcon}
                defaultTimeEnd={end_cppcon}
                lineHeight={50}
                />

                <hr />

                <h1>CppCon 2018 - SG14</h1>
                <Timeline
                groups={data_sg14.groups}
                items={data_sg14.items}
                defaultTimeStart={start_sg14}
                defaultTimeEnd={end_sg14}
                lineHeight={50}
                />
            </div>
        );
    }
}

export default App;
