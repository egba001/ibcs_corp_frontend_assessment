import { Fragment } from "react";
import {
    Dialog,
    Transition,
    DialogTitle,
    DialogPanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { DeleteUserProps } from "../utils/types";
import { useDeleteUser } from "../utils/hooks";

export default function DeleteUserModal({ closeModal, userId }: DeleteUserProps) {

    const { mutate: deleteUser, isPending, data, error } = useDeleteUser();


    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex justify-between items-center">
                            <DialogTitle className="text-lg font-semibold">
                                Confirm delete
                            </DialogTitle>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-full hover:bg-gray-200"
                            >
                                <XMarkIcon />
                            </button>
                        </div>
                        <div>
                            <p className="mb-6">Are you sure you want to delete this user?</p>
                            {
                                !isPending && data && <p className="text-green-500">User successfully deleted</p>
                            }
                            {
                                !isPending && error && <p className="text-red-500">Error deleting user</p>
                            }

                            <button
                                onClick={() => deleteUser(userId)}
                                disabled={isPending}
                                className="bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md"
                            >
                                {isPending ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </Transition>
    );
}
