import { IUserRegistrDTO, OrganizationDTO, UserApplicationStatus } from 'nswag-api/nswag-api-auth';

export class UserRegistrDTO implements IUserRegistrDTO {
    id?: string | undefined;
    userName!: string;
    password!: string;
    fullName!: string;
    surname?: string | undefined;
    name?: string | undefined;
    patronymic?: string | undefined;
    email!: string;
    mainRole?: string | undefined;
    roles?: string[] | undefined;
    rolesStr?: string | undefined;
    countEnter?: number | undefined;
    athletesId?: number | undefined;
    imageFileGuid?: string | undefined;
    applicationUserId?: string | undefined;
    spUserTypeId?: number | undefined;
    isForeign!: boolean;
    isPassportUzb!: boolean;
    pinfl?: string | undefined;
    passportSeria?: string | undefined;
    passportNumber?: string | undefined;
    passportGiven?: string | undefined;
    passportDateBegin?: string | undefined;
    passportDateEnd?: string | undefined;
    birthDate!: string;
    spNationId?: number | undefined;
    spCitizenshipId?: number | undefined;
    citizenship?: string | undefined;
    spCountryId?: number | undefined;
    spRegionId?: number | undefined;
    spDistrictId?: number | undefined;
    address?: string | undefined;
    spSexId?: number | undefined;
    addressBirth?: string | undefined;
    phoneMain!: string;
    phoneAdditional?: string | undefined;
    isFromGCP!: boolean;
    isChangePassword!: boolean;
    lockoutEnabled: boolean;
    organization?: OrganizationDTO | undefined;
    userApplicationStatus!: UserApplicationStatus;
    constructor(data?: IUserRegistrDTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.userName = _data['userName'];
            this.password = _data['password'];
            this.fullName = _data['fullName'];
            this.surname = _data['surname'];
            this.name = _data['name'];
            this.patronymic = _data['patronymic'];
            this.email = _data['email'];
            this.mainRole = _data['mainRole'];
            if (Array.isArray(_data['roles'])) {
                this.roles = [] as any;
                for (let item of _data['roles']) this.roles!.push(item);
            }
            this.rolesStr = _data['rolesStr'];
            this.countEnter = _data['countEnter'];
            this.athletesId = _data['athletesId'];
            this.imageFileGuid = _data['imageFileGuid'];
            this.applicationUserId = _data['applicationUserId'];
            this.isForeign = _data['isForeign'];
            this.isPassportUzb = _data['isPassportUzb'];
            this.pinfl = _data['pinfl'];
            this.passportSeria = _data['passportSeria'];
            this.passportNumber = _data['passportNumber'];
            this.passportGiven = _data['passportGiven'];
            this.passportDateBegin = _data['passportDateBegin']
            this.passportDateEnd = _data['passportDateEnd']
            this.birthDate = _data["birthDate"];
            this.spNationId = _data['spNationId'];
            this.spCitizenshipId = _data['spCitizenshipId'];
            this.spUserTypeId = _data['spUserTypeId']
            this.citizenship = _data['citizenship'];
            this.spCountryId = _data['spCountryId'];
            this.spRegionId = _data['spRegionId'];
            this.spDistrictId = _data['spDistrictId'];
            this.address = _data['address'];
            this.spSexId = _data['spSexId'];
            this.addressBirth = _data['addressBirth'];
            this.phoneMain = _data['phoneMain'];
            this.phoneAdditional = _data['phoneAdditional'];
            this.isFromGCP = _data['isFromGCP'];
            this.isChangePassword = _data['isChangePassword'];
            this.organization = _data["organization"] ? OrganizationDTO.fromJS(_data["organization"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UserRegistrDTO {
        data = typeof data === 'object' ? data : {};
        let result = new UserRegistrDTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['userName'] = this.userName;
        data['password'] = this.password;
        data['fullName'] = this.fullName;
        data['surname'] = this.surname;
        data['name'] = this.name;
        data['patronymic'] = this.patronymic;
        data['email'] = this.email;
        data['mainRole'] = this.mainRole;
        if (Array.isArray(this.roles)) {
            data['roles'] = [];
            for (let item of this.roles) data['roles'].push(item);
        }
        data['rolesStr'] = this.rolesStr;
        data['countEnter'] = this.countEnter;
        data['athletesId'] = this.athletesId;
        data['imageFileGuid'] = this.imageFileGuid;
        data['applicationUserId'] = this.applicationUserId;
        data['spUserTypeId'] = this.spUserTypeId;
        data['isForeign'] = this.isForeign;
        data['isPassportUzb'] = this.isPassportUzb;
        data['pinfl'] = this.pinfl;
        data['passportSeria'] = this.passportSeria;
        data['passportNumber'] = this.passportNumber;
        data['passportGiven'] = this.passportGiven;
        data['passportDateBegin'] = this.passportDateBegin
        data['passportDateEnd'] = this.passportDateEnd
        data['birthDate'] = this.birthDate
        data['spNationId'] = this.spNationId;
        data['spCitizenshipId'] = this.spCitizenshipId;
        data['citizenship'] = this.citizenship;
        data['spCountryId'] = this.spCountryId;
        data['spRegionId'] = this.spRegionId;
        data['spDistrictId'] = this.spDistrictId;
        data['address'] = this.address;
        data['spSexId'] = this.spSexId;
        data['addressBirth'] = this.addressBirth;
        data['phoneMain'] = this.phoneMain;
        data['phoneAdditional'] = this.phoneAdditional;
        data['isFromGCP'] = this.isFromGCP;
        data["organization"] = this.organization ? this.organization.toJSON() : <any>undefined;
        data['isChangePassword'] = this.isChangePassword;
        return data;
    }
}
