export class Feed {
    private nick: string;
    private profile: string;
    private content: string;
    private description: string;
    private nice: number;
    private comment: number;
    private type: number;
    private audience: number;
    private createDate: Date;
    private updateDate: Date;

    constructor(nick, profile, content, description, nice, comment, type, audience, createDate, updateDate) {
        this.nick = nick;
        this.profile = profile;
        this.content = content;
        this.description = description;
        this.nice = nice;
        this.comment = comment;
        this.type = type;
        this.audience = audience;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
}
