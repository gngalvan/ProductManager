export default class userDTO {

    constructor(user){
       this.username=`${user.firstName} ${user.lastName}`
       this.email=`${user.email}`
       this.role=`${user.role}`
    }
}