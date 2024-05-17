import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { _raw_to_object, formatDateTime } from "./utils";
import { AddUserParams, FaceParams } from "./interfaces";

export class IntelbrasAccessControlAPI {
  private ip: string;
  private username: string;
  private passwd: string;
  private axiosInstance: AxiosInstance;

  constructor(ip: string, username: string, passwd: string) {
    this.ip = ip;
    this.username = username;
    this.passwd = passwd;
    this.axiosInstance = axios.create({
      baseURL: `http://${this.ip}/`,
      auth: {
        username: this.username,
        password: this.passwd,
      },
    });
  }

  async add_user_v1(params: AddUserParams): Promise<any> {
    const {
      CardName,
      UserID,
      CardNo,
      CardStatus,
      CardType,
      Password,
      Doors,
      ValidDateStart,
      ValidDateEnd,
    } = params;
    const start_time_str = formatDateTime(ValidDateStart);
    const end_time_str = formatDateTime(ValidDateEnd);
    try {
      const url = `cgi-bin/recordUpdater.cgi?action=insert&name=AccessControlCard&CardNo=${CardNo}&CardStatus=${CardStatus}&CardName=${CardName}&UserID=${UserID}&Password=${Password}&CardType=${CardType}&Doors[0]=${Doors}&start_time=${start_time_str}&end_time=${end_time_str}`;
      const response = await this.axiosInstance.get(url);
      const data = _raw_to_object(response.data.split("\n"));
      if (response.status !== 200) {
        throw new Error("Failed to add user.");
      }
      return data;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(
        `ERROR - During Add New User using V1 command - ${errorMessage}`
      );
    }
  }

  async delete_all_users_v2(): Promise<string> {
    try {
      const url = `cgi-bin/AccessUser.cgi?action=removeAll`;
      const response = await this.axiosInstance.get(url);
      if (response.status !== 200) {
        throw new Error("Failed to delete all users.");
      }
      return response.data.toString();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(
        `ERROR - During Remove All Users using V2 command - ${errorMessage}`
      );
    }
  }

  // async register_face(params: FaceParams): Promise<void> {
  //   /*
  //     A imagem recebida pode ter no máximo 100kb
  //     e resolução de até 600 x 1200
  //    */
  //   const { userID, imagePath } = params;
  //   try {
  //     const imageBase64 = await convertImageToBase64(imagePath);
  //     const url = `cgi-bin/AccessFace.cgi?action=insertMulti`;
  //     const data = {
  //       FaceList: [
  //         {
  //           UserID: userID,
  //           PhotoData: [imageBase64],
  //         },
  //       ],
  //     };
  //     const response = await this.axiosInstance.post(url, data);
  //     if (response.status === 200) {
  //       console.log("Face cadastrada com sucesso.");
  //       console.log(response.data);
  //     } else {
  //       console.error(
  //         `Erro ao cadastrar a face. Código de status: ${response.status}`
  //       );
  //       console.error(response.data);
  //     }
  //   } catch (error) {
  //     const errorMessage = (error as Error).message;
  //     console.error("Erro durante o cadastro da face:", errorMessage);
  //   }
  // }

  async get_all_users(count?: number): Promise<any> {
    try {
      const url = `cgi-bin/recordFinder.cgi?action=doSeekFind&name=AccessControlCard&count=${
        count || ""
      }`;
      const response = await this.axiosInstance.get(url);
      const raw = response.data.trim().split("\n");
      const data = _raw_to_object(raw);
      if (response.status !== 200) {
        throw new Error("Failed to get all users.");
      }
      return data;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`ERROR - During Get Users: ${errorMessage}`);
    }
  }

  async get_users_count(): Promise<any> {
    try {
      const url = `cgi-bin/recordFinder.cgi?action=getQuerySize&name=AccessUserInfo`;
      const response = await this.axiosInstance.get(url);
      const raw = response.data.trim().split("\n");
      const data = _raw_to_object(raw);
      if (response.status !== 200) {
        throw new Error("Failed to get users count.");
      }
      return data;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`ERROR - During Get Users Count: ${errorMessage}`);
    }
  }

  async get_user_id(UserIDList: number): Promise<any> {
    try {
      const url = `cgi-bin/AccessUser.cgi?action=list&UserIDList[0]=${UserIDList}`;
      const response = await this.axiosInstance.get(url);
      const raw = response.data.trim().split("\n");
      const data = _raw_to_object(raw);
      if (response.status !== 200) {
        throw new Error("Failed to get user ID.");
      }
      return data;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`ERROR - During Get Users ID: ${errorMessage}`);
    }
  }

  async set_remove_users_id(UserIDList: number): Promise<any> {
    try {
      const url = `cgi-bin/AccessUser.cgi?action=removeMulti&UserIDList[0]=${UserIDList}`;
      const response = await this.axiosInstance.get(url);
      const raw = response.data.trim().split("\n");
      const data = _raw_to_object(raw);
      if (response.status !== 200) {
        throw new Error("Failed to remove users by ID.");
      }
      return data;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`ERROR - During Remove Users By ID: ${errorMessage}`);
    }
  }
}
