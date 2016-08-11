export class Meet {

  id:string;
  userId:number;
  description:string;
  title:string;
  videoId:string;
  photoId:string;
  eventDate:string;
  invitees:string[];
  state:MeetState;
  visibility:MeetVisibility;

  static to(meets:Meet[] | Meet):any {
    if (meets instanceof Array) {
      return Meet.wrapJson(Meet.toMany(meets));
    } else {
      return Meet.wrapJson(Meet.toOne(<Meet>meets));
    }
  }

  static from(arrayOrObject:any):Meet | Meet[] {
    if (arrayOrObject instanceof Array) {
      return Meet.fromMany(arrayOrObject);
    } else {
      return Meet.fromOne(arrayOrObject);
    }
  }

  private static toOne(meet:Meet) {
    return {
      id: meet.id,
      description: meet.description,
      eventDate: meet.eventDate,
      photoId: meet.photoId,
      videoId: meet.videoId,
      state: meet.state,
      title: meet.title,
      userId: meet.userId,
      visibility: meet.visibility,
      invitees: meet.invitees,
    };
  }

  private static fromOne(obj:any):Meet {
    var meet = new Meet();
    meet.id = obj.id;
    meet.userId = obj.userId;
    meet.videoId = obj.videoId;
    meet.photoId = obj.photoId;
    meet.eventDate = obj.eventDate;
    meet.invitees = obj.invitees;
    meet.state = <MeetState> obj.state;
    meet.visibility = <MeetVisibility> obj.visibility;
    meet.description = obj.description;
    meet.title = obj.title;
    return meet;
  }

  private static fromMany(array:Array<any>):Meet[] {
    var meets = new Array<Meet>(array.length);
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      meets.push(Meet.fromOne(obj));
    }
    return meets;
  }

  private static toMany(meets:Meet[]):any {
    var meetJsons = new Array<any>(meets.length);
    for (var i = 0; i < meets.length; i++) {
      var obj = meets[i];
      meetJsons.push(Meet.toOne(obj));
    }
    return meetJsons;
  }

  private static wrapJson(any:any):any {
    return {
      version: 1,
      correlationId: -1,
      data: any
    };
  }

  constructor() {
    //ignore
  }


}

export type MeetState =
  "NEW"
    | "LIVE"
    | "COMPLETE"
    | "DEAD";

export type MeetVisibility =
  "PUBLIC"
    | "PRIVATE"
    | "PRIVATE_PUBLIC";

