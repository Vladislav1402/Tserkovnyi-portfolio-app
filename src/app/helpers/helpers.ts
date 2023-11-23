export class Helpers {
  static  generateID() {
        const time = Date.now();
        const randomNumber = Math.floor(Math.random() * 1000000001);
        const uniqueId = time + "_" + randomNumber;
        return uniqueId;
     }
}

