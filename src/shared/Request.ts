
import type { User } from 'lucia'
import { Allow, Entity, Fields, Relations } from 'remult'
import { User as AuthUser } from './User'

export enum Course {
  CS1A = "Computer Science IA",
  CS1B = "Computer Science IB",
  CS2 = "Computer Science II",
  CS3 = "Computer Science III",
  ALGORITHMS = "Algorithms",
  DISCRETE = "Discrete Structures",
  COMP_ORG = "Computer Organization",
  CCN = "Computer Communication",
  SWE  = "Software Engineering ",
  OS = "Operating Systems",
  PROG_FOR_SCIENCE = "Programming for Scientists",
  CRYPTO = "Intro to Cryptography",
  DATABASE = "Intro to Databases",
  INFOSEC = "Information Security",
  GRAPHICS = "Computer Graphics",
  WEB_PROGRAMMING = "Web Programming",
  STRUCT_OF_PROG_LANG = "Structures of Programming Languages",
  EMBEDDED = "Embedded Systems",
  DECISION_MAKING = "Decision Making Under Uncertainty",
  AI = "Artificial Intelligence",
  DATA_MINING = "Data Mining Techniques",
  HIC = "Human Interface Computing",
  GAME_PROGRAMMING = "Intro to Game Programming",
  SYSADMIN = "Systems Administration",
  SYSPROG = "Systems Programming",
  CS_PRINCIPLES = "Computer Science Principles",
  OTHER = "Other",
}

@Entity('request', {
  allowApiInsert: true,
  allowApiRead: Allow.authenticated,
  allowApiUpdate: Allow.authenticated,
})
export class Request {
  @Fields.cuid()
  id!: string

  @Fields.string({ dbName: "userId" })
  userId = ""

  @Relations.toOne<Request, AuthUser>(() => AuthUser, "userId") 
  user?: User

  @Fields.string()
  name?: string

  @Fields.string()
  issue?: string

  @Fields.enum(() => Course)
  course?: Course

  @Fields.date()
  helpedAt?: Date = undefined

  @Fields.createdAt()
  createdAt?: Date
}