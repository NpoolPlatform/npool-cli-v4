import { BaseRequest, Lang, LangReq } from '../../../base'

export interface CreateLangRequest extends BaseRequest{
  Lang: string;
  Logo: string;
  Name: string;
  Short: string;
}

export interface CreateLangResponse {
  Info: Lang;
}

export interface CreateLangsRequest extends BaseRequest{
  Infos: LangReq[];
}

export interface CreateLangsResponse {
  Infos: Lang[];
}

export interface GetLangsRequest extends BaseRequest{
  Offset: number;
  Limit: number;
}

export interface GetLangsResponse {
  Infos: Lang[];
  Total: number;
}

export interface UpdateLangRequest extends BaseRequest{
  ID: string;
  Lang: string;
  Logo: string;
  Name: string;
  Short: string;
}

export interface UpdateLangResponse {
  Info: Lang;
}
