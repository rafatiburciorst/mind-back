export type PaginationProps<T> = {
  items: T[]
  page: number
  page_size: number
  total: number
}

export class Pagination<T> {
  public items: T[]
  public page: number
  public page_size: number
  public total: number

  constructor(props: PaginationProps<T>) {
    this.items = props.items
    this.page = props.page
    this.page_size = props.page_size
    this.total = props.total
  }
}
