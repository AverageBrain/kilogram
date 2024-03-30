import {BaseEntity} from "./BaseEntity";

export interface User extends BaseEntity  {
    username?: string
    name?: string
    githubId?: number
}