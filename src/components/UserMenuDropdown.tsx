import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useState } from "react";
import { UsersDataResponse } from "../utils/types";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

export default function UserMenuDropDown({ userInfo }: { userInfo : UsersDataResponse }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <Menu as="div" className="relative">
            <MenuButton className="cursor-pointer right-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M6 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM11.25 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
            </MenuButton>
            <MenuItems
                as="div"
                className="bg-white right-0 z-20 overflow-hidden absolute top-6 w-[10rem] rounded-md border border-gray-500 shadow-xl"
            >
                <MenuItem
                    as="div"
                    className="p-4 w-full text-start cursor-pointer data-[focus]:bg-blue-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                    }}
                >
                    Edit User
                </MenuItem>
                <MenuItem
                    as="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDeleteModalOpen(true);
                    }}
                    className="p-4 text-red-800 w-full text-start font-medium data-[focus]:bg-blue-100"
                >
                    Delete User
                </MenuItem>
            </MenuItems>

            {isModalOpen && (
                <EditUserModal
                    closeModal={() => setIsModalOpen(false)}
                    userInfo={{
                        id: userInfo.id,
                        name: userInfo.name,
                        email: userInfo.email,
                        phone: userInfo.phone,
                        website: userInfo.website,
                    }}
                />
            )}

            {/* Delete User Modal */}
            {isDeleteModalOpen && (
                <DeleteUserModal
                    userId={userInfo.id}
                    closeModal={() => setIsDeleteModalOpen(false)}
                />
            )}
        </Menu>
    );
}
