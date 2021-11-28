/* tslint:disable:max-line-length no-empty-interface */
export interface ITestInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
}

export interface ITestOutput {
    /** xsd:dateTime(undefined) */
    Timestamp: dateTime;
    /** xsd:string(undefined) */
    ApiVersion: string;
    /** xsd:boolean(undefined) */
    IsValidAccount: boolean;
    /** SupportedLanguages(en,fr,nl) */
    Language: "en" | "fr" | "nl";
    /** xsd:string(undefined) */
    Database: string;
    /** xsd:string(undefined) */
    RequestorIp: string;
    /** xsd:integer(undefined) */
    ConsumedTicks: integer;
    /** xsd:integer(undefined) */
    CurrentQuota: integer;
    /** xsd:integer(undefined) */
    AllowedQuota: integer;
    /** xsd:string(undefined) */
    PhpVersion: string;
    /** xsd:string(undefined) */
    DbVersion: string;
}

export interface IGetSeasonsInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
}

export interface IGetSeasonsOutput {
    /** xsd:integer(undefined) */
    CurrentSeason: integer;
    /** xsd:string(undefined) */
    CurrentSeasonName: string;
    SeasonEntries: Array<TabTAPI_PortTypes.ISeasonEntries>;
}

export interface IGetClubTeamsInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:string(undefined) */
    Club: string;
    /** xsd:integer(undefined) */
    Season: integer;
}

export interface IGetClubTeamsOutput {
    /** xsd:string(undefined) */
    ClubName: string;
    /** xsd:integer(undefined) */
    TeamCount: integer;
    TeamEntries: Array<TabTAPI_PortTypes.ITeamEntries>;
}

export interface IGetDivisionRankingInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:integer(undefined) */
    DivisionId: integer;
    /** xsd:string(undefined) */
    WeekName: string;
    /** xsd:integer(undefined) */
    RankingSystem: integer;
}

export interface IGetDivisionRankingOutput {
    /** xsd:string(undefined) */
    DivisionName: string;
    RankingEntries: Array<TabTAPI_PortTypes.IRankingEntries>;
}

export interface IGetMatchesInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:integer(undefined) */
    DivisionId: integer;
    /** xsd:string(undefined) */
    Club: string;
    /** xsd:string(undefined) */
    Team: string;
    /** xsd:integer(undefined) */
    DivisionCategory: integer;
    /** xsd:integer(undefined) */
    Season: integer;
    /** xsd:string(undefined) */
    WeekName: string;
    /** xsd:integer(undefined) */
    Level: integer;
    /** ShowDivisionNameType(no,yes,short) */
    ShowDivisionName: "no" | "yes" | "short";
    /** xsd:date(undefined) */
    YearDateFrom: date;
    /** xsd:date(undefined) */
    YearDateTo: date;
    /** xsd:boolean(undefined) */
    WithDetails: boolean;
    /** xsd:string(undefined) */
    MatchId: string;
    /** xsd:string(undefined) */
    MatchUniqueId: string;
}

export interface IGetMatchesOutput {
    /** xsd:integer(undefined) */
    MatchCount: integer;
    TeamMatchesEntries: Array<TabTAPI_PortTypes.ITeamMatchesEntries>;
}

export interface IGetMembersInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:string(undefined) */
    Club: string;
    /** xsd:integer(undefined) */
    Season: integer;
    /** xsd:integer(undefined) */
    PlayerCategory: integer;
    /** xsd:integer(undefined) */
    UniqueIndex: integer;
    /** xsd:string(undefined) */
    NameSearch: string;
    /** xsd:boolean(undefined) */
    ExtendedInformation: boolean;
    /** xsd:boolean(undefined) */
    RankingPointsInformation: boolean;
    /** xsd:boolean(undefined) */
    WithResults: boolean;
    /** xsd:boolean(undefined) */
    WithOpponentRankingEvaluation: boolean;
}

