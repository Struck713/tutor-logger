
import { Entity, Fields } from 'remult'

export enum Course {
  CS1A = "Computer Science IA",
  CS1B = "Computer Science IB",
  CS2 = "Computer Science II",
  CS3 = "Computer Science III"
}

@Entity('request', {
  allowApiInsert: true,
  allowApiUpdate: true
})
export class Request {
  @Fields.cuid()
  id!: string

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