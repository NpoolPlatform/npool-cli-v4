import { defineStore } from 'pinia'
import { API } from './const'
import {  Role, AppRoleUser } from '../../../base'
import { doActionWithError } from '../../../action'

import {
  CreateRoleUserRequest,
  CreateRoleUserResponse,
  DeleteRoleUserRequest,
  DeleteRoleUserResponse,
  GetRolesRequest,
  GetRolesResponse,
  GetRoleUsersRequest,
  GetRoleUsersResponse
} from './types'

export const useAdminRoleStore = defineStore('admin-role-v3', {
  state: () => ({
    Roles: {
      Roles: [] as Array<Role>,
      Total: 0
    },
    RoleUsers: {
      RoleUsers: [] as Array<AppRoleUser>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getRoles (req: GetRolesRequest, done: (error: boolean) => void) {
      doActionWithError<GetRolesRequest, GetRolesResponse>(
        API.GET_ROLES,
        req,
        req.Message,
        (resp: GetRolesResponse): void => {
          this.Roles.Roles.push(...resp.Infos)
          this.Roles.Total = resp.Total
          done(false)
        }, () => {
          done(true)
        })
    },
    getRoleUsers (req: GetRoleUsersRequest, done: (error: boolean) => void) {
      doActionWithError<GetRoleUsersRequest, GetRoleUsersResponse>(
        API.GET_ROLEUSERS,
        req,
        req.Message,
        (resp: GetRoleUsersResponse): void => {
          this.RoleUsers.RoleUsers = resp.Infos
          this.RoleUsers.Total = resp.Total
          done(false)
        }, () => {
          done(true)
        })
    },
    createRoleUser (req: CreateRoleUserRequest, done: (error: boolean) => void) {
      doActionWithError<CreateRoleUserRequest, CreateRoleUserResponse>(
        API.CREATE_ROLEUSER,
        req,
        req.Message,
        (resp: CreateRoleUserResponse): void => {
          this.RoleUsers.RoleUsers.splice(0, 0, resp.Info)
          done(false)
        }, () => {
          done(true)
        })
    },
    deleteRoleUser (req: DeleteRoleUserRequest, done: (error: boolean) => void) {
      doActionWithError<DeleteRoleUserRequest, DeleteRoleUserResponse>(
        API.DELETE_ROLEUSER,
        req,
        req.Message,
        (resp: DeleteRoleUserResponse): void => {
          const index = this.RoleUsers.RoleUsers.findIndex((el) => el.ID === resp.Info.ID)
          this.RoleUsers.RoleUsers.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})
