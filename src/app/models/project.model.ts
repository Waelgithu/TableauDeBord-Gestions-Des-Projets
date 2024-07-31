export interface Project {
    id: number;
    nom: string;
    description: string;
    status: Status;
    startDate: Date;
    endDate: Date;
    priority: number;
    type: string;
    budget: number;
    tasks?: Task[];
    users?: User[];
  }
  
  export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status; 
    startDate: Date;
    endDate: Date;
    priority: number;
    users?: User[];
    comments?: Comment[];
    project?: Project;
    progress?: number;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    grade: string;
    role: Role;
    worken: boolean;
  }
  
  export interface Comment {
    id: number;
    date: Date;
    content: string;
    authorType: string;
    commentableType: string;
    author?: User;
    task?: Task;
  }
  
  export enum Status {
    EN_COURS = 'EN_COURS',
    ANNULE_ET_CLOTURE = 'ANNULE_ET_CLOTURE',
    LIVRE_ET_CLOTURE = 'LIVRE_ET_CLOTURE',
    LIVRE = 'LIVRE',
    NON_DEMARRE = 'NON_DEMARRE',
    EN_ATTENTE = 'EN_ATTENTE'
  }
  export enum Role {
    ADMIN = 'ADMIN',
    PROJECT_MANAGER = 'PROJECT_MANAGER',
    PERSONNEL_ADMINISTRATIF = 'PERSONNEL_ADMINISTRATIF',
    TEAM_LEADER = 'LTEAM_LEADER',
    DEVELOPER = 'DEVELOPER',
    TESTER = 'TESTER',
    DESIGNER = 'DESIGNER'
  }
  