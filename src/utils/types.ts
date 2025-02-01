export interface UserInfo {
    id: number
    name: string;
    email: string;
    website: string;
    phone: string;
}

export interface UsersDataResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
}

export interface UserFormData {
    id: number
    name: string;
    email: string;
    phone: string;
    website: string;
}

export interface AddUserFormData {
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string
    }
}

export interface EditUserProps {
    closeModal: () => void;
    userInfo: UserInfo
}

export interface AddUserProps {
    closeModal: () => void;
}

export interface DeleteUserProps {
    closeModal: () => void;
    userId: number
}

export interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}