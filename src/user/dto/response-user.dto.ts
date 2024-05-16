class UserPrivilegeDto {
  email: string;
  username: string;
  isActive: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  isOwner: boolean;
}

class UserInfoDto {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: number;
  email: string;
  username: string;
  isActive: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export { UserPrivilegeDto, UserInfoDto };