export interface IGetMembersOutput {
    /** xsd:integer(undefined) */
    MemberCount: integer;
    MemberEntries: Array<TabTAPI_PortTypes.IMemberEntries>;
}

export interface IUploadInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:string(undefined) */
    Data: string;
}

export interface IUploadOutput {
    /** xsd:boolean(undefined) */
    Result: boolean;
    /** xsd:string(undefined) */
    ErrorLines: string>;
}

export interface IGetClubsInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:integer(undefined) */
    Season: integer;
    /** xsd:integer(undefined) */
    ClubCategory: integer;
    /** xsd:string(undefined) */
    Club: string;
}

export interface IGetClubsOutput {
    /** xsd:integer(undefined) */
    ClubCount: integer;
    ClubEntries: Array<TabTAPI_PortTypes.IClubEntries>;
}

export interface IGetDivisionsInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:integer(undefined) */
    Season: integer;
    /** xsd:integer(undefined) */
    Level: integer;
    /** ShowDivisionNameType(no,yes,short) */
    ShowDivisionName: "no" | "yes" | "short";
}

export interface IGetDivisionsOutput {
    /** xsd:integer(undefined) */
    DivisionCount: integer;
    DivisionEntries: Array<TabTAPI_PortTypes.IDivisionEntries>;
}

export interface IGetTournamentsInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:integer(undefined) */
    Season: integer;
    /** xsd:integer(undefined) */
    TournamentUniqueIndex: integer;
    /** xsd:boolean(undefined) */
    WithResults: boolean;
    /** xsd:boolean(undefined) */
    WithRegistrations: boolean;
}

export interface IGetTournamentsOutput {
    /** xsd:integer(undefined) */
    TournamentCount: integer;
    TournamentEntries: Array<TabTAPI_PortTypes.ITournamentEntries>;
}

export interface IGetMatchSystemsInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:integer(undefined) */
    UniqueIndex: integer;
}

export interface IGetMatchSystemsOutput {
    /** xsd:integer(undefined) */
    MatchSystemCount: integer;
    MatchSystemEntries: Array<TabTAPI_PortTypes.IMatchSystemEntries>;
}

export interface ITournamentRegisterInput {
    Credentials: TabTAPI_PortTypes.ICredentials;
    /** xsd:integer(undefined) */
    TournamentUniqueIndex: integer;
    /** xsd:integer(undefined) */
    SerieUniqueIndex: integer;
    /** xsd:integer(undefined) */
    PlayerUniqueIndex: integer>;
    /** xsd:boolean(undefined) */
    Unregister: boolean;
    /** xsd:boolean(undefined) */
    NotifyPlayer: boolean;
}

export interface ITournamentRegisterOutput {
    /** xsd:boolean(undefined) */
    Success: boolean;
    /** xsd:integer(undefined) */
    MessageCount: integer;
    /** xsd:string(undefined) */
    MessageEntries: string>;
}

