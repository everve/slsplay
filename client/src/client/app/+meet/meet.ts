export class Meet {
    userId: number;
    meetupId: string;
    videoId: string;
    photoId: string;
    constructor(public title: string, public description: string, private state: MeetState) {
    }

    getState() {
        return MeetState[this.state];
    }
}

export enum MeetState {
    NEW,
    CLOSED,
    OPEN
}

