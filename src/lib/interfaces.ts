export interface AddUserParams {
  CardName: string;
  UserID: number;
  CardNo: string;
  CardStatus: number;
  CardType: number;
  Password: number;
  Doors: number;
  ValidDateStart: Date;
  ValidDateEnd: Date;
}

export interface FaceParams {
  userID: string;
  imagePath: string;
}