export interface ITabTAPI_PortSoap {
    Test: (input: ITestInput, cb: (err: any | null, result: ITestOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetSeasons: (input: IGetSeasonsInput, cb: (err: any | null, result: IGetSeasonsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetClubTeams: (input: IGetClubTeamsInput, cb: (err: any | null, result: IGetClubTeamsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetDivisionRanking: (input: IGetDivisionRankingInput, cb: (err: any | null, result: IGetDivisionRankingOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetMatches: (input: IGetMatchesInput, cb: (err: any | null, result: IGetMatchesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetMembers: (input: IGetMembersInput, cb: (err: any | null, result: IGetMembersOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    Upload: (input: IUploadInput, cb: (err: any | null, result: IUploadOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetClubs: (input: IGetClubsInput, cb: (err: any | null, result: IGetClubsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetDivisions: (input: IGetDivisionsInput, cb: (err: any | null, result: IGetDivisionsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetTournaments: (input: IGetTournamentsInput, cb: (err: any | null, result: IGetTournamentsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    GetMatchSystems: (input: IGetMatchSystemsInput, cb: (err: any | null, result: IGetMatchSystemsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    TournamentRegister: (input: ITournamentRegisterInput, cb: (err: any | null, result: ITournamentRegisterOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}

export namespace TabTAPI_PortTypes {
    export interface ICredentials {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Account: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Password: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        OnBehalfOf: integer;
    }
    export interface ISeasonEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Season: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsCurrent: boolean;
    }
    export interface ITeamEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        TeamId: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Team: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DivisionId: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        DivisionName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DivisionCategory: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        MatchType: integer;
    }
    export interface IRankingEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Team: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        GamesPlayed: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        GamesWon: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        GamesLost: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        GamesDraw: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        GamesWO: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        IndividualMatchesWon: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        IndividualMatchesLost: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        IndividualSetsWon: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        IndividualSetsLost: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Points: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        TeamClub: string;
    }
    export interface IVenueEntry {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Id: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        ClubVenue: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Street: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Town: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Phone: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Comment: string;
    }
    export interface IPlayers {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        FirstName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        LastName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Ranking: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        VictoryCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsForfeited: boolean;
    }
    export interface IDoubleTeams {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Team: string;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsForfeited: boolean;
    }
    export interface IHomePlayers {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        PlayerCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DoubleTeamCount: integer;
        Players: Array<TabTAPI_PortTypes.IPlayers>;
        DoubleTeams: Array<TabTAPI_PortTypes.IDoubleTeams>;
    }
    export interface IAwayPlayers {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        PlayerCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DoubleTeamCount: integer;
        Players: Array<TabTAPI_PortTypes.IPlayers>;
        DoubleTeams: Array<TabTAPI_PortTypes.IDoubleTeams>;
    }
    export interface IHomePlayer {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        FirstName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        LastName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Ranking: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        VictoryCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsForfeited: boolean;
    }
    export interface IAwayPlayer {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        FirstName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        LastName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Ranking: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        VictoryCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsForfeited: boolean;
    }
    export interface IIndividualMatchResults {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        HomePlayerMatchIndex: integer>;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        HomePlayerUniqueIndex: integer>;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        AwayPlayerMatchIndex: integer>;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        AwayPlayerUniqueIndex: integer>;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        HomeSetCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        AwaySetCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsHomeForfeited: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsAwayForfeited: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Scores: string;
        HomePlayer: Array<TabTAPI_PortTypes.IHomePlayer>;
        AwayPlayer: Array<TabTAPI_PortTypes.IAwayPlayer>;
    }
    export interface IRankingPointsEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        MethodName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Value: string;
        /** http://api.frenoy.net/TabTAPI#xsd:dateTime(undefined) */
        LastModified: dateTime;
    }
    export interface IPhone {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Home: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Work: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Mobile: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Fax: string;
    }
    export interface IAddress {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Line1: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Line2: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        ZipCode: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Town: string;
    }
    export interface IRankingEvaluationEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        EvaluationType: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        EvaluationValue: string;
    }
    export interface IAuthor {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        RankingIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        FirstName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        LastName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Ranking: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Status: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Club: string;
        /** http://api.frenoy.net/TabTAPI#GenderType(M,F) */
        Gender: "M" | "F";
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Category: string;
        /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
        BirthDate: date;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        MedicalAttestation: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        RankingPointsCount: integer;
        RankingPointsEntries: Array<TabTAPI_PortTypes.IRankingPointsEntries>;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Email: string;
        Phone: TabTAPI_PortTypes.IPhone;
        Address: TabTAPI_PortTypes.IAddress;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        ResultCount: integer;
        ResultEntries: Array<{
            /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
            Date: date;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            UniqueIndex: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            FirstName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            LastName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            Ranking: string;
            /** http://api.frenoy.net/TabTAPI#ResultType(V,D) */
            Result: "V" | "D";
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            SetFor: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            SetAgainst: integer;
            /** http://api.frenoy.net/TabTAPI#CompetitionType(C,T) */
            CompetitionType: "C" | "T";
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            Club: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            MatchId: string;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            MatchUniqueId: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TournamentName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TournamentSerieName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TeamName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            RankingEvaluationCount: integer;
            RankingEvaluationEntries: Array<TabTAPI_PortTypes.IRankingEvaluationEntries>;
        }>;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        NationalNumber: string;
    }
    export interface ICommentEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:dateTime(undefined) */
        Timestamp: dateTime;
        Author: TabTAPI_PortTypes.IAuthor;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Comment: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Code: string;
    }
    export interface IMatchDetails {
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        DetailsCreated: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:time(undefined) */
        StartTime: time;
        /** http://api.frenoy.net/TabTAPI#xsd:time(undefined) */
        EndTime: time;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        HomeCaptain: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        AwayCaptain: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Referee: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        HallCommissioner: integer;
        HomePlayers: TabTAPI_PortTypes.IHomePlayers;
        AwayPlayers: TabTAPI_PortTypes.IAwayPlayers;
        IndividualMatchResults: Array<TabTAPI_PortTypes.IIndividualMatchResults>;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        MatchSystem: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        HomeScore: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        AwayScore: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        CommentCount: integer;
        CommentEntries: Array<TabTAPI_PortTypes.ICommentEntries>;
    }
    export interface ITeamMatchesEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        DivisionName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        MatchId: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        WeekName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
        Date: date;
        /** http://api.frenoy.net/TabTAPI#xsd:time(undefined) */
        Time: time;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Venue: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        VenueClub: string;
        VenueEntry: TabTAPI_PortTypes.IVenueEntry;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        HomeClub: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        HomeTeam: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        AwayClub: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        AwayTeam: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Score: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        MatchUniqueId: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        NextWeekName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        PreviousWeekName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsHomeForfeited: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsAwayForfeited: boolean;
        MatchDetails: TabTAPI_PortTypes.IMatchDetails;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DivisionId: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DivisionCategory: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        IsHomeWithdrawn: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        IsAwayWithdrawn: string;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsValidated: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        IsLocked: boolean;
    }
    export interface IMemberEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        RankingIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        FirstName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        LastName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Ranking: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Status: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Club: string;
        /** http://api.frenoy.net/TabTAPI#GenderType(M,F) */
        Gender: "M" | "F";
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Category: string;
        /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
        BirthDate: date;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        MedicalAttestation: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        RankingPointsCount: integer;
        RankingPointsEntries: Array<TabTAPI_PortTypes.IRankingPointsEntries>;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Email: string;
        Phone: TabTAPI_PortTypes.IPhone;
        Address: TabTAPI_PortTypes.IAddress;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        ResultCount: integer;
        ResultEntries: Array<{
            /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
            Date: date;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            UniqueIndex: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            FirstName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            LastName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            Ranking: string;
            /** http://api.frenoy.net/TabTAPI#ResultType(V,D) */
            Result: "V" | "D";
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            SetFor: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            SetAgainst: integer;
            /** http://api.frenoy.net/TabTAPI#CompetitionType(C,T) */
            CompetitionType: "C" | "T";
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            Club: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            MatchId: string;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            MatchUniqueId: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TournamentName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TournamentSerieName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TeamName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            RankingEvaluationCount: integer;
            RankingEvaluationEntries: Array<TabTAPI_PortTypes.IRankingEvaluationEntries>;
        }>;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        NationalNumber: string;
    }
    export interface IVenueEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Id: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        ClubVenue: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Street: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Town: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Phone: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Comment: string;
    }
    export interface IClubEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        UniqueIndex: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        LongName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Category: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        CategoryName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        VenueCount: integer;
        VenueEntries: Array<TabTAPI_PortTypes.IVenueEntries>;
    }
    export interface IDivisionEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DivisionId: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        DivisionName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DivisionCategory: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Level: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        MatchType: integer;
    }
    export interface IVenue {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Id: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        ClubVenue: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Street: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Town: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Phone: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Comment: string;
    }
    export interface IMember {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        RankingIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        FirstName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        LastName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Ranking: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Status: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Club: string;
        /** http://api.frenoy.net/TabTAPI#GenderType(M,F) */
        Gender: "M" | "F";
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Category: string;
        /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
        BirthDate: date;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        MedicalAttestation: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        RankingPointsCount: integer;
        RankingPointsEntries: Array<TabTAPI_PortTypes.IRankingPointsEntries>;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Email: string;
        Phone: TabTAPI_PortTypes.IPhone;
        Address: TabTAPI_PortTypes.IAddress;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        ResultCount: integer;
        ResultEntries: Array<{
            /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
            Date: date;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            UniqueIndex: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            FirstName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            LastName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            Ranking: string;
            /** http://api.frenoy.net/TabTAPI#ResultType(V,D) */
            Result: "V" | "D";
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            SetFor: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            SetAgainst: integer;
            /** http://api.frenoy.net/TabTAPI#CompetitionType(C,T) */
            CompetitionType: "C" | "T";
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            Club: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            MatchId: string;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            MatchUniqueId: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TournamentName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TournamentSerieName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            TeamName: string;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            RankingEvaluationCount: integer;
            RankingEvaluationEntries: Array<TabTAPI_PortTypes.IRankingEvaluationEntries>;
        }>;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        NationalNumber: string;
    }
    export interface IClub {
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        UniqueIndex: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        LongName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Category: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        CategoryName: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        VenueCount: integer;
        VenueEntries: Array<TabTAPI_PortTypes.IVenueEntries>;
    }
    export interface IRegistrationEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:dateTime(undefined) */
        RegistrationDate: dateTime;
        Member: TabTAPI_PortTypes.IMember;
        Club: TabTAPI_PortTypes.IClub;
    }
    export interface ISerieEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        ResultCount: integer;
        ResultEntries: Array<{
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            Position: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            HomePlayerMatchIndex: integer>;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            HomePlayerUniqueIndex: integer>;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            AwayPlayerMatchIndex: integer>;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            AwayPlayerUniqueIndex: integer>;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            HomeSetCount: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
            AwaySetCount: integer;
            /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
            IsHomeForfeited: boolean;
            /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
            IsAwayForfeited: boolean;
            /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
            Scores: string;
            HomePlayer: Array<TabTAPI_PortTypes.IHomePlayer>;
            AwayPlayer: Array<TabTAPI_PortTypes.IAwayPlayer>;
        }>;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        RegistrationCount: integer;
        RegistrationEntries: Array<TabTAPI_PortTypes.IRegistrationEntries>;
    }
    export interface ITournamentEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Level: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        ExternalIndex: string;
        /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
        DateFrom: date;
        /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
        DateTo: date;
        /** http://api.frenoy.net/TabTAPI#xsd:date(undefined) */
        RegistrationDate: date;
        Venue: TabTAPI_PortTypes.IVenue;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        SerieCount: integer;
        SerieEntries: Array<TabTAPI_PortTypes.ISerieEntries>;
    }
    export interface ITeamMatchDefinitionEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Position: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        Type: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        HomePlayerIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        AwayPlayerIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        AllowSubstitute: boolean;
    }
    export interface IMatchSystemEntries {
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        UniqueIndex: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:string(undefined) */
        Name: string;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        SingleMatchCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        DoubleMatchCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        SetCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        PointCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:boolean(undefined) */
        ForcedDoubleTeams: boolean;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        SubstituteCount: integer;
        /** http://api.frenoy.net/TabTAPI#xsd:integer(undefined) */
        TeamMatchCount: integer;
        TeamMatchDefinitionEntries: Array<TabTAPI_PortTypes.ITeamMatchDefinitionEntries>;
    }
}
