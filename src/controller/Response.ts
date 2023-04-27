/**
 * A response class
 *  msg = the message of the response
 *  data = data object
 *  role = the response role
 * [0]=admin
 * [1]=normal
 * [2]=vendor
 */
class ResponseObj {
  status: number;
  data: object;
  meta: object;
  msg: string;

  constructor(status: number, data: object, meta: object, msg: string) {
    this.status = status;
    this.data = data;
    this.meta = meta;
    this.msg = msg;
  }
}

export default ResponseObj;
