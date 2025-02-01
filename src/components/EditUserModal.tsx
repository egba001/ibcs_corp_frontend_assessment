import { Fragment, useState } from "react";
import { Dialog, Transition, DialogTitle, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { EditUserProps, UserFormData } from "../utils/types";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "../utils/api";
import { queryClient } from "../main";

export default function EditUserModal({
    closeModal,
    userInfo
}: EditUserProps) {


    const [formData, setFormData] = useState<UserFormData>({
        id: userInfo?.id,
        name: userInfo?.name,
        email: userInfo?.email,
        website: `https://${userInfo?.website}`,
        phone: userInfo?.phone,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const { mutate, isPending, error } = useMutation({
        mutationFn: ({
            userId,
            formData,
        }: {
            [x: string]: unknown;
            userId: number;
            formData: UserFormData;
        }) => editUser(userId, formData),
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ["usersData"] });
            closeModal()
            console.log(data)
        }
    });

    // function to edit user
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ userId: userInfo.id, formData: formData });
    };


    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex justify-between items-center">
                            <DialogTitle className="text-lg font-semibold">
                                Edit User Information
                            </DialogTitle>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-full hover:bg-gray-200"
                            >
                                <XMarkIcon />
                            </button>
                        </div>
                        {userInfo && (
                            <form className="mt-4" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base  focus:border-blue-500 "
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base  focus:border-blue-500 "
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base  focus:border-blue-500 "
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base  focus:border-blue-500 "
                                    />
                                </div>
                                {
                                    error && <p className="py-4 text-red-500 font-medium">Error updating user information</p>
                                }
                                <div className="mt-6 flex justify-end gap-2">
                                    <button type="submit" disabled={isPending} className="bg-blue-500 disabled:opacity-50 px-4 py-2 text-white rounded-md">
                                        {isPending ? "Updating.." : "Update user"}
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded-md"
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </Transition>
    );
}
