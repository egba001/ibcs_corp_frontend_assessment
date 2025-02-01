import { deleteUser, fetchUsers } from "../utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UsersDataResponse } from "./types";
import { queryClient } from "../main";

export const useUsers = () =>
    useQuery<UsersDataResponse[]>({
        queryKey: ["usersData"],
        queryFn: fetchUsers,
    });

export const useDeleteUser = () => {

    return useMutation({
        mutationFn: deleteUser, // Calls the deleteUser function
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["usersData"] }); // Refetch the users list
        },
        onError: (error) => {
            console.error("Error deleting user:", error);
        },
    });
};
